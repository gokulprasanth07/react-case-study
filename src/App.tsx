import React from 'react';
import { IssuesProvider } from './context/IssuesContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { Navigation } from './components/Navigation';
import { DarkModeToggle } from './components/DarkModeToggle';
import { UndoProvider } from './context/UndoContext';
import { RecentlyAccessedProvider } from './context/RecentlyAccessedContext';


const AppContent = () => {
  const { darkMode } = useTheme();
  return (
    <Router>
      <div className={darkMode ? 'dark' : ''} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Navigation />
          <DarkModeToggle />
        </div>
        <Routes>
          <Route path="/board" element={<BoardPage />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/board" />} />
        </Routes>
      </div>
    </Router>
  );
};

export const App = () => (
  <ThemeProvider>
    <UserProvider>
      <UndoProvider>
        <IssuesProvider>
          <RecentlyAccessedProvider>
            <AppContent />
          </RecentlyAccessedProvider>
        </IssuesProvider>
      </UndoProvider>
    </UserProvider>
  </ThemeProvider>
);