import React, { useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { AuthPage } from './pages/AuthPage/AuthPage.jsx';
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Routes>
      {!auth && (
        <>
          <Route
            path="/login"
            element={<AuthPage authenticate={(auth) => setAuth(auth)}
          />} />
          <Route
            path="/registration"
            element={<SignUpPage
          />} />
        </>
      )}
      {auth && (
        <Route
          path="/passwords"
          element={<Dashboard />}
        />
      )}
      <Route
        path="*"
        element={<Navigate to={auth ? "/passwords" : "/login"}
      />} />
    </Routes>
  );
}

export default App;
