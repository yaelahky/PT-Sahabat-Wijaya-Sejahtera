import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const baseUrl = process.env.VISUAL_CHECK_URL ?? "http://127.0.0.1:3000";

const results = [];
for (const width of [375, 768, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "no-preference" });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const metrics = await page.evaluate(() => {
    const overflow = [...document.querySelectorAll("body *")]
      .filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.right > document.documentElement.clientWidth + 1 || rect.left < -1;
      })
      .slice(0, 8)
      .map((node) => ({ tag: node.tagName, class: node.className, right: Math.round(node.getBoundingClientRect().right) }));
    return {
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1Count: document.querySelectorAll("h1").length,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      overflowCandidates: overflow,
      serviceCardCount: document.querySelectorAll("[data-service-card]").length,
      serviceCardsWithLists: document.querySelectorAll("[data-service-card] ul").length,
      consultationForms: document.querySelectorAll("#konsultasi form").length,
    };
  });
  await page.screenshot({ path: `/private/tmp/sws-${width}.png`, fullPage: false });

  if (width < 1024) {
    await page.getByRole("button", { name: "Buka menu navigasi" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    metrics.mobileSheetVisible = await dialog.isVisible();
    metrics.focusInsideSheet = await dialog.evaluate((element) => element.contains(document.activeElement));
    await page.keyboard.press("Escape");
  } else {
    metrics.desktopNavigationVisible = await page.locator('header nav[aria-label="Navigasi utama"]').isVisible();
  }
  if (width === 375 || width === 768 || width === 1440) {
    for (const [selector, name] of [["#layanan", "services"], ["#keunggulan", "advantages"], ["#konsultasi", "consultation"]]) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await section.locator("[data-reveal]").evaluateAll((nodes) => nodes.forEach((node) => node.setAttribute("data-visible", "true")));
      await page.waitForTimeout(250);
      await section.screenshot({ path: `/private/tmp/sws-${name}-${width}.png` });
    }
  }
  results.push(metrics);
  await page.close();
}

const reducedPage = await browser.newPage({ viewport: { width: 375, height: 900 }, reducedMotion: "reduce" });
await reducedPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
const revealOpacity = await reducedPage.locator("[data-reveal]").first().evaluate((element) => getComputedStyle(element).opacity);
results.push({ reducedMotionRevealOpacity: revealOpacity });
await reducedPage.close();

process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
await browser.close();
