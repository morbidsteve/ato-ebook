---
title: AO Briefing Deck Template
description: Authorization briefing presentation template with example content and speaking notes
published: true
tags: presentation, briefing, ao, authorization, template
editor: markdown
---

# AO Briefing Deck Template

A complete presentation template for requesting authorization from your Authorizing Official. This template includes realistic example content for a Kubernetes DevSecOps Platform—customize the bracketed sections for your specific system.

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
Enterprise DevSecOps Platform (DSOP)
Authorization Briefing

January 15, 2025

Presented by: [Your Name], Platform Engineering Lead
Supported by: [ISSM Name], Information System Security Manager
```

**Speaker Notes:**
- Introduce yourself and the ISSM
- Confirm time available for the briefing (recommend 45 minutes including questions)
- Ask if there are any specific areas of concern to address upfront
- Thank them for their time and the opportunity to brief

---

### Slide 2: Mission Context

```
Mission Context

The Enterprise DevSecOps Platform enables [Organization] to:

• Deploy mission applications 10x faster with built-in security
• Standardize software delivery across 47 programs of record
• Achieve continuous compliance instead of point-in-time assessments
• Support both managed and self-hosted deployment options

Deployment Flexibility:
  • Managed Service: Centrally-operated for teams wanting turnkey solutions
  • Local Installation: Self-hosted for programs with dedicated hardware,
                        air-gapped networks, or data residency requirements

User Community: 1,200 developers across 23 mission teams

Operational Since: Pilot launched Q2 2024
                   Full production capability requested
```

**Speaker Notes:**
- Connect the platform to agency modernization priorities
- Emphasize deployment flexibility - not one-size-fits-all
- Some programs have requirements (air-gapped, data residency) requiring local installation
- Both options use identical hardened runtime and inherit same security controls
- If asked: each program previously ran their own container infrastructure

---

### Slide 3: Mission Impact

```
Mission Impact

Without this platform:

❌ Each program procures separate container infrastructure ($2-5M each)
❌ Authorization timelines remain 12-18 months per system
❌ Security teams spread thin across incompatible environments
❌ No standardized controls = no automation = endless manual labor

Current State:
• 12 applications already deployed on pilot infrastructure
• 35 additional applications waiting for platform authorization
• $4.2M in projected annual savings from consolidation
• 3 programs delayed pending platform availability
```

**Speaker Notes:**
- Be specific about the cost and timeline impacts
- The $4.2M savings comes from avoided duplicate infrastructure purchases
- Programs waiting include [mention 1-2 priority programs if known]
- Emphasize this enables the mission, not just saves money

---

### Slide 4: System Overview

```
                    ┌─────────────────────────────────────┐
                    │     AUTHORIZATION BOUNDARY           │
                    │                                      │
                    │  ┌─────────────────────────────┐    │
                    │  │   Kubernetes Control Plane   │    │
                    │  │   (API Server, etcd, etc.)  │    │
                    │  └─────────────────────────────┘    │
                    │                                      │
                    │  ┌─────────────────────────────┐    │
                    │  │   Platform Services          │    │
                    │  │   Ingress, Service Mesh,     │    │
                    │  │   Logging, Monitoring        │    │
                    │  └─────────────────────────────┘    │
                    │                                      │
                    │  ┌─────────────────────────────┐    │
                    │  │   Security Tooling           │    │
                    │  │   Policy Engine, Runtime     │    │
                    │  │   Security, Vuln Scanning    │    │
                    │  └─────────────────────────────┘    │
                    │                                      │
                    └─────────────────────────────────────┘

INCLUDED IN SCOPE:
✓ Kubernetes control plane and worker nodes (3 clusters)
✓ Platform services: Istio service mesh, NGINX ingress, Fluentd logging
✓ Security tooling: OPA Gatekeeper, Falco runtime monitoring, Trivy scanning
✓ GitOps infrastructure: Flux CD, sealed secrets management

DEPLOYMENT OPTIONS:
✓ Managed Service: Centrally-operated clusters in cloud environment
✓ Local Installation: Self-hosted on program hardware (air-gapped capable)

EXCLUDED (Inherited - Managed Service):
→ AWS GovCloud infrastructure, physical security, hypervisor (FedRAMP High)

EXCLUDED (Inherited - Local Installation):
→ Physical security, hardware per hosting organization's authorization

EXCLUDED (Separate Authorization):
→ Mission applications (inherit platform controls, own app-specific)
```

**Speaker Notes:**
- Walk through each layer of the diagram
- Emphasize what's IN scope (the platform) vs OUT of scope (applications)
- Highlight deployment flexibility: managed service OR local installation
- Local installation supports air-gapped networks and data residency requirements
- Both options use identical hardened runtime - same security controls regardless of where deployed
- Cloud provider inheritance (managed) means ~40% of controls already satisfied
- Mission apps will have dramatically shorter ATOs because they inherit from this platform

---

### Slide 5: System Components

```
System Components - How It Works

┌─────────────────────────────────────────────────────────────────┐
│                     Developer Pushes Code                        │
└─────────────────────────────┬───────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  GitOps Pipeline                                                 │
│  • Automated security scanning                                   │
│  • Policy validation (no critical vulns, required labels)        │
│  • Signed container images only                                  │
└─────────────────────────────┬───────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Admission Control                                               │
│  • OPA Gatekeeper enforces 47 security policies                  │
│  • Blocks non-compliant deployments automatically                │
└─────────────────────────────┬───────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Runtime Environment                                             │
│  • Isolated namespaces per team                                  │
│  • Network policies (default deny)                               │
│  • Mutual TLS between all services                               │
│  • Continuous monitoring and alerting                            │
└─────────────────────────────────────────────────────────────────┘
```

**Speaker Notes:**
- Explain this is "shift left" security - problems caught before deployment
- 47 policies prevent things like: running as root, privilege escalation, missing resource limits
- If it doesn't pass the checks, it doesn't deploy. Period.
- This is the key to continuous compliance - enforcement, not just documentation

---

### Slide 6: Access Control

```
Security Posture: Access Control

How we control who accesses what:

Authentication:
✓ CAC/PIV authentication required for all users
✓ Integration with [Agency] ICAM via SAML 2.0
✓ Session timeout: 15 minutes idle, 8 hours maximum

Authorization:
✓ Role-based access control (RBAC) with 5 defined roles
✓ Namespace isolation - teams cannot access other teams' resources
✓ Cluster-admin limited to 4 platform operators
✓ All privileged access requires approval and is logged

Access Metrics:
• 1,247 total users across all teams
• 4 cluster administrators (platform team only)
• 23 namespace administrators (team leads)
• Quarterly access reviews with automated reporting

Evidence: Automated RBAC exports every 24 hours, access review completion logs
```

**Speaker Notes:**
- Emphasize CAC requirement - no passwords, no exceptions
- Namespace isolation is key - even if one team is compromised, others are protected
- The 4 cluster-admins all have background investigations and training
- Access reviews are automated - we run the report, leadership reviews

---

### Slide 7: Data Protection

```
Security Posture: Data Protection

How we protect data in transit and at rest:

In Transit:
✓ All external traffic: TLS 1.3 with FIPS 140-2 validated modules
✓ All internal traffic: Mutual TLS via Istio service mesh
✓ No unencrypted communication permitted (enforced by policy)

At Rest:
✓ etcd (cluster state): Encrypted with AWS KMS
✓ Persistent volumes: AES-256 encryption, customer-managed keys
✓ Secrets: Encrypted in etcd + Sealed Secrets for GitOps

Data Handling:
✓ No PII stored on platform (applications manage their own data)
✓ Logs scrubbed of sensitive content before storage
✓ 90-day log retention in encrypted S3 buckets

Data Classification: CUI (Controlled Unclassified Information)

Evidence: TLS configuration exports, KMS key policies, encryption audit reports
```

**Speaker Notes:**
- FIPS 140-2 validated means we're using approved cryptography
- Mutual TLS means every service proves its identity to every other service
- Customer-managed keys means we control rotation, not just the cloud provider
- If asked about FIPS: "Yes, we're using validated modules for all cryptographic operations"

---

### Slide 8: Vulnerability Management

```
Security Posture: Vulnerability Management

How we identify and fix security flaws:

Scanning Pipeline:
✓ Every container image scanned before entering registry
✓ Daily rescans of all images in registry
✓ Weekly scans of running workloads
✓ Infrastructure as Code scanned on every commit

Enforcement:
✓ Critical vulnerabilities: Blocked from deployment
✓ High vulnerabilities: 7-day remediation SLA, warning on deploy
✓ Medium/Low: 30/90-day SLA, tracked in dashboard

Current Metrics (Last 30 Days):
• 2,847 images scanned
• 23 critical vulnerabilities blocked at admission
• 156 high vulnerabilities remediated
• Average time to remediation: 3.2 days (critical), 5.1 days (high)

Evidence: Trivy scan reports, admission controller logs, remediation tracking
```

**Speaker Notes:**
- Key point: critical vulns are BLOCKED, not just detected
- Those 23 blocked images never made it to production
- We don't just find problems - we prevent them from reaching production
- Teams get notified immediately when their images have issues

---

### Slide 9: Monitoring & Response

```
Security Posture: Monitoring & Response

How we detect and respond to security events:

Continuous Monitoring Stack:
✓ Falco runtime threat detection on every node
✓ Kubernetes audit logs → SIEM (Splunk)
✓ Network flow logs → anomaly detection
✓ Custom alerts for 127 security-relevant events

Response Capability:
✓ 24/7 monitoring by Platform Security Team (3 FTEs)
✓ SOC integration for escalation
✓ Automated response for known attack patterns
✓ Incident response runbooks for top 20 scenarios

Performance Metrics:
• Mean time to detect: 4 minutes
• Mean time to acknowledge: 12 minutes
• Mean time to contain: 45 minutes (automated) / 2 hours (manual)
• Last 90 days: 47 alerts, 0 incidents, 3 exercises

Evidence: SIEM dashboards, alert logs, incident response records
```

**Speaker Notes:**
- Falco catches things like: shell spawned in container, sensitive file access, privilege escalation
- The 47 alerts were all true positives but non-incidents (e.g., blocked attempts)
- We exercise the response process quarterly - last exercise was [date]
- If asked: "I can show you the live dashboard right now if you'd like"

---

### Slide 10: Supply Chain Security

```
Security Posture: Supply Chain Security

How we ensure software integrity:

Approved Sources Only:
✓ Private container registry - no direct pulls from Docker Hub
✓ Base images from Iron Bank (DoD hardened) or internally built
✓ All third-party dependencies inventoried and scanned

Image Integrity:
✓ Cosign signatures required on all production images
✓ Signature verification at admission (unsigned = rejected)
✓ SBOM generated for every image

Pipeline Security:
✓ Signed commits required (GPG keys tied to CAC)
✓ Two-person review for production changes
✓ Immutable build environment
✓ Separation of build and deploy credentials

Evidence: Registry policies, Cosign verification logs, SBOM artifacts
```

**Speaker Notes:**
- Iron Bank images are already hardened and assessed - we inherit that work
- Unsigned images don't deploy. Period. No exceptions.
- SBOM lets us answer "are we affected by [new CVE]?" in minutes, not days
- This addresses the software supply chain requirements from EO 14028

---

### Slide 11: Compliance Status

```
Compliance Status

Control Implementation: 94% fully implemented

┌──────────────────────────────────────────────────┐
│██████████████████████████████████████░░░░│  94%  │
└──────────────────────────────────────────────────┘

By Control Family:
• Access Control (AC): 100% ✓
• Audit & Accountability (AU): 100% ✓
• Configuration Management (CM): 100% ✓
• Identification & Auth (IA): 100% ✓
• System & Comms Protection (SC): 100% ✓
• System & Info Integrity (SI): 89% (6 POA&M items)
• Contingency Planning (CP): 83% (2 POA&M items)

Continuous Compliance Features:
✓ OSCAL-based SSP updated automatically with config changes
✓ 100% of evidence collection automated
✓ Real-time compliance dashboard
✓ Drift detection and alerting
```

**Speaker Notes:**
- 94% is strong, and the gaps are all documented with remediation plans
- Automated evidence means we're not scrambling before assessments
- The OSCAL SSP stays current - when a config changes, documentation updates
- Drift detection means if someone manually changes something, we know immediately

---

### Slide 12: Findings Summary

```
Assessment Findings Summary

Third-Party Assessment by [3PAO Name], completed December 2024

                    Initial    Remediated    Open
────────────────────────────────────────────────────
Critical              1           1           0
High                  4           4           0
Moderate             11           8           3
Low                   7           2           5
────────────────────────────────────────────────────
Total                23          15           8

✓ All critical and high findings have been remediated
✓ Remaining 8 findings are low/moderate with compensating controls
✓ Full remediation scheduled for Q2 2025

Top Findings Remediated:
• Hardcoded credentials in config → Moved to Sealed Secrets
• Missing network policies → Default-deny implemented
• Incomplete audit logging → Full audit pipeline deployed
• Privileged containers → PSP enforcement enabled
```

**Speaker Notes:**
- We took the critical finding seriously - fixed within 48 hours
- The remaining 8 are documented in POA&M with realistic timelines
- Assessment team noted our "strong security culture and rapid remediation"
- If asked about specific findings, defer to detailed POA&M discussion

---

### Slide 13: POA&M Summary

```
Plan of Action & Milestones

Open Items: 8 (3 moderate, 5 low)

High-Priority Items:
┌─────────────────────────────────────────────────────────────────┐
│ Finding                   │ Action               │ Target Date  │
├─────────────────────────────────────────────────────────────────┤
│ SI-4: Expand log coverage │ Add node-level logs  │ Feb 2025     │
│ CP-9: Backup verification │ Automate restore test│ Mar 2025     │
│ CM-7: Min functionality   │ Node OS hardening    │ Mar 2025     │
└─────────────────────────────────────────────────────────────────┘

Compensating Controls for Open Items:
• SI-4: Application-level logging provides 90% visibility
• CP-9: Manual restore tested quarterly, last successful Dec 2024
• CM-7: Container-level restrictions limit exposure

Resource Commitment:
• 0.5 FTE dedicated to POA&M remediation
• Monthly progress reviews with ISSM
• Quarterly reporting to leadership
```

**Speaker Notes:**
- These are realistic timelines, not aspirational
- We have dedicated resources assigned - this isn't "fit it in when we can"
- The compensating controls reduce risk while we complete full remediation
- If asked: we prioritized critical/high because they represented real risk

---

### Slide 14: Risk Summary

```
Residual Risk Assessment

Overall Residual Risk: MODERATE (Acceptable)

Risk Factors:                          Mitigations:
─────────────────────────────────────────────────────────────────
• 8 open POA&M items                   • Compensating controls active
                                       • Dedicated remediation resources

• Multi-tenant environment             • Namespace isolation enforced
                                       • Network policies default-deny

• Rapid deployment cadence             • Automated security gates
                                       • No bypass capability

• Inherited cloud provider risks       • FedRAMP High authorization
                                       • Continuous monitoring

Risk-Benefit Analysis:
The platform significantly REDUCES organizational risk by:
• Eliminating 12+ separate infrastructure ATOs
• Enforcing consistent security controls
• Enabling continuous compliance vs. point-in-time
• Reducing human error through automation

Recommendation: Residual risk is acceptable given mission benefit
               and defense-in-depth security architecture.
```

**Speaker Notes:**
- Be honest about risks - AOs appreciate candor
- The key message: this platform reduces overall organizational risk
- Alternative is fragmented systems with inconsistent security
- "Moderate" is realistic and appropriate for this system

---

### Slide 15: Authorization Request

```
Authorization Request

We respectfully request the Authorizing Official grant:

     ┌─────────────────────────────────────────────────────┐
     │     CONTINUOUS AUTHORIZATION TO OPERATE (cATO)      │
     │                                                      │
     │     with ongoing authorization contingent upon:      │
     │     • Continuous monitoring per ConMon plan          │
     │     • Monthly posture reporting to AO                │
     │     • POA&M remediation per agreed schedule          │
     └─────────────────────────────────────────────────────┘

Scope: Enterprise DevSecOps Platform as defined in authorization boundary

ISSM Recommendation:

"Based on the demonstrated security posture, managed residual risk,
 and mission criticality, I recommend authorization. The platform's
 automated security enforcement and continuous monitoring provide
 superior assurance compared to traditional point-in-time ATO."

                                    — [ISSM Name], ISSM
```

**Speaker Notes:**
- State the specific ask clearly - we're requesting cATO
- Reference the ISSM recommendation explicitly
- Be prepared for questions or conditions
- Thank the AO for their time and consideration
- Note: we're committed to transparency - if our posture degrades, we'll report it

---

### Slide 16: Questions

```
                        Questions?




                Supporting Materials Available:

                • System Security Plan (OSCAL format)
                • Security Assessment Report
                • POA&M Detail with Evidence
                • Live Dashboard Demo
                • Technical Subject Matter Experts


                Point of Contact:
                [Your Name]
                [Email]
                [Phone]
```

**Speaker Notes:**
- Open the floor for questions
- Have SMEs available but don't volunteer them - let the AO ask
- If you don't know an answer, say "I'll follow up on that within 24 hours"
- Thank everyone for their time regardless of outcome
- Ask if there's anything else needed to support their decision

---

## One-Page Leave-Behind

Print and leave with the AO for reference:

```
┌─────────────────────────────────────────────────────────────────────┐
│                       EXECUTIVE SUMMARY                              │
│              Enterprise DevSecOps Platform (DSOP)                   │
│                    Authorization Request                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  MISSION                                                             │
│  Standardized container platform enabling rapid, secure deployment   │
│  of mission applications across 23 teams and 47 programs of record. │
│  Available as managed service or local installation (air-gap ready).│
│                                                                      │
│  REQUEST                                                             │
│  Continuous Authorization to Operate (cATO)                          │
│                                                                      │
│  SECURITY POSTURE                                                    │
│  • 94% of controls fully implemented                                 │
│  • 5 critical/high findings - all remediated                         │
│  • 100% automated evidence collection                                │
│  • Continuous monitoring operational 24/7                            │
│  • 47 security policies enforced at admission                        │
│                                                                      │
│  RESIDUAL RISK: Moderate (Acceptable)                                │
│  • 8 POA&M items remaining, all low/moderate severity                │
│  • Compensating controls in place for all open items                 │
│  • Remediation on track for Q2 2025 completion                       │
│                                                                      │
│  MISSION IMPACT                                                      │
│  • $4.2M annual savings from infrastructure consolidation            │
│  • 35 applications pending platform availability                     │
│  • Reduces application ATO timelines from months to weeks            │
│                                                                      │
│  RECOMMENDATION                                                      │
│  ISSM recommends authorization. Platform security controls exceed    │
│  traditional infrastructure and enable continuous compliance.        │
│                                                                      │
│  CONTACT                                                             │
│  [Your Name] | [Email] | [Phone]                                     │
│                                                                      │
│  Briefing Date: [Date]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Pre-Briefing Checklist

### One Week Before
- [ ] Confirm date/time/location with AO office
- [ ] Send calendar invite with dial-in/video link
- [ ] Send agenda and pre-read (executive summary only)
- [ ] Confirm ISSM availability and support
- [ ] Schedule internal rehearsal with security team
- [ ] Prepare backup laptop and printed materials

### Day Before
- [ ] Rehearse full briefing with timer (aim for 25 minutes)
- [ ] Test A/V equipment and screen sharing
- [ ] Print: deck (2 copies), leave-behind (3 copies), POA&M detail
- [ ] Confirm SME availability for questions
- [ ] Review any recent communications or concerns from AO office
- [ ] Get good sleep

### Day Of
- [ ] Arrive 15 minutes early / join call 5 minutes early
- [ ] Test screen sharing before AO joins
- [ ] Have backup phone number for AO office
- [ ] Bring: laptop, printed materials, phone, water
- [ ] Silence phones, close unnecessary apps, disable notifications
- [ ] Take a breath and remember: you know this system

### After Briefing
- [ ] Send thank-you email within 24 hours
- [ ] Provide any follow-up information requested (same-day if possible)
- [ ] Document AO feedback, questions, and any conditions
- [ ] Update authorization package with any required changes
- [ ] If decision deferred: schedule follow-up within 2 weeks
- [ ] Celebrate progress regardless of outcome

---

## Common AO Questions & Responses

### "What keeps you up at night about this system?"

**Good Answer:**
> "My biggest concern is ensuring our multi-tenant isolation holds up as we scale. We've mitigated this with namespace isolation, network policies, and runtime monitoring, but I think about it. We're also investing in chaos engineering to proactively test these boundaries. If isolation failed, our monitoring would detect cross-namespace traffic within seconds."

**Why It Works:** Honest, shows you've thought about it, demonstrates proactive mitigation.

---

### "What happens if this system is compromised?"

**Good Answer:**
> "It depends on the compromise type. If a single application container is compromised, namespace isolation and network policies contain the blast radius to that team's namespace. Lateral movement would trigger Falco alerts, and we'd have containment within minutes. If the control plane itself is compromised - which would require defeating multiple layers - we have the ability to fail over to backup clusters while we investigate. Full recovery from our worst-case scenario is approximately 4 hours."

**Why It Works:** Acknowledges the possibility, shows layered defense, demonstrates prepared response.

---

### "Why should I trust your continuous monitoring?"

**Good Answer:**
> "Great question - let me show you rather than tell you. [Share dashboard] This is our live security dashboard. You can see current alert status, compliance posture, and last scan results. Last month, we detected 47 security events, investigated all of them, and confirmed none were successful attacks. Here's an example: [show specific alert]. This was a blocked privilege escalation attempt that triggered immediately. I'm happy to give you read access to this dashboard if you'd like ongoing visibility."

**Why It Works:** Shows, doesn't just tell. Offers transparency.

---

### "How does this platform affect application ATOs?"

**Good Answer:**
> "That's actually one of the main benefits. Applications deployed on this platform inherit approximately 60% of their controls from the platform authorization. A typical application ATO that took 12 months previously can now be completed in 4-6 weeks because we've already addressed infrastructure security, baseline configurations, and continuous monitoring. We've completed 3 application ATOs on the pilot platform, averaging 5 weeks each."

**Why It Works:** Quantifies the benefit with real data.

---

### "What do you need from me beyond authorization?"

**Good Answer:**
> "Authorization is the primary need. Beyond that, I'd welcome periodic visibility - we plan to send monthly posture summaries, and I'd appreciate 15 minutes quarterly to brief you on any significant changes or emerging risks. If you ever have questions or concerns between those touchpoints, I'm always available."

**Why It Works:** Minimal ask, but establishes ongoing relationship.

---

## Customization Notes

To adapt this template for your specific platform:

1. **Replace bracketed items** `[like this]` with your specific information
2. **Update metrics** with your actual numbers (be honest, not aspirational)
3. **Adjust control percentages** based on your assessment results
4. **Modify the architecture diagram** to match your actual boundary
5. **Update the POA&M table** with your real findings and timelines

The speaker notes are suggestions - adapt to your personal style and comfort level.

---

**[← Back to Templates](/templates/mapping-matrix)** | **[Back to Home →](/)**
