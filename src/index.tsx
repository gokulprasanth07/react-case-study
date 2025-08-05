import React from 'react';
// import ReactDOM from 'react-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
reportWebVitals();


