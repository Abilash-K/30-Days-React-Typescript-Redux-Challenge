# Day 04 - State Management with useState

## 📚 Table of Contents
- [Introduction](#introduction)
- [What is State?](#what-is-state)
- [useState Hook](#usestate-hook)
- [State with TypeScript](#state-with-typescript)
- [Updating State](#updating-state)
- [Multiple State Variables](#multiple-state-variables)
- [State with Objects](#state-with-objects)
- [State with Arrays](#state-with-arrays)
- [Previous State](#previous-state)
- [Best Practices](#best-practices)
- [Exercises](#exercises)

## Introduction

Today we'll learn about state management in React using the useState hook with TypeScript.

## What is State?

State is data that changes over time in your component. Unlike props, state is managed within the component.

```tsx
// Props: Passed from parent (read-only)
// State: Managed by component (can change)
```

## useState Hook

The useState hook lets you add state to functional components:

```tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## State with TypeScript

### Basic Types

```tsx
// Number state
const [count, setCount] = useState<number>(0);

// String state
const [name, setName] = useState<string>('');

// Boolean state
const [isOpen, setIsOpen] = useState<boolean>(false);

// Array state
const [items, setItems] = useState<string[]>([]);
```

### Complex Types

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);

interface FormData {
  username: string;
  email: string;
  password: string;
}

const [formData, setFormData] = useState<FormData>({
  username: '',
  email: '',
  password: ''
});
```

## Updating State

### Direct Updates

```tsx
const [count, setCount] = useState(0);

// Increment
setCount(count + 1);

// Set to specific value
setCount(10);
```

### Function Updates

```tsx
const [count, setCount] = useState(0);

// Using previous state
setCount(prevCount => prevCount + 1);
```

## Multiple State Variables

```tsx
const UserForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <form>
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
    </form>
  );
};
```

## State with Objects

### Updating Object State

```tsx
interface User {
  name: string;
  email: string;
  age: number;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (name: string) => {
    setUser(prev => ({ ...prev, name }));
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />
    </div>
  );
};
```

## State with Arrays

```tsx
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = (todo: string) => {
    setTodos(prev => [...prev, todo]);
  };

  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  const updateTodo = (index: number, newValue: string) => {
    setTodos(prev => prev.map((todo, i) => i === index ? newValue : todo));
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <span>{todo}</span>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
```

## Previous State

Always use functional updates when new state depends on previous state:

```tsx
// ❌ Wrong
setCount(count + 1);
setCount(count + 1); // May not work as expected

// ✅ Correct
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Works correctly
```

## Best Practices

1. **Initialize with correct type**
2. **Use functional updates for dependent state**
3. **Keep state minimal**
4. **Don't duplicate props in state**
5. **Group related state**

## Exercises

### Exercise 1: Counter App
Create a counter with increment, decrement, and reset.

### Exercise 2: Todo List
Build a todo list with add, remove, and toggle complete.

### Exercise 3: Form Handler
Create a form with multiple inputs and validation.

### Exercise 4: Shopping Cart
Build a shopping cart with add/remove items and quantity.

### Exercise 5: User Settings
Create a settings panel with various options.

## 🎯 Key Takeaways

- State is mutable data managed by component
- useState hook adds state to functional components
- TypeScript provides type safety for state
- Use functional updates for dependent state
- Keep state minimal and organized

## 📝 Summary

Today you learned:
✅ What state is and how it differs from props
✅ How to use useState hook with TypeScript
✅ Managing different types of state
✅ Updating state correctly
✅ Best practices for state management

## 🚀 Next Steps

Tomorrow in **Day 05**, we'll learn about Event Handling and Forms!
