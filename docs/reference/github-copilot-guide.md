---
id: github-copilot-guide
title: "GitHub Copilot Guide"
sidebar_position: 2
tags: [GitHub Copilot, Gen AI, Productivity, Reference]
---

# 🚀 GitHub Copilot Guide

> **A practical guide for developers, testers, scrum masters, and architects**

**Tags:** #github-copilot #gen-ai #productivity

---

## 📋 Copilot Throughout the SDLC

GitHub Copilot seamlessly integrates into every phase of your software development lifecycle:

|Phase|Usecases|
|---|---|
|Planning|- **Copilot Chat** can help you brainstorm and identify the best technologies for your project.  <br/>- **Copilot Chat** can create issues to help track your ideas.|
|Coding|- **Copilot code completion** helps add code as you type.  <br/>- **Next edit suggestions** (public preview) predicts the next edit you are likely to make and suggests a completion for it.  <br/>- **Copilot Chat** can answer questions and offer suggestions in a conversational environment.  <br/>- You can assign **Copilot coding agent** to an open issue and it will automatically raise a pull request to address the necessary changes.|
|Code Review|- **Copilot code review** gives you feedback in your favorite IDE, or as a pull request review on GitHub.|
|Testing|- **Copilot Chat** can help you write and debug tests.|
|Deployment|- **Copilot Chat** can help you configure continuous integration and continuous deployment (CI/CD) pipelines.|
|Operation|- **Copilot coding agent** (public preview) can raise pull requests for open issues.  <br/>- **Copilot Chat** can help with tasks you're working on yourself.|

---

## 💡 Common Use Cases

Discover how Copilot can enhance your daily workflow:

### 🔧 Development

- **Fix bugs** - Get suggestions for bug fixes and debugging assistance
- **Implement incremental new features** - Build features step-by-step with AI guidance
- **Code review**
    - _VS Code_ - Search for "Chat: Review" in Command Palette for open file review, or use Source Control `<>` Copilot Review Tool for uncommitted changes
    - _IntelliJ_ - Use "Review Code Changes" option in Commit tool

### 🧪 Testing & Quality

- **Improve test coverage** - Generate comprehensive test cases
- **Identify OWASP Top 10 issues** - Security vulnerability scanning
- **SQL analysis** - Explain plans, stored procedure analysis, and optimization

### 📝 Documentation & Communication

- **Update documentation** - Keep docs current with code changes
- **Explain complicated code/applications** - Generate clear explanations
- **Create issue descriptions** - Write detailed, structured issue descriptions
- **Generate PR summaries** - Auto-generate comprehensive pull request descriptions
- **Generate markdown tables** - Format data beautifully

### ♻️ Code Maintenance

- **Address technical debt** - Identify and resolve legacy issues
- **Code refactoring** - Modernize and optimize existing code

### 📊 Diagrams & Visualization

- **[Mermaid.js diagram generation](https://mermaid.live/edit#pako:eNpVjcFugkAQhl9lM6c2QYNVBPbQpELrxaQ9eCp4mMDIEmWXLEusBd69C8a0ndNMvu__p4NM5QQcjmd1yQRqw_ZxKpmdlyQSumxMhc2BzWbP_ZYMq5Ska882D1vFGqHqupTF483fjBKLut2oETOilKfhhqIp_y6pZ3Gyw9qo-vCX7C-qZ69J-SFs_X8iNNnUW3JEfsRZhppFqCcFHCh0mQM3uiUHKtIVjid0I03BCKooBW7XHPUphVQONlOj_FSquse0agsBtvvc2KutczQUl1ho_FVI5qQj1UoDfOFPFcA7-AK-XAfz5XrhuW64CrzQt_AKfBXMV2EY-p5rycINntaDA9_TU3ce-N7wA7cucxE)** - Generate technical diagrams as code:
    - Sequence diagrams
    - Flowcharts
    - Data flow diagrams
    - Architecture diagrams

### 📚 Learn More

## Explore additional use cases in the [Copilot Chat Cookbook](https://docs.github.com/en/copilot/tutorials/copilot-chat-cookbook?versionId=free-pro-team%40latest&productId=copilot&restPage=how-tos%2Cconfigure-custom-instructions%2Cadd-repository-instructions).

## ⚠️ Important Reminder

> **Always review AI-generated code!** Verify for completeness, accuracy, performance, security, and compliance with your organization's standards. Copilot is a powerful assistant, but human oversight is essential.

---

## 🎯 Copilot Modes

Choose the right mode for your task:

|Mode|Use|
|---|---|
|Ask|- For asking questions without making updates to source code.  <br/>- For general questions and getting code examples.  <br/>- For learning about a topic.|
|Edit|- You want to make a quick, specific update to a defined set of files.  <br/>- You want full control over the number of LLM requests Copilot uses.|
|Agent|- Your task is complex, and involves multiple steps, iterations, and error handling.  <br/>- You want Copilot to determine the necessary steps to take to complete the task.  <br/>- The task requires Copilot to integrate with external applications, such as an MCP server.|
|Plan|- Good for complex, multi-step coding tasks that require careful planning and coordination across multiple files.  <br/>- Can help with planning, execution, tracking for building complex features or performing large-scale refactoring.|

---

## 🤖 Available Models

Select the best model for your specific needs:

|Model|Best For|Tier|
|---|---|---|
|**Claude Sonnet 4.5**|Complex tasks, agent workflows, code review|Premium|
|**Claude Opus 4.5**|Most powerful reasoning & architecture|Premium|
|**Claude Haiku 4.5**|Fast, simple tasks|Premium|
|**GPT-5.1-Codex**|Advanced coding with planning|Premium|
|**GPT-5-Codex**|Code generation with task tracking|Premium|
|**GPT-5**|General-purpose coding|Premium|
|**GPT-5 mini**|Quick everyday tasks|Standard|
|**GPT-4.1**|Long documents, many files at once|Standard|
|**Gemini 2.5 Pro**|Multimodal tasks (images + code)|Premium|
|**Grok Code Fast 1**|Speed-optimized responses|Premium|

### Quick Guide

- **Fast coding:** GPT-5-Codex, Grok Code Fast 1
- **Deep analysis:** Claude Sonnet 4.5, Claude Opus 4.5
- **Everyday use:** GPT-5 mini, Claude Haiku 4.5
- **Large projects:** GPT-4.1
- **Task planning:** GPT-5.1-Codex

> **💎 Premium Usage Note:** Premium model requests are limited per user per month. Standard models (GPT-4.1, GPT-4o, GPT-5 mini) have no such limits.

## 📎 Providing Context

Give Copilot the right context for better results:

### Adding Files & Folders

- Copilot extensions for all major IDEs (JetBrains, VS Code, Visual Studio) provide visual options to attach specific files and folders
- Use **#** in chat to see a dropdown of available context options

### Workspace Context

To provide your entire codebase as context:

- **VS Code:** `@workspace`
- **IntelliJ:** `@project`
- **Visual Studio:** `@solution`

---

## ✍️ Prompt Engineering Best Practices

Craft effective prompts to get the best results from Copilot:

 - Be specific and detailed, see below example.
```
Generate unit tests for the class Calculator.java under src/test/java, use the standard JUnit package structure. Use Mockito for mocking the dependencies, follow Given-When-Then approach to setup the tests. For validation, execute test command “mvn test” and make sure to iterate and fix any issues until the test phase is successful.
```

- Providing a specific persona to use when responding to questions.
```
You're a senior software engineer who cares greatly about code quality, readability, and maintainability, can you review these code changes and provide comments/suggestions?
```

- Break down complex tasks when asking for suggestions/code completion.
  - **Poor:** Create a REST API for user management with authentication
  - **Efficient:** Breakdown into multiple steps and implement them individually.
	   Step 1: Start with the data model
	   Step 2: Add the repository layer
	   Step 3: Build the service layer
	   Step 4: Implement the REST controller
	   Step 5: Add security configuration
  
- Try to provide as much as relevant context as possible, in the form of files, screenshots. Provide sufficient/optimal context, do not add entire workspace to context unless it's necessary.
```
When asking to write a file import program, provide the sample file and if available desired structure of the imported models as context.
```

- Check for Copilot’s understanding of a codebase or a requirements diagram by asking specific questions before generating deliverable artifacts like code or design. This helps in identifying any gaps, removing assumptions and providing additional information in prompt or .github/copilot-instructions.md file for future reference.
- Use brainstorming approach (like to validate a particular tech stack for building a solution) and Copilot will ask relevant questions to discuss.
- Use “please” and “thank you”, it’s funny but polite prompts yield better results as AI models are trained on human interactions.
- Refer to following for tips and examples.
    - **Copilot Chat Prompt Tips:** [https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)
    - [https://github.com/github/awesome-copilot/blob/main/prompts](https://github.com/github/awesome-copilot/blob/main/prompts "https://github.com/github/awesome-copilot/blob/main/prompts")
    - [https://github.com/f/awesome-chatgpt-prompts/blob/main/prompts.csv](https://github.com/f/awesome-chatgpt-prompts/blob/main/prompts.csv)

---

### 🎨 Example Prompting Framework

Use this template structure for consistent, effective prompts:

```
[High-level goal]
[Specific requirements as bullet list]
[Examples/constraints]
[Expected outcome]
```

**Example:**

```
Write a function that validates email addresses

- Must support RFC 5322 standard formats
- Should reject obviously fake addresses (e.g., "test@test")
- Return boolean: true/false
- Example: validateEmail("user@example.com") → true
```

## ⚙️ Custom Instructions

Tailor Copilot's behavior to your team's standards and preferences:

### 📁 Repository-Level Instructions

- **`.github/copilot-instructions.md`** - Global instructions for the entire repository
- **`.github/instructions/NAME.instructions.md`** - Scoped instructions (e.g., frontend, backend)
- **`AGENTS.md`** - Maintain a readable log of custom chat modes

### 🏢 Organization-Level

- Available with **Enterprise plan** only

### 👤 Personal Instructions

- Available on **GitHub** platform

### 💡 Example Instructions

1. "Always respond in Spanish."
2. "Your style is a helpful colleague - minimize explanations but provide enough context to understand the code."
3. "Always provide examples in TypeScript."

## 📝 Git Commit Instructions

Customize how Copilot generates commit messages:

### Configuration File

**`.github/git-commit-instructions.md`**

### Example

```
When generating commit messages, extract the JIRA ticket id from the current branch, if present, and use it as a prefix for the summary of the commit message. JIRA ticket ids are of the form: "<JIRA_PROJECT_KEY>-XXXXX". The body of the commit message should be a "change log" style summary of the changes. The commit message should look like this:
- JIRA-TICKET: SUMMARY
- CHANGE description 1
- CHANGE description 2
```

---

## 🤝 Custom Agents

Create specialized AI assistants tailored to specific roles and tasks:

### What You Can Create

- **Personas and Roles:** Front-end developer, security reviewer, solution architect, etc.
- **Specialized Tasks:** Planning, code reviews, document generation

### Configuration

- **File location:** `.github/agents/<AGENT_NAME>.agent.md`
- **Access:** Custom agents appear in the dropdown below Ask, Agent & Edit modes

### Example

- [Tech Debt Remediation Plan](https://github.com/github/awesome-copilot/blob/main/agents/tech-debt-remediation-plan.agent.md)

> **Note:** Agents were called "chatmodes" in earlier versions of Copilot

## 💬 Custom Prompts

> **Availability:** JetBrains & VS Code only

Create reusable prompt templates for common tasks:

### Configuration

- **File location:** `.github/prompts/<PROMPT_NAME>.prompt.md`
- **Usage:** Type `/` in the chat window to access your custom prompts

## 🔍 Custom Prompts vs Instructions vs Agents

**When to use what?** Here's a quick comparison:

|Feature|Purpose|Best Used For|Example Use Case|Location / Usage|
|---|---|---|---|---|
|**Custom Prompts**|Reusable task-specific templates|- When you want to reuse a specific instruction set across your repo  <br/>- Automating frequent dev tasks with consistent structure|- Generate a unit test for this function  <br/>- Scaffold a new microservice with logging and health checks|`.github/prompts/*.prompt.md` — invoked via Copilot Chat using `/`|
|**Custom Instructions**|Define coding style, preferences, and project conventions|Enforcing consistent code practices across a team or repo|Use async/await, TypeScript, and JSDoc comments for all functions|`.github/copilot-instructions.md` — applied automatically|
|**Custom Agents**|Create specialized AI assistants with tailored behavior/tools|- When you want a full-on assistant persona tailored to a specific role or task domain.  <br/>- Domain-specific workflows like DevOps, QA, or documentation|A "DevOps Assistant" that understands Helm charts, Terraform, and GitHub Actions syntax|`.github/agents/*.agent.md` — selected in Copilot Chat mode dropdown|

---

## 💡 Pro Tips

Maximize your Copilot productivity with these helpful shortcuts and techniques:

- **📁 Batch Context:** Use "Add Folder to Chat" to include multiple files at once
- **⬆️ Quick Recall:** Press "Up Arrow" in chat to retrieve previous prompts and context
- **🔍 Debug Prompts:** View detailed logs at "View > Output > GitHub Copilot Chat"
- **📚 Templates:** Explore [awesome-copilot](https://github.com/github/awesome-copilot) for instruction templates
- **🎯 VS Code Features:** Use `@vscode` in chat for IDE-specific capabilities

## ⌨️ Keyboard Shortcuts

Speed up your workflow with keyboard shortcuts:

### Manual Code Completion by IDE

- **[VS Code](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions?tool=vscode)**
- **[JetBrains](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions?tool=jetbrains)**
- **[Visual Studio](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions?tool=visualstudio)**
- **[Eclipse](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions?tool=eclipse)**

### Complete Shortcut Reference

[View all keyboard shortcuts →](https://docs.github.com/en/copilot/reference/keyboard-shortcuts)

## 📚 Additional Resources

Expand your Copilot knowledge with these official resources:

### 📖 Documentation

- **[Copilot Chat Cookbook](https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/copilot-chat-cookbook)** - Practical recipes and examples
- **[Custom Instructions Guide](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)** - Configure team preferences
- **[Copilot Cheatsheet](https://docs.github.com/en/copilot/reference/cheat-sheet)** - Quick reference guide
- **[Keyboard Shortcuts](https://docs.github.com/en/copilot/reference/keyboard-shortcuts)** - Complete shortcut list

### 🎨 Templates & Examples

- **[awesome-copilot](https://github.com/github/awesome-copilot)** - Community templates and examples

---

**Happy Coding with Copilot! 🚀**

- **Copilot Changelog:** [https://github.blog/changelog/label/copilot/](https://github.blog/changelog/label/copilot/)
- [MermaidJs Live Editor](https://mermaid.live/edit#pako:eNpVjcFugkAQhl9lM6c2QYNVBPbQpELrxaQ9eCp4mMDIEmWXLEusBd69C8a0ndNMvu__p4NM5QQcjmd1yQRqw_ZxKpmdlyQSumxMhc2BzWbP_ZYMq5Ska882D1vFGqHqupTF483fjBKLut2oETOilKfhhqIp_y6pZ3Gyw9qo-vCX7C-qZ69J-SFs_X8iNNnUW3JEfsRZhppFqCcFHCh0mQM3uiUHKtIVjid0I03BCKooBW7XHPUphVQONlOj_FSquse0agsBtvvc2KutczQUl1ho_FVI5qQj1UoDfOFPFcA7-AK-XAfz5XrhuW64CrzQt_AKfBXMV2EY-p5rycINntaDA9_TU3ce-N7wA7cucxE)
- **MermaidJs Tutorial:** [https://mermaid.js.org/ecosystem/tutorials.html](https://mermaid.js.org/ecosystem/tutorials.html)