import React from 'react';

import './Sidebar.scss';

export const Sidebar = ({ data, onSelect }) => {
  const arr = data.map(item => item.type);
  const folders = Array.from(new Set(arr)).sort();

  const targetHandler = (event) => {
    onSelect(event.target.innerText);
  }
//сделать логаут
  const logout = async () => {
    try {
      await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
    })
      console.log('success');
    } catch (error) {
      console.log(error);
    }
}

  return (
    <section className='Sidebar'>
      <div className='Sidebar__content'>
        <div className='Sidebar__header'>
          <div className='Sidebar__logout'>
          <button
            className='Sidebar__logoutButton'
            onClick={logout}
          >
            Log out
          </button>
          </div>
          <h1 className='Sidebar__title'>
            My folders
          </h1>
        </div>
        <ul className='Sidebar__foldersList'>
          {folders.map((value) => (
            <li
              className='Sidebar__foldersItem'
              key={value}
              onClick={targetHandler}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
};