"use client";
import React, { MouseEvent, PropsWithChildren } from "react";
import { GrClose } from "react-icons/gr";
import { TiInfoOutline } from "react-icons/ti";
import Button from "./Button";

export type ModalProps = {
  show: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
} & PropsWithChildren;

const ConfirmModal: React.FC<ModalProps> = ({
  show,
  loading,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  const handleClose = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "modalWrapper") {
      onClose();
    }
  };

  return (
    <div
      id="modalWrapper"
      className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center duration-300"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      onClick={handleClose}
    >
      <div
        className="rounded-2xl p-8 border-none bg-white bg-clip-padding shadow-lg outline-none"
        style={{
          width: "500px",
          margin: "20px",
        }}
      >
        <div className="flex items-center ">
          <button type="button" onClick={() => onClose()}>
            <GrClose />
          </button>
        </div>
        <div
          className="bg-slate-200 fixed"
          style={{
            marginLeft: "-32px",
            marginRight: "-32px",
            height: "1px",
            marginTop: "32px",
          }}
        />

        <div className="mt-5 flex flex-col justify-center gap-5">
          <div className="flex justify-center">
            <TiInfoOutline size={40} color="orange" />
          </div>
          <p>Are you sure you want to delete this menu?</p>
          <div className="flex gap-3">
            <Button onClick={onClose}>Cancel</Button>
            <Button theme="danger" onClick={onConfirm} loading={loading}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
