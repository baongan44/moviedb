import { Rate } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "../../api/api";
import { accountId, paramsSession } from "../../utils/config";

const RateStar = ({ isRate }: { isRate: any }) => {
  const [rateNum, setRateNum] = useState(0);
  const { category, id } = useParams<any>();

  const getRateMovie = useCallback(async () => {
    const res = await tmdbApi.getRateMovie(
      category === "movie" ? "movies" : category,
      accountId,
      paramsSession
    );
    const data = res?.results;
    const rate = data?.find((ele: any) => ele.id === Number(id));
    setRateNum(rate?.rating / 2);
    isRate(rateNum)
  }, [category, id, isRate, rateNum]);

  const getReview = useCallback(
    async (e) => {
      const data = {
        value: e * 2,
      };
      await tmdbApi.setReview(category, id, data, paramsSession);
      getRateMovie();
    },
    [category, getRateMovie, id]
  );

  useEffect(() => {
    getRateMovie();
  }, [getRateMovie, rateNum]);

  return (
    <Rate
      allowHalf
      value={rateNum}
      onChange={(e) => {
        getReview(e);
      }}
    />
  );
};

export default RateStar;
