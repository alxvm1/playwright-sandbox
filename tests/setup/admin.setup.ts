import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { env } from '@config/env';

setup('Аутентификация с ролью администратора', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(env.admin.email, env.admin.password);

  await expect(page).toHaveURL(/admin/);
  await page.context().storageState({ path: env.storage.admin });
});