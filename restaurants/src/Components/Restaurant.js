import React, { useState } from "react";
import Navbar from "./Navbar.js";
import MenuCard from "./MenuCard.js";
import myAPI from "./API_Data.js";

// Navigation List of All Items 
const uniqueList = [
  ...new Set(
    myAPI.map((e) => {
      return e.category;
    })
  ),
  "All",
];
console.log(uniqueList);

const Restaurant = () => {
  const [menuData, setMenuData] = useState(myAPI);
  const [menuList, setMenuList] = useState(uniqueList);

  const filterItems = (category) => {
    if(category === 'All'){
      setMenuData(myAPI);
      return;
    }
    const updateList = myAPI.filter((ele) => {
      return ele.category === category;
    })
    setMenuData(updateList);
  }
  return (
    <>
      <Navbar Items={filterItems} Lists={menuList} />
      <MenuCard  Data={menuData} />
    </>
  );
};

export default Restaurant;
