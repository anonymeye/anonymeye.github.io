---
title: "Building Apex: An Open-Source Platform for AI Chat Agents"
date: "2026-02-13"
excerpt: "How we built a full-stack platform to configure, run, and evaluate LLM agents over your own data—and what we learned."
---

# Building Apex: An Open-Source Platform for AI Chat Agents

*How we built a full-stack platform to configure, run, and evaluate LLM agents over your own data—and what we learned.*

---

## Why build this?

Most teams don’t need another generic chatbot. They need an assistant that knows *their* docs, *their* processes, and *their* tools. Building that usually means gluing together APIs, vector stores, and prompt engineering in a one-off repo. We wanted something more reusable: a single codebase that could define agents, plug in knowledge and tools, chat through a UI or API, and score responses with an LLM judge—without locking you into one vendor or one workflow.

So we built **Apex**: an open-source platform for building, configuring, and evaluating AI chat agents over your own knowledge base and tools. It’s not production-ready and doesn’t try to be. The goal is to show how a “semi-production” agent platform can be structured, and to share patterns that work when you care about evaluation, multi-tenancy, and flexibility.

This post walks through what Apex does, how it’s put together, and what we’d do next.

---

## What Apex does today

From a user’s perspective, Apex is a web app where you:

- **Sign up and switch organizations** — Multi-tenant from day one; JWT-based auth and org scoping.
- **Define connections and models** — Point at OpenAI, Anthropic, Groq, or any compatible API; store API keys via env vars, not in the DB.
- **Create agents** — Each agent has a name, system prompt, and attachments: one knowledge base, a set of tools, and a model (connection + model ref). No code required.
- **Manage knowledge** — Create knowledge bases, upload documents (PDF, text, etc.), and let the system embed and index them in a vector store. Documents are searchable; agents use them through RAG tools.
- **Define tools** — Custom tools with JSON schemas; RAG tools that query a specific knowledge base. You attach the right tools to each agent.
- **Chat** — In the portal (“Test Agent”) or via REST: send messages, get streaming or non-streaming replies, with conversation state kept in Redis so you can resume or clear.
- **Evaluate** — Save conversations from Test Agent, then run an evaluation: pick a saved conversation (single turn or whole thread), pick a judge config (prompt + rubric + model), and let a background worker run the judge and store scores. You can review and override scores in the UI.

Under the hood, the backend is a FastAPI app that delegates LLM orchestration to **Conduit**, a small Python library we use for agents, tool calling, RAG, and multi-provider support. The frontend is Next.js (App Router), TypeScript, shadcn/ui, and TanStack Query. PostgreSQL holds config and evaluation data; pgvector (or Qdrant) holds embeddings; Redis holds conversation state and the evaluation job queue. One `docker-compose up` brings the whole stack up.

---

## Architecture in a nutshell

- **Portal** → talks to **Apex API** over REST. Auth is JWT; org ID is in the token so every request is scoped.
- **Apex API** → handles CRUD for agents, knowledge, tools, connections, model refs, and evaluation (judge configs, saved conversations, runs). Chat and evaluation runs go through the same API; evaluation jobs are pushed to Redis.
- **Conduit** → used by Apex for the actual agent loop: load agent config, build the tool list (including RAG tools that hit the vector store), run the LLM, execute tools, and return the reply. Same code path for chat and for the eval worker when it “replays” a turn.
- **Eval worker** → separate process that pops run IDs from Redis, loads the run (and, for saved conversations, the message snapshot from the DB), calls the judge LLM, and writes scores back to PostgreSQL. No polling; the UI refetches when you navigate or click Refresh.

We deliberately kept evaluation explicit: no default judge model. You create judge configs (prompt template, rubric, model ref) in the UI and choose one when creating a run. API keys for the judge come from the same env vars as the rest of the app; the worker runs in the same Docker network so it shares Redis and Postgres with the API.

---

## Design choices that mattered

**DB as source of truth for evaluation.** Conversations start in Redis (chat state). For evaluation we didn’t want runs to depend on Redis still having that conversation. So when you “save” a conversation, we snapshot the messages into PostgreSQL. The eval worker reads from that snapshot. You can run evals long after the chat session is gone.

**Refetch and Refresh, not polling.** We didn’t want the UI to poll the server every few seconds for run status. Instead we made evaluation data always “stale” (zero staleTime) and refetch on window focus and when you land on the evaluation or run-detail page. We also added a manual “Refresh” button. So you see updates when you navigate or refocus, or when you click Refresh—no background timer.

**Industry-agnostic tools.** Agents don’t assume a fixed set of tools. You define tools (and RAG tools tied to knowledge bases) and attach them to agents. The platform stays generic; your use case drives the tools.

**Explicit judge config.** Evaluation isn’t magic. You configure the judge (prompt, rubric, model) and attach it to a run. That makes it clear what’s being run and makes it easy to try different judges or models without changing code.

---

## What we didn’t build (yet)

We left a lot out on purpose so the project stays understandable and runnable:

- **Fine-tuning** — No training module. We reverted an earlier LoRA/Colab experiment and left a short doc on options (datasets as refs, job tracking, “train elsewhere, connect here”). The training page in the portal is a stub.
- **Playbooks, experiments, monitoring** — No playbook engine, no A/B or experiment tracking, no real monitoring dashboard. Those pages exist as placeholders.
- **Guardrails and background triggers** — No built-in guardrails or scheduled/event-driven runs.
- **Channels and SDK** — No Slack, email, or embeddable widget; no first-class SDK. It’s portal and REST API only.

So Apex is “enough” to build an agent, feed it knowledge and tools, chat with it, and evaluate it with an LLM judge—and to see how we’d structure a larger agent platform—without pretending to be a complete product.

---

## Try it yourself

Clone the repo, copy `.env.example` to `.env`, set `SECRET_KEY`, database URL, Redis URL, and at least one LLM API key. Run `docker-compose up -d`, apply migrations, then open the portal. Create a connection and model ref, create an agent, optionally add a knowledge base and a RAG tool, then use Test Agent to chat. Save a conversation, create a judge config, run an evaluation, and check the run detail page 

If you’re building something similar—agents over your own data, with evaluation you control—we hope Apex and Conduit give you a useful reference. The repo is open source; contributions and feedback are welcome.

---

*Summary: Apex is an open-source platform for configuring AI chat agents, attaching knowledge and tools, chatting via UI or API, and evaluating responses with an LLM judge. This post outlined what it does, how it’s built, a few key design decisions, and what we intentionally left out. Try it with Docker and use the code and docs as a starting point for your own agent stack.*
