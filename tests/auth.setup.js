import { test, expect } from "@playwright/test";

test("login and save authentication", async({page})=>{
    await page.goto("https://app.annot.io/")
    await page.getByPlaceholder("Email").fill("indrajith0907@gmail.com")
    await page.getByPlaceholder("Password").fill("@ProjectRed999")
    await page.locator("//button[contains(.,'Log in')]").click()
    await expect(page).toHaveURL("https://app.annot.io/dashboard");

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    })
})