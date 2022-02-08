import React from 'react';

import './Sidebar.scss';

export const Sidebar = ({ data }) => {

  return (
    <section className='Sidebar'>
      <div className='Sidebar__content'>
        Sidebar
        {data}
      </div>
    </section>
  )
};