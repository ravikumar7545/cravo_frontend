import React, { useState } from 'react';
import '../scss/menu.scss';
import arrow from '../images/right-arrow.png';
import  { usePizzaContext } from '../PizzaContext';

const Menu = () => {
  const { setMenu } = usePizzaContext();
  const [currentMenu, setCurrentMenu] = useState('pizza');
  const changeMenu = (menuVal) => {
    setMenu(menuVal);
    setCurrentMenu(menuVal);
  };
  return (
    <div className="menu">
      <div
        className={'menu-content' + (currentMenu === 'pizza' ? ' active' : '')}
        onClick={() => changeMenu('pizza')}
      >
        <img
          className="menu-image"
          src={require('../images/pizza_small.png')}
          alt="pizza"
        />
        <p className="menu-title">Pizza</p>
        <img className="menu-open-btn" src={arrow} alt="arrow" />
      </div>
      <div
        className={'menu-content' + (currentMenu === 'burger' ? ' active' : '')}
        onClick={() => changeMenu('burger')}
      >
        <img
          className="menu-image"
          src={require('../images/burger_small.png')}
          alt="burger"
        />
        <p className="menu-title">Burger</p>
        <img className="menu-open-btn" src={arrow} alt="arrow" />
      </div>
      <div
        className={'menu-content' + (currentMenu === 'snacks' ? ' active' : '')}
        onClick={() => changeMenu('snacks')}
      >
        <img
          className="menu-image"
          src={require('../images/snack_small.png')}
          alt="snack"
        />
        <p className="menu-title">Snack</p>
        <img className="menu-open-btn" src={arrow} alt="arrow" />
      </div>
      <div
        className={'menu-content' + (currentMenu === 'drinks' ? ' active' : '')}
        onClick={() => changeMenu('drinks')}
      >
        <img
          className="menu-image"
          src={require('../images/drink_small.png')}
          alt="drink"
        />
        <p className="menu-title">Drink</p>
        <img className="menu-open-btn" src={arrow} alt="arrow" />
      </div>
    </div>
  );
};

export default Menu;
