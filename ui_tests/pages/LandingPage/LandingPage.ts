import { expect, Page } from "@playwright/test";
import { ArticleModel } from "../../models/ArticleModel";
import { UserModel } from "../../models/UserModel";

const locators = {
    signInBtn: 'a[href="#/login"]',
    signUpBtn: 'a[href="#/register"]',
    articleMetaData: '.article-meta',
    articlePreviewLink: '.preview-link',
    authorLink: 'a.author[href="#/@$$/"]', // replace "$$" with UserName
    articleDate: '.date',
    articleLink: 'a.preview-link[href="#/articles/$$/"]',
    homeBtn: 'a[href="#/"]',
    newArticleBtn: 'ul.nav:nth-child(2) > li:nth-child(2) > a:nth-child(1)',
    settingsBtn: 'a[href="#/settings"]',
    profileBtn: 'a[href="#/@$$"]', // replace "$$" with UserName
    myFeedBtn: 'a[href="#/my-feed"]'

}

export async function clickSignUp(page: Page) {
    await page.locator(locators.signUpBtn).click();

}

export async function clickSignIn(page: Page) {
    await page.locator(locators.signInBtn).click();

}

export async function clickNewArticleBtn(page:Page) {

    await expect(page.locator(locators.newArticleBtn)).toBeAttached();

    await page.locator(locators.newArticleBtn).click();

}

export async function assertBackEndConnection(page:Page) {
    console.log(await page.locator(locators.articleMetaData).count())

    expect(await page.locator(locators.articleMetaData).count()).toBeGreaterThan(0)
    expect(await page.locator(locators.articlePreviewLink).count()).toBeGreaterThan(0)
}

export async function goToArticle(page:Page, article: ArticleModel) {
    // assert article info
    expect(page.locator(locators.authorLink.replace("$$", article.UserName!))).toBeDefined();
    expect(await page.locator(locators.authorLink.replace("$$", article.UserName!)).innerText()).toBe(article.UserName);

    expect(page.locator(locators.articleDate)).toBeDefined();
    expect(await page.locator(locators.articleDate).first().textContent()).toBe("April 9, 2025");
    
    // click article URL
    let rgx = /\W/
    const newPattern = new RegExp(
        rgx.source,
        rgx.flags + "g",
      );
    await page.locator(locators.articleDate.replace("$$", article.Title.replaceAll(newPattern, "").replace(" ", "-"))).first().click()

}

export async function assertLoggedinUser(page:Page, user: UserModel) {
    
    expect(page.locator(locators.homeBtn)).toBeDefined();
    expect(page.locator(locators.newArticleBtn)).toBeDefined();
    expect(page.locator(locators.settingsBtn)).toBeDefined();
    expect(page.locator(locators.profileBtn.replace('$$', user.userName))).toBeDefined();
    expect(page.locator(locators.myFeedBtn)).toBeDefined();

}