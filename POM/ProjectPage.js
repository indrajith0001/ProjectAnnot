import { expect } from "@playwright/test"
class ProjectPage{
    constructor(page, frame){
        this.page=page
        this.cursor=page.getByLabel("Browse")
        this.comment=page.getByLabel("Comment", { exact: true })
        this.switchview=page.getByLabel("Desktop")
        this.refreshprojecrt=page.getByLabel("Refresh page")
        this.septab=page.getByLabel("Open in new tab")
        this.viewcomments=page.getByLabel("Comments")
        this.notifications=page.getByLabel("Notifications")
        this.share=page.getByLabel("Share")
        this.backbtn=page.getByLabel("Back")
        this.addcominp=page.getByPlaceholder("Add a comment")
        this.sendcombtn=page.getByLabel("Send")
        this.heading=frame.locator("//div[@data-framer-name='Social Proof Wrapper']");
        this.projectpreview=page.locator("//img[contains(@alt, 'preview')]")
        this.commentboxsetting=page.locator("//div[@class='flex shrink-0 items-center gap-2']/div/button")
        this.commentboxdelete=page.locator("//div[@class='flex shrink-0 items-center gap-2']/div/div/button[last()]")
        this.commentboxfinaldel=page.locator("//div[@class='flex min-h-0 flex-col gap-1 overflow-y-auto px-1 pb-1']/descendant::button[last()]")
        this.verifycomment=page.locator("//div[@class='border-0']/descendant::span[last()]")
        this.publicaccesstoggle=page.locator("//span[text()='Public Access']/../../button")
        this.publicaccesstoggletowait=page.locator("//span[text()='Public Access']/../../button[@aria-checked='true']")
        this.clienttab=page.locator("//button[@title='Open share link']")
        this.floatcomment=frame.locator("//div[@class='__annot_marker']")
        this.parentfloatcom=frame.locator('.__annot_marker')
        this.replycomment=page.getByPlaceholder("Reply or @mention")
        this.sharepopoverdonebtn=page.locator("//button[text()='Done']")
        this.resolvebtn=page.locator("//button[@title='Resolve']")
        this.verifyclientresolved=page.getByLabel("Reopen")
        this.clientnameinp=page.getByPlaceholder("John Smith")
        this.clientnamecontinuebtn=page.getByText("Continue")
        this.commentcursor=frame.locator("//body[contains(@style,'pointer !important')]")
        this.moreactionsinsidebar=page.locator("//button[@aria-label='More actions']")
        this.replycommentinsidebar=page.locator("//button[text()='Reply']")
        this.sidebaropenhead=page.locator("//button[text()='Open']")
    }
        async projectcomment(com){
            await this.projectpreview.click()
            const heading = this.heading;
            await this.cursor.click()
            await this.heading.waitFor({state: 'visible'})
            const box = await heading.boundingBox();
            console.log("Box value:", box);
            await this.comment.click()
            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await this.commentcursor.waitFor({state: 'visible'})
            await this.page.waitForTimeout(3000)
            await this.page.mouse.down();
            await this.page.mouse.up();
            await this.addcominp.fill(com)
            await this.sendcombtn.click()
            await this.viewcomments.click()
            await expect.soft(this.verifycomment).toHaveText(com)
            
    }
    async clientinteraction(){
        await this.share.click()
        await this.publicaccesstoggle.click()
        await this.publicaccesstoggletowait.waitFor({state: 'visible'})
        const clientpage = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.clienttab.click()
        ]);

    }
    async fullsize(){
    await this.page.setViewportSize({
        width:1920,
        height:1080
    })
}
}
export default ProjectPage