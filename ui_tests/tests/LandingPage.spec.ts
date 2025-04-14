import { test, expect } from '@playwright/test';
import { assertBackEndConnection, goToArticle } from '../pages/LandingPage/LandingPage';
import { assertLandingPageScreenload } from '../pages/ArticlePage/ArticlePage';

import { UserModel } from '../models/UserModel';
import users from "../testdata/ArticleNoLogin.json";
import { ArticleModel } from '../models/ArticleModel';

let testData: Array<ArticleModel> = users as Array<ArticleModel>;

testData.forEach(async article => {

    test(`Backend connection successfull, not logged in - Go to article flow`, async ({ page }) => {
            await page.goto('/')
            await page.waitForTimeout(2000)
            await assertBackEndConnection(page)
            await goToArticle(page, article)
            await assertLandingPageScreenload(page, false)
    });
})
