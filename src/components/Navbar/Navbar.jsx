import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/UserContext";
import { FaRegUserCircle } from "react-icons/fa";
import barterlogo from "../../assets/png/bartergram-logo.png";

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const { isAuthenticated, username } = authState;

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <>
      <div className="navbar__container">
        <div className="navbar__content">
          <div className="navbar__left_content">
            <Link to="/">
              <img src={barterlogo} alt="logo" className="img__content" />
            </Link>
          </div>
          <div className="navbar__right_content">
            <Link className="nav__link" to="/display">
              My Products
            </Link>
            <Link className="nav__link" to="/notifications">
              My Chats
            </Link>
            {isAuthenticated ? (
              <div className="user__dropdown">
                <FaRegUserCircle
                  className="user__icon"
                  onClick={toggleDropdown}
                />
                {dropdownVisible && (
                  <div className="user__info" onMouseLeave={closeDropdown}>
                    <span>{username}</span>
                    <button onClick={handleLogout} className="logout__button">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link className="nav__link" to="/login">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
