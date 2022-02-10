import React,  { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import './SignUpPage.scss';

export const SignUpPage = () => {
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

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);

    try {
      if(body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {method, body, headers})
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

  const registrationHandler = async () => {
    try {
      const data = await request('/auth/registration', 'POST', {...form})
      alert('Registration success. Now you can log in')
      console.log('Data', data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <section className='SignUpPage'>
      <div className='SignUpPage__container'>
        <h1 className='SignUpPage__title'>
          Registration
        </h1>
        <label className='SignUpPage__username'>
          Username
          <input
            className='SignUpPage__usernameInput'
            id="username"
            name="username"
            type="text"
            placeholder='enter username'
            onChange={changeHandler}
          />
        </label>
        <label className='SignUpPage__password'>
          Password
          <input
            className='SignUpPage__passwordInput'
            name="password"
            id="password"
            type="password"
            placeholder='enter password'
            onChange={changeHandler}
          />
          </label>

        <div className='SignUpPage__buttons'>
          <button
            className='SignUpPage__buttonSubmit'
            type="submit"
            onClick={registrationHandler}
            disabled={loading}
          >
            Sign Up
          </button>
          <button
            className='SignUpPage__buttonSecondary'
            onClick={() => {navigate("/");}}
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  )
};