import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { routes } from "../../utils";
import "./styled.scss";

const headerNav = [
  {
    display: "Home",
    path: routes.home,
  },
  {
    display: "Movies",
    path: routes.movie,
  },
  {
    display: "TV Series",
    path: routes.tvShow,
  },
  {
    display: "Actor",
    path: routes.people.self,
  },
];

const Profile = [
  {
    display: "My Profile",
    path: routes.profile.self,
  },
  {
    display: "Add new list",
    path: routes.profile.self,
  },
  {
    display: "Logout",
    path: routes.login,
    onClick: () => {
      localStorage.setItem("login", "DISCONNECT");
    }
  }
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null as any);
  const [openProfile, setOpenProfile] = useState(false);
  const active = headerNav.findIndex((e) => e.path === pathname);
  const refSelectCurrent: any = useRef();
  const history = useHistory()
  const isLogin = localStorage.getItem('login')

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  useEffect(() => {
    const checkIfCloseOutside = (e: any) => {
      if (
        openProfile &&
        refSelectCurrent.current &&
        !refSelectCurrent.current.contains(e.target)
      ) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("click", checkIfCloseOutside);
    return () => {
      document.removeEventListener("click", checkIfCloseOutside);
    };
  }, [openProfile]);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo" ref={refSelectCurrent}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
        <div className="header__user">
          <div
            className="header__user-circle"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <i className="bx bxs-user"></i>
          </div>
          {openProfile && (
            <>
              {isLogin === "CONNECTED" ? (
                <ul className="header__user-dropdown">
                  {Profile.map((ele, i) => (
                    <li onClick={() => history.push(ele.path)}>
                      <Link to={ele.path} onClick={ele.onClick}>{ele.display}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="header__user-dropdown">
                  <li onClick={() => history.push(routes.login)}>
                    <Link to={routes.login}>Login</Link>
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
