import {test, expect} from "../Fixtures/fixture.js"
import Homepage from "../POM/Homepage.js";
import Loginpage from "../POM/Loginpage.js";
import ProjectPage from "../POM/ProjectPage.js";
import { json } from "stream/consumers";
import excel from "exceljs"
import path from "node:path"
import data from "../TestDatas/Env.json"


test.beforeEach(async({page,pom,loginPage})=>{
    const hp = pom[1]
    await page.addLocatorHandler(
        page.getByRole('dialog').filter({ hasText: 'Annot 2.0' }),
        async () => {
        await page.getByRole('button', { name: 'Dismiss launch notice' }).click();
        }
    );
    await hp.projectsidebar.click()
    await hp.verifyprojectname.waitFor({state: 'visible'})
    await hp.verifyprojectname.isVisible()
    await hp.projectpreviewsetting.click()
    await hp.deletebtn.click()
    await hp.deleteproject.click()
})
    test("Client Interaction test", async({loginPage,page,pom})=>{
    test.setTimeout(90_000)
    const lp = pom[0]
    const hp = pom[1]
    
    // await page.pause()
    //case start
    await hp.createnewproject(data.projectname, data.projecturl)
    const pp = pom[2]
    await pp.projectcomment(data.mycom)
    //client interaction
    await pp.share.click()
    await pp.publicaccesstoggle.click()
    await pp.publicaccesstoggletowait.waitFor({state: 'visible'})
    const [clientpage] = await Promise.all([
        page.waitForEvent('popup'),
        pp.clienttab.click()
    ]);
    const frameclient = clientpage.frameLocator("iframe").first();
    const pp2=new ProjectPage(clientpage,frameclient)
    await pp2.fullsize()
    await pp2.floatcomment.click()
    await pp2.replycomment.fill(data.clientcom)
    await pp2.sendcombtn.click()
    await pp2.clientnameinp.fill(data.clientname)
    await pp2.clientnamecontinuebtn.click()
    await pp2.floatcomment.click()
    await pp2.replycomment.fill(data.clientcom)
    await pp2.sendcombtn.click()
    await pp.sharepopoverdonebtn.click()
    await pp.resolvebtn.click()
    await expect.soft(pp2.verifyclientresolved).toBeVisible()
    await page.waitForTimeout(3000)
    await pp.backbtn.click()
})

test("Dashboard comments verification", async({loginPage,page,pom})=>{
    test.setTimeout(90_000)
    const lp = pom[0]
    const hp = pom[1]
    //create project
    await hp.createnewproject(data.projectname, data.projecturl)
    //my comments
    const pp = pom[2]
    await pp.projectcomment(data.myrefcom)    
    await pp.sidebaropenhead.click()
    await expect.soft(pp.verifycomment).toHaveText(data.myrefcom)
    await pp.backbtn.click()
    await hp.dashboardsidebar.click()
    await expect.soft(hp.verifydashboardopen).toHaveText("1")
    await hp.projectsidebar.click()
    await pp.projectpreview.click()
    await pp.viewcomments.click()
    await pp.resolvebtn.click()
    await pp.backbtn.click()
    await hp.dashboardsidebar.click()
    await expect.soft(hp.verifydashboardresolved).toHaveText("1")
})
test("viewport verification", async({loginPage,page,pom})=>{
    test.setTimeout(90_000)
    const lp = pom[0]
    const hp = pom[1]
    //read data from excel
    let book = new excel.Workbook()
    let filePath = path.join(process.cwd(), "TestDatas", "TestData.xlsx");
    await book.xlsx.readFile(filePath);
    let sheet = await book.getWorksheet("Sheet1")
    //create project
    await hp.createnewproject(data.projectname, data.projecturl)
    const pp = pom[2]
    await pp.projectpreview.click()
    await pp.heading.waitFor({state: 'visible'})
    await pp.switchview.click()
    let allelecount=await pp.viewportelements.count()
    let alleleconttxt = await pp.viewportelements.allTextContents();
    await pp.switchview.click()
    
    for (let i = 0; i < allelecount; i++) {
        await pp.switchview.click();
        await pp.viewportelements.nth(i).click();
        let row = await sheet.getRow(i+1)
        let verifysize=row.getCell(2).toString()
        let styleValue = await pp.systemsizevalue.getAttribute("style");
        await expect.soft(styleValue).toContain(verifysize)
    }
    await pp.backbtn.click()
})

test("viewport independent comments", async({loginPage,page,pom})=>{
    test.setTimeout(90_000)
    const lp = pom[0]
    const hp = pom[1]
    //read data from excel
    let book = new excel.Workbook()
    let filePath = path.join(process.cwd(), "TestDatas", "TestData.xlsx");
    await book.xlsx.readFile(filePath);
    let sheet = await book.getWorksheet("Sheet1")
    //create project
    await hp.createnewproject(data.projectname, data.projecturl)
    const pp = pom[2]
    await pp.projectpreview.click()
    await pp.heading.waitFor({state: 'visible'})
    await pp.switchview.click()
    let allelecount=await pp.viewportelements.count()
    let alleleconttxt = await pp.viewportelements.allTextContents();
    await pp.switchview.click()
    
    for (let i = 0; i < allelecount; i++) {
        await pp.switchview.click();
        let deviceName=(await pp.viewportelementstext.nth(i).innerText()).trim()
        await pp.viewportelements.nth(i).click();
        let row = await sheet.getRow(i+1)
        let verifydeviceandtext_fromexcel=row.getCell(3).toString()
        const heading = pp.heading;
        await pp.cursor.click()
        await pp.heading.waitFor({state: 'visible'})
        const box = await heading.boundingBox();
        await pp.comment.click()
        await pp.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await pp.commentcursor.waitFor({state: 'visible'})
        await pp.page.waitForTimeout(5000)
        await pp.page.mouse.down();
        await pp.page.mouse.up();
        await pp.addcominp.fill(verifydeviceandtext_fromexcel)
        await pp.page.waitForTimeout(3000)
        await pp.sendcombtn.click()
        await pp.viewcomments.click()
        let verifydeviceandtext=await page.locator(`//div[@class='flex flex-col gap-2']/descendant::span[text()='${deviceName}']/../../div[last()]/descendant::p/span/span`).innerText()
        await expect.soft(verifydeviceandtext).toContain(verifydeviceandtext_fromexcel)
        await pp.viewcomments.click()
    }
    await pp.backbtn.click()
})