const { test } = require('@playwright/test');

test("Fixture", async ({ browserName, browser, page }) => {
    // let context = await browser.newContext();
    // let page = await context.newPage();
    console.log(` the browser name: ${browserName}`);
    await page.goto("https://bsky.app/feeds");
});