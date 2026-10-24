import {test, expect} from "@playwright/test"
import Homepage from "../POM/Homepage.js";
import Loginpage from "../POM/Loginpage.js";
import ProjectPage from "../POM/ProjectPage.js";
import fs from "fs"
import { json } from "stream/consumers";
let datafiles = fs.readFileSync("C:/Playwright/TestDatas/Env.json")
let data = JSON.parse(datafiles)

test("Client Interaction test", async({browser})=>{
    let context = await browser.newContext()
    let page = await context.newPage()
    let lp = new Loginpage(page)
    let hp = new Homepage(page)

    //set full screen
    await lp.fullsize()

    //login to the application
    await lp.login(data.url, data.email, data.password)

    //case start
    await hp.createnewproject(data.projectname, data.projecturl)

    //enter the project - comment
    const frame = page.frameLocator("iframe").first();
    let pp=new ProjectPage(page, frame)
    await pp.projectcomment(data.mycom)

    //client interaction
    await pp.share.click()
    await pp.publicaccesstoggle.click()
    await pp.publicaccesstoggletowait.waitFor({state: 'visible'})
    const [clientpage] = await Promise.all([
        context.waitForEvent('page'),
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
})


test.only("Dashboard comments verification", async({browser})=>{
    let context = await browser.newContext()
    let page = await context.newPage()
    let lp=new Loginpage(page)
    let hp=new Homepage(page)

    //login
    await lp.login(data.url, data.email, data.password)

    //fullscreen
    await lp.fullsize()

    //create project
    await hp.createnewproject(data.projectname, data.projecturl)

    //my comments
    const frame= page.frameLocator("iframe").first()
    let pp=new ProjectPage(page, frame)
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