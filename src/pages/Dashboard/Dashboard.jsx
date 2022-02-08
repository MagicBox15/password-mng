import React, { useState } from 'react';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Main } from '../../components/Dashboard/Main';

import './Dashboard.scss';

export const Dashboard = () => {
  const [data, setData] = useState(null);

  async function getData() {
    try {
      const data = await fetch('https://localhost:3001/auth/passwords');
  
      console.log(data)
      setData(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  getData()

  return (
    <section className="Dashboard">
      <div className="Dashboard__content">
        <Sidebar data={data}/>
        <Main />
      </div>
    </section>
  )
};

