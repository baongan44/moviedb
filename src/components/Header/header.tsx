import { NONAME } from "dns";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { routes } from "../../utils";
import AddNewList from "../AddNewList/AddNewList";
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

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null as any);
  const [openProfile, setOpenProfile] = useState(false);
  const active = headerNav.findIndex((e) => e.path === pathname);
  const refSelectCurrent: any = useRef();
  const history = useHistory();
  const isLogin = localStorage.getItem("login");
  const [newList, openPopupNewList] = useState<boolean>(false);

  const Profile = [
    {
      display: "My Profile",
      onClick: () => {
        history.push(routes.profile.self);
        localStorage.setItem("filter-status","My Favorite Lists");
      },
    },
    {
      display: "Add new list",
      onClick: () => {
        openPopupNewList(true);
      },
    },
    {
      display: "Logout",
      onClick: () => {
        localStorage.setItem("login", "DISCONNECT");
        history.push(routes.login);
      },
    },
  ];

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
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        left: "0",
        bottom: "0",
        inset: "unset",
      }}
    >
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
                      <li onClick={ele.onClick}>
                        {/* <Link to={ele.path} > */}
                        {ele.display}
                        {/* </Link> */}
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
      {newList && <AddNewList onClose={() => openPopupNewList(false)} />}
    </div>
  );
};

export default Header;
