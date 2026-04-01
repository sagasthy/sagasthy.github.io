---
id: az-400-cheasheet
title: AZ-400 Weak Areas Cheatsheet
sidebar_position: 3
---

# AZ-400 Weak Areas Cheatsheet

> Compiled from quiz sessions 1–6. Every concept here was missed at least once.
> Use this as a last-mile review before exam day.

---

## 1. Lead Time vs Cycle Time

| Metric | Clock starts | Clock ends | Measures |
|---|---|---|---|
| **Lead Time** | Work item **created/requested** | Deployed to production | Full customer wait time |
| **Cycle Time** | Work item **actively started** (In Progress) | Deployed to production | Team's active work time |

**Rule:** Lead Time ≥ Cycle Time always. The gap between them is backlog wait time.

**Exam trigger words:**
- "from feature being requested" → **Lead Time**
- "from developer picks up / starts work" → **Cycle Time**

---

## 2. Secret Exposure Response Order

When a secret is pushed to a public repo:

```
1. REVOKE/ROTATE the secret immediately  ← neutralize threat first
2. AUDIT access logs (CloudTrail, etc.)  ← understand blast radius
3. REMOVE from git history (git filter-repo / BFG)
4. FORCE PUSH the cleaned history
```

**Why rotation is first:** Bots scan public GitHub repos in minutes. By the time your alert fires, the secret is likely already harvested. Cleaning history doesn't undo exposure — rotation does.

---

## 3. Azure Boards vs Azure Pipelines GitHub Integration

These are two separate integrations — do not confuse them:

| Integration | Purpose | Configured where |
|---|---|---|
| **Azure Boards GitHub App** | Link work items to commits/PRs via `AB#123` | Project Settings → **GitHub connections** |
| **Azure Pipelines GitHub App / service connection** | Trigger CI/CD pipelines from GitHub repo | Project Settings → **Service connections** |

**Exam trap:** A service connection of type "GitHub" in Azure Pipelines enables pipeline triggers — it does NOT enable `AB#` work item linking. You need the Boards GitHub connection for that.

---

## 4. Docker on Microsoft-Hosted Agents

**Docker is pre-installed** on Microsoft-hosted agents — no setup step needed.

| Agent | Docker available? |
|---|---|
| `ubuntu-latest` | ✅ Yes |
| `windows-latest` | ✅ Yes |
| `macOS-latest` | ✅ Yes |

Self-hosted agents are only needed when you require private network access, persistent state, custom hardware, or Managed Identity.

---

## 5. Trunk-Based Development + Feature Flags

**Core principle:** Integrate to main daily. Never use long-lived branches.

For features that take weeks to build:
- Merge to `main` daily ✅
- Hide behind a **feature flag** (Azure App Configuration) ✅
- Never create a long-lived branch ❌
- Never pause deployments ❌

**GitFlow** (develop, feature, release, hotfix branches) is the **opposite** of TBD.

---

## 6. `always()` vs `succeededOrFailed()` — The Cancellation Trap

| Condition | Runs on success | Runs on failure | Runs on **cancel** |
|---|---|---|---|
| `succeeded()` | ✅ | ❌ | ❌ |
| `failed()` | ❌ | ✅ | ❌ |
| `succeededOrFailed()` | ✅ | ✅ | ❌ |
| `always()` | ✅ | ✅ | ✅ |

**Rule:** If the scenario says "even if cancelled" → `always()`. No exceptions.

**Azure Pipelines equivalent:**
```yaml
condition: always()           # includes cancellation
condition: succeededOrFailed() # excludes cancellation
```

**GitHub Actions equivalent:**
```yaml
if: always()                  # includes cancellation
if: success() || failure()    # excludes cancellation
```

---

## 7. Cross-Stage Variable Passing (`stageDependencies`)

**Full pattern — every part is required:**

```yaml
# Stage 1 — set the output variable
steps:
  - script: echo "##vso[task.setvariable variable=ver;isOutput=true]1.2.3"
    name: setVer   # ← step name is REQUIRED for reference

# Stage 2 — read the output variable
variables:
  version: $[ stageDependencies.Stage1.JobName.outputs['setVer.ver'] ]
#            ^^^^^^^^^^^^^^^^^ cross-stage uses stageDependencies
#            not dependencies (that's same-stage only)
```

**Variable scope ladder:**

| Scope | Syntax |
|---|---|
| Same job | `$(varName)` |
| Same stage, different job | `$[ dependencies.JobA.outputs['step.var'] ]` |
| Different stage | `$[ stageDependencies.StageA.JobA.outputs['step.var'] ]` |

**Common mistakes:**
- Using `dependencies` instead of `stageDependencies` for cross-stage
- Using `$( )` instead of `$[ ]` (must be runtime expression)
- Missing `isOutput=true` in the logging command
- Missing `name:` on the step

---

## 8. Workload Identity Federation (WIF/OIDC)

**The answer whenever a scenario says:** "no stored secrets" + "works with hosted agents" + "credentials expire automatically"

| Auth method | Stored secret? | Works with hosted agents? | Auto-expires? |
|---|---|---|---|
| **WIF/OIDC** | ❌ No | ✅ Yes | ✅ Yes (per run) |
| Service principal + secret | ✅ Yes | ✅ Yes | ❌ No |
| Managed Identity | ❌ No | ❌ Azure VM only | ✅ Yes |
| SP + Certificate | ✅ Yes (cert) | ✅ Yes | ⚠️ Fixed expiry |

**For GitHub Actions to Azure:** Requires `permissions: id-token: write` in the workflow — without this, the OIDC token request silently fails.

---

## 9. Pipeline Artifacts vs Output Variables

| What you're passing | Use | Syntax |
|---|---|---|
| String/scalar (version number, status) | `isOutput=true` + `stageDependencies` | `##vso[task.setvariable variable=x;isOutput=true]value` |
| **Files / binaries** | **Pipeline artifacts** | `PublishPipelineArtifact@1` / `DownloadPipelineArtifact@2` |
| Reusable versioned packages | Universal Packages / Azure Artifacts | — |

**`isOutput=true` only passes strings — never files or binaries.**

---

## 10. Server-Side Hooks in Azure DevOps

**Azure DevOps hosted Git does NOT support server-side pre-receive hooks.**

To enforce commit message format, linting, or any code standard org-wide:

```
✅ Correct: PR build validation pipeline (cannot be bypassed with branch policy)
❌ Wrong:   Pre-commit hooks (client-side, bypassable with --no-verify)
❌ Wrong:   Server-side pre-receive hooks (not supported in Azure DevOps)
```

**The enforcement chain:**
```
PR opened → Branch policy triggers build validation → 
Lint step runs → Fails if non-conforming → PR blocked from merging
```

---

## 11. Cache@2 — First Run Behaviour

On the **first run** after adding Cache@2:
1. **Cache miss** — no cache exists yet
2. Pipeline runs normally (packages downloaded)
3. Cache is **saved** at the end of the run
4. All subsequent runs with the same key = **cache hit**

**Key design:**
```yaml
- task: Cache@2
  inputs:
    key: 'npm | "$(Agent.OS)" | package-lock.json'
    restoreKeys: |
      npm | "$(Agent.OS)"
    path: $(npm_config_cache)
```

**npm ci behaviour:** Always deletes and rebuilds `node_modules` — but uses `~/.npm` cache to avoid re-downloading tarballs. Cache hit ≠ skip rebuild. It means faster rebuild from local disk vs network.

---

## 12. Allowed Task Policy vs Extension Approval

Two separate controls — do not confuse:

| Control | Where | What it governs |
|---|---|---|
| **Marketplace extension approval** | Org Settings → Extensions | Whether extension can be **installed** |
| **Allowed task policy** | Org/Project Settings → Pipelines → Settings | Whether installed task can be **used in pipelines** |

**Exam scenario:** "Ensure only approved tasks can run in pipelines" → **Allowed task policy** (runtime enforcement)

Extension approval alone is not enough — once installed, all tasks in that extension are available to all pipelines until the task policy restricts them.

---

## 13. `github.ref` Full Ref Format

`github.ref` always returns the **full Git ref**, not just the branch name:

| What you expect | What `github.ref` actually contains |
|---|---|
| `main` | `refs/heads/main` |
| `v1.2.3` (tag) | `refs/tags/v1.2.3` |

**Correct ways to check branch:**
```yaml
# Option 1 — full ref
if: github.ref == 'refs/heads/main'

# Option 2 — ref_name (no prefix, cleaner)
if: github.ref_name == 'main'

# Option 3 — endsWith
if: endsWith(github.ref, '/main')
```

**`github.branch` does not exist.** `github.head_ref` only exists for `pull_request` events.

---

## 14. `$GITHUB_ENV` — Dynamic Variables Across Steps

**`export MY_VAR=value` only scopes to the current shell process** — not visible to subsequent steps.

To persist a variable across steps in the same job:
```bash
echo "MY_VAR=value" >> $GITHUB_ENV   # ✅ Correct
export MY_VAR=value                   # ❌ Only current step
```

**All three GitHub Actions special files:**

| File | Purpose | Syntax |
|---|---|---|
| `$GITHUB_ENV` | Set env var for subsequent steps | `echo "K=V" >> $GITHUB_ENV` |
| `$GITHUB_OUTPUT` | Set step output for other jobs | `echo "K=V" >> $GITHUB_OUTPUT` |
| `$GITHUB_STEP_SUMMARY` | Write to job summary page | `echo "## text" >> $GITHUB_STEP_SUMMARY` |

**Deprecated — never use:**
- `::set-env` → replaced by `$GITHUB_ENV`
- `::set-output` → replaced by `$GITHUB_OUTPUT`

---

## 15. `GITHUB_TOKEN` Cross-Repo Limit

**`GITHUB_TOKEN` is scoped to the current repository only — always. No exceptions.**

Adding `permissions: issues: write` expands what it can do **in the same repo**, but cannot cross repository boundaries.

| Need | Solution |
|---|---|
| Same-repo operations | `GITHUB_TOKEN` ✅ |
| Cross-repo operations | GitHub App installation token ✅ |
| Cross-repo (acceptable credential) | Fine-grained PAT ⚠️ |

**`GITHUB_TOKEN` push behaviour:** Commits pushed using `GITHUB_TOKEN` do NOT trigger new workflow runs (prevents infinite loops). PAT/App token pushes DO trigger workflows.

---

## 16. `continue-on-error` vs `if: always()` — Two Different Things

These are complementary, not interchangeable:

| | `continue-on-error: true` | `if: always()` |
|---|---|---|
| **Applied to** | The step/job that **might fail** | The step that **must run after failure** |
| **Purpose** | Allow failure without blocking pipeline | Ensure step runs regardless of prior outcome |
| **Failure visibility** | Step shown as ⚠️ failed (not blocking) | N/A — controls when to run |
| **Use case** | Non-critical lint, optional scans | Cleanup, publish results, notifications |

**At job level:** `continue-on-error: true` on a job makes it appear as succeeded to dependent jobs — they run even though the job failed internally.

---

## 17. SAML SSO PAT Authorization

When an org enforces SAML SSO:
- **Every credential** (PAT, SSH key, OAuth App) must be **explicitly authorized** for that org
- This applies to **new and existing** tokens — no grace period, no auto-authorization
- Authorization is **always self-service by the developer** — not admin-managed
- Only GitHub App installations require admin action

**Fix path:**
> GitHub Settings → Developer settings → Personal access tokens → Find token → Configure SSO → Authorize

**Symptom:** Public repo access works, private org repo gives 403 → SAML SSO authorization missing on the credential.

---

## 18. Workflow Security — Environment Required Reviewers

**Strongest gate against secret exfiltration via malicious workflow modifications:**

Environment required reviewers pause the workflow **before secrets are injected** — even if the workflow code is malicious.

**Defence-in-depth layers (know all):**

| Layer | Control | Threat mitigated |
|---|---|---|
| SHA pinning for actions | `uses: action@abc123sha` | Compromised third-party actions |
| Minimal `permissions:` | `permissions: contents: read` | Overprivileged token abuse |
| `pull_request` not `pull_request_target` | Use correct trigger | Fork PRs accessing base repo secrets |
| **Environment required reviewers** | Human approval before secrets exposed | Malicious workflow modifications |
| Branch protection on `.github/workflows/` | PR review required for workflow changes | Unauthorized workflow edits |

---

## 19. `pull_request_target` + Fork Code = Vulnerability

**The three-part signature of a pwn request attack:**
1. `on: pull_request_target` (runs in base repo context = secrets available)
2. `actions/checkout` with `ref: ${{ github.event.pull_request.head.sha }}` (checks out fork code)
3. Executing fork code (build, test, install scripts)

**Safe alternatives:**
```yaml
# Option 1 — Don't check out fork code
on: pull_request_target
- uses: actions/checkout@v4
  # No ref: = checks out base repo code only ✅

# Option 2 — Use workflow_run instead
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
# Runs after fork PR CI completes, full secret access ✅
```

---

## 20. npm Caching — Cache Hit ≠ Skip Rebuild

**`npm ci` always deletes and rebuilds `node_modules`** — even on cache hit.

What caching `~/.npm` gives you:
- Avoids re-downloading tarballs from npm registry ✅
- Still rebuilds `node_modules` from cached tarballs (fast, local disk) ✅
- Does NOT skip `node_modules` creation entirely ❌

**If the cache is restored to the wrong path** → `npm ci` won't find cached tarballs → full network download despite cache hit.

---

## 21. Azure Boards GitHub Connection vs Pipeline Service Connection

Revisited from mistake #3 — high frequency, worth repeating:

```
AB#456 in commit/PR → links to Azure Boards work item
→ Requires: Project Settings → GitHub connections (Boards App)

Pipeline triggered from GitHub push
→ Requires: Project Settings → Service connections (Pipelines GitHub App)
```

These are configured in different places and serve different purposes. The exam tests this distinction repeatedly.

---

## 22. `requireTemplate` — Hard vs Soft Controls

**Hard control (technical block):**
- `requireTemplate` at org/project level → pipeline REJECTED at startup if it doesn't extend approved template
- Allowed task policy → task BLOCKED at runtime

**Soft controls (require human review):**
- Branch policies on pipeline YAML files → requires PR review, but doesn't block execution
- CODEOWNERS → requires specific team approval for PRs, but doesn't block pipeline runs

**Two-part answer for "enforce all pipelines use approved template":**
1. `requireTemplate` enforcement (blocks non-compliant pipelines)
2. Templates stored in restricted repo with limited write access (prevents template tampering)

---

## 23. Stage Rerun vs Job Rerun

When a stage fails in Azure Pipelines:

| Action | What it does |
|---|---|
| **Rerun failed stages** | Reruns from the failed stage using the **same artifacts** from the original run |
| **Rerun failed jobs** | Reruns specific jobs within a stage |
| **Run new** | Starts a completely fresh pipeline run with a new build |

For hotfix scenarios → **Rerun failed stages** is correct because it reuses the same artifact without rebuilding.

---

## 24. Hybrid Pipeline Trigger Direction

| Direction | Mechanism |
|---|---|
| GitHub push → trigger Azure Pipeline | Azure Pipelines GitHub App or service connection |
| **GitHub Actions → trigger Azure Pipeline** | **`azure/pipelines` GitHub Action (calls REST API)** |
| Azure Pipeline completes → trigger another Azure Pipeline | `resources: pipelines:` in YAML |
| Azure Pipeline → trigger GitHub Actions | `repository_dispatch` webhook |

The `azure/pipelines` GitHub Action is purpose-built for calling Azure DevOps pipelines from GitHub Actions workflows.

---

## 25. DORA Metrics — Complete Quick Reference

DORA (DevOps Research and Assessment) defines four key metrics split into two categories:

| Category | Metrics | Measures |
|---|---|---|
| **Throughput** (speed) | Deployment Frequency, Lead Time for Changes | How fast you deliver |
| **Stability** (quality) | Change Failure Rate, Failed Deployment Recovery Time (MTTR) | How reliable your delivery is |

> High performers excel at **both** — speed and stability are not a trade-off in elite teams.

---

### Metric Definitions & How to Measure

| Metric | Definition | Measured as | Formula / Source |
|---|---|---|---|
| **Deployment Frequency** | How often code is deployed to production or released to end users | Deployments per day/week/month | Count of production deployments over time period |
| **Lead Time for Changes** | Time from first commit to code running in production | Duration (hours/days) | `deploy_timestamp − first_commit_timestamp` |
| **Change Failure Rate (CFR)** | % of deployments that cause a production failure requiring immediate remediation (hotfix, rollback, patch) | Percentage | `(failed deploys ÷ total deploys) × 100` |
| **Failed Deployment Recovery Time** (MTTR) | Time to restore service after a production failure caused by a deployment | Duration (hours/days) | `service_restored_timestamp − incident_start_timestamp` |

**Key distinction:** Lead Time measures delivery speed. Cycle Time (a related metric) measures only active work time. Lead Time ≥ Cycle Time always.

---

### Performance Bands

Overall DORA performance band is determined by the **lowest-performing metric**.

| Metric | Elite | High | Medium | Low |
|---|---|---|---|---|
| **Deployment Frequency** | Multiple times/day | Once/week – once/month | Once/month – once every 6 months | Less than once every 6 months |
| **Lead Time for Changes** | &lt; 1 hour | 1 day – 1 week | 1 week – 1 month | &gt; 1 month |
| **Change Failure Rate** | 0–15% | 0–15% | 0–15% | 46–60% |
| **Failed Deployment Recovery Time** | &lt; 1 hour | &lt; 1 day | 1 day – 1 week | &gt; 1 week |

**Exam trap:** Two strong metrics + one medium metric = overall **Medium** band. Strong metrics do not compensate for weak ones.

---

### Improving Each Metric

| Metric | Top levers to improve |
|---|---|
| **Deployment Frequency** | Trunk-based development, feature flags, CI/CD automation, smaller batch sizes |
| **Lead Time for Changes** | Reduce PR review wait time, automate tests, eliminate manual approval gates |
| **Change Failure Rate** | Automated testing coverage, canary/progressive deployments, shift-left quality |
| **Failed Deployment Recovery Time** | Automated rollback, feature flags for instant kill switches, observability/alerting |

---

### 5th Metric: Deployment Rework Rate *(added 2024)*

Introduced in the 2024 DORA report as a stability metric alongside CFR:

| Metric | Definition | Formula |
|---|---|---|
| **Deployment Rework Rate** | % of deployments that are **unplanned** and made to address a user-facing production incident (hotfix deployments) | `(unplanned/hotfix deploys ÷ total deploys) × 100` |

**Difference from CFR:** CFR counts failures; Rework Rate counts the reactive deployments those failures generate. A single failure can cause multiple hotfix deployments. CFR + Rework Rate together give a fuller stability picture.

> **AZ-400 exam note:** The exam objectives (updated July 26, 2024) are anchored to the four core metrics. Know the 5th metric conceptually but focus exam prep on the four keys.

---

### DORA Exam Trigger Words

| Phrase in question | Correct metric |
|---|---|
| "how often code reaches production" | Deployment Frequency |
| "from commit to production" | Lead Time for Changes |
| "from feature being requested" | Lead Time (includes backlog wait) |
| "from developer picks up / starts work" | Cycle Time (not a DORA metric, but related) |
| "% of deploys that break prod" | Change Failure Rate |
| "time to restore service after outage" | Failed Deployment Recovery Time / MTTR |
| "reactive / unplanned deployments" | Deployment Rework Rate |

---

## Quick-Fire Memory Anchors

```
Lead = customer's total wait
Cycle = team's active work

always() = runs even on cancel
succeededOrFailed() = skips on cancel

stageDependencies = cross-stage
dependencies = same-stage only

github.ref = refs/heads/main (full ref)
github.ref_name = main (name only)

GITHUB_TOKEN = same repo only, always
GitHub App token = cross-repo

$GITHUB_ENV = persist vars across steps
export = current step only

continue-on-error = allows failure on THIS step
if: always() = ensures NEXT step runs

WIF/OIDC = no secrets, hosted agents, auto-expire (all three)
Managed Identity = no secrets, Azure VM only

Push protection = blocks push (proactive)
Secret scanning detection = alerts after push (reactive)

requireTemplate = hard block (technical)
Branch policies = soft gate (human review)

Rerun failed stages = same artifact
Run new = fresh build
```

---

*Last updated: March 2026 — based on AZ-400 exam objectives updated July 26, 2024*