# Day 05 - Event Handling and Forms

## 📚 Table of Contents
- [Introduction](#introduction)
- [React Events](#react-events)
- [Event Handling with TypeScript](#event-handling-with-typescript)
- [Form Handling](#form-handling)
- [Controlled Components](#controlled-components)
- [Form Validation](#form-validation)
- [Multiple Inputs](#multiple-inputs)
- [Exercises](#exercises)

## Introduction

Today we'll master event handling and form management in React with TypeScript.

## React Events

React events are named using camelCase and use synthetic events:

```tsx
const ButtonExample: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', event);
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

## Event Handling with TypeScript

### Common Event Types

```tsx
// Mouse Events
const handleMouseEvent = (e: React.MouseEvent<HTMLElement>) => {};

// Keyboard Events
const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {};

// Form Events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

// Focus Events
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {};
```

## Form Handling

### Basic Form

```tsx
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
```

## Controlled Components

Controlled components have their value controlled by React state:

```tsx
interface FormData {
  username: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
    </form>
  );
};
```

## Form Validation

```tsx
interface ValidationErrors {
  email?: string;
  password?: string;
}

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
```

## Exercises

Build complete forms with validation, error handling, and submit functionality.

## 🎯 Key Takeaways

- React uses synthetic events
- TypeScript provides type safety for events
- Controlled components sync state with form inputs
- Always validate user input
- Handle form submission properly

## 🚀 Next Steps

Tomorrow in **Day 06**, we'll explore Conditional Rendering and Lists!
