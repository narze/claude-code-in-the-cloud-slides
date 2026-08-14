---
theme: default
title: Claude Code in the Cloud
info: |
  ## Slidev AI Template
  A minimal Slidev starter wired up for AI coding agents.

  Fork it, delete these example slides, and write your own deck in this file.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Work anywhere with <br> Claude Code in the Cloud

What, when, and why to use Claude Code's cloud environment

---
layout: default
---

# Quick survey

Raise your hand 🙋

- Who's using Claude Code?

<v-clicks>

- \+ Claude mobile app?
- \+ Claude Remote? (`/rc`)
- \+ Claude Code on the web?
- \+ Claude Routine?

</v-clicks>

---
layout: center
---

# Claude Code on multiple platforms

---
layout: default
---

# Claude Code on local machine

- Text Editor, IDE (Via extensions)
- Desktop App

---
layout: default
---

# Claude Code remote

- Also local, but control via mobile app i.e. "Remote control"
- Setting: `Enable Remote Control for all sessions`

---
layout: default
---

# Claude Code on the web

- aka. Claude Cloud
- Runs on Anthropic-managed cloud server
- GitHub Repo Integration

---
layout: center
---

# Claude Cloud vs Claude Remote

---
layout: center
class: align-center
---

# Claude Cloud vs Claude Remote

[Insert meme image here]

---
layout: default
---

# How to use Claude Cloud

- Desktop app
- Mobile app
- Web
- CLI

---

# Claude Cloud - Desktop

- Click `Local`, then change to `Cloud`, and add cloud environment

![](./images/desktop_add_cloud_env.png)

---

# Claude Cloud - Desktop

- Setup cloud environment

<center style="height: 85%">
<img src="./images/desktop_setup_cloud_environment.png" style="height: 100%" />
</center>

---

# Claude Cloud - Desktop

- Select repo to use

<center style="height: 85%">
<img src="./images/desktop_select_repo.png" style="height: 100%" />
</center>

---

# Claude Cloud - Web

Same as desktop, but runs on browser `https://claude.ai/code`

<center style="height: 85%">
<img src="./images/claude_code_web.png" style="height: 100%" />
</center>

---

# Claude Cloud - Mobile

<center style="height: 90%">
<div style="display: flex; gap: 2rem; align-items: center; height: 100%; justify-content: center;">
  <img src="./images/claude_code_mobile_sidebar.jpg" style="height: 100%;" />
  <img src="./images/claude_code_mobile.jpg" style="height: 100%;" />
</div>
</center>
---

# Claude Cloud - CLI

- `claude --cloud "Prompt"`
- Continue on app/web or CLI with `--teleport`
- Weird workflow, not recommended

<center style="height: 85%">
<img src="./images/claude_cloud_cli.png" style="height: 100%" />
</center>

---
layout: center
class: text-center
---

# Use cases & examples

---
layout: center
---
# Plan on mobile -> Implement -> PR opened

[Plan & work on commute, continue and review at work/home]

---
layout: center
---

# Use with connectors / skills

- `"Implement jira task EVP-1234"`
- `"Babysit github PR #5678"`
- `"Fix bug reported from Slack <link-to-slack-thread>"`
- `"Improve this UI/UX /grill-me <paste-image>"`<br>(Invoke repo-defined skill in `.claude/skills`)

---
layout: center
---

# Use with Claude Routine

- Claude Routine could also use cloud environment

---

![Claude Routine Cloud](./images/claude_routine_cloud.png)

---

# Claude Routine + Cloud
Automated PR from schedule & event trigger

- Daily - Fix my PR merge conflicts
- Daily - Scan unresolved issues on Sentry, choose one and fix it
- Github event - When PR merged, post changes summary in non-technical term to Slack
- Weekly - Update project's agent skill with `npx skills update -p`
- Custom `POST` webhook trigger

---

# Claude Cloud - The Good

<v-clicks>

- Works from any device
- Auth connectors once, use anywhere
- Anthropic-cloud is FREE* (For now)
- Sandboxed environment by default (code cloned from Github, your data is safe)
- No need to manage local resources, RAM is saved
- Parallel with no overhead (Bottleneck is you & your code reviewers)

</v-clicks>

---

# Claude Cloud - The Not So Good

<v-clicks>

- You need to prime your setup well, otherwise it will be slow and token-hungry
- Your local Claude skills, plugins may not work
- Cold-starts & cold-resume
- Harder to debug mid-session (no debugger, no shells, no logs, only prompt)

</v-clicks>

---

# Diagrams

Mermaid diagrams render directly in markdown.

```mermaid
graph LR
  A[Write markdown] --> B[Ask your agent]
  B --> C[Agent edits slides.md]
  C --> D[Preview live]
  D --> A
```

---
layout: center
class: text-center
---
# Your Turn

Replace these slides with your own content, or ask your AI agent to do it.

See `CLAUDE.md` for how the agent tooling in this template works.
