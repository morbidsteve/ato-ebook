#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { mkdir, writeFile, readFile, unlink } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tempDir = join(__dirname, '..', '.temp-slides');
const publicDir = join(__dirname, '..', 'public');

async function generatePPTX() {
  // Create temp directory for screenshots
  await mkdir(tempDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to 16:9 aspect ratio at high resolution
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to presentation...');
  await page.goto('https://ato-ebook-eta.vercel.app/presentation', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // Wait for slides to load
  await page.waitForSelector('[class*="aspect-"]', { timeout: 10000 });

  // Get total number of slides
  const totalSlides = await page.evaluate(() => {
    const counter = document.querySelector('[class*="text-slate-400"]');
    if (counter) {
      const match = counter.textContent?.match(/\/\s*(\d+)/);
      return match ? parseInt(match[1]) : 14;
    }
    return 14;
  });

  console.log(`Found ${totalSlides} slides`);

  const screenshots = [];

  for (let i = 0; i < totalSlides; i++) {
    console.log(`Capturing slide ${i + 1}/${totalSlides}...`);

    // Find and screenshot just the slide area (not controls)
    const slideElement = await page.$('[class*="aspect-"][class*="relative"]');
    if (slideElement) {
      const screenshotPath = join(tempDir, `slide-${i + 1}.png`);
      await slideElement.screenshot({ path: screenshotPath });
      screenshots.push(screenshotPath);
    }

    // Go to next slide if not last
    if (i < totalSlides - 1) {
      await page.keyboard.press('ArrowRight');
      await new Promise(r => setTimeout(r, 500)); // Wait for transition
    }
  }

  await browser.close();
  console.log('Screenshots captured!');

  // Now create the PowerPoint
  console.log('Creating PowerPoint...');
  const PptxGenJS = (await import('pptxgenjs')).default;
  const pptx = new PptxGenJS();

  pptx.author = 'ATO in Days';
  pptx.title = 'Modernizing Federal Authorization';
  pptx.subject = 'Executive Brief for Leadership';
  pptx.layout = 'LAYOUT_16x9';

  for (let i = 0; i < screenshots.length; i++) {
    const slide = pptx.addSlide();

    // Read the screenshot and convert to base64
    const imageBuffer = await readFile(screenshots[i]);
    const base64Image = imageBuffer.toString('base64');

    // Add the screenshot as a full-slide image
    slide.addImage({
      data: `image/png;base64,${base64Image}`,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
    });
  }

  // Save the PowerPoint
  const pptxPath = join(publicDir, 'ato-executive-brief.pptx');
  await pptx.writeFile({ fileName: pptxPath });
  console.log(`✓ PowerPoint saved to ${pptxPath}`);

  // Clean up temp files
  console.log('Cleaning up...');
  for (const screenshot of screenshots) {
    await unlink(screenshot);
  }
  await unlink(tempDir).catch(() => {}); // Ignore if not empty

  console.log('Done!');
}

generatePPTX().catch(console.error);
