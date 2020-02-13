/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

describe('H1 Text', () => {
  test('h1 loads correctly in homepage', async () => {
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

    await page.goto('http://localhost:8080/');
    await page.waitForSelector('#welcome');

    const html = await page.$eval('#welcome', (e) => e.innerHTML);
    expect(html).toBe('Welcome Home');

    browser.close();
  }, 16000);
});

xdescribe('price id renders', () => {
  test('price id renders in product information', async () => {
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
    await page.waitForSelector('#price');

    const html = await page.$eval('#price', (e) => e.innerHTML);
    expect(html.contains('$')).toBe(true);

    browser.close();
  }, 16000);
});

xdescribe('product landing page', () => {
  test('loads QA Section', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      // slowMo: 500,
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
    await page.waitForSelector('#questions-answers-title');

    const html = await page.$eval('#questions-answers-title', (e) => e.innerHTML);
    expect(html).toBe('QUESTIONS & ANSWERS');

    browser.close();
  }, 16000);
});
