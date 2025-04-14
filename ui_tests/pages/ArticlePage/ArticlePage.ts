import { expect, Page } from "@playwright/test";

const locators = {
    articleHeader: '.banner > .container > h1',
    articleContent: 'div.row.article-content',
    signInBtn: 'a[href="#/login"]',
    signUpBtn: 'a[href="#/register"]',
    authorLink: 'a.author[href="#/@$$/"]', // replace "$$" with UserName
    articleDate: '.date',
    articleLink: 'a.preview-link[href="#/articles/$$/"]'
}

export async function clickSignUp(page: Page) {
    await page.locator(locators.signInBtn).click();
}

export async function clickSignIn(page: Page) {
    await page.locator(locators.signUpBtn).click();
}

export async function assertLandingPageScreenload(page: Page, loggedIn: boolean = false){

    if(loggedIn) {
        expect(page.locator(locators.articleContent)).toBeDefined()
        expect(page.locator(locators.articleHeader)).toBeDefined()

        // Need to add logic for logged in user
    }else {
        expect(await page.locator(locators.signInBtn)).toHaveCount(1)
        expect(await page.locator(locators.signUpBtn)).toHaveCount(1)
        expect(page.locator(locators.articleContent)).toBeDefined()
        expect(page.locator(locators.articleHeader)).toBeDefined()
    }
}
