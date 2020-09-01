import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';

function AlertDialog ({ type, title, message, accept, cancel = '', onClose}) {
  const { t } = useTranslation();

  var titleText =  t(`title:err.${title}`);
  var messageText  = t(`title:err.${message}`);
  var acceptText = t(`title:err.${accept}`);
  var cancelText = t(`title:err.${cancel}`);
  if(!messageText) messageText = message;

  return (
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messageText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            {acceptText}
          </Button>
          <Button onClick={onClose} color="secondary" autoFocus>
            {cancelText}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
export default AlertDialog;
