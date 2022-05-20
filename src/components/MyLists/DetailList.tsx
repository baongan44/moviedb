import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { tmdbApi } from "../../api/api";
import { routes } from "../../utils";
import { paramsSession, sessionId } from "../../utils/config";
import GradientBtn from "../button/gradientBtn";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import MovieCardEdit from "../movie-card/MovieCardEdit";
import "./mylists.scss";
const DetailList = () => {
  const [list, setList] = useState(null as any);
  const { id } = useParams<any>();
  const [openDelete, setOpenDelete] = useState(false);
  const [openClear, setOpenClear] = useState(false);
  const history = useHistory();
  const getDetail = useCallback(async () => {
    const res = await tmdbApi.getDetailList(id);
    setList(res);
  }, [id]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  const handleClear = async () => {
    try {
      const params = {
        session_id: sessionId,
        confirm: true,
      };
      const data = {
        list_id: id,
      };
      await tmdbApi.clearList(id, params, data);
      setOpenClear(false);
      toast.success("Your list was cleared", {
        position: "top-right",
        autoClose: 2000,
        draggablePercent: 60,
      });
      getDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await tmdbApi.deleteList(id,paramsSession);
      setOpenDelete(false);
      history.push(`${routes.profile.event.lists.self}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="favorite-card">
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <GradientBtn
          name="Clear List"
          onClick={() => setOpenClear(!openClear)}
        />
        <GradientBtn
          name="Delete List"
          onClick={() => setOpenDelete(!openDelete)}
        />
      </div>
      {list?.item_count > 0 ? (
        <>
          {list?.items?.map((movie: any, i: number) => (
            <MovieCardEdit
              key={i}
              data={movie}
              filter={movie?.media_type}
              getList={getDetail}
              listId={id}
            />
          ))}
        </>
      ) : (
        <div className="not-found">No items were found...</div>
      )}
      <ModalConfirm
        onClose={() => setOpenDelete(false)}
        onOpen={openDelete}
        nameConfirm="delete"
        description="Do you want delete this list?"
        handleConfirm={handleDelete}
      />
      <ModalConfirm
        onClose={() => setOpenClear(false)}
        onOpen={openClear}
        nameConfirm="Clear"
        description="Do you want clear all items in this list?"
        handleConfirm={handleClear}
      />
      <ToastContainer />
    </div>
  );
};

export default DetailList;
