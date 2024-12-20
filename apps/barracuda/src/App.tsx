import React from 'react';
import './App.css';
import './output.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarLayout } from 'verticals-ui';
import { routes } from './appRoutes';
import { HomePage } from './pages';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';

function App() {
  //TODO: Change here when authentication is added
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      {/* navbar is used for mobile screens only, sidebar is for standard displays */}
      <SidebarLayout navbar={<NavBar />} sidebar={<SideBar />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          {routes.map(({ path, component: Component }) => {
            if (isAuthenticated) {
              return <Route key={path} path={path} element={<Component />} />;
            } else {
              return <Route key={path} path={'*'} element={<Navigate key={path} to={'/home'} />} />;
            }
          })}
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}
export default App;
