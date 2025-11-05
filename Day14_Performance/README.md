# Day 14 - Performance Optimization

## Introduction
Optimize React applications with memo, useMemo, useCallback, and more.

## React.memo

```tsx
interface UserCardProps {
  user: User;
  onEdit: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = React.memo(({ user, onEdit }) => {
  console.log('UserCard rendered');
  
  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.user.id === nextProps.user.id;
});
```

## useMemo

```tsx
const ExpensiveComponent: React.FC<{ items: Item[] }> = ({ items }) => {
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>Total: {expensiveValue}</div>;
};
```

## useCallback

```tsx
const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ChildComponent onIncrement={handleIncrement} />
      <p>Count: {count}</p>
    </div>
  );
};

const ChildComponent = React.memo<{ onIncrement: () => void }>(({ onIncrement }) => {
  console.log('Child rendered');
  return <button onClick={onIncrement}>Increment</button>;
});
```

## Code Splitting with Lazy

```tsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```

## Virtual Scrolling

```tsx
import { FixedSizeList } from 'react-window';

const LargeList: React.FC<{ items: string[] }> = ({ items }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>{items[index]}</div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

## Exercises
Optimize components, measure performance, implement lazy loading.

## 🚀 Next Steps
Tomorrow: Code Splitting and Lazy Loading!
