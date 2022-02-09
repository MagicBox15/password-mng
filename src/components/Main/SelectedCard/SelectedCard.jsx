import React, { useState } from "react";

import './SelectedCard.scss';

export const SelectedCard = ({ data, selectedItem }) => {
  const card = data.find(item => item.title === `${selectedItem}`);
  const [visiblePassword, setVisisiblePassword] = useState(false);

  const [cardValue, setCardValue] = useState({
    title: card.title,
    password: card.password,
  });

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

  //обработать запрос на сервер
  const saveHandler = () => {
    
  }

  const deleteHandler = (event) => {
    event.preventDefault();
    //обработать запрос на сервер
  }

  return(
    <section className="SelectedCard">
      <div className="SelectedCard__container">
        <form className="SelectedCard__form">
        <label
          className="SelectedCard__titleLabel"
          htmlFor="nameInput"
        >
          Title
          <input
            className="SelectedCard__titleInput"
            id="titleInput"
            name="title"
            type="text"
            value={cardValue.title}
            onChange={changeHandler}
          />
        </label>
            <label
              className="SelectedCard__passwordLabel"
              htmlFor="passwordInput"
            >
              Password
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
            </label>
            
            <button
              className="SelectedCard__confirmButton"
              onClick={saveHandler}
            >
              Save changes
            </button>
            <button
              className="SelectedCard__deleteButton"
              onClick={deleteHandler}
            >
              Delete item
            </button>
        </form>
      </div>
    </section>
  )
}
