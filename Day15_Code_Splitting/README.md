# Day 15 - Code Splitting and Lazy Loading

## Introduction
Improve app performance with code splitting and lazy loading techniques.

## React.lazy and Suspense

```tsx
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

const App: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
```

## Component-Level Splitting

```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

const Page: React.FC = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>Load Heavy Component</button>
      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
};
```

## Route-Based Splitting

```tsx
const routes = [
  { path: '/', component: lazy(() => import('./pages/Home')) },
  { path: '/about', component: lazy(() => import('./pages/About')) },
  { path: '/products', component: lazy(() => import('./pages/Products')) }
];
```

## Exercises
Implement code splitting for routes and components.

## 🚀 Next Steps
Tomorrow: Testing with Jest and React Testing Library!
