import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";

test('no Allure story annotation - ESLint warning', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('annotated with Allure story - no warnings', async ({ page }) => {
  allure.story('JIRA-123')
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
