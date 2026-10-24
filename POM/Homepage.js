import {expect} from "@playwright/test"
class Homepage{
    constructor(page){
        this.page = page;
        this.projectsidebar=page.locator("//a[@aria-label='Projects']")
        this.notifisidebar=page.locator("//a[@aria-label='Notifications']")
        this.integrationssidebar=page.locator("//a[@aria-label='Integrations']")
        this.foldersidebar=page.locator("//a[@aria-label='Folders']")
        this.accticon=page.locator("//div[@class='relative']/descendant::div[contains(., 'I')]")
        this.dashboardsidebar=page.locator("//a[@aria-label='Dashboard']")
        this.notifibtn=page.locator("//button[@aria-label='Notifications']")
        this.settingsbtn=page.locator("//a[@aria-label='Settings']")
        this.addproject= page.getByText("New Project")
        this.projectpreviewsetting=page.locator("(//div[@class='relative']/descendant::button)[2]")
        this.deletebtn=page.locator("//button[.='Delete']")
        this.deleteproject=page.locator("//button[text()='Delete Project']")
        this.verifydashboardopen=page.locator("//span[text()='Open']/following-sibling::span")
        this.verifydashboardresolved=page.locator("//span[text()='Resolved']/following-sibling::span")
        this.verifywebsite=page.locator("//button/descendant::span[text()='Website']")


        this.projectnameinp=page.getByPlaceholder("My Website")
        this.projecturlinp=page.getByPlaceholder("https://example.com")
        this.createprojectbtn= page.getByText("Create Project")

        this.verifyprojectname=page.locator("//a[@class='block truncate text-base font-medium text-black']")
        this.verifyurlname=page.locator("//p[@class='mt-[2px] truncate text-xs text-text-tertiary']")
    }

    async deleteProj() {
        if(await this.verifyprojectname.isVisible()){
            await this.projectpreviewsetting.click()
            await this.deletebtn.click()
            await this.deleteproject.click()
        }
    }
    //create the project
    async createnewproject(pname, purl){
            await this.projectsidebar.click()
            await this.verifyprojectname.waitFor({state: 'visible'})
            await this.deleteProj()
            await this.addproject.click()
            await expect.soft(this.verifywebsite).toBeVisible()
            await this.projectnameinp.fill(pname)
            await this.projecturlinp.fill(purl)
            await this.createprojectbtn.click()
            await expect.soft(this.verifyprojectname).toHaveText(pname)
            await expect.soft(this.verifyurlname).toHaveText(purl)
            
    }
}
export default Homepage