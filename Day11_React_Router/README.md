# Day 11 - React Router with TypeScript

## Introduction
Build multi-page applications with React Router v6 and TypeScript.

## Installation
```bash
npm install react-router-dom
npm install --save-dev @types/react-router-dom
```

## Basic Routing

```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App: React.FC = () => (
  <BrowserRouter>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
```

## Route Parameters

```tsx
import { useParams, useNavigate } from 'react-router-dom';

interface UserParams {
  id: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<UserParams>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Profile: {id}</h1>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

// Route
<Route path="/user/:id" element={<UserProfile />} />
```

## Protected Routes

```tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## Nested Routes

```tsx
<Route path="/products" element={<ProductsLayout />}>
  <Route index element={<ProductList />} />
  <Route path=":id" element={<ProductDetail />} />
  <Route path="new" element={<NewProduct />} />
</Route>
```

## Exercises
Build a multi-page app with routing, protected routes, and navigation.

## 🚀 Next Steps
Tomorrow: HTTP Requests and Axios!
