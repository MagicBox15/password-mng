import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({username: "qwe", password: "qwe123"}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then((response) => {
      console.log(response);
      setAuth(response.ok)
      return response.json();
    })
  })

  return (
    <Routes>
      {!auth && (
        <>
          <Route path="/login" element={<AuthPage authenticate={() => setAuth(true)} />} />
          <Route path="/registration" element={<SignUpPage />} />
        </>
      )}
      {auth && (
        <Route path="/passwords" element={<Dashboard />} />
      )}
      <Route path="*" element={<Navigate to={auth ? "/passwords" : "/login"} />} />
    </Routes>
  );
}

export default App;
