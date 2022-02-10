import React, { useState } from "react";
import { SelectedCard } from "../SelectedCard/SelectedCard";

import './ItemsList.scss';

export const ItemsList = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const selectHandler = (event) => {
    setSelectedItem(data.find(item => item.title === event.target.innerText))
  }

  return(
    <section className="ItemsList">
      <div className="ItemsList__container">
        <ul className='ItemsList__list'>
          {data.map(item => (
            <li
              className='ItemsList__item'
              key={item.title}
              
            >
              <div
                onClick={selectHandler}
              >
                {item.title}
              </div>
              {selectedItem && selectedItem.title === item.title && (
                <SelectedCard data={selectedItem}/>
              )}
            </li>
          ))}
        </ul>
        
      </div>
    </section>
  )
}