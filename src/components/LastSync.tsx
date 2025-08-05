import React from 'react';

export const LastSync: React.FC<{ lastSync: Date | null }> = ({ lastSync }) => (
  <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>
    Last sync: {lastSync ? lastSync.toLocaleTimeString() : 'Never'}
  </div>
);
