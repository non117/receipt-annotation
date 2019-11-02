import React, { FC, useEffect, useState } from "react";
import { ExportReceiptFactory } from "../usecase/ExportReceipt";

export const ExportReceiptButton: FC = () => {
  const [message, setMessage] = useState("");
  const onButtonClick = () => {
    const exportReceipt = ExportReceiptFactory.create();
    exportReceipt.execute()
      .then(() => setMessage("saved"))
      .catch((e: Error) => setMessage(e.message));
  };
  useEffect(() => {
    window.setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);
  return (
    <div>
      <button id="button-save" onClick={onButtonClick}>
        Save
      </button>
      <label>{message}</label>
    </div>
  );
};
