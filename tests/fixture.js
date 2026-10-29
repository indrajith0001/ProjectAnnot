import { test as base, expect } from "@playwright/test";
import Loginpage from "../POM/Loginpage.js";
import Homepage from "../POM/Homepage.js";
import ProjectPage from "../POM/ProjectPage.js";
import data from "../TestDatas/Env.json"



export const test = base.extend({
    loginPage: async ({page}, use) => {
        const lp = new Loginpage(page)
        const hp = new Homepage(page);
        await expect(async () => {
            await page.goto(data.url, { waitUntil: 'domcontentloaded' });
        }).toPass({ intervals: [1_000, 2_000, 5_000], timeout: 30_000 });
        await lp.fullsize()
        await lp.emailinp.fill(data.email)
        await lp.pwdinp.fill(data.password)
        await lp.lgbtn.click()
        await use();
        await hp.accticon.click()
        await hp.signoutbtn.click()
    },
    pom: async ({page}, use) => {
        const lp = new Loginpage(page);
        const hp = new Homepage(page);
        const frame = page.frameLocator("iframe").first();
        const pp = new ProjectPage(page, frame);
        const pom=[lp,hp,pp]
        await use(pom)
    }
});
export {expect} 