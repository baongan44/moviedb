import { Rate } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
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
  }, [category, id]);

  const getReview = useCallback(
    async (e) => {
      const data = {
        value: e * 2,
      };
      await tmdbApi.setReview(category, id, data, paramsSession);
      toast.success("Rating was success", {
        position: "top-right",
        autoClose: 2000,
        draggablePercent: 60,
      });
      getRateMovie();
    },
    [category, getRateMovie, id]
  );

  useEffect(() => {
    getRateMovie();
    isRate(rateNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateNum]);

  const deteleRate = useCallback(async () => {
    await tmdbApi.deleteRate(category, id, paramsSession);
    getRateMovie();
  }, [category, getRateMovie, id]);

  return (
    <>
      <RateWrapper>
        <div
          className="rate-clear"
          onClick={(e) => {
            e.stopPropagation();
            deteleRate();
          }}
        >
          <i className="bx bx-minus-circle"></i>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Rate
            style={{ zIndex: 10 }}
            allowHalf
            value={rateNum}
            onChange={(e) => {
              getReview(e);
            }}
          />
        </div>
      </RateWrapper>
    </>
  );
};

export default RateStar;

const RateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
