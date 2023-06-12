import React from "react";

const Navbar = ({ Items, Lists }) => {
  return (
    <nav className='navbar'>
      <div className='btn-group'>
        {Lists.map((ele, index) => {
          return (
            <button key={index} className='btn-group__item' onClick={() => Items(ele)}>
              {ele}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
