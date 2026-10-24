import {test} from "@playwright/test"
test("test annotaions test 1", async ({browserName, page})=>{
    await page.goto("https://www.amazon.com/");
    console.log(`The width before: ${page.viewportSize().width}`);
    console.log(`The height before: ${page.viewportSize().height}`);
    await page.setViewportSize({width: 1920, height: 1080});
    console.log(`The width after: ${page.viewportSize().width}`);
    console.log(`The height after: ${page.viewportSize().height}`);
    console.log(`Running test on: ${browserName}`);
    console.log(`Page title is: ${await page.title()}`);
    console.log(`Page URL is: ${page.url()}`);
    let time = new Date().getTime();
    await page.screenshot({path: `./Screenshot/ss_${time}.png`});
    await page.locator("//label[contains(., 'Search Amazon')]/following-sibling::input").fill("iphone 15");
    await page.locator("//label[contains(., 'Search Amazon')]/../../following-sibling::div/descendant::input[@type='submit'and @id='nav-search-submit-button']").click();
    await page.screenshot({path: `./Screenshot/ss_${time}.png`});
    // const cookies= await context.cookies();
    // console.log('Page cookies are:',cookies);
    console.log(`Test 1 executed`);
});

test("test annotations test 21", async ({ page, context }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    console.log(`Page title is: ${await page.title()}`);
    const cookies = await context.cookies();
    console.log("Page cookies are:", cookies);
    // console.log("Page cookies:", JSON.stringify(cookies, null, 2));
    console.log("Test 2 executed");
});


test("test annotaions test 3", async ({page})=>{
    await page.goto(skfdjvnoefj)
    console.log(`Test 3 executed`);
});
