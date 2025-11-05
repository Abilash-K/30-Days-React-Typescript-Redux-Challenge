# Day 07 - Component Lifecycle and useEffect

## Introduction
Learn about component lifecycle and side effects with useEffect hook.

## Component Lifecycle

### Mounting, Updating, Unmounting
Components go through these phases during their lifetime.

## useEffect Hook

### Basic Usage
```tsx
const Component: React.FC = () => {
  useEffect(() => {
    console.log('Component mounted');
    
    return () => {
      console.log('Component unmounting');
    };
  }, []);

  return <div>Content</div>;
};
```

### With Dependencies
```tsx
const DataFetcher: React.FC<{ id: number }> = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/data/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  return <div>{data && JSON.stringify(data)}</div>;
};
```

### Cleanup
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

## TypeScript with useEffect
Type your dependencies and cleanup functions properly.

## Best Practices
- Always specify dependencies
- Clean up subscriptions
- Avoid unnecessary re-renders

## Exercises
Build components with data fetching, timers, and subscriptions.

## 🚀 Next Steps
Tomorrow: Custom Hooks!
