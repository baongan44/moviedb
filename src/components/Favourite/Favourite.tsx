import React, { useState } from "react";
import "./favourite.scss";

const Favourite = () => {
  const [filter, setFilter] = useState("Movies" as any);
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="favourite">
      <div className="favourite-title">
        <h2>My Favourite Lists</h2>
        <div className="favourite-title-filter">
          <div className="favourite-title-filter__lists">
            <span>
              Filter:{" "}
              <span
                className="filter-text"
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
              >
                {filter}{" "}
                <i
                  className="bx bx-chevron-down"
                  style={{
                    transform: openFilter ? "rotateX(180deg)" : "rotateX(0deg)",
                  }}
                ></i>
              </span>
            </span>
            <div style={{ display: openFilter ? "block" : "none" }}>
              <ul>
                <li>Movies</li>
                <li>Tv</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="favourite-card">
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Favourite;
