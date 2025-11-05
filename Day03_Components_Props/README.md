# Day 03 - Components and Props with TypeScript

## 📚 Table of Contents
- [Introduction](#introduction)
- [What are Components?](#what-are-components)
- [Types of Components](#types-of-components)
- [Props in React](#props-in-react)
- [Typing Props with TypeScript](#typing-props-with-typescript)
- [Default Props](#default-props)
- [Props Destructuring](#props-destructuring)
- [Children Props](#children-props)
- [Component Composition](#component-composition)
- [Props Best Practices](#props-best-practices)
- [Exercises](#exercises)

## Introduction

Welcome to Day 03! Today we'll dive deep into React components and props, learning how to create reusable, type-safe components with TypeScript.

## What are Components?

Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

```tsx
// A simple component
const Welcome: React.FC = () => {
  return <h1>Welcome to React!</h1>;
};
```

### Component Benefits
- **Reusability**: Write once, use anywhere
- **Maintainability**: Easy to update and debug
- **Testability**: Can be tested in isolation
- **Composition**: Build complex UIs from simple components

## Types of Components

### 1. Functional Components (Recommended)

```tsx
// Modern functional component
const Greeting: React.FC = () => {
  return <h1>Hello, World!</h1>;
};
```

### 2. Function Components with Props

```tsx
interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
```

### 3. Components with Return Type

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps): JSX.Element => {
  return <button onClick={onClick}>{label}</button>;
};
```

## Props in React

Props (properties) are arguments passed to React components. They are read-only and help make components dynamic and reusable.

### Basic Props Example

```tsx
interface UserProps {
  name: string;
  age: number;
  email: string;
}

const UserProfile: React.FC<UserProps> = ({ name, age, email }) => {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
};

// Usage
<UserProfile name="John Doe" age={30} email="john@example.com" />
```

## Typing Props with TypeScript

### Interface vs Type

Both can be used, but interfaces are generally preferred for props:

```tsx
// Using interface (Preferred)
interface CardProps {
  title: string;
  description: string;
}

// Using type
type CardProps = {
  title: string;
  description: string;
};
```

### Optional Props

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;  // Optional
  variant?: 'primary' | 'secondary';  // Optional with union type
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false,  // Default value
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

### Required vs Optional Props

```tsx
interface ProductProps {
  // Required props
  id: string;
  name: string;
  price: number;
  
  // Optional props
  description?: string;
  image?: string;
  discount?: number;
}

const Product: React.FC<ProductProps> = (props) => {
  const { id, name, price, description, image, discount } = props;
  
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      {description && <p>{description}</p>}
      {discount && <span>Discount: {discount}%</span>}
    </div>
  );
};
```

### Complex Prop Types

```tsx
// Union types
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

// Array props
interface ListProps {
  items: string[];
  numbers: number[];
}

// Object props
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface PersonProps {
  name: string;
  address: Address;
}

// Function props
interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  onChange?: (field: string, value: string) => void;
}

// Generic props
interface ListComponentProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
```

## Default Props

### Using Default Parameters

```tsx
interface GreetingProps {
  name?: string;
  greeting?: string;
}

const Greeting: React.FC<GreetingProps> = ({ 
  name = 'Guest',
  greeting = 'Hello' 
}) => {
  return <h1>{greeting}, {name}!</h1>;
};
```

### With Object Destructuring

```tsx
interface CardProps {
  title: string;
  description?: string;
  backgroundColor?: string;
  padding?: string;
}

const Card: React.FC<CardProps> = ({ 
  title,
  description = 'No description provided',
  backgroundColor = '#ffffff',
  padding = '20px'
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor,
    padding,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
```

## Props Destructuring

### Basic Destructuring

```tsx
// Without destructuring
const User: React.FC<UserProps> = (props) => {
  return <h1>{props.name}</h1>;
};

// With destructuring (Preferred)
const User: React.FC<UserProps> = ({ name }) => {
  return <h1>{name}</h1>;
};
```

### Nested Destructuring

```tsx
interface Address {
  street: string;
  city: string;
  country: string;
}

interface UserProps {
  name: string;
  address: Address;
}

// Destructure nested objects
const User: React.FC<UserProps> = ({ 
  name, 
  address: { street, city, country } 
}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{street}, {city}, {country}</p>
    </div>
  );
};
```

### Rest Props

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...rest }) => {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
};

// Usage: Can pass any HTML button attributes
<Button variant="primary" onClick={handleClick} disabled={false}>
  Click Me
</Button>
```

## Children Props

### Basic Children

```tsx
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};

// Usage
<Container>
  <h1>Title</h1>
  <p>Content</p>
</Container>
```

### Typed Children

```tsx
// String children only
interface TitleProps {
  children: string;
}

// Element children only
interface WrapperProps {
  children: React.ReactElement;
}

// Multiple children
interface LayoutProps {
  children: React.ReactElement[];
}

// Function as children
interface RenderProps {
  children: (data: string) => React.ReactNode;
}

const DataProvider: React.FC<RenderProps> = ({ children }) => {
  const data = "Hello from provider";
  return <div>{children(data)}</div>;
};

// Usage
<DataProvider>
  {(data) => <h1>{data}</h1>}
</DataProvider>
```

### Children with Props

```tsx
import React, { Children, cloneElement } from 'react';

interface TabsProps {
  activeTab: number;
  children: React.ReactElement[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, children }) => {
  return (
    <div className="tabs">
      {Children.map(children, (child, index) => 
        cloneElement(child, { isActive: index === activeTab })
      )}
    </div>
  );
};
```

## Component Composition

### Basic Composition

```tsx
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <header><h1>{title}</h1></header>;
};

interface FooterProps {
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return <footer><p>{copyright}</p></footer>;
};

interface PageLayoutProps {
  title: string;
  copyright: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, copyright, children }) => {
  return (
    <div className="page">
      <Header title={title} />
      <main>{children}</main>
      <Footer copyright={copyright} />
    </div>
  );
};
```

### Advanced Composition

```tsx
interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
}

interface CardFooterProps {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle }) => (
  <div className="card-header">
    <h3>{title}</h3>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

const CardBody: React.FC<CardBodyProps> = ({ children }) => (
  <div className="card-body">{children}</div>
);

const CardFooter: React.FC<CardFooterProps> = ({ children }) => (
  <div className="card-footer">{children}</div>
);

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({ children }) => {
  return <div className="card">{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Usage
const Example = () => (
  <Card>
    <Card.Header title="Title" subtitle="Subtitle" />
    <Card.Body>
      <p>Card content goes here</p>
    </Card.Body>
    <Card.Footer>
      <button>Action</button>
    </Card.Footer>
  </Card>
);
```

## Props Best Practices

### 1. Use Interfaces for Props

```tsx
// ✅ Good
interface UserProps {
  name: string;
  age: number;
}

// ❌ Avoid (unless you need type features)
type UserProps = {
  name: string;
  age: number;
};
```

### 2. Make Props Immutable

```tsx
// ❌ Wrong - Mutating props
const BadComponent: React.FC<UserProps> = (props) => {
  props.name = "Changed"; // Never do this!
  return <div>{props.name}</div>;
};

// ✅ Correct - Props are read-only
const GoodComponent: React.FC<UserProps> = ({ name }) => {
  const modifiedName = name.toUpperCase();
  return <div>{modifiedName}</div>;
};
```

### 3. Use Descriptive Prop Names

```tsx
// ❌ Bad
interface Props {
  fn: () => void;
  txt: string;
  flg: boolean;
}

// ✅ Good
interface ButtonProps {
  onClick: () => void;
  label: string;
  isDisabled: boolean;
}
```

### 4. Group Related Props

```tsx
// ❌ Bad - Too many individual props
interface UserComponentProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  country: string;
}

// ✅ Good - Grouped into objects
interface Address {
  street: string;
  city: string;
  country: string;
}

interface Contact {
  email: string;
  phone: string;
}

interface UserComponentProps {
  firstName: string;
  lastName: string;
  contact: Contact;
  address: Address;
}
```

### 5. Use Union Types for Variants

```tsx
interface BaseButtonProps {
  label: string;
  onClick: () => void;
}

type ButtonVariant = 
  | { variant: 'primary' }
  | { variant: 'secondary' }
  | { variant: 'danger'; confirmText: string };

type ButtonProps = BaseButtonProps & ButtonVariant;
```

## Exercises

### Exercise 1: User Card Component
Create a user card that displays user information:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
}

interface UserCardProps {
  user: User;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// TODO: Implement UserCard component
```

### Exercise 2: Product List
Create a product list with filtering:

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ProductListProps {
  products: Product[];
  category?: string;
  onProductClick: (product: Product) => void;
}

// TODO: Implement ProductList component
```

### Exercise 3: Form Components
Create reusable form components:

```tsx
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  error?: string;
  required?: boolean;
}

// TODO: Implement Input component

interface SelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

// TODO: Implement Select component
```

### Exercise 4: Modal Component
Create a reusable modal:

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

// TODO: Implement Modal component
```

### Exercise 5: Compound Component
Create a tabs component using composition:

```tsx
// TODO: Implement Tabs compound component
// Tabs, Tabs.Tab, Tabs.Panel

// Usage should be:
<Tabs defaultActiveTab={0}>
  <Tabs.Tab label="Tab 1" />
  <Tabs.Tab label="Tab 2" />
  <Tabs.Panel>Content 1</Tabs.Panel>
  <Tabs.Panel>Content 2</Tabs.Panel>
</Tabs>
```

## 🎯 Key Takeaways

- Components are the building blocks of React applications
- Props make components dynamic and reusable
- TypeScript provides type safety for props
- Use interfaces to define prop types
- Props are read-only and immutable
- Destructuring makes code cleaner
- Component composition enables building complex UIs
- Default props provide fallback values

## 📝 Summary

Today you learned:
✅ What components are and why they're important
✅ How to create functional components
✅ How to define and use props with TypeScript
✅ Optional and required props
✅ Default props and destructuring
✅ Children props and their types
✅ Component composition patterns
✅ Best practices for props

## 🚀 Next Steps

Tomorrow in **Day 04**, we'll explore State Management with useState hook and learn how to make components interactive!

---

**Excellent progress! Keep going! 🎉**
