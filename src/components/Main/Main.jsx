import React, { useState } from 'react';
import { ItemsList } from './ItemsList/ItemsList';
import { CardNew } from './CardNew/CardNew';
import { SelectedCard } from './SelectedCard/SelectedCard';

import './Main.scss'

export const Main = ({ data, listItem }) => {
  const [buttonAdd, setButtonAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const buttonHandler = () => {
    setButtonAdd(!buttonAdd);
  }

  const selectHandler = (title) => {
    setSelectedItem(title)
  }

  return (
    <section className='Main'>
      <div className="Main__content">
        <div className='Main__header'>
          <h1 className='Main__title'>
            {listItem}
          </h1>
          <button
            className='Main__buttonAdd'
            onClick={buttonHandler}
          >
            Add new
          </button>
        </div>
        <div className='Main__сontainer'>
          <div className='Main__listsInfo'>
            <ItemsList
              data={data}
              listItem={listItem}
              onSelect={selectHandler}
            />
            {selectedItem && (
              <SelectedCard
                data={data}
                selectedItem={selectedItem}
              />
            )}
          </div>
          {buttonAdd && (
            <CardNew />
          )}
        </div>
      </div>
    </section>
  )
};