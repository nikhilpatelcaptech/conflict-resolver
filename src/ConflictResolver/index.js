import React from 'react';
import ConflictResolver from './ConflictResolver';
import { conflictResponse } from './mockData';

export default function ConflictResolverPage() {
  return <ConflictResolver data={conflictResponse} />;
}
