import React, { useState, useEffect } from 'react';
import { Context } from '../../context';
import { Modal } from '../../components/Modal/Modal';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Main } from '../../components/Main/Main';

import './Dashboard.scss';

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(0);
  const [listItem, setListItem] = useState('');

  const [modalActive, setModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState('Something going wrong');

  const handleItemSelect = (name) => {
    setListItem(name);
  }

  const updateCheker = () => {
    if(shouldUpdate === 0) {
      setShouldUpdate(1);
    } else {
      setShouldUpdate(0);
    }
  }

  const activateModal = () => {
    setModalActive(true)
  };

  const showMessage = (message) => {
    setModalMessage(message)
  }

  console.log(shouldUpdate);

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
  }, [shouldUpdate])

  return (
    <Context.Provider value={{
      updateCheker,
      activateModal,
      showMessage,
    }}>
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

        {modalActive && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
        >
          <p>{modalMessage}</p>
        </Modal>
      )}
      </section>
    </Context.Provider>
  )
};

