# Day 02 - JSX and TSX Fundamentals

## 📚 Table of Contents
- [Introduction](#introduction)
- [What is JSX?](#what-is-jsx)
- [What is TSX?](#what-is-tsx)
- [JSX Syntax Rules](#jsx-syntax-rules)
- [Embedding Expressions](#embedding-expressions)
- [JSX Attributes](#jsx-attributes)
- [Conditional Rendering in JSX](#conditional-rendering-in-jsx)
- [Lists and Keys](#lists-and-keys)
- [Fragments](#fragments)
- [Styling in JSX](#styling-in-jsx)
- [TypeScript in TSX](#typescript-in-tsx)
- [Best Practices](#best-practices)
- [Exercises](#exercises)

## Introduction

Welcome to Day 02! Today, we'll explore JSX (JavaScript XML) and TSX (TypeScript XML), which are the templating languages used in React with JavaScript and TypeScript respectively.

## What is JSX?

JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code directly in your JavaScript files.

```jsx
// Without JSX
const element = React.createElement('h1', null, 'Hello, World!');

// With JSX
const element = <h1>Hello, World!</h1>;
```

### Why JSX?
- **Intuitive**: Resembles HTML, making it easier to visualize UI
- **Powerful**: Full power of JavaScript within markup
- **Type-Safe**: Errors caught at compile time (especially with TypeScript)
- **Optimized**: React optimizes JSX for better performance

## What is TSX?

TSX is JSX with TypeScript. It provides all the benefits of JSX plus TypeScript's type safety.

```tsx
// TSX with TypeScript types
interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
```

## JSX Syntax Rules

### 1. Single Root Element

JSX expressions must have **one** parent element:

```tsx
// ❌ Wrong - Multiple root elements
const App = () => {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
};

// ✅ Correct - Single root element
const App = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
};
```

### 2. Close All Tags

All tags must be closed, even self-closing tags:

```tsx
// ❌ Wrong
<img src="image.jpg">
<input type="text">

// ✅ Correct
<img src="image.jpg" />
<input type="text" />
```

### 3. Use camelCase for Attributes

HTML attributes in JSX use camelCase:

```tsx
// HTML
<div class="container" onclick="handleClick()">

// JSX/TSX
<div className="container" onClick={handleClick}>
```

Common conversions:
- `class` → `className`
- `for` → `htmlFor`
- `onclick` → `onClick`
- `onchange` → `onChange`
- `tabindex` → `tabIndex`

### 4. JavaScript Expressions in Curly Braces

Use `{}` to embed JavaScript expressions:

```tsx
const name = "John";
const age = 30;

const Greeting = () => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <p>Next year you will be {age + 1}.</p>
    </div>
  );
};
```

## Embedding Expressions

You can embed any JavaScript expression in JSX:

### Variables

```tsx
const greeting: string = "Hello, World!";
const element = <h1>{greeting}</h1>;
```

### Function Calls

```tsx
function formatName(user: { firstName: string; lastName: string }): string {
  return `${user.firstName} ${user.lastName}`;
}

const user = { firstName: "John", lastName: "Doe" };
const element = <h1>Hello, {formatName(user)}!</h1>;
```

### Arithmetic Operations

```tsx
const price: number = 99.99;
const quantity: number = 3;

const OrderSummary = () => (
  <div>
    <p>Price: ${price}</p>
    <p>Quantity: {quantity}</p>
    <p>Total: ${(price * quantity).toFixed(2)}</p>
  </div>
);
```

### Ternary Operators

```tsx
const isLoggedIn: boolean = true;

const Greeting = () => (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
  </div>
);
```

## JSX Attributes

### String Literals

```tsx
const element = <img src="photo.jpg" alt="My Photo" />;
```

### Expressions

```tsx
const imageUrl: string = "photo.jpg";
const altText: string = "My Photo";

const element = <img src={imageUrl} alt={altText} />;
```

### Spread Attributes

```tsx
interface ImageProps {
  src: string;
  alt: string;
  width?: number;
}

const props: ImageProps = {
  src: "photo.jpg",
  alt: "My Photo",
  width: 300
};

const element = <img {...props} />;
```

## Conditional Rendering in JSX

### Using If-Else Outside JSX

```tsx
interface UserProps {
  isLoggedIn: boolean;
  username: string;
}

const UserGreeting: React.FC<UserProps> = ({ isLoggedIn, username }) => {
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  }
  return <h1>Please sign in.</h1>;
};
```

### Ternary Operator

```tsx
const UserStatus: React.FC<{ isOnline: boolean }> = ({ isOnline }) => (
  <div>
    <span>Status: </span>
    <span style={{ color: isOnline ? 'green' : 'red' }}>
      {isOnline ? 'Online' : 'Offline'}
    </span>
  </div>
);
```

### Logical && Operator

```tsx
interface NotificationProps {
  messages: string[];
}

const Notification: React.FC<NotificationProps> = ({ messages }) => (
  <div>
    <h1>Inbox</h1>
    {messages.length > 0 && (
      <p>You have {messages.length} unread messages.</p>
    )}
  </div>
);
```

### Inline Conditional with null

```tsx
const Warning: React.FC<{ show: boolean }> = ({ show }) => (
  <div>
    {show ? <p>⚠️ Warning: This action cannot be undone!</p> : null}
  </div>
);
```

## Lists and Keys

### Rendering Lists

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" }
];

const UserList: React.FC = () => (
  <ul>
    {users.map(user => (
      <li key={user.id}>
        {user.name} - {user.email}
      </li>
    ))}
  </ul>
);
```

### Keys Are Important

Keys help React identify which items have changed, are added, or are removed:

```tsx
// ✅ Good - Using unique ID
<li key={user.id}>{user.name}</li>

// ⚠️ Acceptable - Using index (only if items never reorder)
<li key={index}>{user.name}</li>

// ❌ Bad - No key
<li>{user.name}</li>
```

### Complex Lists

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: "p1", name: "Laptop", price: 999, inStock: true },
  { id: "p2", name: "Mouse", price: 29, inStock: false },
  { id: "p3", name: "Keyboard", price: 79, inStock: true }
];

const ProductList: React.FC = () => (
  <div>
    {products.map(product => (
      <div key={product.id} className="product-card">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>
          Status: {product.inStock ? 
            <span style={{ color: 'green' }}>In Stock</span> : 
            <span style={{ color: 'red' }}>Out of Stock</span>
          }
        </p>
      </div>
    ))}
  </div>
);
```

## Fragments

Fragments let you group children without adding extra nodes to the DOM:

### Long Syntax

```tsx
const Table: React.FC = () => (
  <table>
    <tbody>
      <React.Fragment>
        <tr><td>Row 1</td></tr>
        <tr><td>Row 2</td></tr>
      </React.Fragment>
    </tbody>
  </table>
);
```

### Short Syntax

```tsx
const List: React.FC = () => (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
    <p>Another paragraph</p>
  </>
);
```

### When to Use Fragments

```tsx
// ❌ Adds unnecessary div
const Columns: React.FC = () => (
  <div>
    <td>Column 1</td>
    <td>Column 2</td>
  </div>
);

// ✅ No extra DOM node
const Columns: React.FC = () => (
  <>
    <td>Column 1</td>
    <td>Column 2</td>
  </>
);
```

## Styling in JSX

### Inline Styles

```tsx
const StyledDiv: React.FC = () => {
  const divStyle: React.CSSProperties = {
    color: 'blue',
    backgroundColor: 'lightgray',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px'
  };

  return <div style={divStyle}>Styled Content</div>;
};
```

### Dynamic Styles

```tsx
interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertStyles: React.CSSProperties = {
    padding: '15px',
    borderRadius: '4px',
    margin: '10px 0',
    backgroundColor: type === 'success' ? '#d4edda' :
                     type === 'error' ? '#f8d7da' :
                     '#fff3cd',
    color: type === 'success' ? '#155724' :
           type === 'error' ? '#721c24' :
           '#856404',
  };

  return <div style={alertStyles}>{message}</div>;
};
```

### CSS Classes

```tsx
// CSS file: styles.css
// .card { padding: 20px; border: 1px solid #ddd; }
// .card-active { border-color: blue; }

interface CardProps {
  title: string;
  isActive: boolean;
}

const Card: React.FC<CardProps> = ({ title, isActive }) => {
  const cardClass = `card ${isActive ? 'card-active' : ''}`;
  
  return (
    <div className={cardClass}>
      <h3>{title}</h3>
    </div>
  );
};
```

## TypeScript in TSX

### Typing Props

```tsx
interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};
```

### Typing Children

```tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
```

### Typing Events

```tsx
const EventExamples: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked', event.currentTarget);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
};
```

## Best Practices

### 1. Keep JSX Simple and Readable

```tsx
// ❌ Too complex
const ComplexComponent = () => (
  <div>
    {users.filter(u => u.isActive).map(u => (
      <div key={u.id}>
        {u.role === 'admin' ? <AdminPanel user={u} /> : <UserPanel user={u} />}
      </div>
    ))}
  </div>
);

// ✅ Better - Extract logic
const ComplexComponent = () => {
  const activeUsers = users.filter(u => u.isActive);
  
  const renderUserPanel = (user: User) => {
    return user.role === 'admin' 
      ? <AdminPanel user={user} /> 
      : <UserPanel user={user} />;
  };

  return (
    <div>
      {activeUsers.map(user => (
        <div key={user.id}>{renderUserPanel(user)}</div>
      ))}
    </div>
  );
};
```

### 2. Use Fragments to Avoid Extra DOM Nodes

```tsx
// ❌ Unnecessary wrapper
const Items = () => (
  <div>
    <li>Item 1</li>
    <li>Item 2</li>
  </div>
);

// ✅ Use fragment
const Items = () => (
  <>
    <li>Item 1</li>
    <li>Item 2</li>
  </>
);
```

### 3. Always Use Keys in Lists

```tsx
// ✅ Correct
{items.map(item => <Item key={item.id} data={item} />)}
```

### 4. Type Your Props

```tsx
// ✅ Always define prop types
interface ComponentProps {
  title: string;
  count: number;
  onUpdate?: () => void;
}

const Component: React.FC<ComponentProps> = (props) => {
  // Implementation
};
```

## Exercises

### Exercise 1: Basic JSX
Create a component that displays your personal information:

```tsx
interface PersonalInfoProps {
  name: string;
  age: number;
  hobbies: string[];
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ name, age, hobbies }) => {
  // TODO: Implement this component
  // Display name, age, and hobbies list
};
```

### Exercise 2: Conditional Rendering
Create a login status component:

```tsx
interface LoginStatusProps {
  isLoggedIn: boolean;
  username?: string;
}

const LoginStatus: React.FC<LoginStatusProps> = ({ isLoggedIn, username }) => {
  // TODO: Show "Welcome, {username}" if logged in
  // Show "Please log in" if not logged in
};
```

### Exercise 3: List Rendering
Create a todo list component:

```tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  // TODO: Render list of todos
  // Strike through completed items
  // Use green color for completed, black for incomplete
};
```

### Exercise 4: Styling
Create a styled card component:

```tsx
interface CardProps {
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Card: React.FC<CardProps> = ({ title, description, type }) => {
  // TODO: Create a card with different colors based on type
  // Use inline styles or CSS classes
};
```

### Exercise 5: Complex Component
Create a product catalog:

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  rating: number;
}

interface ProductCatalogProps {
  products: Product[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products }) => {
  // TODO: Display products in a grid
  // Show "Out of Stock" overlay for unavailable items
  // Display star rating
  // Format price with $ symbol
};
```

## 🎯 Key Takeaways

- JSX/TSX is a syntax extension that makes writing React components intuitive
- All JSX must have a single root element
- Use `{}` to embed JavaScript expressions
- TypeScript provides type safety for props and events
- Keys are essential when rendering lists
- Fragments help avoid unnecessary DOM nodes
- Inline styles use camelCase properties
- Conditional rendering can be done with ternary operators or logical &&

## 📝 Summary

Today you learned:
✅ What JSX and TSX are and how they work
✅ JSX syntax rules and best practices
✅ How to embed expressions and render dynamic content
✅ Conditional rendering techniques
✅ Rendering lists with keys
✅ Using fragments to group elements
✅ Styling components in JSX
✅ TypeScript integration with TSX

## 🚀 Next Steps

Tomorrow in **Day 03**, we'll explore Components and Props in depth, learning how to create reusable and type-safe components!

---

**Great job completing Day 02! 🎉**

Keep practicing and see you tomorrow!
