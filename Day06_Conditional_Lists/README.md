# Day 06 - Conditional Rendering and Lists

## Introduction
Master conditional rendering patterns and list rendering with keys in React TypeScript.

## Conditional Rendering

### Ternary Operator
```tsx
const Greeting: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => (
  <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}</div>
);
```

### Logical && Operator
```tsx
const Notifications: React.FC<{ count: number }> = ({ count }) => (
  <div>{count > 0 && <p>You have {count} notifications</p>}</div>
);
```

### If-Else Statements
```tsx
const UserStatus: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return <p>Loading...</p>;
  if (user.role === 'admin') return <AdminPanel />;
  return <UserPanel />;
};
```

## Rendering Lists

### Basic List
```tsx
interface Item {
  id: number;
  name: string;
}

const ItemList: React.FC<{ items: Item[] }> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

### Keys Importance
Keys help React identify changed, added, or removed items.

## Exercises
Build components with conditional logic and dynamic lists.

## 🚀 Next Steps
Tomorrow: Component Lifecycle and useEffect!
