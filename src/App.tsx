import React from 'react';
import { IssuesProvider } from './context/IssuesContext';
import { UserProvider } from './context/UserContext';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { Navigation } from './components/Navigation';
import { UndoProvider } from './context/UndoContext';


export const App = () => {
  return (
    <UserProvider>
      <UndoProvider>
        <IssuesProvider>
          <Router>
            <Navigation />
            <Routes>
              <Route path="/board" element={<BoardPage />} />
              <Route path="/issue/:id" element={<IssueDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/board" />} />
            </Routes>
          </Router>
        </IssuesProvider>
      </UndoProvider>
    </UserProvider>
  );
}