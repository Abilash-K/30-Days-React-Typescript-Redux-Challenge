import React from 'react';

// Define props interface
interface WelcomeProps {
  name: string;
  age?: number; // Optional property
}

// Functional component with TypeScript
const Welcome: React.FC<WelcomeProps> = ({ name, age }) => {
  return (
    <div className="welcome-container">
      <h2>Hello, {name}!</h2>
      {age && <p>You are {age} years old.</p>}
      <p>Welcome to Day 01 of the 30 Days React TypeScript Challenge!</p>
    </div>
  );
};

export default Welcome;
