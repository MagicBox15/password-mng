import React, { useState, useContext } from "react";
import { Context } from '../../../context';

import './SelectedCard.scss';

export const SelectedCard = ({ data }) => {
  const [visiblePassword, setVisisiblePassword] = useState(false);

  const {updateCheker, showMessage, activateModal} = useContext(Context);

  const [cardValue, setCardValue] = useState({
    title: data.title,
    password: data.password,
  });

  const updateHandler = () => {
    updateCheker();
  };

  const showPassword = (event) => {
    event.preventDefault()
    setVisisiblePassword(!visiblePassword);
  }

  const changeHandler = (event) => {
    setCardValue((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      }
    })
  }

  const saveHandler = async (card, cardValue) => {
    try {
      const response = await fetch('/passwords', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: card._id,
          title: cardValue.title,
          password: cardValue.password,
        })
      })

      const data = await response.json();

      activateModal();

      if(!response.ok) {
        showMessage(data.message);
      } else {
        showMessage(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteHandler = async (card) => {
    try {
      await fetch('/passwords', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: card._id})
      })
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <section className="SelectedCard">
      <div className="SelectedCard__container">
        <form className="SelectedCard__form">
          <div className="SelectedCard__inputs">
            <label
              className="SelectedCard__titleLabel"
              htmlFor="titleInput"
            >
              Title
            </label>
              <input
                className="SelectedCard__titleInput"
                id="titleInput"
                name="title"
                type="text"
                value={cardValue.title}
                onChange={changeHandler}
              />

            <label
              className="SelectedCard__passwordLabel"
              htmlFor="passwordInput"
            >
              Password
            </label>
              <input
                className="SelectedCard__passwordInput"
                id="passwordInput"
                name="password"
                type={visiblePassword ? 'text' : 'password'}
                value={cardValue.password}
                onChange={changeHandler}
              />
              <button
                className="SelectedCard__passwordButton"
                onClick={showPassword}
              >
                Show
              </button>
          </div>

          <div className="SelectedCard__buttons">
            <button
              className="SelectedCard__confirmButton"
              onClick={(event) => {
                event.preventDefault();
                saveHandler(data, cardValue);
                updateHandler();
              }}
            >
              Save changes
            </button>

            <button
              type="button"
              className="SelectedCard__deleteButton"
              onClick={(event) => {
                event.preventDefault();
                deleteHandler(data);
                updateHandler();
              }}
            >
              Delete item
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
