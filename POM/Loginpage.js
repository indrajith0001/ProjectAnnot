class Loginpage{
    constructor(page){
        this.page = page
        this.emailinp=page.getByPlaceholder("Email")
        this.pwdinp=page.getByPlaceholder("Password")
        this.lgbtn=page.locator("//button[contains(.,'Log in')]")
    }
    async login(url, email, password){
        await this.page.goto(url)
        await this.emailinp.fill(email)
        await this.pwdinp.fill(password)
        await this.lgbtn.click()
    }
    async fullsize(){
        await this.page.setViewportSize({
            width:1920,
            height:1080
        })
    }

}
export default Loginpage