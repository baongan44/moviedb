import { useFormik } from "formik";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { tmdbApi } from "../../api/api";
import { sessionId } from "../../utils/config";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./addNewList.scss";
import { validationSchema } from "./validate";

interface Props {
  onClose: any;
  handleSuccess?: any;
}

const AddNewList = ({ onClose, handleSuccess }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validate: async (values) => {
      const newCreateProjectSchema = validationSchema(values);
      const errors = {};
      try {
        await newCreateProjectSchema.validate(values, {
          abortEarly: false,
        });
      } catch (validationError: any) {
        _.each(validationError.inner, (error) => {
          _.set(errors, `${error.path}`, error.message);
        });
        return errors;
      }
    },
    onSubmit: (values) => {
      // eslint-disable-next-line
      console.log({ values });
    },
  });
  const {
    handleChange,
    values: formValues,
    errors,
    submitCount,
    handleSubmit,
  } = formik;

  const createNewList = async () => {
    handleSubmit()
    try {
      const params = {
        session_id: sessionId,
      };
      const data = {
        name: formValues.name,
        description: formValues.description,
      };
      await tmdbApi.createNewList(data, params);
      toast.success("Your list created successfully", {
        position: "top-right",
        autoClose: 2000,
        draggablePercent: 60,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addlist">
      <ToastContainer />
      <div className="addlist-content">
        <div className="addlist-content__close" onClick={onClose}>
          <i className="bx bx-x"></i>
        </div>
        <div className="addlist-content__title">Add new list</div>
        <div className="addlist-content__input">
          <input
            type="text"
            placeholder="Name"
            value={formValues.name}
            name="name"
            onChange={handleChange("name")}
            required
          />
          {errors && <ErrorMessage>{submitCount ? errors.name : ""}</ErrorMessage>}
          <textarea
            placeholder="Description"
            value={formValues.description}
            name="description"
            onChange={handleChange("description")}
            required
          />
          {errors && <ErrorMessage>{submitCount ? errors.description : ""}</ErrorMessage>}
        </div>
        <div className="addlist-content__create">
          <button onClick={createNewList}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewList;
