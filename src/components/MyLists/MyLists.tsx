import { useCallback, useEffect, useState } from "react";
import { tmdbApi } from "../../api/api";
import { accountId, sessionId } from "../../utils/config";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import CardList from "./CardList";
import "./mylists.scss";

const MyLists = () => {
  const [list, setList] = useState(null as any);
  const getCreateList = useCallback(async () => {
    const params = {
      session_id: sessionId,
      page: 20,
    };
    const res = await tmdbApi.getCreatedList(accountId, params);
    setList(res?.results);
  }, []);
  useEffect(() => {
    getCreateList();
  }, [getCreateList]);
  return (
    <div className="my-create-list">
      {list?.map((ele: any, i: number) => (
        <CardList data={ele} key={i} getList={getCreateList}/>
      ))}
    </div>
  );
};

export default MyLists;
