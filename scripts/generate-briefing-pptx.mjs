#!/usr/bin/env node

import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'public', 'presentations');

// Color scheme
const COLORS = {
  navy: '1e3a5f',
  teal: '0d9488',
  white: 'ffffff',
  lightGray: 'f1f5f9',
  darkGray: '334155',
  green: '16a34a',
  red: 'dc2626',
  amber: 'd97706',
};

async function generateBriefingDeck() {
  const pptx = new pptxgen();

  // Set presentation properties
  pptx.author = 'ATO in Days';
  pptx.title = 'Enterprise DevSecOps Platform - Authorization Briefing';
  pptx.subject = 'AO Briefing for cATO';
  pptx.company = '[Organization Name]';

  // Define master slides
  pptx.defineSlideMaster({
    title: 'TITLE_SLIDE',
    background: { color: COLORS.navy },
    objects: [
      { rect: { x: 0, y: '85%', w: '100%', h: '15%', fill: { color: COLORS.teal } } },
    ],
  });

  pptx.defineSlideMaster({
    title: 'CONTENT_SLIDE',
    background: { color: COLORS.white },
    objects: [
      { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: COLORS.navy } } },
      { rect: { x: 0, y: '95%', w: '100%', h: '5%', fill: { color: COLORS.teal } } },
    ],
  });

  // Slide 1: Title
  let slide = pptx.addSlide({ masterName: 'TITLE_SLIDE' });
  slide.addText('Enterprise DevSecOps Platform (DSOP)', {
    x: 0.5, y: 2, w: '90%', h: 1,
    fontSize: 36, bold: true, color: COLORS.white,
    align: 'center',
  });
  slide.addText('Authorization Briefing', {
    x: 0.5, y: 3, w: '90%', h: 0.6,
    fontSize: 24, color: COLORS.lightGray,
    align: 'center',
  });
  slide.addText('January 2025', {
    x: 0.5, y: 4, w: '90%', h: 0.5,
    fontSize: 18, color: COLORS.lightGray,
    align: 'center',
  });
  slide.addText('Presented by: [Your Name], Platform Engineering Lead\nSupported by: [ISSM Name], Information System Security Manager', {
    x: 0.5, y: 5.2, w: '90%', h: 0.8,
    fontSize: 14, color: COLORS.white,
    align: 'center',
  });

  // Slide 2: Mission Context
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Mission Context', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('The Enterprise DevSecOps Platform enables [Organization] to:', {
    x: 0.5, y: 1.1, w: '90%', h: 0.4,
    fontSize: 16, color: COLORS.darkGray,
  });
  slide.addText([
    { text: '• ', options: { color: COLORS.teal } },
    { text: 'Deploy mission applications 10x faster with built-in security\n' },
    { text: '• ', options: { color: COLORS.teal } },
    { text: 'Standardize software delivery across 47 programs of record\n' },
    { text: '• ', options: { color: COLORS.teal } },
    { text: 'Achieve continuous compliance instead of point-in-time assessments\n' },
    { text: '• ', options: { color: COLORS.teal } },
    { text: 'Support both managed and self-hosted deployment options' },
  ], {
    x: 0.5, y: 1.6, w: '90%', h: 1.5,
    fontSize: 14, color: COLORS.darkGray,
    lineSpacing: 22,
  });
  slide.addText('Deployment Flexibility:', {
    x: 0.5, y: 3.2, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: 'Managed Service: ', options: { bold: true } },
    { text: 'Centrally-operated for teams wanting turnkey solutions\n' },
    { text: 'Local Installation: ', options: { bold: true } },
    { text: 'Self-hosted for programs with dedicated hardware, air-gapped networks, or data residency requirements' },
  ], {
    x: 0.7, y: 3.5, w: '85%', h: 0.8,
    fontSize: 12, color: COLORS.darkGray,
    lineSpacing: 18,
  });
  slide.addText('User Community: 1,200 developers across 23 mission teams', {
    x: 0.5, y: 4.5, w: '90%', h: 0.3,
    fontSize: 14, color: COLORS.darkGray,
  });
  slide.addText('Operational Since: Pilot launched Q2 2024 | Full production capability requested', {
    x: 0.5, y: 4.9, w: '90%', h: 0.3,
    fontSize: 14, color: COLORS.darkGray,
  });

  // Slide 3: Mission Impact
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Mission Impact', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Without this platform:', {
    x: 0.5, y: 1.1, w: '90%', h: 0.3,
    fontSize: 16, bold: true, color: COLORS.red,
  });
  slide.addText([
    { text: '✗ ', options: { color: COLORS.red } },
    { text: 'Each program procures separate container infrastructure ($2-5M each)\n' },
    { text: '✗ ', options: { color: COLORS.red } },
    { text: 'Authorization timelines remain 12-18 months per system\n' },
    { text: '✗ ', options: { color: COLORS.red } },
    { text: 'Security teams spread thin across incompatible environments\n' },
    { text: '✗ ', options: { color: COLORS.red } },
    { text: 'No standardized controls = no automation = endless manual labor' },
  ], {
    x: 0.5, y: 1.5, w: '90%', h: 1.3,
    fontSize: 13, color: COLORS.darkGray,
    lineSpacing: 20,
  });
  slide.addText('Current State:', {
    x: 0.5, y: 3.0, w: '90%', h: 0.3,
    fontSize: 16, bold: true, color: COLORS.green,
  });
  slide.addText([
    { text: '• 12 applications already deployed on pilot infrastructure\n' },
    { text: '• 35 additional applications waiting for platform authorization\n' },
    { text: '• $4.2M in projected annual savings from consolidation\n' },
    { text: '• 3 programs delayed pending platform availability' },
  ], {
    x: 0.5, y: 3.4, w: '90%', h: 1.2,
    fontSize: 13, color: COLORS.darkGray,
    lineSpacing: 20,
  });

  // Slide 4: System Overview
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('System Overview', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  // Authorization boundary box
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 9, h: 3.2,
    fill: { color: COLORS.lightGray },
    line: { color: COLORS.navy, width: 2, dashType: 'dash' },
  });
  slide.addText('AUTHORIZATION BOUNDARY', {
    x: 0.7, y: 1.1, w: 3, h: 0.3,
    fontSize: 10, bold: true, color: COLORS.navy,
  });
  // Component boxes
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 1, y: 1.5, w: 3.8, h: 0.7,
    fill: { color: COLORS.navy },
  });
  slide.addText('Kubernetes Control Plane\nAPI Server, etcd, Scheduler', {
    x: 1, y: 1.5, w: 3.8, h: 0.7,
    fontSize: 11, color: COLORS.white, align: 'center', valign: 'middle',
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 5.2, y: 1.5, w: 3.8, h: 0.7,
    fill: { color: COLORS.teal },
  });
  slide.addText('Platform Services\nIngress, Service Mesh, Logging', {
    x: 5.2, y: 1.5, w: 3.8, h: 0.7,
    fontSize: 11, color: COLORS.white, align: 'center', valign: 'middle',
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 1, y: 2.4, w: 8, h: 0.7,
    fill: { color: COLORS.green },
  });
  slide.addText('Security Tooling: OPA Gatekeeper | Falco Runtime | Trivy Scanning | GitOps (Flux CD)', {
    x: 1, y: 2.4, w: 8, h: 0.7,
    fontSize: 11, color: COLORS.white, align: 'center', valign: 'middle',
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 1, y: 3.3, w: 8, h: 0.7,
    fill: { color: COLORS.amber },
  });
  slide.addText('Deployment Options: Managed Service (Cloud) | Local Installation (Air-Gap Ready)', {
    x: 1, y: 3.3, w: 8, h: 0.7,
    fontSize: 11, color: COLORS.white, align: 'center', valign: 'middle',
  });
  // Scope notes
  slide.addText('IN SCOPE: Control plane, platform services, security tooling, GitOps infrastructure', {
    x: 0.5, y: 4.4, w: '90%', h: 0.3,
    fontSize: 11, color: COLORS.green,
  });
  slide.addText('EXCLUDED: Cloud provider (FedRAMP High) | Mission applications (separate auth)', {
    x: 0.5, y: 4.75, w: '90%', h: 0.3,
    fontSize: 11, color: COLORS.darkGray,
  });

  // Slide 5: Access Control
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Security Posture: Access Control', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Authentication:', {
    x: 0.5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'CAC/PIV authentication required for all users\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Integration with [Agency] ICAM via SAML 2.0\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Session timeout: 15 min idle, 8 hr max' },
  ], {
    x: 0.5, y: 1.45, w: '45%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Authorization:', {
    x: 5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Role-based access control (5 defined roles)\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Namespace isolation between teams\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Cluster-admin limited to 4 operators' },
  ], {
    x: 5, y: 1.45, w: '45%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Access Metrics:', {
    x: 0.5, y: 2.7, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  // Metrics table
  const accessData = [
    ['Total Users', 'Cluster Admins', 'Namespace Admins', 'Access Reviews'],
    ['1,247', '4', '23', 'Quarterly (Automated)'],
  ];
  slide.addTable(accessData, {
    x: 0.5, y: 3.1, w: 9, h: 0.8,
    colW: [2.25, 2.25, 2.25, 2.25],
    fill: { color: COLORS.lightGray },
    border: { color: COLORS.navy, pt: 1 },
    fontFace: 'Arial',
    fontSize: 12,
    align: 'center',
    valign: 'middle',
  });
  slide.addText('Evidence: Automated RBAC exports (24hr), access review completion logs', {
    x: 0.5, y: 4.2, w: '90%', h: 0.3,
    fontSize: 11, italic: true, color: COLORS.darkGray,
  });

  // Slide 6: Data Protection
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Security Posture: Data Protection', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('In Transit:', {
    x: 0.5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'TLS 1.3 with FIPS 140-2 validated modules\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Mutual TLS via Istio service mesh\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'No unencrypted communication permitted' },
  ], {
    x: 0.5, y: 1.45, w: '45%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('At Rest:', {
    x: 5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'etcd encrypted with AWS KMS\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'AES-256 encryption, customer-managed keys\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Sealed Secrets for GitOps' },
  ], {
    x: 5, y: 1.45, w: '45%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Data Classification: CUI (Controlled Unclassified Information)', {
    x: 0.5, y: 2.8, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '• No PII stored on platform (applications manage own data)\n' },
    { text: '• Logs scrubbed of sensitive content before storage\n' },
    { text: '• 90-day log retention in encrypted S3 buckets' },
  ], {
    x: 0.5, y: 3.2, w: '90%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });

  // Slide 7: Vulnerability Management
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Security Posture: Vulnerability Management', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Scanning Pipeline:', {
    x: 0.5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Every image scanned before registry\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Daily rescans of all registry images\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Weekly scans of running workloads\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'IaC scanned on every commit' },
  ], {
    x: 0.5, y: 1.45, w: '45%', h: 1.2,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Enforcement:', {
    x: 5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: 'Critical: ', options: { bold: true, color: COLORS.red } },
    { text: 'Blocked from deployment\n' },
    { text: 'High: ', options: { bold: true, color: COLORS.amber } },
    { text: '7-day SLA, warning on deploy\n' },
    { text: 'Medium: ', options: { bold: true } },
    { text: '30-day SLA\n' },
    { text: 'Low: ', options: { bold: true } },
    { text: '90-day SLA' },
  ], {
    x: 5, y: 1.45, w: '45%', h: 1.2,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Last 30 Days:', {
    x: 0.5, y: 2.9, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  const vulnData = [
    ['Images Scanned', 'Critical Blocked', 'High Remediated', 'Avg Time (Critical)', 'Avg Time (High)'],
    ['2,847', '23', '156', '3.2 days', '5.1 days'],
  ];
  slide.addTable(vulnData, {
    x: 0.5, y: 3.3, w: 9, h: 0.8,
    colW: [1.8, 1.8, 1.8, 1.8, 1.8],
    fill: { color: COLORS.lightGray },
    border: { color: COLORS.navy, pt: 1 },
    fontFace: 'Arial',
    fontSize: 11,
    align: 'center',
    valign: 'middle',
  });

  // Slide 8: Monitoring & Response
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Security Posture: Monitoring & Response', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Continuous Monitoring Stack:', {
    x: 0.5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Falco runtime threat detection\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'K8s audit logs → SIEM (Splunk)\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Network flow anomaly detection\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: '127 custom security alerts' },
  ], {
    x: 0.5, y: 1.45, w: '45%', h: 1.2,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Response Capability:', {
    x: 5, y: 1.1, w: '45%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: '24/7 monitoring (3 FTEs)\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'SOC integration for escalation\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Automated response for known patterns\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: '20 incident response runbooks' },
  ], {
    x: 5, y: 1.45, w: '45%', h: 1.2,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Performance Metrics:', {
    x: 0.5, y: 2.9, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  const monitorData = [
    ['MTTD', 'MTTA', 'MTTC (Auto)', 'MTTC (Manual)', 'Last 90 Days'],
    ['4 min', '12 min', '45 min', '2 hours', '47 alerts, 0 incidents'],
  ];
  slide.addTable(monitorData, {
    x: 0.5, y: 3.3, w: 9, h: 0.8,
    colW: [1.8, 1.8, 1.8, 1.8, 1.8],
    fill: { color: COLORS.lightGray },
    border: { color: COLORS.navy, pt: 1 },
    fontFace: 'Arial',
    fontSize: 11,
    align: 'center',
    valign: 'middle',
  });

  // Slide 9: Supply Chain Security
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Security Posture: Supply Chain Security', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Approved Sources Only:', {
    x: 0.5, y: 1.1, w: '30%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Private container registry\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Iron Bank (DoD hardened) base images\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'All dependencies inventoried' },
  ], {
    x: 0.5, y: 1.45, w: '30%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Image Integrity:', {
    x: 3.5, y: 1.1, w: '30%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Cosign signatures required\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Unsigned = rejected\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'SBOM for every image' },
  ], {
    x: 3.5, y: 1.45, w: '30%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Pipeline Security:', {
    x: 6.5, y: 1.1, w: '30%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Signed commits (GPG/CAC)\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Two-person review\n' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Immutable build environment' },
  ], {
    x: 6.5, y: 1.45, w: '30%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Addresses Executive Order 14028 software supply chain requirements', {
    x: 0.5, y: 2.8, w: '90%', h: 0.3,
    fontSize: 14, bold: true, italic: true, color: COLORS.navy,
  });

  // Slide 10: Compliance Status
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Compliance Status', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Control Implementation: 94% Fully Implemented', {
    x: 0.5, y: 1.1, w: '90%', h: 0.4,
    fontSize: 18, bold: true, color: COLORS.navy,
  });
  // Progress bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.6, w: 9, h: 0.4,
    fill: { color: COLORS.lightGray },
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.6, w: 8.46, h: 0.4, // 94%
    fill: { color: COLORS.green },
  });
  slide.addText('94%', {
    x: 8.5, y: 1.6, w: 1, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
  });
  slide.addText('By Control Family:', {
    x: 0.5, y: 2.2, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  const complianceData = [
    ['Access Control (AC)', 'Audit (AU)', 'Config Mgmt (CM)', 'Identification (IA)', 'Sys Protection (SC)', 'Sys Integrity (SI)', 'Contingency (CP)'],
    ['100% ✓', '100% ✓', '100% ✓', '100% ✓', '100% ✓', '89%', '83%'],
  ];
  slide.addTable(complianceData, {
    x: 0.3, y: 2.55, w: 9.4, h: 0.8,
    colW: [1.34, 1.34, 1.34, 1.34, 1.34, 1.34, 1.34],
    fill: { color: COLORS.lightGray },
    border: { color: COLORS.navy, pt: 1 },
    fontFace: 'Arial',
    fontSize: 10,
    align: 'center',
    valign: 'middle',
  });
  slide.addText('Continuous Compliance Features:', {
    x: 0.5, y: 3.6, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'OSCAL-based SSP updated automatically    ' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: '100% automated evidence collection    ' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Real-time compliance dashboard    ' },
    { text: '✓ ', options: { color: COLORS.green } },
    { text: 'Drift detection and alerting' },
  ], {
    x: 0.5, y: 3.95, w: '90%', h: 0.5,
    fontSize: 11, color: COLORS.darkGray,
  });

  // Slide 11: Findings Summary
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Assessment Findings Summary', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Third-Party Assessment by [3PAO Name], completed December 2024', {
    x: 0.5, y: 1.1, w: '90%', h: 0.3,
    fontSize: 14, color: COLORS.darkGray,
  });
  const findingsData = [
    ['Severity', 'Initial', 'Remediated', 'Open'],
    ['Critical', '1', '1', '0'],
    ['High', '4', '4', '0'],
    ['Moderate', '11', '8', '3'],
    ['Low', '7', '2', '5'],
    ['Total', '23', '15', '8'],
  ];
  slide.addTable(findingsData, {
    x: 0.5, y: 1.5, w: 5, h: 1.8,
    colW: [1.25, 1.25, 1.25, 1.25],
    fill: { color: COLORS.lightGray },
    border: { color: COLORS.navy, pt: 1 },
    fontFace: 'Arial',
    fontSize: 12,
    align: 'center',
    valign: 'middle',
  });
  slide.addText([
    { text: '✓ ', options: { color: COLORS.green, fontSize: 14 } },
    { text: 'All critical and high findings remediated\n', options: { fontSize: 13 } },
    { text: '✓ ', options: { color: COLORS.green, fontSize: 14 } },
    { text: 'Remaining 8 findings are low/moderate with compensating controls\n', options: { fontSize: 13 } },
    { text: '✓ ', options: { color: COLORS.green, fontSize: 14 } },
    { text: 'Full remediation scheduled for Q2 2025', options: { fontSize: 13 } },
  ], {
    x: 5.7, y: 1.5, w: 4, h: 1.4,
    color: COLORS.darkGray, lineSpacing: 20,
  });
  slide.addText('Top Findings Remediated:', {
    x: 0.5, y: 3.5, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '• Hardcoded credentials → Moved to Sealed Secrets\n' },
    { text: '• Missing network policies → Default-deny implemented\n' },
    { text: '• Incomplete audit logging → Full audit pipeline deployed\n' },
    { text: '• Privileged containers → PSP enforcement enabled' },
  ], {
    x: 0.5, y: 3.85, w: '90%', h: 1.0,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });

  // Slide 12: POA&M Summary
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Plan of Action & Milestones', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('Open Items: 8 (3 moderate, 5 low)', {
    x: 0.5, y: 1.1, w: '90%', h: 0.3,
    fontSize: 16, bold: true, color: COLORS.navy,
  });
  const poamData = [
    ['Finding', 'Action', 'Target Date'],
    ['SI-4: Expand log coverage', 'Add node-level logs', 'Feb 2025'],
    ['CP-9: Backup verification', 'Automate restore test', 'Mar 2025'],
    ['CM-7: Minimum functionality', 'Node OS hardening', 'Mar 2025'],
  ];
  slide.addTable(poamData, {
    x: 0.5, y: 1.5, w: 9, h: 1.2,
    colW: [3, 4, 2],
    fill: { color: COLORS.lightGray },
    border: { color: COLORS.navy, pt: 1 },
    fontFace: 'Arial',
    fontSize: 12,
    align: 'center',
    valign: 'middle',
  });
  slide.addText('Compensating Controls:', {
    x: 0.5, y: 2.9, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '• SI-4: Application-level logging provides 90% visibility\n' },
    { text: '• CP-9: Manual restore tested quarterly, last successful Dec 2024\n' },
    { text: '• CM-7: Container-level restrictions limit exposure' },
  ], {
    x: 0.5, y: 3.25, w: '90%', h: 0.9,
    fontSize: 12, color: COLORS.darkGray, lineSpacing: 18,
  });
  slide.addText('Resource Commitment: 0.5 FTE dedicated | Monthly reviews with ISSM | Quarterly leadership reporting', {
    x: 0.5, y: 4.3, w: '90%', h: 0.3,
    fontSize: 12, bold: true, color: COLORS.teal,
  });

  // Slide 13: Risk Summary
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Residual Risk Assessment', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fill: { color: COLORS.amber },
  });
  slide.addText('Overall Residual Risk: MODERATE (Acceptable)', {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fontSize: 18, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
  });
  const riskData = [
    ['Risk Factors', 'Mitigations'],
    ['8 open POA&M items', 'Compensating controls active, dedicated resources'],
    ['Multi-tenant environment', 'Namespace isolation, network policies default-deny'],
    ['Rapid deployment cadence', 'Automated security gates, no bypass capability'],
    ['Inherited cloud risks', 'FedRAMP High authorization, continuous monitoring'],
  ];
  slide.addTable(riskData, {
    x: 0.5, y: 1.8, w: 9, h: 1.5,
    colW: [3.5, 5.5],
    fill: { color: COLORS.lightGray },
    border: { color: COLORS.navy, pt: 1 },
    fontFace: 'Arial',
    fontSize: 11,
    valign: 'middle',
  });
  slide.addText('Risk-Benefit: Platform REDUCES organizational risk by:', {
    x: 0.5, y: 3.5, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addText([
    { text: '• Eliminating 12+ separate infrastructure ATOs    ' },
    { text: '• Enforcing consistent security controls    ' },
    { text: '• Enabling continuous compliance    ' },
    { text: '• Reducing human error through automation' },
  ], {
    x: 0.5, y: 3.85, w: '90%', h: 0.5,
    fontSize: 11, color: COLORS.darkGray,
  });

  // Slide 14: Authorization Request
  slide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  slide.addText('Authorization Request', {
    x: 0.3, y: 0.15, w: '90%', h: 0.5,
    fontSize: 24, bold: true, color: COLORS.white,
  });
  slide.addText('We respectfully request the Authorizing Official grant:', {
    x: 0.5, y: 1.1, w: '90%', h: 0.3,
    fontSize: 16, color: COLORS.darkGray,
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 1.5, y: 1.5, w: 7, h: 1.4,
    fill: { color: COLORS.navy },
    shadow: { type: 'outer', blur: 3, offset: 2, angle: 45, opacity: 0.3 },
  });
  slide.addText('CONTINUOUS AUTHORIZATION TO OPERATE (cATO)', {
    x: 1.5, y: 1.6, w: 7, h: 0.5,
    fontSize: 18, bold: true, color: COLORS.white, align: 'center',
  });
  slide.addText('with ongoing authorization contingent upon:\n• Continuous monitoring per ConMon plan\n• Monthly posture reporting to AO\n• POA&M remediation per agreed schedule', {
    x: 1.5, y: 2.1, w: 7, h: 0.8,
    fontSize: 12, color: COLORS.lightGray, align: 'center',
  });
  slide.addText('Scope: Enterprise DevSecOps Platform as defined in authorization boundary', {
    x: 0.5, y: 3.1, w: '90%', h: 0.3,
    fontSize: 12, color: COLORS.darkGray,
  });
  slide.addText('ISSM Recommendation:', {
    x: 0.5, y: 3.5, w: '90%', h: 0.3,
    fontSize: 14, bold: true, color: COLORS.navy,
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9, h: 1.0,
    fill: { color: COLORS.lightGray },
    line: { color: COLORS.teal, width: 2 },
  });
  slide.addText('"Based on the demonstrated security posture, managed residual risk, and mission criticality, I recommend authorization. The platform\'s automated security enforcement and continuous monitoring provide superior assurance compared to traditional point-in-time ATO."\n\n— [ISSM Name], ISSM', {
    x: 0.7, y: 3.9, w: 8.6, h: 0.9,
    fontSize: 11, italic: true, color: COLORS.darkGray,
  });

  // Slide 15: Questions
  slide = pptx.addSlide({ masterName: 'TITLE_SLIDE' });
  slide.addText('Questions?', {
    x: 0.5, y: 1.8, w: '90%', h: 1,
    fontSize: 48, bold: true, color: COLORS.white,
    align: 'center',
  });
  slide.addText('Supporting Materials Available:', {
    x: 0.5, y: 3.2, w: '90%', h: 0.4,
    fontSize: 16, color: COLORS.lightGray,
    align: 'center',
  });
  slide.addText('• System Security Plan (OSCAL format)\n• Security Assessment Report\n• POA&M Detail with Evidence\n• Live Dashboard Demo\n• Technical Subject Matter Experts', {
    x: 0.5, y: 3.6, w: '90%', h: 1.2,
    fontSize: 14, color: COLORS.white,
    align: 'center', lineSpacing: 22,
  });
  slide.addText('Point of Contact:\n[Your Name] | [Email] | [Phone]', {
    x: 0.5, y: 5.0, w: '90%', h: 0.6,
    fontSize: 14, color: COLORS.lightGray,
    align: 'center',
  });

  // Save the presentation
  const { mkdir } = await import('fs/promises');
  await mkdir(outputPath, { recursive: true });

  const filePath = join(outputPath, 'ao-briefing-deck.pptx');
  await pptx.writeFile({ fileName: filePath });

  console.log(`✓ PowerPoint presentation saved to ${filePath}`);
}

generateBriefingDeck().catch((error) => {
  console.error('Error generating presentation:', error);
  process.exit(1);
});
