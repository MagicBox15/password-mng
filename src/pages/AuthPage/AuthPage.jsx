import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import './AuthPage.scss';

export const AuthPage = ({authenticate}) => {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const changeHandler = (event) => {
    setForm((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      }
    })
  }

  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, mode, method = 'GET', body = null, headers = {}) => {
    setLoading(true);

    try {
      if(body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {mode, method, body, headers})
      const data = await response.json()

      if(!response.ok) {
        throw new Error(data.message || 'Something going wrong')
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, [])

  const authHandler = async () => {
    try {
      const data = await request('http://localhost:3001/login', 'no-cors', 'POST', {...form});
      authenticate();
      navigate('passwords');
      console.log('Data', data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <section className='AuthPage'>
      <div className='AuthPage__container'>
        <h1 className='AuthPage__title'>
          Autorization
        </h1>
        <label className='AuthPage__username'>
          Username
          <input
            className='AuthPage__usernameInput'
            id="username"
            name="username"
            type="text"
            placeholder='enter username'
            onChange={changeHandler}
          />
        </label>
        <label className='AuthPage__password'>
          Password
          <input
            className='AuthPage__passwordInput'
            name="password"
            id="password"
            type="password"
            placeholder='enter password'
            onChange={changeHandler}
            disabled={loading}
          />
          </label>

          <div className='AuthPage__buttons'>
            <button
              className='buttonSubmit'
              type="submit"
              onClick={authHandler}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              className='buttonSecondary'
              onClick={() => {navigate("/registration");}}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
      </div>
    </section>
  )
};