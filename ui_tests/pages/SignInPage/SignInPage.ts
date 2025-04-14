import { Page } from "@playwright/test";
import { UserModel } from "../../models/UserModel";

const locators = {
    signInBtn: 'a[href="#/login"]',
    signUpBtn: 'a[href="#/register"]',
    emailField: 'input[placeholder="Email"]',
    passwordField: 'input[placeholder="Password"]',
    finishSignInBtn: '.btn'
}

export async function clickSignUp(page: Page) {
    await page.locator(locators.signUpBtn).click();
}

export async function signIn(page: Page, user: UserModel) {
    await page.locator(locators.emailField).pressSequentially(user.email)
    await page.locator(locators.passwordField).pressSequentially(user.password)

    await page.locator(locators.finishSignInBtn).click()

}