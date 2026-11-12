# Artefact Written Case — Software Engineer (Brasil)

Author: Cláudio de Oliveira

Role: Software Engineer — Brasil

This document contains the answers to the theoretical questions (Part 1) and a summary of the practical challenge (Part 2). The complete implementation, tests, and setup instructions are available in the public repository.

## Part 1 — Theoretical Questions

### 1. ReactJS and Next.js: rendering and strategies

#### a) Client-Side Rendering, Server-Side Rendering, and Static Site Generation

Client-Side Rendering (CSR) is the model in which the server sends a small HTML document and a JavaScript bundle. The browser downloads the bundle, executes React, and only then renders the interface. Data is usually requested from APIs after the first render, so the user often sees a loading state before the content appears. Navigation after the first load is fast because the application is already running in the browser.

Server-Side Rendering (SSR) is the model in which the server executes React for each request, fetches the required data, and returns HTML that already contains the page content. The browser can paint meaningful content before the JavaScript bundle finishes loading. After the bundle loads, React hydrates the HTML, attaching event handlers and making the page interactive. The server does the work per request, so the response can reflect data that changed seconds ago.

Static Site Generation (SSG) is the model in which the HTML is produced at build time and served as a static file, usually from a CDN. Every user receives the same pre-rendered document until a new build or a revalidation happens. It is the fastest option for content that does not depend on the user or on real-time data. Next.js also supports Incremental Static Regeneration, which keeps the static delivery model while revalidating pages in the background after a defined interval.

In the Next.js App Router, these ideas are combined. React Server Components are rendered on the server, client components are hydrated in the browser, routes can be static or dynamic, and a page can opt into per-request rendering with `export const dynamic = "force-dynamic"`. Streaming allows the server to send parts of the page as soon as they are ready instead of waiting for the slowest data source.

#### b) When each approach is advantageous or problematic

CSR is advantageous for authenticated dashboards, admin panels, internal tools, and applications with rich client-side interaction, such as drag-and-drop boards or offline-first experiences. After the first load, navigation feels instant and the server does not need to render UI per request. It becomes problematic for public pages that depend on search engine indexing, for users on slow devices or networks, and for pages where the first meaningful paint must be fast. It also tends to create request waterfalls, because the browser needs the JavaScript before it can discover which data to fetch.

SSR is advantageous for e-commerce product pages, search results, personalized feeds, and any page that needs both fresh data and good search engine visibility. For example, a product page can render the current price and stock availability on the server, which improves the first paint and avoids showing incorrect information. It becomes problematic when the backend is slow, because the user waits for the server and the data before receiving any HTML. It also increases server cost and complexity, since caching, hydration, and error handling must be designed carefully. Under heavy traffic, SSR without caching can become the bottleneck.

SSG is advantageous for marketing pages, blogs, documentation, landing pages, and catalogs that change infrequently. A blog post can be generated once and served from a CDN with excellent performance and low cost. It becomes problematic when the content must be personalized, changes constantly, or depends on user-specific data. A large catalog with thousands of pages can also make builds slow, which is why incremental revalidation and on-demand revalidation exist.

In practice, the decision is usually per route rather than per application. A common and effective combination is SSG for public content, SSR for pages that need fresh personalized data, and CSR for highly interactive areas behind authentication. Next.js supports this hybrid model, and the practical challenge in this repository uses server rendering for the task list because the list must reflect the current in-memory state on every request.

### 2. Backend: concepts and approaches

#### a) Main ways to implement a backend for a web application

There is no single correct backend architecture. The main approaches differ in how much operational complexity they add and how independently their parts can evolve.

A monolithic backend packages the entire server application as one deployable unit. It is the simplest option to build, test, deploy, and debug, and it keeps transactions and data access straightforward. A modular monolith keeps the single deployment but separates the code into clear modules with explicit boundaries. It is often the best starting point for a small team because it preserves simplicity while preparing the codebase for future extraction of services.

A microservices backend splits the application into independently deployable services, each owning a business capability and usually its own data store. This allows independent scaling and deployment, and it gives teams autonomy. The cost is distributed-system complexity: network failures, eventual consistency, service discovery, observability, versioning, and a much heavier operational footprint. Microservices are a good fit when the organization and the load justify them, not as a default.

A serverless backend runs functions on demand in a managed platform, often combined with managed databases, queues, and storage. It scales automatically and charges per use, which is attractive for spiky or unpredictable workloads. The trade-offs include cold starts, execution limits, local development friction, vendor lock-in, and less control over the runtime.

A Backend for Frontend (BFF) is an API layer dedicated to a specific client, such as web or mobile. It aggregates and shapes data for that client instead of exposing many internal services directly. It improves the client experience but adds another layer to maintain.

Independently of the deployment model, the API style must be chosen. REST is simple, cacheable, and broadly understood. GraphQL gives clients flexible queries and reduces over-fetching, at the cost of query complexity and caching challenges. RPC-style APIs, including tRPC and gRPC, focus on typed procedure calls and efficient contracts. WebSockets and Server-Sent Events handle real-time communication, while queues and event streams decouple background work.

The data layer is equally important. Relational databases such as PostgreSQL are a strong default when consistency and relationships matter. Document or key-value databases fit flexible schemas and specific access patterns. In-memory stores are excellent for caches, ephemeral state, and prototypes, but they lose data when the process restarts and are not shared across instances.

For this challenge, the backend is a modular monolith inside Next.js: a route handler exposes tRPC, the router delegates to controllers, controllers use an in-memory repository, and Zod validates the boundary. This keeps the responsibilities separated without adding infrastructure that the problem does not require.

#### b) tRPC: advantages and disadvantages

tRPC is a framework for building end-to-end type-safe APIs in TypeScript. The server defines a router with procedures, and the client imports the router type. Inputs, outputs, and errors are inferred directly from the server code, without generating schemas, clients, or OpenAPI documents.

The main advantages are developer experience and safety during refactoring. If a procedure input changes, the client stops compiling until it is updated. There is no contract drift between a handwritten API client and the server, and there is no code generation step. Zod (or another Standard Schema validator) can validate inputs at the boundary, and the inferred types flow to the client. For a full-stack TypeScript team, this removes a large class of integration bugs and makes small teams much faster. The TanStack Query integration also provides caching, invalidation, and mutation states with typed keys and options.

The main disadvantages come from the same coupling that makes it pleasant. tRPC is TypeScript-only, so it is not a good fit for public APIs consumed by third parties, native clients in other languages, or partners that need a stable, documented contract. The client and server versions are coupled, which matters when they are deployed separately. tRPC does not replace API versioning, documentation, or a public schema. Large routers can also become slow to type-check, and the HTTP semantics are less conventional than REST, so caching and error handling need deliberate design.

Regarding security, tRPC does not make an application secure by itself. Types are erased at runtime, so every input must still be validated and every procedure must still authorize the caller. Authentication and authorization belong in middleware or in the procedure context, together with rate limiting, request size limits, and protection against batching abuse. Cookie-based authentication still requires CSRF protection, secrets must remain on the server, and production errors should not expose stack traces or internal details. The practical challenge applies input validation with Zod and translates domain errors into meaningful tRPC errors, but authentication is intentionally out of scope.

Regarding typing, the main benefit is inference from the router type, and the main limitation is that the contract exists only in TypeScript. There is no runtime schema shared with other languages unless one is added separately. Error shapes are typed through the router as well, which is useful, but it also means that changing the error formatter can affect every client.

Regarding scalability, a tRPC server is still an HTTP server, so it scales horizontally in the same way as any stateless Node.js service. Batching reduces the number of round trips, which helps latency. Subscriptions require a stateful transport such as WebSockets or SSE, and long-running work should be moved to queues. The database is usually the first real bottleneck, not tRPC. For a very large system, splitting routers by domain, extracting heavy workloads into dedicated services, and adding caching and rate limiting are the natural next steps.

In summary, tRPC is an excellent choice for a TypeScript full-stack application with a trusted client and a team that values type safety and speed. It is a poor choice for a public, multi-language API that needs a formal contract, independent versioning, and broad client compatibility.

## Part 2 — Practical Challenge

### Overview

The practical challenge is a task management application built with Next.js 15 (App Router), React 19, TypeScript, tRPC 11, Zod, and TanStack Query. Tasks are stored in memory, exposed through tRPC, preloaded on the server, and managed through a small, accessible interface.

The implementation follows KISS and SOLID: each module has one reason to change, dependencies point inward, and the smallest useful abstraction is preferred over infrastructure that the problem does not need.

### How the requirements are met

Project setup: the application uses the latest Next.js 15 release, React 19, strict TypeScript, and tRPC configured so the frontend consumes the same router type as the backend.

Backend: a task has an `id` generated with `crypto.randomUUID()`, a required `title`, an optional `description`, and a `createdAt` timestamp in ISO 8601 format. The tRPC router exposes `create`, `list`, `getById`, `update`, and `delete`. The in-memory repository is injected into controllers by a composition root, which makes the backend easy to test without mocking infrastructure.

Validation and errors: Zod validates every input. A task cannot be created or updated with an empty or whitespace-only title, descriptions are limited in size, and an update must contain at least one field. Missing tasks produce a `NOT_FOUND` error with a message that identifies the missing identifier. A custom error formatter adds the first validation message to the error shape, so the frontend can show a readable message instead of a raw validation payload.

Frontend: the list page is a dynamic server component that calls the router on the server for every request and passes the first page to the client. The client hydrates that data with TanStack Query, so the initial list is present in the server-rendered HTML and remains interactive immediately. Deletion happens directly in the list, with a disabled button while the request is running and a success or error message afterwards. Creation and editing share one form with controlled inputs, client-side validation using the same schema as the server, pending states, and readable error messages. Loading, empty, success, and failure states are all represented in the interface.

Extras: the list uses cursor-based pagination and an `IntersectionObserver` to load the next page when the user approaches the end of the list. The repository includes a README with the architecture, decisions, and execution instructions, and the core logic is covered by automated tests.

### Main architecture decisions

The server is organized by responsibility: schemas validate the boundary, controllers implement use cases, the repository stores tasks, factories create entities, mappers convert entities to transport objects, and the tRPC middleware translates domain errors into protocol errors. This keeps the domain independent from the transport and makes each piece testable in isolation.

The domain entity uses private fields and getters, while the API returns plain objects. This explicit mapping avoids leaking a class with private fields into JSON serialization and keeps the transport contract stable.

The in-memory repository is stored on `globalThis`. In Next.js, server components and route handlers can be evaluated in different bundles, so a module-level variable alone could result in two separate stores. The global reference guarantees that the server-rendered list and the tRPC mutations see the same data during development and in a single-process deployment.

Server rendering is deliberate rather than accidental. The list page uses `force-dynamic` and calls the router through a server caller, so the HTML contains the current data. The client receives that first page as `initialData` and continues with TanStack Query for pagination, cache invalidation, and mutation feedback.

Pagination uses a cursor composed of the creation timestamp and the identifier of the last task. This keeps the position stable even if that task is deleted between page loads. A malformed cursor falls back to the first page, which keeps the list usable instead of failing with an error.

### How to run and test

Requirements: Node.js 20 or newer.

Install dependencies with `npm install`, start the development server with `npm run dev`, and open `http://localhost:3000`. Run the automated tests with `npm test`, check types with `npm run typecheck`, and create a production build with `npm run build`.

### Trade-offs and next steps

The in-memory store is intentional for this challenge, but it resets when the process restarts and is not shared across multiple instances. A production version would replace the repository with a database adapter, keeping the controllers and the API contract unchanged. Authentication and authorization are out of scope; a production version would add a session layer, per-procedure authorization, rate limiting, and request size limits. The next increments would be optimistic updates, end-to-end tests with a real browser, structured logging and tracing, and a formal API versioning strategy if external clients were introduced.
