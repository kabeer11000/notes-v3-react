import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import {blue} from '@material-ui/core/colors';
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function NewLabelDialog(props) {
    const classes = useStyles();
    const {onClose, selectedValue, open} = props;

    let label_value = '';
    const handleClose = () => {
        onClose(selectedValue);
    };

    async function handleLabelChange(e) {
        label_value = e.target.value
    }

    const addLabel = () => {
        console.log(label_value);
        props.callback(label_value);
        onClose('');
    };
    const handleListItemClick = (value) => {
        onClose(value);
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Add new label</DialogTitle>
            <DialogContent>
                <form noValidate autoComplete="off">
                    <TextField onChange={handleLabelChange} id="filled-basic" label="Label" required variant="filled"/>
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addLabel} color="primary" autoFocus>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

NewLabelDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function NewLabelDialogDemo(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <MenuItem>
            Add New
            <IconButton color="primary" onClick={handleClickOpen}>
                <AddIcon/>
            </IconButton>
            <NewLabelDialog selectedValue={selectedValue} callback={props.callback} open={open} onClose={handleClose}/>
        </MenuItem>
    );
}
