---
title: AO Briefing Deck Template
description: Authorization briefing presentation template and speaking notes
published: true
tags: presentation, briefing, ao, authorization, template
editor: markdown
---

# AO Briefing Deck Template

A complete presentation template for requesting authorization from your Authorizing Official. Includes slide content, speaker notes, and preparation guidance.

---

## Deck Overview

| Slide | Title | Time | Purpose |
|-------|-------|------|---------|
| 1 | Title | — | Set context |
| 2 | Mission Context | 2 min | Why this system matters |
| 3 | Mission Impact | 2 min | Cost of not operating |
| 4 | System Overview | 3 min | What you're authorizing |
| 5 | System Components | 2 min | Key pieces (plain language) |
| 6 | Access Control | 2 min | Who can access what |
| 7 | Data Protection | 2 min | How data is protected |
| 8 | Vulnerability Management | 2 min | How we find and fix flaws |
| 9 | Monitoring & Response | 2 min | How we detect and respond |
| 10 | Supply Chain Security | 2 min | Software integrity |
| 11 | Compliance Status | 2 min | Current posture metrics |
| 12 | Findings Summary | 2 min | What assessors found |
| 13 | POA&M Summary | 2 min | Remediation plans |
| 14 | Risk Summary | 2 min | Residual risk |
| 15 | Authorization Request | 2 min | The ask |
| 16 | Questions | — | Discussion |

**Total: ~30 minutes + questions**

---

## Slide-by-Slide Content

### Slide 1: Title

```
[SYSTEM NAME]
Authorization Briefing

[DATE]

Presented by: [NAME], [TITLE]
Supported by: [ISSM NAME], ISSM
```

**Speaker Notes:**
- Introduce yourself and the ISSM
- Confirm time available for the briefing
- Ask if there are any specific areas of concern to address

---

### Slide 2: Mission Context

```
Mission Context

[SYSTEM NAME] enables [AGENCY/ORGANIZATION] to:

• [Primary mission capability #1]
• [Primary mission capability #2]
• [Primary mission capability #3]

User Community: [X] users across [Y] organizations

Operational Since: [Date] (current authorization expires [Date])
```

**Speaker Notes:**
- Connect the system to agency strategic priorities
- Emphasize who depends on this system
- If reauthorization, mention operational track record
- Keep this brief—set context, don't oversell

---

### Slide 3: Mission Impact

```
Mission Impact

Without this system:

❌ [Impact #1 - specific mission degradation]
❌ [Impact #2 - operational consequence]
❌ [Impact #3 - cost or efficiency impact]

Current Dependencies:
• [X] applications rely on this platform
• [Y] mission-critical workloads in production
• [Z] users would lose capability
```

**Speaker Notes:**
- Be specific about impact, not generic
- Use concrete numbers where possible
- Don't exaggerate—AOs can tell
- This establishes why the risk is worth accepting

---

### Slide 4: System Overview

```
[AUTHORIZATION BOUNDARY DIAGRAM]

Authorization Boundary

INCLUDED:
✓ Kubernetes control plane and worker nodes
✓ Platform services (ingress, service mesh, logging)
✓ Security tooling (policy engine, runtime monitoring)
✓ GitOps and deployment infrastructure

EXCLUDED (Inherited):
→ Cloud provider infrastructure (FedRAMP authorized)
→ Identity provider ([IdP NAME])

EXCLUDED (Separate Authorization):
→ Mission applications (individual ATOs)
```

**Speaker Notes:**
- Walk through the diagram, pointing to key components
- Clearly state what is IN scope vs OUT of scope
- Explain inherited authorizations briefly
- Emphasize this is about the platform, not applications

---

### Slide 5: System Components

```
System Components

┌─────────────────────────────────────────────────┐
│           External Users & Applications          │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│              Ingress Controller                  │
│         (Traffic management, TLS, WAF)          │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│               Service Mesh                       │
│        (Encryption, authentication)             │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│           Application Containers                 │
│         (Isolated, policy-enforced)             │
└─────────────────────────────────────────────────┘
```

**Speaker Notes:**
- Use plain language, not technical jargon
- Explain how data flows through the system
- Highlight security at each layer
- Keep it high-level—details on request

---

### Slide 6: Access Control

```
Security Posture: Access Control

How we control who accesses what:

✓ Authentication via [IdP] with multi-factor
✓ Role-based access control (minimum necessary)
✓ Separate roles for developers, operators, security
✓ Automated account review and deprovisioning
✓ Break-glass procedures for emergencies

Key Metric: [X] privileged users, [Y] require justification

Evidence: Automated RBAC exports, access review logs
```

**Speaker Notes:**
- Emphasize least privilege and separation of duties
- Mention MFA requirement
- Be ready to explain break-glass process if asked
- Reference automated evidence collection

---

### Slide 7: Data Protection

```
Security Posture: Data Protection

How we protect data in transit and at rest:

✓ All external traffic encrypted (TLS 1.2+)
✓ All internal traffic encrypted (mutual TLS)
✓ Data at rest encrypted with customer-managed keys
✓ Secrets encrypted in etcd with KMS
✓ No sensitive data in container images or logs

Data Classification: [CUI/FOUO/etc.]

Evidence: TLS configurations, KMS key policies, encryption audits
```

**Speaker Notes:**
- Emphasize encryption everywhere
- Mention key management approach
- Be ready to discuss data handling procedures
- Reference FIPS compliance if applicable

---

### Slide 8: Vulnerability Management

```
Security Posture: Vulnerability Management

How we identify and fix security flaws:

✓ Automated scanning of all container images
✓ Blocking deployment of critical vulnerabilities
✓ Weekly scanning of running workloads
✓ Defined SLAs: Critical (24h), High (7d), Medium (30d)

Current Status:
• [X] images scanned this month
• [Y] critical vulnerabilities blocked
• [Z] average remediation time

Evidence: Scan reports, remediation tracking, admission logs
```

**Speaker Notes:**
- Emphasize proactive vs reactive approach
- Show that scanning prevents deployment, not just detects
- Be ready to discuss exception process
- Have specific numbers ready

---

### Slide 9: Monitoring & Response

```
Security Posture: Monitoring & Response

How we detect and respond to security events:

✓ Centralized logging with 1-year retention
✓ Real-time security alerting
✓ Runtime threat detection
✓ 24/7 monitoring by [SOC/Team]
✓ Defined incident response procedures

Alert Volume: [X] security alerts/month
Response Time: [Y] minutes to acknowledge

Evidence: SIEM dashboards, alert logs, incident reports
```

**Speaker Notes:**
- Emphasize continuous monitoring capability
- Be ready to show live dashboard if asked
- Have incident response process summary ready
- Reference immutable log storage

---

### Slide 10: Supply Chain Security

```
Security Posture: Supply Chain Security

How we ensure software integrity:

✓ Approved container registries only
✓ Image signing and verification
✓ Software Bill of Materials (SBOM) generation
✓ Dependency vulnerability tracking
✓ Automated updates for base images

Pipeline Security:
• Signed commits required
• Automated security gates
• Separation of build and deploy

Evidence: Registry policies, signing configs, SBOM artifacts
```

**Speaker Notes:**
- Reference software supply chain requirements (EO 14028)
- Explain how you prevent untrusted code
- Be ready to discuss third-party dependencies
- Mention SBOM availability

---

### Slide 11: Compliance Status

```
Compliance Status

Control Implementation: [X]% complete

┌──────────────────────────────────────────┐
│████████████████████████████░░░░░░│ 94%   │
└──────────────────────────────────────────┘

By Control Family:
• Access Control (AC): 100% ✓
• Audit (AU): 100% ✓
• Configuration Management (CM): 100% ✓
• System Protection (SC): 100% ✓
• System Integrity (SI): 89% (POA&M items)

Continuous Monitoring: Operational ✓
Evidence Automation: 100% ✓
```

**Speaker Notes:**
- Show overall compliance posture
- Highlight areas of strength
- Be transparent about gaps
- Mention automated evidence as confidence builder

---

### Slide 12: Findings Summary

```
Assessment Findings

                    Found    Remediated    Open
────────────────────────────────────────────────
Critical              2          2          0
High                  5          5          0
Moderate             12          8          4
Low                   8          3          5
────────────────────────────────────────────────
Total                27         18          9

All critical and high findings have been remediated.
Remaining findings are documented in POA&M.
```

**Speaker Notes:**
- Be direct about what was found
- Emphasize critical/high closure
- Don't hide or minimize findings
- Explain categorization if asked

---

### Slide 13: POA&M Summary

```
Plan of Action & Milestones

Open Items: 9 (4 moderate, 5 low)

Key Milestones:
┌────────────────────────────────────────────────┐
│ Finding              │ Action        │ Due     │
├────────────────────────────────────────────────┤
│ SI-2 scan coverage   │ Add registry  │ Q1 2024 │
│ CM-7 min services    │ Node hardening│ Q2 2024 │
│ AU-6 log review      │ Automation    │ Q1 2024 │
└────────────────────────────────────────────────┘

Risk: All POA&M items are low/moderate severity
with compensating controls in place.
```

**Speaker Notes:**
- Summarize, don't read every item
- Explain compensating controls for key items
- Show realistic timelines
- Demonstrate accountability

---

### Slide 14: Risk Summary

```
Residual Risk Assessment

Overall Residual Risk: MODERATE

Risk Factors:
• Inherited cloud provider risks (accepted via FedRAMP)
• POA&M items with compensating controls
• Continuous monitoring gaps during transition

Risk Mitigations:
• Defense in depth across all layers
• Automated detection and response
• 24/7 monitoring capability
• Defined incident response procedures

Recommendation: Residual risk is acceptable given
mission criticality and security controls in place.
```

**Speaker Notes:**
- Be honest about residual risk
- Explain what moderate means for this system
- Highlight mitigations for key risks
- Don't claim zero risk—it destroys credibility

---

### Slide 15: Authorization Request

```
Authorization Request

We request the Authorizing Official grant:

    [Three-Year Authorization to Operate]
                    or
    [Continuous Authorization to Operate]

Scope: [SYSTEM NAME] as defined in authorization boundary

Conditions: Continuous monitoring per ConMon plan

Recommendation: Based on:
• Security posture demonstrated
• Managed residual risk
• Mission criticality

The ISSM recommends authorization.
```

**Speaker Notes:**
- State the specific ask clearly
- Reference ISSM recommendation
- Be prepared for conditions or caveats
- Thank the AO for their time and consideration

---

### Slide 16: Questions

```
Questions?



Supporting Materials Available:
• Complete System Security Plan
• Security Assessment Report
• POA&M Detail
• Evidence Repository Access
• Technical SMEs

Contact: [NAME] | [EMAIL] | [PHONE]
```

**Speaker Notes:**
- Open the floor for questions
- Have SMEs ready but don't volunteer them
- If asked something you don't know, offer to follow up
- Thank everyone for their time

---

## Leave-Behind: Executive Summary

Prepare a one-page executive summary the AO can reference after the briefing:

```
┌─────────────────────────────────────────────────────────────┐
│                    EXECUTIVE SUMMARY                         │
│                      [SYSTEM NAME]                           │
│                   Authorization Request                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MISSION: [One sentence mission description]                 │
│                                                              │
│  REQUEST: [ATO Type] for [Duration]                          │
│                                                              │
│  SECURITY POSTURE:                                           │
│  • [X]% controls implemented                                 │
│  • [Y] critical/high findings - all remediated               │
│  • Continuous monitoring operational                         │
│                                                              │
│  RESIDUAL RISK: Moderate                                     │
│  • POA&M: [X] items, all low/moderate                        │
│  • Compensating controls in place                            │
│                                                              │
│  RECOMMENDATION: ISSM recommends authorization               │
│                                                              │
│  CONTACT: [Name] | [Email] | [Phone]                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Pre-Briefing Checklist

### One Week Before
- [ ] Confirm date/time/location with AO office
- [ ] Send calendar invite with dial-in/video link
- [ ] Send agenda and any pre-read materials
- [ ] Confirm ISSM availability and support
- [ ] Schedule rehearsal with security team

### Day Before
- [ ] Rehearse full briefing with timer
- [ ] Test A/V equipment and screen sharing
- [ ] Print backup copies of deck and leave-behind
- [ ] Confirm SME availability for questions
- [ ] Review any recent AO feedback or concerns

### Day Of
- [ ] Arrive early / join call early
- [ ] Test screen sharing before AO joins
- [ ] Have backup phone number for AO office
- [ ] Bring: deck, leave-behind, SSP, SAR, POA&M
- [ ] Silence phones and close unnecessary apps

### After Briefing
- [ ] Send thank-you email within 24 hours
- [ ] Provide any follow-up information requested
- [ ] Document AO feedback and conditions
- [ ] Update authorization package as needed
- [ ] Schedule follow-up if decision deferred

---

## Common AO Questions & Response Frameworks

### "What keeps you up at night about this system?"

**Framework:** Be honest. Pick your top concern and explain what you're doing about it.

**Example Response:**
> "Honestly, my biggest concern is [specific concern]. We've mitigated this by [specific mitigation], and we're actively working on [improvement]. Our continuous monitoring would detect [related threat] within [timeframe]."

---

### "What happens if this system is compromised?"

**Framework:** Mission impact first, then detection and response capabilities.

**Example Response:**
> "If compromised, the impact would be [specific mission impact]. However, our [monitoring capability] would detect [indicators] within [timeframe]. Our incident response plan activates [team] who would [containment action], limiting blast radius to [scope]. Full recovery would take approximately [timeframe]."

---

### "How does this compare to similar systems?"

**Framework:** Reference benchmarks if available, methodology if not.

**Example Response:**
> "Compared to similar platforms, our [metric] is [comparison]. Our third-party assessment rated us [rating]. We've implemented [differentiator] which exceeds typical implementations."

---

### "Why should I trust your continuous monitoring?"

**Framework:** Demonstrate, don't just describe.

**Example Response:**
> "I can show you our live dashboard if you'd like. [Show dashboard]. You can see [current metric]. Last month, we detected and responded to [X] security events with an average response time of [Y]. Here's an example of an issue we caught and remediated: [specific example]."

---

### "What would you need from me beyond authorization?"

**Framework:** Be prepared to ask for support if needed.

**Example Response:**
> "The authorization itself is our primary need. However, [optional: additional resource/support needed]. We're committed to maintaining this posture and will keep you informed through [communication mechanism]."

---

## Download Formats

- [PowerPoint Template](./downloads/ao-briefing.pptx) — Editable PPTX
- [Google Slides](https://docs.google.com/presentation/d/xxx) — Make a copy
- [Keynote Template](./downloads/ao-briefing.key) — Mac users
- [PDF Example](./downloads/ao-briefing-example.pdf) — Reference only

---

**[← Back to Templates](/ato-ebook/templates)** | **[Back to Home →](/ato-ebook/home)**
