/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

describe('H1 Text', () => {
  test('h1 loads correctly in homepage', async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });

    await page.goto('http://localhost:8080/');
    await page.waitForSelector('#welcome');

    const html = await page.$eval('#welcome', (e) => e.innerHTML);
    expect(html).toBe('Welcome Home');

    browser.close();
  }, 16000);
});

describe('product landing page', () => {
  test('loads QA Section', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
    });
    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });

    await page.goto('http://localhost:8080/products/1');
    await page.waitForSelector('#questions-answers');

    const html = await page.$eval('#questions-answers', (e) => e.innerHTML);
    console.log(html);
    expect(html).toBe('QUESTIONS & ANSWERS');

    browser.close();
  }, 16000);
});
