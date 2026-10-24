import {test} from "@playwright/test"
test.describe("test annotaions test main", async ()=>{
test("test annotaions test 2", async ({page})=>{
    test.setTimeout(5000);
    await page.goto("https://www.amazon.com/");
    console.log(`Test 2 executed`);
    
    
});

test("test annotaions test 3", async ({page})=>{
    await page.goto("https://www.amazon.com/");
    console.log(`Test 3 executed`);
});
});