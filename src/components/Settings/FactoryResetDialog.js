import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {blue} from '@material-ui/core/colors';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import DialogContentText from "@material-ui/core/DialogContentText";
import FactoryReset from "../../js/utils/deleteAll";
import {Delete} from "@material-ui/icons";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function FactoryResetDialog(props) {
    const {onClose, selectedValue, open} = props;
    const handleClose = () => {
        onClose(selectedValue);
    };
    const deleteAll = () => {
        FactoryReset('123456').then(() => {
            onClose('');
        });
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Factory Reset Notes</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This Will Delete all notes and Todos. From this device and from Kabeers Network Account!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteAll} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

FactoryResetDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function FactoryResetDialogDemo(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <Delete/>
            </IconButton>
            <FactoryResetDialog callback={props.callback} open={open} onClose={handleClose}/>
        </div>
    );
}
