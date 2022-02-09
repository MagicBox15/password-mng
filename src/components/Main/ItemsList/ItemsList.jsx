import React from "react";

import './ItemsList.scss';

export const ItemsList = ({ data, listItem, onSelect }) => {
  const items = data.filter(item => item.type === `${listItem}`)

  const targetHandler = (event) => {
    onSelect(event.target.innerText);
  }

  return(
    <section className="ItemsList">
      <div className="ItemsList__container">
      <ul className='ItemsList__list'>
        {items.map(item => (
          <li
            className='ItemsList__item'
            key={item.title}
            onClick={targetHandler}
          >
            {item.title}
            {/* {item.title.length > 15
              ? (`${item.title.substring(0, 15)}...`)
              : (item.title)
            } */}
          </li>
        ))}
        </ul>
      </div>
    </section>
  )
}