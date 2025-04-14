import { test } from '@playwright/test';
import { assertLoggedinUser, clickNewArticleBtn, clickSignIn, clickSignUp} from '../pages/LandingPage/LandingPage';
import {createNewArticle } from '../pages/CreateArticlePage/CreateArticle';

import { UserModel } from '../models/UserModel';
import users from "../testdata/Registration.json";
import { RegisterEntity } from '../pages/SignUpPage/SignUpPage';
import { ArticleModel } from '../models/ArticleModel';
import { signIn } from '../pages/SignInPage/SignInPage';
import { assertCreatedArticle } from '../pages/ArticlePage/ArticlePage';
import { randomUUID } from 'crypto';

let testData: Array<UserModel> = users as Array<UserModel>;

testData.forEach(async user => {

    test(`Creating article using user with email: ${user.email}`, async ({ page }) => {
            await page.goto('/')
            await page.waitForTimeout(2000)
            await clickSignIn(page)
            await signIn(page, user)
            await assertLoggedinUser(page, user)
            await page.waitForTimeout(2000)
            await clickNewArticleBtn(page)
            let newArticle : ArticleModel = {
                UserName: null,
                Date: null,
                Title: 'This is a test article '+randomUUID(),
                Summary: "I'm testing automation",
                Body: "This is an article created by Automation scripts to test the websites functionality",
                Tags: "Test|Automation"
            }
            await createNewArticle(page, newArticle)
            await assertCreatedArticle(page, newArticle)
            // await assertArticlePageScreenload(page, true)

    });
})