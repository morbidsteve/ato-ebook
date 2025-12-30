#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'pdfs');

const PAGES_TO_PDF = [
  {
    url: '/executive-summary',
    filename: 'executive-summary.pdf',
    title: 'Executive Summary - ATO in Days',
  },
];

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error('Server failed to start');
}

async function generatePDFs() {
  // Ensure output directory exists
  await mkdir(publicDir, { recursive: true });

  // Start the Next.js dev server
  console.log('Starting Next.js server...');
  const server = spawn('npm', ['run', 'dev'], {
    cwd: join(__dirname, '..'),
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  let serverOutput = '';
  server.stdout.on('data', (data) => {
    serverOutput += data.toString();
  });
  server.stderr.on('data', (data) => {
    serverOutput += data.toString();
  });

  try {
    // Wait for server to be ready
    console.log('Waiting for server to start...');
    await waitForServer('http://localhost:3000');
    console.log('Server is ready!');

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
    });

    for (const page of PAGES_TO_PDF) {
      console.log(`Generating PDF for ${page.url}...`);

      const browserPage = await browser.newPage();

      // Set viewport for consistent rendering
      await browserPage.setViewport({
        width: 1200,
        height: 800,
      });

      // Navigate to page (increased timeout for long documents)
      await browserPage.goto(`http://localhost:3000${page.url}`, {
        waitUntil: 'networkidle0',
        timeout: 60000,
      });

      // Hide elements we don't want in PDF
      await browserPage.addStyleTag({
        content: `
          /* Hide navigation and interactive elements */
          .print\\:hidden,
          button,
          nav,
          .lg\\:block.w-64,
          .lg\\:hidden,
          .mb-8 > a,
          [class*="Back to"] {
            display: none !important;
          }

          /* Reset margins for PDF */
          body {
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Ensure content is full width */
          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 2rem !important;
          }

          /* Better page breaks */
          h1, h2, h3, h4 {
            page-break-after: avoid;
          }

          table, figure, pre {
            page-break-inside: avoid;
          }
        `,
      });

      // Generate PDF
      const pdfPath = join(publicDir, page.filename);
      await browserPage.pdf({
        path: pdfPath,
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.75in',
          right: '0.75in',
          bottom: '0.75in',
          left: '0.75in',
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; color: #666; width: 100%; text-align: center; padding: 10px 0;">
            ${page.title}
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; color: #666; width: 100%; text-align: center; padding: 10px 0;">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </div>
        `,
      });

      console.log(`  ✓ Saved to ${pdfPath}`);
      await browserPage.close();
    }

    await browser.close();
    console.log('\nAll PDFs generated successfully!');
  } finally {
    // Kill the server
    server.kill('SIGTERM');
  }
}

generatePDFs().catch((error) => {
  console.error('Error generating PDFs:', error);
  process.exit(1);
});
