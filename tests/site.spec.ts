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

test("professional doorway opens the PREP field kit", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Walter Binger", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "PREP / PERP Field Tools", exact: true })
    .dispatchEvent("click");

  await expect(page).toHaveURL(/#\/world\/field-tools$/);
  await expect(
    page.getByRole("heading", {
      name: "PREP / PERP Field Tools",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "PREP 07 — Five-Minute Learning Huddle",
      exact: true,
    }),
  ).toHaveAttribute(
    "href",
    "https://docs.google.com/document/d/1QXvMKMcMz_hb1AcOlsMiotSYD75QK8_o1iaQwXQD3DU/edit",
  );
  await expect(page.locator(".world-resources a")).toHaveCount(4);
});

test("lenses redraw relationships and a world can be entered", async ({
  page,
}) => {
  await page.goto("/#/sky");

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

test("all spectra converge into the Snow Globe", async ({ page }) => {
  await page.goto("/#/sky");

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
  await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0);
});
