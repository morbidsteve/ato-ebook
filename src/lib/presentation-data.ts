// Slide data structure based on Executive Summary content
export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: SlideContent[];
  layout: 'title' | 'content' | 'two-column' | 'bullets' | 'table' | 'conclusion';
  notes?: string;
}

export type SlideContent =
  | { type: 'text'; text: string; bold?: boolean; italic?: boolean; size?: 'sm' | 'md' | 'lg' | 'xl' }
  | { type: 'bullet'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'highlight'; text: string; color?: 'teal' | 'red' | 'amber' | 'green' }
  | { type: 'spacer' };

export const executiveSummarySlides: Slide[] = [
  {
    id: 1,
    title: 'Modernizing Federal Authorization',
    subtitle: 'From Fragmented Compliance to Continuous ATO',
    content: [
      { type: 'text', text: 'Executive Brief for Leadership', size: 'lg' },
      { type: 'spacer' },
      { type: 'text', text: '[Organization Name]', size: 'md' },
      { type: 'text', text: 'January 2025', size: 'sm' },
    ],
    layout: 'title',
    notes: 'Welcome leadership. This brief covers our current authorization challenges and a path forward.',
  },
  {
    id: 2,
    title: 'The Current State',
    subtitle: 'Fragmented, Costly, and Unsustainable',
    content: [
      { type: 'highlight', text: 'Each Program of Record operates as an island', color: 'red' },
      { type: 'spacer' },
      { type: 'bullet', items: [
        'Individual programs procure their own hardware',
        'Each program builds custom VM infrastructure',
        'Programs independently acquire secure container runtimes',
        'No economies of scale or shared security inheritance',
      ]},
    ],
    layout: 'bullets',
    notes: 'Emphasize the duplication happening across the organization.',
  },
  {
    id: 3,
    title: 'Authorization Chaos',
    content: [
      { type: 'bullet', items: [
        'Every ATO package contains one-off requirements unique to that system',
        'No standardized control implementations that can be reused',
        'Each assessment starts from scratch (even with 80%+ shared architecture)',
        'Assessors must re-learn each environment',
      ]},
      { type: 'spacer' },
      { type: 'highlight', text: 'Result: 12-18 month authorization timelines', color: 'red' },
    ],
    layout: 'bullets',
    notes: 'The lack of standardization is killing efficiency.',
  },
  {
    id: 4,
    title: 'The True Cost',
    subtitle: 'It\'s Not Hardware—It\'s Labor',
    content: [
      { type: 'text', text: 'Organizations spend millions annually on:', size: 'md', bold: true },
      { type: 'spacer' },
      { type: 'bullet', items: [
        'Redundant documentation efforts across programs',
        'Manual evidence collection performed separately for each system',
        'Security engineers context-switching between incompatible environments',
        'Extended authorization timelines that delay mission capability',
        'Continuous re-authorization efforts that consume entire teams',
      ]},
      { type: 'spacer' },
      { type: 'highlight', text: 'We pay premium prices for commodity capabilities', color: 'amber' },
    ],
    layout: 'bullets',
    notes: 'Labor costs are the hidden expense leadership often underestimates.',
  },
  {
    id: 5,
    title: 'The Path Forward',
    subtitle: 'Platform-Based Continuous Authorization',
    content: [
      { type: 'text', text: 'DevSecOps Platform (DSOP) + Secure Container Runtime', size: 'lg', bold: true },
      { type: 'spacer' },
      { type: 'highlight', text: 'Compliance is inherited, not rebuilt', color: 'teal' },
      { type: 'spacer' },
      { type: 'text', text: 'A foundation where security controls flow down to all applications', size: 'md' },
    ],
    layout: 'content',
    notes: 'This is the key concept: inheritance over rebuilding.',
  },
  {
    id: 6,
    title: 'Flexible Deployment Options',
    content: [
      { type: 'table', headers: ['Option', 'Description', 'Best For'], rows: [
        ['Managed Service', 'Centrally-operated platform', 'Teams wanting turnkey solutions'],
        ['Local Installation', 'Self-hosted on program hardware', 'Air-gapped networks, data residency requirements'],
      ]},
      { type: 'spacer' },
      { type: 'highlight', text: 'Both options use identical hardened runtime and inherit same security controls', color: 'teal' },
    ],
    layout: 'table',
    notes: 'Flexibility is key—not one-size-fits-all.',
  },
  {
    id: 7,
    title: 'Shared Infrastructure Benefits',
    subtitle: 'Inherited Security',
    content: [
      { type: 'bullet', items: [
        'One-time platform authorization that all hosted applications inherit',
        'Pre-approved base images with embedded security controls',
        'Standardized network policies, encryption, and access controls',
        'Continuous monitoring and logging infrastructure shared across all workloads',
      ]},
      { type: 'spacer' },
      { type: 'highlight', text: '~60% of application controls inherited from platform', color: 'green' },
    ],
    layout: 'bullets',
    notes: 'The 60% inheritance is a conservative estimate based on typical NIST 800-53 mappings.',
  },
  {
    id: 8,
    title: 'Automation Replaces Manual Labor',
    content: [
      { type: 'table', headers: ['Capability', 'Benefit'], rows: [
        ['Machine-readable controls (OSCAL)', 'Documentation updates automatically with config changes'],
        ['Automated evidence collection', 'Runs continuously, not just before assessments'],
        ['Policy-as-code enforcement', 'Prevents non-compliant deployments'],
        ['Continuous compliance dashboards', 'Real-time authorization status visibility'],
      ]},
    ],
    layout: 'table',
    notes: 'Automation is the key to sustainability.',
  },
  {
    id: 9,
    title: 'Standardization Enables Reuse',
    content: [
      { type: 'text', text: 'When all applications deploy to the same platform:', size: 'md', bold: true },
      { type: 'spacer' },
      { type: 'bullet', items: [
        'Control implementations become templates, not one-time documents',
        'Assessment artifacts are reusable across programs',
        'Security teams build deep expertise in one environment',
        'New applications achieve ATO in days or weeks, not months',
      ]},
    ],
    layout: 'bullets',
    notes: 'This is where the ROI becomes exponential.',
  },
  {
    id: 10,
    title: 'The cATO Model',
    subtitle: 'Continuous Authorization',
    content: [
      { type: 'text', text: 'Rather than point-in-time authorization that immediately begins decaying:', size: 'md' },
      { type: 'spacer' },
      { type: 'bullet', items: [
        'Maintains real-time visibility into security posture',
        'Detects and alerts on configuration drift',
        'Provides ongoing assurance rather than periodic snapshots',
        'Enables rapid deployment of new capabilities within authorized boundaries',
      ]},
      { type: 'spacer' },
      { type: 'highlight', text: 'Authorization that stays current, not stale', color: 'green' },
    ],
    layout: 'bullets',
    notes: 'cATO is the future—and it requires a platform approach.',
  },
  {
    id: 11,
    title: 'Current vs. Future State',
    content: [
      { type: 'table', headers: ['Current State', 'Future State'], rows: [
        ['Each PoR buys own hardware', 'Shared, scalable infrastructure'],
        ['Custom VM/container solutions per program', 'Single hardened container platform'],
        ['Unique ATO requirements every time', 'Standardized, inheritable controls'],
        ['Manual evidence collection', 'Automated, continuous compliance'],
        ['12-18 month authorization cycles', 'Days-to-weeks for new applications'],
        ['Millions in duplicated labor', 'Resources focused on mission'],
      ]},
    ],
    layout: 'table',
    notes: 'This comparison table is effective for leadership decision-making.',
  },
  {
    id: 12,
    title: 'Recommended Actions',
    content: [
      { type: 'numbered', items: [
        'Establish a DevSecOps Platform — Deploy FedRAMP/DoD-approved Kubernetes with both managed and local installation options',
        'Pursue Platform-Level Authorization — Obtain cATO for the platform itself',
        'Implement Compliance Automation — Deploy OSCAL-based documentation and policy-as-code',
        'Migrate Existing Workloads — Prioritize moving current applications to shared platform',
        'Measure and Report — Track authorization timeline reduction and labor cost savings',
      ]},
    ],
    layout: 'bullets',
    notes: 'These are concrete next steps leadership can approve.',
  },
  {
    id: 13,
    title: 'Expected Outcomes',
    content: [
      { type: 'bullet', items: [
        '80% reduction in time-to-ATO for new applications',
        'Significant cost avoidance through eliminated hardware/software duplication',
        'Improved security posture via continuous monitoring and standardized controls',
        'Faster mission delivery with security built-in rather than bolted-on',
        'Workforce optimization — security professionals focused on risk, not paperwork',
      ]},
      { type: 'spacer' },
      { type: 'highlight', text: 'ROI: Measurable within first year', color: 'green' },
    ],
    layout: 'bullets',
    notes: 'Be prepared to discuss how these outcomes will be measured.',
  },
  {
    id: 14,
    title: 'The Bottom Line',
    content: [
      { type: 'text', text: 'The question is not whether we can afford to modernize our authorization approach—', size: 'lg', italic: true },
      { type: 'spacer' },
      { type: 'highlight', text: 'It\'s whether we can afford not to.', color: 'teal' },
      { type: 'spacer' },
      { type: 'text', text: 'Every month of delay means more duplicated spending, more manual labor, and more mission capability sitting in authorization queues.', size: 'md' },
    ],
    layout: 'content',
    notes: 'This is the call to action. Pause here for impact.',
  },
  {
    id: 15,
    title: 'The Path Forward Is Clear',
    content: [
      { type: 'text', text: 'Shared Platforms', size: 'xl', bold: true },
      { type: 'text', text: 'Inherited Controls', size: 'xl', bold: true },
      { type: 'text', text: 'Automated Compliance', size: 'xl', bold: true },
      { type: 'text', text: 'Continuous Authorization', size: 'xl', bold: true },
      { type: 'spacer' },
      { type: 'highlight', text: 'Ready to proceed when you are.', color: 'teal' },
    ],
    layout: 'conclusion',
    notes: 'End with confidence. Be ready for questions.',
  },
];
