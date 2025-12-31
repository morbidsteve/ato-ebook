#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { join, dirname } from 'path';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'pdfs');

async function generatePDF() {
  await mkdir(publicDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });

  console.log('Generating PDF for executive-summary from live site...');
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 800 });

  await page.goto('https://ato-ebook-eta.vercel.app/executive-summary', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  await page.addStyleTag({
    content: `
      .print\\:hidden, button, nav, .lg\\:block.w-64, .lg\\:hidden, .mb-8 > a { display: none !important; }
      body { margin: 0 !important; padding: 0 !important; }
      .max-w-4xl { max-width: 100% !important; margin: 0 !important; padding: 2rem !important; }
      h1, h2, h3, h4 { page-break-after: avoid; }
      table, figure, pre { page-break-inside: avoid; }
    `,
  });

  const pdfPath = join(publicDir, 'executive-summary.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.75in', right: '0.75in', bottom: '0.75in', left: '0.75in' },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size: 10px; color: #666; width: 100%; text-align: center; padding: 10px 0;">Executive Summary - ATO in Days</div>',
    footerTemplate: '<div style="font-size: 10px; color: #666; width: 100%; text-align: center; padding: 10px 0;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  });

  console.log('✓ Saved to', pdfPath);
  await browser.close();
  console.log('Done!');
}

generatePDF().catch(console.error);
