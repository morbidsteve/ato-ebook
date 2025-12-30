// Slide data structure based on Executive Summary content
export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: SlideContent[];
  layout: 'title' | 'content' | 'two-column' | 'bullets' | 'table' | 'conclusion' | 'stats' | 'comparison' | 'icon-grid' | 'big-statement';
  notes?: string;
  background?: 'dark' | 'light' | 'gradient' | 'accent';
}

export type SlideContent =
  | { type: 'text'; text: string; bold?: boolean; italic?: boolean; size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'; align?: 'left' | 'center' | 'right' }
  | { type: 'bullet'; items: string[]; icon?: string }
  | { type: 'numbered'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'highlight'; text: string; color?: 'teal' | 'red' | 'amber' | 'green' }
  | { type: 'spacer'; size?: 'sm' | 'md' | 'lg' }
  | { type: 'stat'; value: string; label: string; trend?: 'up' | 'down' | 'neutral' }
  | { type: 'stats-row'; stats: Array<{ value: string; label: string; icon?: string }> }
  | { type: 'icon-box'; icon: string; title: string; description: string; color?: string }
  | { type: 'comparison'; left: { title: string; items: string[]; color: 'red' | 'green' }; right: { title: string; items: string[]; color: 'red' | 'green' } }
  | { type: 'diagram'; variant: 'flow' | 'stack' | 'timeline' | 'hub'; data: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'cta'; text: string; subtext?: string };

export const executiveSummarySlides: Slide[] = [
  {
    id: 1,
    title: 'Modernizing Federal Authorization',
    subtitle: 'From Fragmented Compliance to Continuous ATO',
    content: [
      { type: 'spacer', size: 'lg' },
      { type: 'text', text: 'Executive Brief for Leadership', size: 'lg', align: 'center' },
      { type: 'spacer', size: 'md' },
      { type: 'stats-row', stats: [
        { value: '80%', label: 'Faster ATO', icon: 'speed' },
        { value: '$4.2M', label: 'Annual Savings', icon: 'money' },
        { value: '47', label: 'Programs Unified', icon: 'grid' },
      ]},
    ],
    layout: 'title',
    background: 'dark',
    notes: 'Welcome leadership. This brief covers our current authorization challenges and a path forward.',
  },
  {
    id: 2,
    title: 'The Current Reality',
    subtitle: 'Every Program Is an Island',
    content: [
      { type: 'diagram', variant: 'hub', data: ['Program A', 'Program B', 'Program C', 'Program D'] },
      { type: 'spacer', size: 'md' },
      { type: 'stats-row', stats: [
        { value: '$2-5M', label: 'Per Program Infrastructure', icon: 'money' },
        { value: '12-18', label: 'Months to ATO', icon: 'clock' },
        { value: '0%', label: 'Control Reuse', icon: 'recycle' },
      ]},
    ],
    layout: 'stats',
    background: 'light',
    notes: 'Emphasize the duplication happening across the organization.',
  },
  {
    id: 3,
    title: 'The Hidden Cost',
    content: [
      { type: 'comparison',
        left: {
          title: 'What We Pay For',
          items: ['Duplicate hardware purchases', 'Redundant VM infrastructure', 'Separate container runtimes', 'Individual security tools'],
          color: 'red'
        },
        right: {
          title: 'What We Get',
          items: ['Incompatible systems', 'No shared controls', 'Manual everything', 'Endless re-work'],
          color: 'red'
        }
      },
      { type: 'spacer', size: 'md' },
      { type: 'highlight', text: 'The real cost isn\'t hardware—it\'s the millions spent on labor that could be automated', color: 'amber' },
    ],
    layout: 'comparison',
    background: 'light',
    notes: 'Labor costs are the hidden expense leadership often underestimates.',
  },
  {
    id: 4,
    title: 'Authorization Chaos',
    subtitle: 'Why Every ATO Takes 18 Months',
    content: [
      { type: 'diagram', variant: 'flow', data: ['New System', 'Custom Docs', 'Manual Evidence', 'Long Review', 'Finally ATO', 'Immediately Stale'] },
      { type: 'spacer', size: 'md' },
      { type: 'icon-box', icon: 'warning', title: 'The Vicious Cycle', description: 'Each assessment starts from scratch, even when systems share 80%+ of their architecture', color: 'red' },
    ],
    layout: 'content',
    background: 'light',
    notes: 'The lack of standardization is killing efficiency.',
  },
  {
    id: 5,
    title: 'There Is a Better Way',
    content: [
      { type: 'cta', text: 'Platform-Based Continuous Authorization', subtext: 'One platform. Inherited controls. Automated compliance.' },
    ],
    layout: 'big-statement',
    background: 'gradient',
    notes: 'This is the key transition moment in the presentation.',
  },
  {
    id: 6,
    title: 'The DSOP Advantage',
    subtitle: 'DevSecOps Platform + Secure Container Runtime',
    content: [
      { type: 'diagram', variant: 'stack', data: ['Mission Applications', 'Inherited Controls', 'DSOP Platform', 'Secure Runtime'] },
      { type: 'spacer', size: 'md' },
      { type: 'stats-row', stats: [
        { value: '60%', label: 'Controls Inherited', icon: 'shield' },
        { value: '1x', label: 'Authorize Once', icon: 'check' },
        { value: '∞', label: 'Apps Benefit', icon: 'apps' },
      ]},
    ],
    layout: 'stats',
    background: 'light',
    notes: 'The 60% inheritance is a conservative estimate based on typical NIST 800-53 mappings.',
  },
  {
    id: 7,
    title: 'Flexible Deployment',
    subtitle: 'One Platform, Your Way',
    content: [
      { type: 'comparison',
        left: {
          title: 'Managed Service',
          items: ['Turnkey solution', 'We operate it', 'Fastest deployment', 'Lower overhead'],
          color: 'green'
        },
        right: {
          title: 'Local Installation',
          items: ['Your hardware', 'Air-gap ready', 'Data residency', 'Full control'],
          color: 'green'
        }
      },
      { type: 'spacer', size: 'md' },
      { type: 'highlight', text: 'Same hardened runtime. Same security controls. Same compliance inheritance.', color: 'teal' },
    ],
    layout: 'comparison',
    background: 'light',
    notes: 'Flexibility is key—not one-size-fits-all.',
  },
  {
    id: 8,
    title: 'Automation Changes Everything',
    content: [
      { type: 'stats-row', stats: [
        { value: 'OSCAL', label: 'Machine-Readable Docs', icon: 'doc' },
        { value: '24/7', label: 'Evidence Collection', icon: 'sync' },
        { value: '0', label: 'Manual Updates', icon: 'robot' },
      ]},
      { type: 'spacer', size: 'lg' },
      { type: 'diagram', variant: 'flow', data: ['Config Change', 'Auto-Update SSP', 'Collect Evidence', 'Dashboard Ready'] },
    ],
    layout: 'stats',
    background: 'accent',
    notes: 'Automation is the key to sustainability.',
  },
  {
    id: 9,
    title: 'Continuous ATO',
    subtitle: 'Authorization That Stays Current',
    content: [
      { type: 'comparison',
        left: {
          title: 'Traditional ATO',
          items: ['Point-in-time snapshot', 'Immediately decays', 'Periodic re-assessment', '18-month cycles'],
          color: 'red'
        },
        right: {
          title: 'Continuous ATO',
          items: ['Real-time visibility', 'Always current', 'Continuous assurance', 'Deploy anytime'],
          color: 'green'
        }
      },
    ],
    layout: 'comparison',
    background: 'light',
    notes: 'cATO is the future—and it requires a platform approach.',
  },
  {
    id: 10,
    title: 'The Transformation',
    content: [
      { type: 'table', headers: ['Today', 'Tomorrow'], rows: [
        ['Each program buys hardware', 'Shared infrastructure'],
        ['Custom solutions everywhere', 'One hardened platform'],
        ['Unique requirements each time', 'Inheritable controls'],
        ['Manual evidence collection', 'Automated compliance'],
        ['12-18 month ATOs', 'Days to weeks'],
        ['Duplicated labor costs', 'Mission-focused teams'],
      ]},
    ],
    layout: 'table',
    background: 'light',
    notes: 'This comparison table is effective for leadership decision-making.',
  },
  {
    id: 11,
    title: 'Five Steps to Get There',
    content: [
      { type: 'diagram', variant: 'timeline', data: [
        'Establish DSOP',
        'Platform ATO',
        'Automate Compliance',
        'Migrate Workloads',
        'Measure ROI'
      ]},
    ],
    layout: 'content',
    background: 'light',
    notes: 'These are concrete next steps leadership can approve.',
  },
  {
    id: 12,
    title: 'Expected Impact',
    content: [
      { type: 'stats-row', stats: [
        { value: '80%', label: 'Faster Time-to-ATO', icon: 'speed' },
        { value: '$4.2M', label: 'Annual Savings', icon: 'money' },
        { value: '35+', label: 'Apps Waiting', icon: 'queue' },
      ]},
      { type: 'spacer', size: 'lg' },
      { type: 'stats-row', stats: [
        { value: '24/7', label: 'Security Monitoring', icon: 'shield' },
        { value: '100%', label: 'Evidence Automation', icon: 'check' },
        { value: '1st Year', label: 'ROI Timeline', icon: 'chart' },
      ]},
    ],
    layout: 'stats',
    background: 'accent',
    notes: 'Be prepared to discuss how these outcomes will be measured.',
  },
  {
    id: 13,
    title: 'The Question Isn\'t If',
    content: [
      { type: 'quote', text: 'The question is not whether we can afford to modernize our authorization approach—it\'s whether we can afford not to.' },
      { type: 'spacer', size: 'lg' },
      { type: 'text', text: 'Every month of delay means more duplicated spending, more manual labor, and more mission capability sitting in authorization queues.', size: 'lg', align: 'center' },
    ],
    layout: 'big-statement',
    background: 'dark',
    notes: 'This is the call to action. Pause here for impact.',
  },
  {
    id: 14,
    title: 'The Path Forward',
    content: [
      { type: 'stats-row', stats: [
        { value: '01', label: 'Shared Platforms', icon: 'platform' },
        { value: '02', label: 'Inherited Controls', icon: 'inherit' },
        { value: '03', label: 'Automated Compliance', icon: 'auto' },
        { value: '04', label: 'Continuous Auth', icon: 'continuous' },
      ]},
      { type: 'spacer', size: 'lg' },
      { type: 'cta', text: 'Ready to proceed when you are.', subtext: 'Questions?' },
    ],
    layout: 'conclusion',
    background: 'gradient',
    notes: 'End with confidence. Be ready for questions.',
  },
];
