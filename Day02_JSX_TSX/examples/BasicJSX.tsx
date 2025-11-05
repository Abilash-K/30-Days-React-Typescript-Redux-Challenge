import React from 'react';

// Basic JSX Examples

// 1. Simple Element
export const SimpleElement: React.FC = () => {
  return <h1>Hello, React with TypeScript!</h1>;
};

// 2. Embedding Expressions
export const EmbeddingExpressions: React.FC = () => {
  const name = "TypeScript Developer";
  const age = 25;
  
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
      <p>Next year you will be {age + 1}.</p>
    </div>
  );
};

// 3. Multiple Elements with Fragment
export const MultipleElements: React.FC = () => {
  return (
    <>
      <h1>Title</h1>
      <p>First paragraph</p>
      <p>Second paragraph</p>
    </>
  );
};

// 4. Attributes
interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, width = 300 }) => {
  return <img src={src} alt={alt} width={width} />;
};

// 5. Conditional Rendering
interface GreetingProps {
  isLoggedIn: boolean;
  username?: string;
}

export const Greeting: React.FC<GreetingProps> = ({ isLoggedIn, username }) => {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
};

// 6. List Rendering
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong> - {user.email}
        </li>
      ))}
    </ul>
  );
};

// 7. Inline Styles
export const StyledComponent: React.FC = () => {
  const headingStyle: React.CSSProperties = {
    color: 'blue',
    fontSize: '24px',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0'
  };

  return <h1 style={headingStyle}>Styled with Inline CSS</h1>;
};

// 8. Dynamic Styles
interface AlertBoxProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ type, message }) => {
  const getAlertStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: '15px',
      borderRadius: '5px',
      margin: '10px 0',
      fontWeight: 'bold'
    };

    const colorMap = {
      success: { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
      error: { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' },
      warning: { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' },
      info: { backgroundColor: '#d1ecf1', color: '#0c5460', border: '1px solid #bee5eb' }
    };

    return { ...baseStyle, ...colorMap[type] };
  };

  return <div style={getAlertStyle()}>{message}</div>;
};

// 9. Event Handling
export const EventHandling: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', event.currentTarget);
    alert('Button was clicked!');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Type something..." 
        onChange={handleChange}
      />
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

// 10. Complex Example
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    opacity: product.inStock ? 1 : 0.6
  };

  const priceStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2ecc71'
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div style={cardStyle}>
      <h3>{product.name}</h3>
      <p style={priceStyle}>${product.price.toFixed(2)}</p>
      <p>{renderStars(product.rating)}</p>
      {product.inStock ? (
        <span style={{ color: 'green' }}>✓ In Stock</span>
      ) : (
        <span style={{ color: 'red' }}>✗ Out of Stock</span>
      )}
    </div>
  );
};
