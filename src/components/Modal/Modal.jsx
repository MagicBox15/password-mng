import React from "react";
import classNames from "classnames";

import './Modal.scss';

export const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={classNames('Modal', {'Modal__active': active})}
      onClick={() => setActive(false)}
    >
      <div className="Modal__container">
        {children}
      </div>
    </div>
  )
}
