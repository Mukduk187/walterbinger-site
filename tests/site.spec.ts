import { expect, test } from "@playwright/test";

const lenses = [
  "Hospitality & Care",
  "Craft & Create",
  "Taste & Smell",
  "Systems & Stewardship",
  "Space & Sound",
  "Travel & Movement",
  "Communication & Connection",
  "Exploration & Faith",
] as const;

test("professional doorway opens the source-linked PREP world", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("img", { name: "Walter Binger", exact: true }).first(),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "A larger project is taking shape" })
    .click();

  await expect(page).toHaveURL(/\/universe\/#\/sky$/);
  await page
    .getByRole("button", {
      name: "PREP / PERP Field Tools. Press Space to pin or Enter to explore.",
      exact: true,
    })
    .dispatchEvent("dblclick");

  await expect(page).toHaveURL(/#\/world\/field-tools$/);
  await expect(
    page.getByRole("heading", {
      name: "PREP / PERP Field Tools",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "PREP Beta 1.0 — Complete Field Kit",
      exact: true,
    }),
  ).toHaveAttribute(
    "href",
    "https://docs.google.com/document/d/1d6e135C203qSSBP1gL6vJCGL4j3gItdRGcOuE9wJ1ok/edit",
  );
  await expect(page.locator(".world-resources a")).toHaveCount(5);
});

test("lenses redraw relationships and a world can be entered", async ({
  page,
}) => {
  await page.goto("/universe/#/sky");

  await page
    .getByRole("button", {
      name: "Communication & Connection",
      exact: true,
    })
    .dispatchEvent("click");
  await page
    .getByRole("button", { name: "Exploration & Faith", exact: true })
    .dispatchEvent("click");

  await expect(page.locator(".instrument-reading")).toHaveText("Collaboration");
  await expect(page.locator(".relationship-path.is-visible").first()).toBeVisible();

  const empanadas = page.getByRole("button", {
    name: "Empanadas Son!. Press Space to pin or Enter to explore.",
    exact: true,
  });
  await empanadas.dispatchEvent("dblclick");

  await expect(page).toHaveURL(/#\/world\/empanadas-son$/);
  await expect(
    page.getByRole("heading", { name: "Empanadas Son!", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('[data-node-id="empanadas-son"] .artifact-orbit'),
  ).toHaveCount(5);
});

test("the field-tools star opens its expandable world and returns to the sky", async ({
  page,
}) => {
  await page.goto("/universe/#/sky");

  await page
    .getByRole("button", {
      name: "PREP / PERP Field Tools. Press Space to pin or Enter to explore.",
      exact: true,
    })
    .dispatchEvent("dblclick");

  await expect(page).toHaveURL(/#\/world\/field-tools$/);
  await expect(
    page.getByRole("heading", {
      name: "PREP / PERP Field Tools",
      exact: true,
    }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Return to the sky", exact: true })
    .dispatchEvent("click");
  await expect(page).toHaveURL(/#\/sky$/);
});

test("all spectra converge into the Snow Globe", async ({ page }) => {
  await page.goto("/universe/#/sky");

  for (const lens of lenses) {
    await page
      .getByRole("button", { name: lens, exact: true })
      .dispatchEvent("click");
  }

  await expect(page).toHaveURL(/#\/convergence$/);
  await page
    .getByRole("button", { name: "Skip", exact: true })
    .dispatchEvent("click");
  await expect(page).toHaveURL(/#\/snow-globe$/);
  await expect(page.getByRole("region", { name: "Snow Globe" })).toBeVisible();

  await page
    .getByRole("button", {
      name: "Return to PREP / PERP Field Tools",
      exact: true,
    })
    .dispatchEvent("click");
  await expect(page).toHaveURL(/#\/world\/field-tools$/);
  await expect(
    page.locator('.lens-control[aria-pressed="true"]'),
  ).toHaveCount(0);
});
