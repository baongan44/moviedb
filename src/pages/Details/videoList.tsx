import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import { tmdbApi } from "../../api/api";

interface PropsList {
  id?: any;
}
const VideoList = (props: PropsList) => {
  const { category } = useParams<any>();
  const { id } = props;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, id);
      setVideos(res.results.slice(0, 5));
    };
    getVideos();
  }, [category, id]);

  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

interface Props {
  item?: any;
}

const Video = (props: Props) => {
  const { item } = props;

  const iframeRef = useRef(null as any);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
