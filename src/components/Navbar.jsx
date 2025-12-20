import "../css/nav.css"

import { NavItems } from "./NavbarItems";
import { useState } from "react";


export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <nav className="NavbarItems">
      <h3 className="logo">
        <i className="fab fa-react">
          <a href="/"> CARTHAGE </a>
          </i>
      </h3>
      <div className="Hamburger-Cross-Icons" onClick={handleClick}>
        <i className={open ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={open ? "MenuItems active" : "MenuItems"}>
        {NavItems.map((Item, index) => {
          return (
            <li key={index}>
              <a href={Item.url} className={Item.cName}>
                <i className={Item.icon}></i>
                {Item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
