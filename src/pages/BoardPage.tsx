
import React from 'react';
import { Board } from '../components/Board';
import { RecentlyAccessedSidebar } from '../components/RecentlyAccessedSidebar';

export const BoardPage = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <RecentlyAccessedSidebar />
            <div style={{ flex: 1, padding: '1rem' }}>
                <Board />
            </div>
        </div>
    );
};
