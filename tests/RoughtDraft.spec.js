
import { test } from "@playwright/test";

test("Test-1", async ({ browser }) => {
    const browseropen = await browser.newContext();
    const page = await browseropen.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://covertnest.com/");
});
