# 🧠 Issue Board – React Engineering Assessment

Welcome! This is a React case study designed to assess your skills in frontend architecture, state management, component design, and algorithmic
thinking.

You’ll build a **Kanban-style issue board** with interactive functionality, sorting logic, and user access control — similar to a simplified Jira or
GitHub Projects board.

---

## 🎯 Objective

Build a **React application** that lets users:

- View, search, and filter a list of issues
- Drag and drop issues between columns
- Automatically **sort issues** using a custom priority score
- **Undo** issue updates with rollback behavior
- Track and display **recently accessed issues**
- Apply **role-based permissions**
- Handle real-time updates (via polling or simulated sockets)

---

## 🛠️ Tech Stack

- React + TypeScript
- React Router
- Mock API via JSON
- LocalStorage
- (Optional) Drag & Drop: `@dnd-kit/core` or equivalent

---

## ✅ Functional Requirements

### 1. **Board View (`/board`)**

- Display issues in 3 columns: `Backlog`, `In Progress`, `Done`
- Support drag & drop or button-based movement between columns
- Optimistically update UI (simulate async save with 500ms delay)
- Allow undo within 5 seconds (use a toast or button)

### 2. **Search, Filter & Sort**

- Live search by title or tags
- Filter by assignee or severity
- Sort issues **by a priority score**, computed as:
  ```
  score = severity * 10 + (daysSinceCreated * -1) + userDefinedRank
  ```
    - Highest score appears first
    - If scores match, newer issues should appear higher

### 3. **Recently Accessed Sidebar**

- Track last 5 visited issues (clicks)
- Store in `localStorage`
- Display in a sidebar or modal

### 4. **Issue Detail Page (`/issue/:id`)**

- Show full issue info
- Include a “Mark as Resolved” action
- Clicking this updates status to `Done` and triggers UI update

### 5. **Role-Based Access**

- Use provided mock user:
  ```ts
  const currentUser = { name: "Alice", role: "admin" } // or "contributor"
  ```
- Only `admin` users can:
    - Move issues between columns
    - Update priority/status
    - Mark as resolved
- `contributor` users see a read-only view

### 6. **Polling / Real-Time**

- Poll issue list every 10 seconds OR simulate live updates
- Show last sync time in the UI

---

## ⚙️ Starter Code

This repo includes:

- All page routes wired with `React Router`
- Sample issues in `src/data/issues.json`
- Mock API with delay + simulated error in `src/utils/api.ts`
- User context in `src/constants/currentUser.ts`
- Navigation bar
- TypeScript types in `src/types.ts`

You're expected to build the real functionality and logic on top of this foundation.

---

## ✨ Bonus (If You Have Time)

- Pagination or virtual scroll
- Custom hook for polling
- Dark mode toggle
- Unit test for sorting algorithm or update logic

---

## 🧪 Evaluation Criteria

| Area              | What We’re Looking For                                    |
|-------------------|-----------------------------------------------------------|
| Code Quality      | Clear, idiomatic React code                               |
| Component Design  | Reusable, maintainable architecture                       |
| Algorithmic Logic | Priority score, sort stability, undo rollback             |
| State Management  | Clean handling of async and optimistic updates            |
| Access Control    | Role-based UI behavior                                    |
| UX Decisions      | Error handling, undo feedback, loading states             |
| Performance       | Avoiding unnecessary re-renders, memoization where needed |
| Testing (Bonus)   | Tests for critical logic                                  |

---

## ⏱️ Time Limit

This challenge is designed for **~90 minutes**. If you need a bit more time for polish, that’s okay — just let us know.

---

## 🔒 Dependency Rules

You may only use the dependencies already included in the project.

> ❗ No additional libraries or external packages are allowed — **except** for state management libraries such as:
> - [Zustand](https://github.com/pmndrs/zustand)
> - [Jotai](https://github.com/pmndrs/jotai)
> - [Recoil](https://recoiljs.org/)
> - or similar minimal state libraries

Please do **not** add other UI kits, form libraries, animation frameworks, etc.

The goal is to evaluate your architecture, state design, and React fundamentals — not your ability to wire up third-party tools.


---

## 🔒 Dependency Rules

You may only use the dependencies already included in the project.

> ❗ No additional libraries or external packages are allowed — **except** for state management libraries such as:
> - [Zustand](https://github.com/pmndrs/zustand)
> - [Jotai](https://github.com/pmndrs/jotai)
> - [Recoil](https://recoiljs.org/)
> - or similar minimal state libraries

Please do **not** add other UI kits, form libraries, animation frameworks, etc.

The goal is to evaluate your architecture, state design, and React fundamentals — not your ability to wire up third-party tools.

## 🚀 Getting Started

```bash
npm install
npm start
```

You’re good to go! Let us know when it’s ready for review.

---

Good luck — and have fun building!
