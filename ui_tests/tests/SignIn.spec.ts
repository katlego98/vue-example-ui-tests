import { test } from '@playwright/test';
import { assertLoggedinUser, clickSignIn } from '../pages/LandingPage/LandingPage';
import { signIn } from '../pages/SignInPage/SignInPage';
import { UserModel } from '../models/UserModel';
import users from "../testdata/Registration.json";

let testData: Array<UserModel> = users as Array<UserModel>;

testData.forEach(async user => {

    test(`User sign in using ${user.email}`, async ({ page }) => {
            await page.goto('/')
            await page.waitForTimeout(2000)
            await clickSignIn(page)
            await signIn(page, user)
            await assertLoggedinUser(page, user)
    });
})