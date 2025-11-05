import React from 'react';

// 1. Basic Component
export const Welcome: React.FC = () => {
  return <h1>Welcome to React Components!</h1>;
};

// 2. Component with Props
interface GreetingProps {
  name: string;
  age?: number;
}

export const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

// 3. Button Component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// 4. Card Component
interface CardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, footer, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="card-body">{children}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// 5. User Profile Component
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
}

interface UserProfileProps {
  user: User;
  onEdit?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  return (
    <div className="user-profile">
      {user.avatar && <img src={user.avatar} alt={user.name} />}
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span className={`badge badge-${user.role}`}>{user.role}</span>
      {onEdit && <button onClick={onEdit}>Edit</button>}
    </div>
  );
};

// 6. Product Component
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </p>
      <button 
        onClick={() => onAddToCart(product.id)}
        disabled={!product.inStock}
      >
        Add to Cart
      </button>
    </div>
  );
};

// 7. Container Component
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  maxWidth = '1200px',
  padding = '20px'
}) => {
  const style: React.CSSProperties = {
    maxWidth,
    padding,
    margin: '0 auto'
  };

  return <div style={style}>{children}</div>;
};
