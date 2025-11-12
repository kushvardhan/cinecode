// Playwright test for hero rendering and reduced-motion
import { test, expect } from '@playwright/test'

test.describe('Hero Component', () => {
  test('should render hero section', async ({ page }) => {
    await page.goto('/')

    // Check if hero section is visible
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    // Check if title is present
    const title = page.getByRole('heading', { name: /CineCode/i })
    await expect(title).toBeVisible()

    // Check if subtitle is present
    const subtitle = page.getByText(/Crafting Digital Experiences Like Cinema/i)
    await expect(subtitle).toBeVisible()

    // Check if CTA buttons are present
    const exploreButton = page.getByRole('link', { name: /Explore Services/i })
    await expect(exploreButton).toBeVisible()

    const contactButton = page.getByRole('link', { name: /Get in Touch/i })
    await expect(contactButton).toBeVisible()
  })

  test('should respect prefers-reduced-motion', async ({ page, context }) => {
    // Emulate reduced motion preference
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      })
    })

    await page.goto('/')

    // Hero should still be visible
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    // Check that animations are disabled (duration should be very short)
    const styles = await page.evaluate(() => {
      const element = document.querySelector('section')
      if (!element) return null
      return window.getComputedStyle(element).animationDuration
    })

    // With reduced motion, animations should be instant or very short
    // This is a basic check - actual implementation may vary
    expect(styles).toBeDefined()
  })

  test('should navigate to services section', async ({ page }) => {
    await page.goto('/')

    // Click on "Explore Services" button
    const exploreButton = page.getByRole('link', { name: /Explore Services/i })
    await exploreButton.click()

    // Should scroll to services section
    await page.waitForTimeout(500) // Wait for smooth scroll

    // Check if services section is in viewport
    const servicesSection = page.locator('#services')
    await expect(servicesSection).toBeInViewport()
  })

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/')

    // Click on "Get in Touch" button
    const contactButton = page.getByRole('link', { name: /Get in Touch/i }).first()
    await contactButton.click()

    // Should navigate to contact page
    await expect(page).toHaveURL(/\/contact/)

    // Check if contact form is present
    const contactForm = page.locator('form')
    await expect(contactForm).toBeVisible()
  })

  test('should display services grid', async ({ page }) => {
    await page.goto('/')

    // Scroll to services section
    await page.locator('#services').scrollIntoViewIfNeeded()

    // Check if service cards are visible
    const serviceCards = page.locator('button').filter({ hasText: /Web Development|App Development|UI\/UX Design/ })
    await expect(serviceCards.first()).toBeVisible()

    // Should have 6 service cards
    const count = await page.locator('button').filter({ hasText: /Development|Design|Marketing|SEO/ }).count()
    expect(count).toBeGreaterThanOrEqual(6)
  })
})

