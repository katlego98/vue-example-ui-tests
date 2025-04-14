import {type Page} from "@playwright/test";
import { UserModel } from "../../models/UserModel";

const locators = {
    signInBtn: 'a[href="#/login"]',
    signUpBtn: 'a[href="#/register"]',
    userNameField: 'input[placeholder="Username"]', 
    emailField: 'input[placeholder="Email"]',
    passwordField: 'input[placeholder="Password"]',
    finishSignUPBtn: '.btn'
}


export async function RegisterEntity(page : Page, user: UserModel) {

    await page.locator(locators.userNameField).pressSequentially(user.userName);
    await page.locator(locators.emailField).pressSequentially(user.email);
    await page.locator(locators.passwordField).pressSequentially(user.password);

    await page.locator(locators.finishSignUPBtn).click();

}