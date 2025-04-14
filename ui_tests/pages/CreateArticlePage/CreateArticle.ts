import { expect, Page } from "@playwright/test";
import { ArticleModel } from "../../models/ArticleModel";

const locators = {
    articleTitle: 'fieldset.form-group:nth-child(1) > input:nth-child(1)',
    articleSummary: 'fieldset.form-group:nth-child(2) > input:nth-child(1)',
    articleBody: 'fieldset.form-group:nth-child(3) > textarea',
    articleTags: 'fieldset.form-group:nth-child(4) > input:nth-child(1)',
    publishArticleBtn: '.btn'
}

export async function createNewArticle(page: Page, article: ArticleModel) {
    await page.locator(locators.articleTitle).waitFor({state: "attached", timeout: 5000})
    await page.locator(locators.articleTitle).pressSequentially(article.Title);
    await page.waitForTimeout(1000)
    await page.locator(locators.articleSummary).pressSequentially(article.Summary!);
    await page.waitForTimeout(1000)

    await page.locator(locators.articleBody).pressSequentially(article.Body!);
    await page.locator(locators.articleTags).pressSequentially(article.Tags!);
    // await page.waitForTimeout(1000)


    await page.locator(locators.publishArticleBtn).click()
    await page.waitForTimeout(1000)
}