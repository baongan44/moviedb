import React from "react";
import { string } from "yup";
import { OutlineButton } from "../button/Button";
import GradientBtn from "../button/gradientBtn";
import "./modal.scss";

interface Props {
  onClose?: any;
  onOpen?: boolean;
  description: string;
  nameConfirm: string;
  cancel?: string;
  handleConfirm: any;
}
const ModalConfirm = ({
  onClose,
  onOpen,
  description,
  nameConfirm,
  cancel = "Cancel",
  handleConfirm,
}: Props) => {
  return (
    <>
      {onOpen && (
        <div className="modal-confirm">
          <div className="modal-confirm-content">
            <div className="addlist-content__close" onClick={onClose}>
              <i className="bx bx-x"></i>
            </div>
            <div className="modal-confirm-content__title">{description}</div>
            <div className="modal-confirm-content__button">
              <OutlineButton onClick={onClose}>{cancel}</OutlineButton>
              <GradientBtn name={nameConfirm} onClick={handleConfirm} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalConfirm;
