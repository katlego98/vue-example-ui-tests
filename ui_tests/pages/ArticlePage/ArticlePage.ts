import { expect, Page } from "@playwright/test";
import { ArticleModel } from "../../models/ArticleModel";

const locators = {
    articleHeader: '.banner > .container > h1',
    articleContent: 'div.row.article-content',
    signInBtn: 'a[href="#/login"]',
    signUpBtn: 'a[href="#/register"]',
    authorLink: 'a.author[href="#/@$$/"]', // replace "$$" with UserName
    articleDate: '.date',
    articleLink: 'a.preview-link[href="#/articles/$$/"]',
    followArticleUserBtn: 'button.btn-outline-secondary',
    favouriteArticleBtn: 'button.btn-outline-primary',
    commentField: 'textarea[placeholder="Write a comment..."]',
    postCommentBtn: 'button.btn-primary',
    deleteArticle: 'div.article-meta:nth-child(2) > span:nth-child(3) > button:nth-child(3)'

}

export async function clickSignUp(page: Page) {
    await page.locator(locators.signInBtn).click();
}

export async function clickSignIn(page: Page) {
    await page.locator(locators.signUpBtn).click();
}

export async function assertArticlePageScreenload(page: Page, loggedIn: boolean = false){

    if(loggedIn) {
        expect(page.locator(locators.articleContent)).toBeDefined()
        expect(page.locator(locators.articleHeader)).toBeDefined()
        
        // Need to add logic for logged in user
        expect(page.locator(locators.followArticleUserBtn)).toBeDefined()
        expect(page.locator(locators.favouriteArticleBtn)).toBeDefined()
        await expect(page.locator(locators.followArticleUserBtn)).toHaveCount(2)
        await expect(page.locator(locators.favouriteArticleBtn)).toHaveCount(2)

        expect(page.locator(locators.commentField)).toBeDefined()
        expect(page.locator(locators.commentField)).toBeEditable()
        expect(page.locator(locators.postCommentBtn)).toBeDefined()

    }else {
        expect(page.locator(locators.signInBtn)).toHaveCount(1)
        expect(page.locator(locators.signUpBtn)).toHaveCount(1)
        expect(page.locator(locators.articleContent)).toBeDefined()
        expect(page.locator(locators.articleHeader)).toBeDefined()
    }
}

export async function assertCreatedArticle(page:Page, article: ArticleModel) {
    //wait for article page to load
    expect(page.locator(locators.articleContent)).toBeDefined()
    expect(page.locator(locators.articleHeader)).toBeDefined()
    
    // assert article content is saved correctly
    expect(await page.locator(locators.articleHeader).innerText()).toBe(article.Title)
    expect(await page.locator(locators.articleContent).innerText()).toBe(article.Body)

    expect(page.locator(locators.followArticleUserBtn)).toBeDefined()
    expect(page.locator(locators.favouriteArticleBtn)).toBeDefined()

    expect(page.locator(locators.commentField)).toBeDefined()
    expect(page.locator(locators.commentField)).toBeEditable()
    expect(page.locator(locators.postCommentBtn)).toBeDefined()
}

export async function deleteArticle(page:Page) {
    await page.locator(locators.deleteArticle).click()
}
