#!/usr/bin/env node

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generatePPTX() {
  const PptxGenJS = (await import('pptxgenjs')).default;
  const pptx = new PptxGenJS();

  // Presentation settings
  pptx.author = 'ATO in Days';
  pptx.title = 'Modernizing Federal Authorization';
  pptx.subject = 'Executive Brief for Leadership';
  pptx.layout = 'LAYOUT_16x9';

  // Define master slides / color scheme
  const COLORS = {
    navy: '1e3a5f',
    navyDark: '0f2744',
    teal: '0d9488',
    tealLight: '14b8a6',
    white: 'FFFFFF',
    offWhite: 'f8fafc',
    slate100: 'f1f5f9',
    slate200: 'e2e8f0',
    slate600: '475569',
    slate700: '334155',
    slate800: '1e293b',
    slate900: '0f172a',
    red: 'dc2626',
    redLight: 'fecaca',
    green: '16a34a',
    greenLight: 'bbf7d0',
    amber: 'd97706',
    amberLight: 'fde68a',
  };

  // Slide dimensions (in inches, 16:9)
  const W = 10;
  const H = 5.625;

  // Helper to create gradient-like effect with shapes
  const addDarkBackground = (slide) => {
    slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: COLORS.slate900 } });
    // Add subtle accent shapes
    slide.addShape('rect', { x: 0, y: H - 0.1, w: W, h: 0.1, fill: { color: COLORS.teal } });
  };

  const addLightBackground = (slide) => {
    slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: COLORS.offWhite } });
    slide.addShape('rect', { x: 0, y: 0, w: W, h: 0.08, fill: { color: COLORS.navy } });
    slide.addShape('rect', { x: 0, y: H - 0.08, w: W, h: 0.08, fill: { color: COLORS.teal } });
  };

  const addGradientBackground = (slide) => {
    slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: COLORS.navy } });
    slide.addShape('rect', { x: 0, y: H - 0.15, w: W, h: 0.15, fill: { color: COLORS.teal } });
  };

  const addAccentBackground = (slide) => {
    slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: COLORS.slate800 } });
    slide.addShape('rect', { x: 0, y: 0, w: 0.08, h: H, fill: { color: COLORS.teal } });
    slide.addShape('rect', { x: 0, y: H - 0.08, w: W, h: 0.08, fill: { color: COLORS.teal } });
  };

  // Add slide number
  const addSlideNumber = (slide, num, total, isDark) => {
    slide.addText(`${num} / ${total}`, {
      x: W - 1, y: H - 0.4, w: 0.8, h: 0.3,
      fontSize: 9, color: isDark ? COLORS.slate200 : COLORS.slate600, align: 'right',
    });
  };

  // ============================================
  // SLIDE 1: Title Slide
  // ============================================
  let slide = pptx.addSlide();
  addDarkBackground(slide);

  slide.addText('Modernizing Federal Authorization', {
    x: 0.5, y: 1.3, w: W - 1, h: 0.8,
    fontSize: 40, bold: true, color: COLORS.white, align: 'center',
  });
  slide.addText('From Fragmented Compliance to Continuous ATO', {
    x: 0.5, y: 2.1, w: W - 1, h: 0.5,
    fontSize: 20, color: COLORS.teal, align: 'center',
  });
  slide.addText('Executive Brief for Leadership', {
    x: 0.5, y: 2.8, w: W - 1, h: 0.4,
    fontSize: 14, color: COLORS.slate200, align: 'center',
  });

  // Stats row
  const stats1 = [
    { value: '80%', label: 'Faster ATO' },
    { value: '$4.2M', label: 'Annual Savings' },
    { value: '47', label: 'Programs Unified' },
  ];
  const statW = 2.5;
  const statStartX = (W - stats1.length * statW) / 2;
  stats1.forEach((stat, i) => {
    const x = statStartX + i * statW;
    slide.addShape('roundRect', { x: x + 0.1, y: 3.6, w: statW - 0.2, h: 1.1, fill: { color: COLORS.slate800 }, line: { color: COLORS.teal, pt: 1.5 } });
    slide.addText(stat.value, { x: x + 0.1, y: 3.7, w: statW - 0.2, h: 0.55, fontSize: 28, bold: true, color: COLORS.teal, align: 'center' });
    slide.addText(stat.label, { x: x + 0.1, y: 4.25, w: statW - 0.2, h: 0.35, fontSize: 10, color: COLORS.slate200, align: 'center' });
  });
  addSlideNumber(slide, 1, 14, true);
  slide.addNotes('Welcome leadership. This brief covers our current authorization challenges and a path forward.');

  // ============================================
  // SLIDE 2: The Current Reality
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('The Current Reality', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });
  slide.addText('Every Program Is an Island', { x: 0.5, y: 0.85, w: W - 1, h: 0.4, fontSize: 16, color: COLORS.teal });

  // Hub diagram - center circle with satellites
  const hubCenterX = W / 2;
  const hubCenterY = 2.3;
  slide.addShape('ellipse', { x: hubCenterX - 0.7, y: hubCenterY - 0.4, w: 1.4, h: 0.8, fill: { color: COLORS.red } });
  slide.addText('Siloed\nApproach', { x: hubCenterX - 0.7, y: hubCenterY - 0.35, w: 1.4, h: 0.7, fontSize: 9, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });

  const programs = ['Program A', 'Program B', 'Program C', 'Program D'];
  const angles = [-45, 45, -135, 135];
  programs.forEach((prog, i) => {
    const angle = angles[i] * Math.PI / 180;
    const dist = 1.5;
    const px = hubCenterX + dist * Math.cos(angle) - 0.55;
    const py = hubCenterY + dist * Math.sin(angle) * 0.6 - 0.25;
    slide.addShape('roundRect', { x: px, y: py, w: 1.1, h: 0.5, fill: { color: COLORS.slate700 } });
    slide.addText(prog, { x: px, y: py + 0.12, w: 1.1, h: 0.26, fontSize: 9, color: COLORS.white, align: 'center' });
    // Dashed line (simulated with small rect)
    slide.addShape('line', { x: hubCenterX, y: hubCenterY, w: 0, h: 0, line: { color: COLORS.red, pt: 1, dashType: 'dash' } });
  });

  // Stats row
  const stats2 = [
    { value: '$2-5M', label: 'Per Program Infrastructure' },
    { value: '12-18', label: 'Months to ATO' },
    { value: '0%', label: 'Control Reuse' },
  ];
  stats2.forEach((stat, i) => {
    const x = statStartX + i * statW;
    slide.addShape('roundRect', { x: x + 0.1, y: 3.8, w: statW - 0.2, h: 1.0, fill: { color: COLORS.slate800 }, line: { color: COLORS.teal, pt: 1.5 } });
    slide.addText(stat.value, { x: x + 0.1, y: 3.9, w: statW - 0.2, h: 0.5, fontSize: 26, bold: true, color: COLORS.teal, align: 'center' });
    slide.addText(stat.label, { x: x + 0.1, y: 4.4, w: statW - 0.2, h: 0.3, fontSize: 9, color: COLORS.white, align: 'center' });
  });
  addSlideNumber(slide, 2, 14, false);
  slide.addNotes('Emphasize the duplication happening across the organization.');

  // ============================================
  // SLIDE 3: The Hidden Cost
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('The Hidden Cost', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });

  // Two-column comparison
  const colW = 4.2;
  const colY = 1.1;
  const colH = 2.8;

  // Left column - What We Pay For
  slide.addShape('roundRect', { x: 0.5, y: colY, w: colW, h: colH, fill: { color: COLORS.redLight } });
  slide.addText('What We Pay For', { x: 0.7, y: colY + 0.15, w: colW - 0.4, h: 0.35, fontSize: 16, bold: true, color: COLORS.red });
  const leftItems = ['Duplicate hardware purchases', 'Redundant VM infrastructure', 'Separate container runtimes', 'Individual security tools'];
  leftItems.forEach((item, i) => {
    slide.addText('✗  ' + item, { x: 0.7, y: colY + 0.6 + i * 0.5, w: colW - 0.4, h: 0.45, fontSize: 12, color: COLORS.slate700 });
  });

  // Right column - What We Get
  slide.addShape('roundRect', { x: W - colW - 0.5, y: colY, w: colW, h: colH, fill: { color: COLORS.redLight } });
  slide.addText('What We Get', { x: W - colW - 0.3, y: colY + 0.15, w: colW - 0.4, h: 0.35, fontSize: 16, bold: true, color: COLORS.red });
  const rightItems = ['Incompatible systems', 'No shared controls', 'Manual everything', 'Endless re-work'];
  rightItems.forEach((item, i) => {
    slide.addText('✗  ' + item, { x: W - colW - 0.3, y: colY + 0.6 + i * 0.5, w: colW - 0.4, h: 0.45, fontSize: 12, color: COLORS.slate700 });
  });

  // Highlight box
  slide.addShape('roundRect', { x: 0.8, y: 4.1, w: W - 1.6, h: 0.65, fill: { color: COLORS.amberLight } });
  slide.addText("The real cost isn't hardware—it's the millions spent on labor that could be automated", {
    x: 0.8, y: 4.2, w: W - 1.6, h: 0.5, fontSize: 13, bold: true, color: COLORS.amber, align: 'center',
  });
  addSlideNumber(slide, 3, 14, false);
  slide.addNotes('Labor costs are the hidden expense leadership often underestimates.');

  // ============================================
  // SLIDE 4: Authorization Chaos
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('Authorization Chaos', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });
  slide.addText('Why Every ATO Takes 18 Months', { x: 0.5, y: 0.85, w: W - 1, h: 0.4, fontSize: 16, color: COLORS.teal });

  // Flow diagram
  const flowItems = ['New System', 'Custom Docs', 'Manual Evidence', 'Long Review', 'Finally ATO', 'Immediately Stale'];
  const flowW = 1.35;
  const flowStartX = (W - flowItems.length * flowW - (flowItems.length - 1) * 0.15) / 2;
  const flowY = 1.8;
  flowItems.forEach((item, i) => {
    const x = flowStartX + i * (flowW + 0.15);
    slide.addShape('roundRect', { x, y: flowY, w: flowW, h: 0.65, fill: { color: COLORS.slate700 } });
    slide.addText(item, { x, y: flowY + 0.18, w: flowW, h: 0.35, fontSize: 10, color: COLORS.white, align: 'center' });
    if (i < flowItems.length - 1) {
      slide.addText('→', { x: x + flowW, y: flowY + 0.1, w: 0.15, h: 0.45, fontSize: 16, color: COLORS.teal, align: 'center' });
    }
  });

  // Warning box
  slide.addShape('roundRect', { x: 1.5, y: 3.0, w: W - 3, h: 1.1, fill: { color: COLORS.redLight } });
  slide.addText('⚠  The Vicious Cycle', { x: 1.7, y: 3.1, w: W - 3.4, h: 0.4, fontSize: 14, bold: true, color: COLORS.red });
  slide.addText('Each assessment starts from scratch, even when systems share 80%+ of their architecture', {
    x: 1.7, y: 3.5, w: W - 3.4, h: 0.5, fontSize: 12, color: COLORS.slate700,
  });
  addSlideNumber(slide, 4, 14, false);
  slide.addNotes('The lack of standardization is killing efficiency.');

  // ============================================
  // SLIDE 5: There Is a Better Way
  // ============================================
  slide = pptx.addSlide();
  addGradientBackground(slide);

  slide.addText('There Is a Better Way', { x: 0.5, y: 1.2, w: W - 1, h: 0.7, fontSize: 38, bold: true, color: COLORS.white, align: 'center' });

  slide.addShape('roundRect', { x: 1.5, y: 2.3, w: W - 3, h: 1.5, fill: { color: COLORS.teal } });
  slide.addText('Platform-Based Continuous Authorization', { x: 1.5, y: 2.5, w: W - 3, h: 0.7, fontSize: 24, bold: true, color: COLORS.white, align: 'center' });
  slide.addText('One platform. Inherited controls. Automated compliance.', { x: 1.5, y: 3.2, w: W - 3, h: 0.5, fontSize: 16, color: COLORS.white, align: 'center' });
  addSlideNumber(slide, 5, 14, true);
  slide.addNotes('This is the key transition moment in the presentation.');

  // ============================================
  // SLIDE 6: The DSOP Advantage
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('The DSOP Advantage', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });
  slide.addText('DevSecOps Platform + Secure Container Runtime', { x: 0.5, y: 0.85, w: W - 1, h: 0.4, fontSize: 16, color: COLORS.teal });

  // Stack diagram
  const stackItems = ['Mission Applications', 'Inherited Controls', 'DSOP Platform', 'Secure Runtime'];
  const stackW = 5;
  const stackX = (W - stackW) / 2;
  const stackH = 0.55;
  const stackColors = [COLORS.teal, COLORS.slate600, COLORS.slate700, COLORS.navy];
  stackItems.forEach((item, i) => {
    slide.addShape('roundRect', { x: stackX, y: 1.4 + i * (stackH + 0.08), w: stackW, h: stackH, fill: { color: stackColors[i] } });
    slide.addText(item, { x: stackX, y: 1.4 + i * (stackH + 0.08) + 0.12, w: stackW, h: 0.35, fontSize: 13, bold: true, color: COLORS.white, align: 'center' });
  });

  // Stats
  const stats6 = [
    { value: '60%', label: 'Controls Inherited' },
    { value: '1x', label: 'Authorize Once' },
    { value: '∞', label: 'Apps Benefit' },
  ];
  stats6.forEach((stat, i) => {
    const x = statStartX + i * statW;
    slide.addShape('roundRect', { x: x + 0.1, y: 3.8, w: statW - 0.2, h: 1.0, fill: { color: COLORS.slate800 }, line: { color: COLORS.teal, pt: 1.5 } });
    slide.addText(stat.value, { x: x + 0.1, y: 3.9, w: statW - 0.2, h: 0.5, fontSize: 26, bold: true, color: COLORS.teal, align: 'center' });
    slide.addText(stat.label, { x: x + 0.1, y: 4.4, w: statW - 0.2, h: 0.3, fontSize: 9, color: COLORS.white, align: 'center' });
  });
  addSlideNumber(slide, 6, 14, false);
  slide.addNotes('The 60% inheritance is a conservative estimate based on typical NIST 800-53 mappings.');

  // ============================================
  // SLIDE 7: Flexible Deployment
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('Flexible Deployment', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });
  slide.addText('One Platform, Your Way', { x: 0.5, y: 0.85, w: W - 1, h: 0.4, fontSize: 16, color: COLORS.teal });

  // Two-column comparison (both green)
  slide.addShape('roundRect', { x: 0.5, y: 1.3, w: colW, h: 2.4, fill: { color: COLORS.greenLight } });
  slide.addText('Managed Service', { x: 0.7, y: 1.4, w: colW - 0.4, h: 0.35, fontSize: 16, bold: true, color: COLORS.green });
  ['Turnkey solution', 'We operate it', 'Fastest deployment', 'Lower overhead'].forEach((item, i) => {
    slide.addText('✓  ' + item, { x: 0.7, y: 1.85 + i * 0.45, w: colW - 0.4, h: 0.4, fontSize: 12, color: COLORS.slate700 });
  });

  slide.addShape('roundRect', { x: W - colW - 0.5, y: 1.3, w: colW, h: 2.4, fill: { color: COLORS.greenLight } });
  slide.addText('Local Installation', { x: W - colW - 0.3, y: 1.4, w: colW - 0.4, h: 0.35, fontSize: 16, bold: true, color: COLORS.green });
  ['Your hardware', 'Air-gap ready', 'Data residency', 'Full control'].forEach((item, i) => {
    slide.addText('✓  ' + item, { x: W - colW - 0.3, y: 1.85 + i * 0.45, w: colW - 0.4, h: 0.4, fontSize: 12, color: COLORS.slate700 });
  });

  // Highlight
  slide.addShape('roundRect', { x: 0.8, y: 3.9, w: W - 1.6, h: 0.65, fill: { color: '99f6e4' } });
  slide.addText('Same hardened runtime. Same security controls. Same compliance inheritance.', {
    x: 0.8, y: 4.0, w: W - 1.6, h: 0.5, fontSize: 13, bold: true, color: COLORS.teal, align: 'center',
  });
  addSlideNumber(slide, 7, 14, false);
  slide.addNotes('Flexibility is key—not one-size-fits-all.');

  // ============================================
  // SLIDE 8: Automation Changes Everything
  // ============================================
  slide = pptx.addSlide();
  addAccentBackground(slide);

  slide.addText('Automation Changes Everything', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.white });

  // Stats row
  const stats8 = [
    { value: 'OSCAL', label: 'Machine-Readable Docs' },
    { value: '24/7', label: 'Evidence Collection' },
    { value: '0', label: 'Manual Updates' },
  ];
  stats8.forEach((stat, i) => {
    const x = statStartX + i * statW;
    slide.addShape('roundRect', { x: x + 0.1, y: 1.1, w: statW - 0.2, h: 1.0, fill: { color: COLORS.slate700 }, line: { color: COLORS.teal, pt: 1.5 } });
    slide.addText(stat.value, { x: x + 0.1, y: 1.2, w: statW - 0.2, h: 0.5, fontSize: 26, bold: true, color: COLORS.teal, align: 'center' });
    slide.addText(stat.label, { x: x + 0.1, y: 1.7, w: statW - 0.2, h: 0.3, fontSize: 9, color: COLORS.white, align: 'center' });
  });

  // Flow diagram
  const flow8 = ['Config Change', 'Auto-Update SSP', 'Collect Evidence', 'Dashboard Ready'];
  const flow8W = 2;
  const flow8StartX = (W - flow8.length * flow8W - (flow8.length - 1) * 0.2) / 2;
  flow8.forEach((item, i) => {
    const x = flow8StartX + i * (flow8W + 0.2);
    slide.addShape('roundRect', { x, y: 2.8, w: flow8W, h: 0.7, fill: { color: COLORS.navy } });
    slide.addText(item, { x, y: 2.95, w: flow8W, h: 0.4, fontSize: 11, color: COLORS.white, align: 'center' });
    if (i < flow8.length - 1) {
      slide.addText('→', { x: x + flow8W, y: 2.85, w: 0.2, h: 0.5, fontSize: 18, color: COLORS.teal, align: 'center' });
    }
  });
  addSlideNumber(slide, 8, 14, true);
  slide.addNotes('Automation is the key to sustainability.');

  // ============================================
  // SLIDE 9: Continuous ATO
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('Continuous ATO', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });
  slide.addText('Authorization That Stays Current', { x: 0.5, y: 0.85, w: W - 1, h: 0.4, fontSize: 16, color: COLORS.teal });

  // Traditional ATO (red)
  slide.addShape('roundRect', { x: 0.5, y: 1.4, w: colW, h: 2.8, fill: { color: COLORS.redLight } });
  slide.addText('Traditional ATO', { x: 0.7, y: 1.5, w: colW - 0.4, h: 0.4, fontSize: 16, bold: true, color: COLORS.red });
  ['Point-in-time snapshot', 'Immediately decays', 'Periodic re-assessment', '18-month cycles'].forEach((item, i) => {
    slide.addText('✗  ' + item, { x: 0.7, y: 2.0 + i * 0.5, w: colW - 0.4, h: 0.45, fontSize: 12, color: COLORS.slate700 });
  });

  // Continuous ATO (green)
  slide.addShape('roundRect', { x: W - colW - 0.5, y: 1.4, w: colW, h: 2.8, fill: { color: COLORS.greenLight } });
  slide.addText('Continuous ATO', { x: W - colW - 0.3, y: 1.5, w: colW - 0.4, h: 0.4, fontSize: 16, bold: true, color: COLORS.green });
  ['Real-time visibility', 'Always current', 'Continuous assurance', 'Deploy anytime'].forEach((item, i) => {
    slide.addText('✓  ' + item, { x: W - colW - 0.3, y: 2.0 + i * 0.5, w: colW - 0.4, h: 0.45, fontSize: 12, color: COLORS.slate700 });
  });
  addSlideNumber(slide, 9, 14, false);
  slide.addNotes('cATO is the future—and it requires a platform approach.');

  // ============================================
  // SLIDE 10: The Transformation
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('The Transformation', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });

  // Table
  const tableData = [
    ['Today', 'Tomorrow'],
    ['Each program buys hardware', 'Shared infrastructure'],
    ['Custom solutions everywhere', 'One hardened platform'],
    ['Unique requirements each time', 'Inheritable controls'],
    ['Manual evidence collection', 'Automated compliance'],
    ['12-18 month ATOs', 'Days to weeks'],
    ['Duplicated labor costs', 'Mission-focused teams'],
  ];

  const rows = tableData.map((row, i) => {
    if (i === 0) {
      return row.map((cell, j) => ({
        text: cell,
        options: { bold: true, fill: { color: j === 0 ? COLORS.red : COLORS.green }, color: COLORS.white, align: 'center' }
      }));
    }
    return row.map((cell, j) => ({
      text: cell,
      options: { fill: { color: j === 0 ? COLORS.redLight : COLORS.greenLight }, color: COLORS.slate700, align: 'left' }
    }));
  });

  slide.addTable(rows, {
    x: 0.8, y: 1.0, w: W - 1.6,
    colW: [(W - 1.6) / 2, (W - 1.6) / 2],
    border: { color: COLORS.slate200, pt: 0.5 },
    fontFace: 'Arial',
    fontSize: 11,
  });
  addSlideNumber(slide, 10, 14, false);
  slide.addNotes('This comparison table is effective for leadership decision-making.');

  // ============================================
  // SLIDE 11: Five Steps to Get There
  // ============================================
  slide = pptx.addSlide();
  addLightBackground(slide);

  slide.addText('Five Steps to Get There', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.navy });

  // Timeline
  const steps = ['Establish\nDSOP', 'Platform\nATO', 'Automate\nCompliance', 'Migrate\nWorkloads', 'Measure\nROI'];
  const stepW = 1.5;
  const stepStartX = (W - steps.length * stepW - (steps.length - 1) * 0.3) / 2;
  const stepY = 2.0;

  // Timeline line
  slide.addShape('rect', { x: stepStartX + stepW / 2, y: stepY + 0.55, w: (steps.length - 1) * (stepW + 0.3), h: 0.08, fill: { color: COLORS.teal } });

  steps.forEach((step, i) => {
    const x = stepStartX + i * (stepW + 0.3);
    // Circle with number
    slide.addShape('ellipse', { x: x + stepW / 2 - 0.35, y: stepY + 0.25, w: 0.7, h: 0.7, fill: { color: COLORS.teal } });
    slide.addText(String(i + 1), { x: x + stepW / 2 - 0.35, y: stepY + 0.38, w: 0.7, h: 0.5, fontSize: 18, bold: true, color: COLORS.white, align: 'center' });
    // Label
    slide.addText(step, { x: x, y: stepY + 1.1, w: stepW, h: 0.7, fontSize: 11, color: COLORS.slate700, align: 'center' });
  });
  addSlideNumber(slide, 11, 14, false);
  slide.addNotes('These are concrete next steps leadership can approve.');

  // ============================================
  // SLIDE 12: Expected Impact
  // ============================================
  slide = pptx.addSlide();
  addAccentBackground(slide);

  slide.addText('Expected Impact', { x: 0.5, y: 0.3, w: W - 1, h: 0.6, fontSize: 32, bold: true, color: COLORS.white });

  // First row of stats
  const stats12a = [
    { value: '80%', label: 'Faster Time-to-ATO' },
    { value: '$4.2M', label: 'Annual Savings' },
    { value: '35+', label: 'Apps Waiting' },
  ];
  stats12a.forEach((stat, i) => {
    const x = statStartX + i * statW;
    slide.addShape('roundRect', { x: x + 0.1, y: 1.1, w: statW - 0.2, h: 1.0, fill: { color: COLORS.slate700 }, line: { color: COLORS.teal, pt: 1.5 } });
    slide.addText(stat.value, { x: x + 0.1, y: 1.2, w: statW - 0.2, h: 0.5, fontSize: 26, bold: true, color: COLORS.teal, align: 'center' });
    slide.addText(stat.label, { x: x + 0.1, y: 1.7, w: statW - 0.2, h: 0.3, fontSize: 9, color: COLORS.white, align: 'center' });
  });

  // Second row of stats
  const stats12b = [
    { value: '24/7', label: 'Security Monitoring' },
    { value: '100%', label: 'Evidence Automation' },
    { value: '1st Year', label: 'ROI Timeline' },
  ];
  stats12b.forEach((stat, i) => {
    const x = statStartX + i * statW;
    slide.addShape('roundRect', { x: x + 0.1, y: 2.4, w: statW - 0.2, h: 1.0, fill: { color: COLORS.slate700 }, line: { color: COLORS.teal, pt: 1.5 } });
    slide.addText(stat.value, { x: x + 0.1, y: 2.5, w: statW - 0.2, h: 0.5, fontSize: 26, bold: true, color: COLORS.teal, align: 'center' });
    slide.addText(stat.label, { x: x + 0.1, y: 3.0, w: statW - 0.2, h: 0.3, fontSize: 9, color: COLORS.white, align: 'center' });
  });
  addSlideNumber(slide, 12, 14, true);
  slide.addNotes('Be prepared to discuss how these outcomes will be measured.');

  // ============================================
  // SLIDE 13: The Question Isn't If
  // ============================================
  slide = pptx.addSlide();
  addDarkBackground(slide);

  slide.addText("The Question Isn't If", { x: 0.5, y: 0.8, w: W - 1, h: 0.6, fontSize: 36, bold: true, color: COLORS.white, align: 'center' });

  // Quote
  slide.addText('"', { x: 0.5, y: 1.6, w: 0.5, h: 0.5, fontSize: 60, color: COLORS.teal });
  slide.addText("The question is not whether we can afford to modernize our authorization approach—it's whether we can afford not to.", {
    x: 1, y: 1.8, w: W - 2, h: 1.0, fontSize: 18, italic: true, color: COLORS.white, align: 'center',
  });

  slide.addText('Every month of delay means more duplicated spending, more manual labor, and more mission capability sitting in authorization queues.', {
    x: 0.8, y: 3.2, w: W - 1.6, h: 0.8, fontSize: 14, color: COLORS.slate200, align: 'center',
  });
  addSlideNumber(slide, 13, 14, true);
  slide.addNotes('This is the call to action. Pause here for impact.');

  // ============================================
  // SLIDE 14: The Path Forward
  // ============================================
  slide = pptx.addSlide();
  addGradientBackground(slide);

  slide.addText('The Path Forward', { x: 0.5, y: 0.5, w: W - 1, h: 0.6, fontSize: 36, bold: true, color: COLORS.white, align: 'center' });

  // Four pillars
  const pillars = [
    { num: '01', label: 'Shared Platforms' },
    { num: '02', label: 'Inherited Controls' },
    { num: '03', label: 'Automated Compliance' },
    { num: '04', label: 'Continuous Auth' },
  ];
  const pillarW = 2;
  const pillarStartX = (W - pillars.length * pillarW - (pillars.length - 1) * 0.3) / 2;
  pillars.forEach((p, i) => {
    const x = pillarStartX + i * (pillarW + 0.3);
    slide.addShape('roundRect', { x, y: 1.4, w: pillarW, h: 1.3, fill: { color: COLORS.slate800 }, line: { color: COLORS.teal, pt: 1 } });
    slide.addText(p.num, { x, y: 1.5, w: pillarW, h: 0.6, fontSize: 28, bold: true, color: COLORS.teal, align: 'center' });
    slide.addText(p.label, { x, y: 2.15, w: pillarW, h: 0.4, fontSize: 11, color: COLORS.white, align: 'center' });
  });

  // CTA
  slide.addShape('roundRect', { x: 2, y: 3.2, w: W - 4, h: 1.2, fill: { color: COLORS.teal } });
  slide.addText('Ready to proceed when you are.', { x: 2, y: 3.35, w: W - 4, h: 0.55, fontSize: 22, bold: true, color: COLORS.white, align: 'center' });
  slide.addText('Questions?', { x: 2, y: 3.9, w: W - 4, h: 0.4, fontSize: 16, color: COLORS.white, align: 'center' });
  addSlideNumber(slide, 14, 14, true);
  slide.addNotes('End with confidence. Be ready for questions.');

  // Save
  const outputPath = join(__dirname, '..', 'public', 'ato-executive-brief.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`✓ PowerPoint saved to ${outputPath}`);
}

generatePPTX().catch(console.error);
