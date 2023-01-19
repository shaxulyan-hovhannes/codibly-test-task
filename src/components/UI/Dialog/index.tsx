import { forwardRef, ReactNode } from "react";

import styles from './index.module.scss';

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from '@mui/material/transitions';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import CloseIcon from "@mui/icons-material/Close";

interface MuiDialogProps {
    open: boolean,
    onClose: () => void,
    dialogTitle: string | ReactNode,
    children?: ReactNode
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const MuiDialog = ({ open, onClose, dialogTitle, children }: MuiDialogProps) => {
    return      <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    aria-describedby="alert-dialog-slide-description"
    sx={{
      "& > div:first-of-type": {
        background: "#00000026",
      },
      "& .MuiDialog-paper": {
        minWidth: "400px",
        maxWidth: "70vw",
        maxHeight: "80vh",
        borderRadius: "5px",
        boxShadow:
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
      },
    }}
  >
      <DialogTitle className={styles.dialogTitleContainer}>
          <div className={styles.dialogTitle}>{dialogTitle}</div>
          <div className={styles.closeIconBlock} onClick={onClose}>
            <CloseIcon className={styles.closeIcon} />
          </div>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>{children}</DialogContent>
  </Dialog>
}

export default MuiDialog