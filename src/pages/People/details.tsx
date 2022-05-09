import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { category, tmdbApi } from "../../api/api";
import MovieCard from "../../components/movie-card/MovieCard";
import apiConfig from "../../utils/apiConfig";
import "./person.scss";

const PersonDetails = () => {
  const [info, setInfo] = useState(null as any);
  const [images, setImages] = useState(null as any);
  const [movies, setMovies] = useState(null as any);
  const { id } = useParams<any>();

  const getDetailPerson = useCallback(async () => {
    const res = await tmdbApi.getPersonDetail(category.person, id);
    setInfo(res);
    const img = await tmdbApi.getImageEachPerson(id);
    setImages(img?.profiles);
    const movies = await tmdbApi.movieCreditEachPerson(id);
    setMovies(movies?.cast);
  }, [id]);

  useEffect(() => {
    getDetailPerson();
  }, [getDetailPerson]);

  return (
    <div>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${apiConfig.originalImage(
            info?.profile_path
          )})`,
        }}
      ></div>
      <div className="mb-3 person-content container">
        <div className="person-content__poster">
          <div
            className="person-content__poster__img"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                info?.profile_path
              )})`,
            }}
          ></div>
        </div>
        <div className="person-content__info">
          <h1 className="title">{info?.name}</h1>
          <div className="bio">
            <span>Biography</span>
            <p>{info?.biography}</p>
          </div>
          <div className="born">
            <div>
              <i className="bx bx-cake" style={{ color: "#ee532d" }}></i>
              {info?.birthday}
            </div>
            <div>
              <i className="bx bx-map" style={{ color: "#21acdd" }}></i>
              {info?.place_of_birth}
            </div>
            <div>
              <i
                style={{ color: info?.gender === 2 ? "#6f42c1" : "#e040fb" }}
                className={`${
                  info?.gender === 2 ? "bx bx-male-sign" : "bx bx-female-sign"
                }`}
              ></i>
              {info?.gender === 2 ? "Male" : "Female"}
            </div>
          </div>
          {/* <div className="profile-img">
            {images?.map((img: any, i: any) => (
              <img
                key={i}
                src={apiConfig.originalImage(img?.file_path)}
                alt="img"
              />
            ))}
          </div> */}
          <div>
            <div className="movies-title">Movie Credits</div>
            <div className="movies">
              {movies?.map((mov: any, i: any) => (
                <Link to={`/${mov.media_type}/${mov.id}`}>
                  <img
                    key={i}
                    src={apiConfig.originalImage(mov?.poster_path)}
                    alt="img"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;