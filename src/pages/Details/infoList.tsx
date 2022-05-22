import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { tmdbApi } from "../../api/api";

const InfoList = ({ data }: { data: any }) => {
  const [language, setLanguage] = useState(null as any);
  const [keywordList, setKeywordList] = useState(null as any);
  const [media, setMedia] = useState(null as any);
  const { id, category } = useParams<any>();
  const getRegionsList = useCallback(async () => {
    const res = await tmdbApi.getRegions();
    const country = res?.find(
      (ele: any) => ele.iso_639_1 === data?.original_language
    );
    setLanguage(country?.name);
  }, [data]);

  const getKeyword = useCallback(async () => {
    const res = await tmdbApi.getKeywordRecommend(category, id);
    setKeywordList(res?.keywords || res?.results);
  }, [category, id]);

  const getMediaSocial = useCallback(async () => {
    const res = await tmdbApi.getMediaSocial(category, id);
    setMedia(res);
  }, [category, id]);

  useEffect(() => {
    getRegionsList();
    getKeyword();
    getMediaSocial();
  }, [getKeyword, getMediaSocial, getRegionsList]);
  return (
    <div className="video-content__info">
      <div className="media-social">
        {media?.facebook_id && (
          <a
            href={`https://www.facebook.com/${media?.facebook_id}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="bx bxl-facebook-square"></i>
          </a>
        )}
        {media?.instagram_id && (
          <a
            href={`https://www.instagram.com/${media?.instagram_id}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="bx bxl-instagram"></i>
          </a>
        )}
        {media?.twitter_id && (
          <a
            href={`https://twitter.com/${media?.twitter_id}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="bx bxl-twitter"></i>
          </a>
        )}
      </div>
      <div className="status">
        <VideoInfoTitle>Status</VideoInfoTitle>
        <span>{data?.status}</span>
      </div>
      {data?.type && (
        <div className="type">
          <VideoInfoTitle>Type</VideoInfoTitle>
          <span>{data?.type}</span>
        </div>
      )}
      <div className="network">
        <VideoInfoTitle>Release date</VideoInfoTitle>
        <span>{data?.release_date || data?.first_air_date}</span>
      </div>
      <div className="origin-language">
        <VideoInfoTitle>Original Language</VideoInfoTitle>
        <span>{language}</span>
      </div>
      <div className="origin-title">
        <VideoInfoTitle>Original Title</VideoInfoTitle>
        <span>{data?.original_title || data?.original_name}</span>
      </div>
      {keywordList?.length > 0 && (
        <div className="keyword">
          <VideoInfoTitle>Keyword</VideoInfoTitle>
          <div className="keyword-wrapper">
            {keywordList?.map((ele: any, i: number) => (
              <span key={i} className="keyword-wrapper__item">
                {ele.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoList;
export const VideoInfoTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 10px 0;
`;
