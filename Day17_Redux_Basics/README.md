# Day 17 - Redux Fundamentals

## Introduction
Learn Redux for predictable state management in large applications.

## Core Concepts

- **Store**: Single source of truth for application state
- **Actions**: Plain objects describing what happened
- **Reducers**: Pure functions that update state based on actions
- **Dispatch**: Method to send actions to store

## Setup

```bash
npm install redux react-redux @types/react-redux
```

## Basic Redux

```tsx
// actions/counterActions.ts
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// reducers/counterReducer.ts
interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0
};

export function counterReducer(
  state = initialState,
  action: { type: string }
): CounterState {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// store.ts
import { createStore } from 'redux';
import { counterReducer } from './reducers/counterReducer';

export const store = createStore(counterReducer);
export type RootState = ReturnType<typeof store.getState>;

// App.tsx
import { Provider } from 'react-redux';

const App: React.FC = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

// Counter.tsx
import { useSelector, useDispatch } from 'react-redux';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
```

## Typed Actions

```tsx
interface IncrementAction {
  type: 'INCREMENT';
}

interface DecrementAction {
  type: 'DECREMENT';
}

interface SetCountAction {
  type: 'SET_COUNT';
  payload: number;
}

type CounterAction = IncrementAction | DecrementAction | SetCountAction;

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'SET_COUNT':
      return { count: action.payload };
    default:
      return state;
  }
}
```

## Exercises
Build Redux store, actions, and reducers for todo app and user management.

## 🚀 Next Steps
Tomorrow: Redux Toolkit with TypeScript!
