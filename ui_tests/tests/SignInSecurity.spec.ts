import { expect, test } from '@playwright/test';
import { clickSignIn } from '../pages/LandingPage/LandingPage';

import { UserModel } from '../models/UserModel';
import malUsers from "../testdata/RegistrationSecurity.json";
import { signIn } from '../pages/SignInPage/SignInPage';

let testData2: Array<UserModel> = malUsers as Array<UserModel>;

testData2.forEach(async user => {

    test(`Testing sign-in payload validation on sign in: email payload='${user.email}'`, async ({page}) => {
        await page.goto('/')
                await page.waitForTimeout(2000)
                await clickSignIn(page)
                await signIn(page, user)
                const dialog = await page.waitForEvent('dialog', {timeout: 5000}).catch(() => undefined)
                expect(dialog).not.toBeDefined()
    })
})