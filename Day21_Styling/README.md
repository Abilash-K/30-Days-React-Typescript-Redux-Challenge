# Day 21 - Styling in React

## Introduction
Master different styling approaches in React applications.

## CSS Modules

```tsx
// Button.module.css
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.primary {
  background-color: blue;
  color: white;
}

// Button.tsx
import styles from './Button.module.css';

const Button: React.FC<ButtonProps> = ({ variant }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      Click Me
    </button>
  );
};
```

## Styled Components

```bash
npm install styled-components
npm install --save-dev @types/styled-components
```

```tsx
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.variant === 'primary' ? 'blue' : 'gray'};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  return <StyledButton variant={variant}>{children}</StyledButton>;
};
```

## Emotion

```bash
npm install @emotion/react @emotion/styled
```

```tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const buttonStyle = css`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`;

const Button = styled.button<{ variant: string }>`
  ${buttonStyle}
  background-color: ${props => props.variant === 'primary' ? 'blue' : 'gray'};
`;
```

## Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```tsx
const Button: React.FC = () => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Click Me
    </button>
  );
};
```

## Material-UI (MUI)

```bash
npm install @mui/material @emotion/react @emotion/styled
```

```tsx
import { Button, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Button variant="contained" color="primary">
      Click Me
    </Button>
  </ThemeProvider>
);
```

## Exercises
Implement different styling approaches and compare them.

## 🚀 Next Steps
Tomorrow: Form Libraries!
