import { test } from '@playwright/test';
import { clickSignUp, assertLoggedinUser } from '../pages/LandingPage/LandingPage';
import { RegisterEntity } from '../pages/SignUpPage/SignUpPage';
import { UserModel } from '../models/UserModel';
import users from "../testdata/Registration.json";

let testData: Array<UserModel> = users as Array<UserModel>;

testData.forEach(async user => {

    test(`User registration using ${user.email}`, async ({ page }) => {
            await page.goto('/')
            await page.waitForTimeout(2000)
            await clickSignUp(page)
            await RegisterEntity(page, user)
            await assertLoggedinUser(page, user)
    });
})