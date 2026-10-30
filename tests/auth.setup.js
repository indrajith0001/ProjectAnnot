import { test, expect } from "@playwright/test";

test("login and save authentication", async({page})=>{
    await page.goto(process.env.BASE_URL)
    await page.getByPlaceholder("Email").fill(process.env.APP_USERNAME)
    await page.getByPlaceholder("Password").fill(process.env.PASSWORD)
    await page.locator("//button[contains(.,'Log in')]").click()
    await expect(page).toHaveURL("https://app.annot.io/dashboard");

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    })
})