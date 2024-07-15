import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBell, FaBars, FaMoon, FaSun } from "react-icons/fa";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { Link } from "react-router-dom";
import img from "./msg1085514496-284365.jpg";

function Header() {
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
        {" "}
        {/* Menu toggle for mobile view or small screen */}{" "}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <FaBars className="h-5 inline-block w-5" />
          </label>{" "}
          <h1 className="text-2xl font-semibold ml-2"> {pageTitle} </h1>{" "}
        </div>{" "}
        <div className="flex-none">
          {" "}
          {/* Light and dark theme selection toggle */}{" "}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={currentTheme === "dark"}
            />{" "}
            <FaSun
              className={`swap-on fill-current w-6 h-6 ${
                currentTheme === "light" ? "block" : ""
              }`}
            />{" "}
            <FaMoon
              className={`swap-off fill-current w-6 h-6 ${
                currentTheme === "dark" ? "block" : ""
              }`}
            />{" "}
          </label>{" "}
          {/* Notification icon */}{" "}
          <button
            className="btn btn-ghost ml-4 btn-circle"
            onClick={openNotification}
          >
            <div className="indicator">
              <FaBell className="h-6 w-6" />{" "}
              {noOfNotifications > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {" "}
                  {noOfNotifications}{" "}
                </span>
              ) : null}{" "}
            </div>{" "}
          </button>{" "}
          {/* Profile icon, opening menu on click */}{" "}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={img} alt="profile" />
              </div>{" "}
            </label>{" "}
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/app/settings-profile"}>
                  Profile Settings <span className="badge"> New </span>{" "}
                </Link>{" "}
              </li>{" "}
              <li>
                <Link to={"/app/settings-billing"}> Bill History </Link>{" "}
              </li>{" "}
              <div className="divider mt-0 mb-0"> </div>{" "}
              <li>
                <a onClick={logoutUser}> Logout </a>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default Header;
