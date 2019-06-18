import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
  <div>
    <NavLink to='/cards'>View All Cards</NavLink>
    <NavLink to='/cards/new'>Add a New Card</NavLink>
  </div>
  );
};

export default Navbar;