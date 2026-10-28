import 'dotenv/config';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test'
dotenv.config({ path: '.env.api' })

test('verify api login', async ({ request }) => {
  const response = await request.post(
    process.env.LOGIN_API_URL,
    {
    headers: {
        Accept: process.env.SUPABASE_ANON_KEY
    },
      data: {
        grant_type: 'password',
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
      }
    }
  )

    // Verify response status
    expect(response.status()).toBe(200);

    // Parse JSON response
    const body = await response.json();

    // Verify authentication response
    expect(body.access_token).toBeTruthy();
    expect(body.user.email).toBe(process.env.TEST_USERNAME);

    console.log('Login API test passed');
    console.log('Authenticated user:', body.user.email);
})