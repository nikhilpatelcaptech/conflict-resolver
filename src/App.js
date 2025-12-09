import React from 'react';
import ConflictResolver from './ConflictResolver/ConflictResolver';
import { conflictResponse } from './ConflictResolver/mockData';

export default function App() {
  return <ConflictResolver data={conflictResponse} />;
}
