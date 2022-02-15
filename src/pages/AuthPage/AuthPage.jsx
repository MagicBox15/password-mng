import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Modal } from '../../components/Modal/Modal';

import './AuthPage.scss';

export const AuthPage = ({authenticate}) => {
  const [modalActive, setModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Something going wrong');

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

  const request = useCallback(async (
    url,
    method = 'GET',
    body = null,
    credentials = 'include',
    headers = {}
  ) => {
    setLoading(true);

    try {
      if(body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(
        url, {
          method,
          body,
          credentials,
          headers
        })
      const data = await response.json();

      if(!response.ok) {
        setModalActive(true);
        setErrorMessage(data.message);
        return data;
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
      await request('/login', 'POST', {...form});
      authenticate(true);
      navigate('/passwords');
    } catch (error) {
      console.log(error);
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
            title="Password should contain min 4 and max 12 characters"
            onChange={changeHandler}
            disabled={loading}
          />
          </label>

          <div className='AuthPage__buttons'>
            <button
              className='AuthPage__buttonSubmit'
              type="submit"
              onClick={authHandler}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              className='AuthPage__buttonSecondary'
              onClick={() => {navigate("/registration");}}
              disabled={loading}
            >
              Sign Up
            </button>
            
          </div>
      </div>
      {modalActive && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
        >
          <p>{errorMessage}</p>
        </Modal>
      )}
    </section>
  )
};