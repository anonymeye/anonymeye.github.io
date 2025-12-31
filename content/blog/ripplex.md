---
title: "Building Ripplex: A Re-frame Inspired State Management Library for TypeScript"
date: "2025-12-31"
excerpt: "State management in modern web applications is a perennial challenge. Ripplex combines the architectural clarity and event-driven design of re-frame with the type safety and developer experience of TypeScript, bringing powerful abstractions to modern TypeScript applications."
---

# Building Ripplex: A Re-frame Inspired State Management Library for TypeScript

State management in modern web applications is a perennial challenge. While libraries like Redux have become industry standards, they often require significant boilerplate and can feel verbose for smaller applications. On the other end of the spectrum, simpler solutions like Zustand or Jotai offer ease of use but sometimes lack the structure needed for larger, more complex applications.

What if we could combine the best of both worlds? What if we could have the architectural clarity and event-driven design of re-frame (a popular ClojureScript state management library) with the type safety and developer experience of TypeScript?

That's exactly what we set out to build with **Ripplex**—a re-frame inspired state management library for TypeScript that brings event-driven architecture, powerful abstractions, and full type safety to modern TypeScript applications.

## The Philosophy: Events, Effects, and Coeffects

At its core, Ripplex follows the same architectural principles that make re-frame so powerful:

1. **Events** trigger state changes
2. **Effects** handle side effects (API calls, localStorage, etc.)
3. **Coeffects** provide dependencies to event handlers (like dependency injection)

This separation of concerns creates a clean, testable architecture where:
- State updates are pure and predictable
- Side effects are explicit and isolated
- Dependencies are injected, making testing trivial

### A Simple Example

Let's start with a basic counter to see how Ripplex works:

```typescript
import { createStore } from '@rplx/core'

const store = createStore({
  initialState: { count: 0 }
})

// Register an event handler
store.registerEventDb('increment', (context, payload) => {
  return { count: context.db.count + 1 }
})

// Dispatch the event
await store.dispatch('increment')
```

Notice how clean this is. The event handler receives a `context` object containing the current state (`context.db`) and returns the new state. No action creators, no reducers, no middleware—just events and handlers.

## The Core Package: @rplx/core

The core package is framework-agnostic and provides the foundation for all Ripplex applications. Let's explore its key features:

### Type-Safe Event Handlers

Ripplex leverages TypeScript's type system to provide full type safety throughout your application:

```typescript
interface AppState {
  count: number
  todos: Todo[]
}

interface AppCoeffects {
  uuid: string
  now: Date
}

const store = createStore<AppState, AppCoeffects>({
  initialState: { count: 0, todos: [] },
  coeffects: {
    uuid: () => crypto.randomUUID(),
    now: () => new Date()
  }
})

// TypeScript knows the exact shape of context
store.registerEventDb('add-todo', (context, payload: { title: string }) => {
  // context.db is AppState
  // context.uuid is string
  // context.now is Date
  const newTodo = {
    id: context.uuid,
    title: payload.title,
    completed: false,
    createdAt: context.now
  }
  return {
    ...context.db,
    todos: [...context.db.todos, newTodo]
  }
})
```

### Coeffects: Dependency Injection for Event Handlers

Coeffects are one of Ripplex's most powerful features. They allow you to inject dependencies into event handlers, making your code more testable and flexible:

```typescript
// In production
const store = createStore<AppState, AppCoeffects>({
  initialState,
  coeffects: {
    uuid: () => crypto.randomUUID(),
    now: () => new Date(),
    api: () => fetch('/api/data')
  }
})

// In tests
const testStore = createStore<AppState, AppCoeffects>({
  initialState,
  coeffects: {
    uuid: () => 'test-uuid-123',
    now: () => new Date('2024-01-01'),
    api: () => Promise.resolve({ json: () => ({ data: 'mock' }) })
  }
})
```

This pattern makes testing trivial—you can mock any dependency without modifying your event handlers.

### Effects: Explicit Side Effects

While event handlers return new state, effects handle side effects like API calls, localStorage, or dispatching other events:

```typescript
// Register an effect handler
store.registerEffect('http-xhrio', async (config) => {
  const response = await fetch(config.url, {
    method: config.method,
    body: JSON.stringify(config.body)
  })
  const data = await response.json()
  
  // Dispatch a success event
  await store.dispatch('api/success', { data })
})

// Use the effect in an event handler
store.registerEvent('fetch-data', (context) => {
  return {
    // No state change, just effects
    'http-xhrio': {
      url: '/api/data',
      method: 'GET'
    }
  }
})
```

Ripplex includes built-in effects like `dispatch` (for dispatching other events), `dispatch-n` (for dispatching multiple events), and `dispatch-later` (for delayed dispatches).

### Interceptors: Cross-Cutting Concerns

Interceptors are middleware-like functions that wrap event handlers. They run in two phases:
- **Before**: Executed in order before the handler
- **After**: Executed in reverse order after the handler

This creates a middleware pipeline similar to Express.js:

```typescript
import { path, debug, after } from '@rplx/core'

store.registerEventDb(
  'update-todo',
  [
    path(['todos']),           // Focus context on todos array
    debug('Before handler'),   // Log before execution
    after(console.log)         // Log after execution
  ],
  (context, payload) => {
    // context.db is now just the todos array
    return context.db.map(todo => 
      todo.id === payload.id 
        ? { ...todo, ...payload.updates }
        : todo
    )
  }
)
```

Built-in interceptors include:
- `path` - Focus context on a specific part of state
- `debug` - Log context at different phases
- `after` - Execute a function after the handler
- `injectCofx` - Inject additional coeffects
- `validate` - Validate payloads

### Subscriptions: Derived State

Subscriptions compute derived state from your store. They can be simple computations or complex derived values with dependencies:

```typescript
// Simple subscription
store.registerSubscription('counter/count', {
  compute: (state) => state.counter.count
})

// Derived subscription with dependencies
store.registerSubscription('todos/filtered', {
  deps: ['todos/all', 'todos/filter'],
  combine: (deps) => {
    const [todos, filter] = deps
    if (filter === 'active') return todos.filter(t => !t.completed)
    if (filter === 'completed') return todos.filter(t => t.completed)
    return todos
  }
})

// Parameterized subscription
store.registerSubscription('todos/byId', {
  deps: ['todos/all'],
  combine: (deps, id: string) => {
    const [todos] = deps
    return todos.find(todo => todo.id === id)
  }
})
```

Subscriptions are memoized and only recompute when their dependencies change, making them highly efficient.

## The React Package: @rplx/react

While the core package is framework-agnostic, the React package provides seamless integration with React applications through hooks and context.

### StoreProvider: Making the Store Available

The `StoreProvider` component makes your store available to all child components:

```tsx
import { createStore } from '@rplx/core'
import { StoreProvider } from '@rplx/react'

const store = createStore({
  initialState: { count: 0 }
})

function App() {
  return (
    <StoreProvider store={store}>
      <Counter />
    </StoreProvider>
  )
}
```

### useStoreState: Subscribing to State

The `useStoreState` hook subscribes your component to state changes:

```tsx
import { useStoreState } from '@rplx/react'

function Counter() {
  const state = useStoreState()
  
  return <div>Count: {state.count}</div>
}
```

The component will automatically re-render whenever the state changes. Under the hood, `useStoreState` uses React's subscription system to efficiently track changes.

### useDispatch: Dispatching Events

The `useDispatch` hook returns a memoized dispatch function:

```tsx
import { useDispatch } from '@rplx/react'

function Counter() {
  const dispatch = useDispatch()
  const state = useStoreState()
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch('increment')}>
        Increment
      </button>
    </div>
  )
}
```

### useSubscription: Derived State in Components

The `useSubscription` hook allows you to subscribe to computed/derived state:

```tsx
import { useSubscription } from '@rplx/react'

function TodoList() {
  // Subscribe to filtered todos
  const filteredTodos = useSubscription('todos/filtered')
  
  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}

function TodoItem({ id }: { id: string }) {
  // Subscribe to a parameterized subscription
  const todo = useSubscription('todos/byId', id)
  
  if (!todo) return null
  
  return <div>{todo.title}</div>
}
```

The `useSubscription` hook uses React's `useSyncExternalStore` under the hood, ensuring optimal performance and compatibility with React 18's concurrent features.

### createSubscriptionHook: Typed Subscription Hooks

For better developer experience, you can create typed hooks for specific subscriptions:

```tsx
import { createSubscriptionHook } from '@rplx/react'

// Create typed hooks once
const useTodos = createSubscriptionHook<Todo[]>('todos/all')
const useTodoById = createSubscriptionHook<Todo | undefined, [string]>('todos/byId')

// Use in components
function TodoList() {
  const todos = useTodos() // No key needed!
  return <div>{todos.map(...)}</div>
}

function TodoItem({ id }: { id: string }) {
  const todo = useTodoById(id) // Just pass params
  return <div>{todo?.title}</div>
}
```

This pattern makes your components cleaner and provides better TypeScript inference.

## Real-World Example: A Todo Application

Let's see how all these pieces come together in a real application:

```typescript
// store.ts
import { createStore } from '@rplx/core'

interface AppState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
}

const store = createStore<AppState>({
  initialState: {
    todos: [],
    filter: 'all'
  }
})

// Register event handlers
store.registerEventDb('todos/add', (context, payload: { title: string }) => {
  return {
    ...context.db,
    todos: [...context.db.todos, {
      id: crypto.randomUUID(),
      title: payload.title,
      completed: false
    }]
  }
})

store.registerEventDb('todos/toggle', (context, payload: { id: string }) => {
  return {
    ...context.db,
    todos: context.db.todos.map(todo =>
      todo.id === payload.id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  }
})

store.registerEventDb('todos/set-filter', (context, payload: { filter: 'all' | 'active' | 'completed' }) => {
  return {
    ...context.db,
    filter: payload.filter
  }
})

// Register subscriptions
store.registerSubscription('todos/all', {
  compute: (state) => state.todos
})

store.registerSubscription('todos/filter', {
  compute: (state) => state.filter
})

store.registerSubscription('todos/filtered', {
  deps: ['todos/all', 'todos/filter'],
  combine: (deps) => {
    const [todos, filter] = deps
    if (filter === 'active') return todos.filter(t => !t.completed)
    if (filter === 'completed') return todos.filter(t => t.completed)
    return todos
  }
})
```

```tsx
// TodoList.tsx
import { useDispatch, useSubscription } from '@rplx/react'

export function TodoList() {
  const dispatch = useDispatch()
  const filteredTodos = useSubscription('todos/filtered')
  const filter = useSubscription('todos/filter')
  
  const handleAdd = () => {
    const title = prompt('Enter todo title:')
    if (title) {
      dispatch('todos/add', { title })
    }
  }
  
  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      
      <div>
        <button 
          onClick={() => dispatch('todos/set-filter', { filter: 'all' })}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => dispatch('todos/set-filter', { filter: 'active' })}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          onClick={() => dispatch('todos/set-filter', { filter: 'completed' })}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch('todos/toggle', { id: todo.id })}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Why Ripplex?

So why choose Ripplex over other state management solutions?

### 1. **Event-Driven Architecture**
Events are first-class citizens in Ripplex. This makes your application's data flow explicit and easy to reason about. Every state change is triggered by an event, making debugging and tracing straightforward.

### 2. **Full Type Safety**
Ripplex leverages TypeScript's type system to provide end-to-end type safety. From event handlers to subscriptions to React hooks, everything is typed.

### 3. **Testability**
The coeffect system makes testing trivial. You can inject mock dependencies without modifying your event handlers, and event handlers are pure functions that are easy to test in isolation.

### 4. **Powerful Abstractions**
Interceptors, subscriptions, and effects provide powerful abstractions for common patterns. You can build complex applications with clean, maintainable code.

### 5. **Framework Agnostic Core**
The core package works with any framework (or no framework at all). We provide React bindings, but you can easily create bindings for Vue, Svelte, or any other framework.

### 6. **Performance**
Subscriptions are memoized and only recompute when dependencies change. The React integration uses `useSyncExternalStore` for optimal performance with React 18's concurrent features.

## Getting Started

Getting started with Ripplex is straightforward:

```bash
npm install @rplx/core @rplx/react
```

Create your store, register events and subscriptions, wrap your app with `StoreProvider`, and start using hooks in your components. The API is designed to be intuitive and powerful.

## Conclusion

Ripplex brings the architectural clarity and power of re-frame to TypeScript applications. By combining event-driven architecture, type safety, and powerful abstractions, Ripplex provides a state management solution that scales from small applications to large, complex ones.

Whether you're building a simple counter or a complex enterprise application, Ripplex's event-driven architecture, type safety, and powerful abstractions will help you build maintainable, testable, and scalable applications.

If you're interested in learning more, check out the [GitHub repository](https://github.com/anonymeye/ripplex) or try it out in your next project. The core package is framework-agnostic, and we provide React bindings out of the box, with Angular bindings also available.

---

*Ripplex is open source and available under the MIT license. Contributions and feedback are welcome!*

