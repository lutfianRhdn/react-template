import React, { useState } from "react";
import SidebarList from "./SidebarList";
import {
  faProcedures,
  faStore,
  faTachometerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
  const [menus] = useState([
    { title: "Dashboard", icon: faTachometerAlt, link: "dashboard" },
    { title: "User", icon: faUsers, link: "user" },
    { title: "Store", icon: faStore, link: "store" },
    { title: "Products", icon: faProcedures, link: "product" },
  ]);
  return (
    <div
      className=" w-60 flex flex-col items-center py-5 px-5 shadow-xl"
      style={{ height: "100vh", backgroundColor: "#EDF2EF" }}
    >
      <h1 className="text-2xl">
        OL<span className="font-bold">SHOP</span>
      </h1>
      <hr className=" border-gray-500 w-3/4 my-3.5" />
      <div>
        {menus.map((el, index) => {
          return (
            <SidebarList
              icon={el.icon}
              key={index}
              title={el.title}
              isActive={el.isActive}
              to={el.link}
            />
          );
        })}
      </div>
    </div>
  );
}
