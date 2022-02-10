import React, { useState, useEffect } from 'react';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Main } from '../../components/Main/Main';

import './Dashboard.scss';

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [listItem, setListItem] = useState('');

  const handleItemSelect = (name) => {
    setListItem(name);
  }

  const folderData = data.filter(item => item.type === `${listItem}`)

  useEffect(() => {
    fetch('/passwords', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      setData(result);
    })
  }, [])

  return (
    <section className="Dashboard">
      <div className="Dashboard__container">
        <Sidebar
          data={data}
          onSelect={handleItemSelect}
        />
        <Main
          data={folderData}
          listItem={listItem}
        />
      </div>
    </section>
  )
};

