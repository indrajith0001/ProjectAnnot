import {test} from "@playwright/test"
import Homepage from "../POM/Homepage.js";
import Loginpage from "../POM/Loginpage.js";
import ProjectPage from "../POM/ProjectPage.js";
async function scrolltoelement(locator) {
    await locator.scrollIntoViewIfNeeded()
}
test("locators", async({browser})=>{
    let context = await browser.newContext();
    let page =await context.newPage();
    let hp=new Homepage(page)
    let lp=new Loginpage(page)
    // let pp=new ProjectPage(page, frame)
    await page.goto("https://app.spendr.me/login");
    await page.pause()
    await page.waitForTimeout(2000)
    await page.locator("//input[@type='email']").fill("rifazm904@gmail.com")
    await page.waitForTimeout(2000)
    await page.locator("//input[@type='password']").fill("12345678")
    await page.waitForTimeout(2000)
    await page.locator('.button-native').first().click();
    await page.pause()




    await lp.emailinp.fill("indrajith0907@gmail.com")
    await lp.pwdinp.fill("@ProjectRed999")
    await lp.lgbtn.click()
    await hp.projectsidebar.click()
    await hp.projectpreview.click()
    
    const frame = page.frameLocator("iframe").first();
    let pp=new ProjectPage(page, frame)
    const heading = pp.heading;
    await pp.cursor.click();
    await page.waitForTimeout(1000)
    const box = await heading.boundingBox();
    await pp.comment.click()
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(2000)
    await page.mouse.down();
    await page.mouse.up();
    await pp.addcominp.fill("Task about to complete")
    await pp.sendcombtn.click()
    await page.pause()
});
