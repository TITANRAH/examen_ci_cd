import { test, expect } from "@playwright/test";

test.describe("Login Flow - Acceptance Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form correctly", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show error for invalid email format", async ({ page }) => {
    await page.fill('input[type="email"]', "invalid-email");
    await page.fill('input[type="password"]', "admin");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Email inválido")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.fill('input[type="email"]', "wrong@admin.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Credenciales incorrectas")).toBeVisible();
  });

  test("should successfully login with valid credentials", async ({ page }) => {
    await page.fill('input[type="email"]', "admin@admin.com");
    await page.fill('input[type="password"]', "admin");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("text=¡Bienvenido al Dashboard!")).toBeVisible();
  });

  test("should navigate to dashboard after successful login", async ({
    page,
  }) => {
    await page.fill('input[type="email"]', "admin@admin.com");
    await page.fill('input[type="password"]', "admin");
    await page.click('button[type="submit"]');

    await expect(page.locator("h1")).toContainText("Dashboard");
    await expect(page.locator("text=Usuario: admin@admin.com")).toBeVisible();
  });
});

test.describe("Navigation - Acceptance Tests", () => {
  test("should navigate between pages correctly", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("Bienvenido");

    await page.click("text=Iniciar Sesión");
    await expect(page).toHaveURL("/login");

    await page.click("text=Inicio");
    await expect(page).toHaveURL("/");
  });

  test("should protect dashboard route", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL("/login");
  });
});
