import React, { useCallback, useEffect, useState } from "react";
import { tmdbApi } from "../../api/api";
import { sessionId } from "../../utils/config";
import "./addNewList.scss";
interface Props {
  onClose: any;
}

const AddNewList = ({ onClose }: Props) => {
  const [nameList, setNameList] = useState("" as any);
  const [desList, setDesList] = useState("" as any);
  const [success, setSuccess] = useState(false);

  const createNewList = async () => {
    try {
      const params = {
        session_id: sessionId,
      };
      const data = {
        name: nameList,
        description: desList,
      };
      await tmdbApi.createNewList(data, params);
      setSuccess(!success);
    } catch (error) {
      console.log(error);
    }
  };
  setTimeout(() => {
    setSuccess(!success);
  }, 5000);
  const handleChangeName = (event: any) => {
    setNameList(event.target.value);
  };

  const handleChangeDes = (event: any) => {
    setDesList(event.target.value);
  };

  return (
    <div className="addlist">
      {success && (
        <div className="addlist-success">
          <span>Successfully</span>
          <div>Your new list was created</div>
        </div>
      )}
      <div className="addlist-content">
        <div className="addlist-content__close" onClick={onClose}>
          <i className="bx bx-x"></i>
        </div>
        <div className="addlist-content__title">Add new list</div>
        <div className="addlist-content__input">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => handleChangeName(e)}
          />
          <textarea
            placeholder="Description"
            onChange={(e) => handleChangeDes(e)}
          />
        </div>
        <div className="addlist-content__create">
          <button onClick={createNewList}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewList;
