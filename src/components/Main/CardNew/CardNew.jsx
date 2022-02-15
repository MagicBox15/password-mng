import React, { useState, useContext } from "react";
import { Context } from '../../../context';

import './CardNew.scss';

export const CardNew = () => {
  const {updateCheker, showMessage, activateModal} = useContext(Context);

  const [inputValues, setInputValues] = useState({
    type: '',
    title: '',
    password: '',
  });

  const changeHandler = (event) => {
    setInputValues((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      }
    })
  }

  const onSubmit = async () => {
    try {
      const response = await fetch('/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...inputValues})
      })

      const data = await response.json();

      activateModal();

      if(!response.ok) {
        showMessage(data.message);
      } else {
        showMessage('Password was added')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateHandler = () => {
    updateCheker();
  };

  return (
    <section className="CardNew">
      <div className='CardNew__container'>
        <form className='CardNew__form'>
          <label htmlFor="type">
            Folder's name
          </label>
          <input
            className='CardNew__folderNameInput'
            id='type'
            name='type'
            type="text"
            placeholder='folder&#39;s name'
            onChange={changeHandler}
          />

          <label htmlFor="title">
            Title
          </label>
          <input
            className='CardNew__titleInput'
            id='title'
            name='title'
            type="text"
            placeholder='title'
            onChange={changeHandler}
            required
          />

          <label htmlFor="password">
            Password
          </label>
          <input
            className='CardNew__passwordInput'
            id='password'
            name='password'
            type='password'
            placeholder='password'
            onChange={changeHandler}
          />

          <button
            className='CardNew__buttonAdd'
            onClick={(event)=>{
              event.preventDefault();
              onSubmit();
              updateHandler();
            }}
          >
            Add
          </button>
        </form>
      </div>
    </section>
  );
}
