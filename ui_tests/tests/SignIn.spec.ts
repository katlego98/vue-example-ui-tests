import { test } from '@playwright/test';
import { assertLoggedinUser, clickSignIn} from '../pages/LandingPage/LandingPage';

import { UserModel } from '../models/UserModel';
import users from "../testdata/Registration.json";
import { signIn } from '../pages/SignInPage/SignInPage';



let testData: Array<UserModel> = users as Array<UserModel>;

testData.forEach(async user => {

    test(`Logging in with email: ${user.email}`, async ({ page }) => {
            await page.goto('/')
            await page.waitForTimeout(2000)
            await clickSignIn(page)
            await signIn(page, user)
            await assertLoggedinUser(page, user)
    });
})