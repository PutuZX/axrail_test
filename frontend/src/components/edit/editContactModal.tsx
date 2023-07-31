import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, Box } from "@mui/material";
import { styled } from "@mui/system";
import ModalEditor from "./modalEditor";

const EditModal: React.FC<{
  id: any;
  handleClose: () => void;
  open: boolean;
  name: string;
  phone: string;
  updateContact: (id: any, name: string, phone: string) => void;
}> = ({ id, open, handleClose, name, phone, updateContact }) => {
  const CustomDialog = styled(Dialog)(() => ({
    "& .MuiDialog-paper": {
      width: "100%",
      maxWidth: 300,
      padding: "12px",
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  }));

  return (
    <CustomDialog
      onClose={handleClose}
      aria-labelledby="avatar-changer"
      open={open}
    >
      <DialogTitle id="avatar-changer" className="text-center">
        <div className="text-xl font-bold">Edit Contact</div>
      </DialogTitle>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2 }}>
        <ModalEditor
          id={id}
          name={name}
          phone={phone}
          handleClose={handleClose}
          updateContact={updateContact}
        />
      </Box>
    </CustomDialog>
  );
};

export default EditModal;
