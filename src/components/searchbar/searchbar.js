import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {AccountCircle, ArrowBack, Delete, Search, VolumeUp} from "@material-ui/icons";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import Fuse from "fuse.js";
import speak from "../../js/utils/speech/speak";
import {deleteNote} from "../../js/utils/server/delete-from-server";
import getNotesFromLocalStorage from "../../js/utils/local/getNotesFromLocalStorage";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import getTodos from "../../js/main/get-todos";
import deleteTodo from "../../js/main/delete-todo";
import store from "store";
import SignOut from "../../js/api/auth/SignOut";
import timeAgo from "../../js/utils/ui/timeago";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1rem',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function rerender_() {

    // Box.refresh_();
//    Box.setState(Box.state);
//    Box.forceUpdate(()=>{});
}

export default function CustomizedInputBase(props) {

    const [search_val, search_valChange] = React.useState('');
    const [search_icon, search_iconChange] = React.useState('visible');
    const [toolbar_color, toolbar_colorChange] = React.useState('#CCCCCC');

    async function listen_note(c) {
        speak(c, () => {
        });
    }


    async function delete_note(d) {
        deleteNote(d.date, '123456', d.noteId);
        console.log(d.e.target.parentNode.parentNode.parentNode.parentNode.closest('.col-md-4').remove())
    }

    let method_ = undefined;
    if (props.context_ === 0) {
        method_ = getNotesFromLocalStorage();
    } else {
        getTodos().then((value => method_ = value));
    }
    const search_data = {};

    async function Search_onFocus() {
        let search_noContent =
            <div className={"d-flex justify-content-center"}>
                <Paper square style={{marginTop: '20vh'}} className={"d-flex justify-content-center rounded-circle"}
                       elevation={0}>
                    <img style={{width: '10rem'}} src={'assets/not_found.gif'}/>
                </Paper>
            </div>;
        search_valChange(search_noContent);
        toolbar_colorChange('#FFF');
        /*        const options = {
                    shouldSort: true,
                    findAllMatches: false,
                    keys: [
                        "content",
                        "date",
                    ]
                };
                search_data.fuse = new Fuse(getNotesFromLocalStorage(), options);*/
        search_iconChange('hidden');
    }

    async function Search_onKeyUp(e) {
        search_valChange('');
        const options = {
            isCaseSensitive: false,
            shouldSort: false,
            threshold: 0.6,
            ignoreLocation: true,
            useExtendedSearch: true,
            findAllMatches: true,
            keys: [
                {
                    name: 'content',
                    weight: 1.5
                },
                "date",
                {
                    name: 'title',
                    weight: 1.5
                },
                {
                    name: 'body',
                    weight: 1.5
                },
                {
                    name: 'label',
                    weight: 1.5
                },
            ]
        };
        search_data.fuse = new Fuse(method_, options);
        if (e.target.value && search_data.fuse) {
            const search_val = search_data.fuse.search(e.target.value.toLowerCase());
            let search_html = undefined;
            if (search_val.length > 0) {
                search_val.map((note, i) => {
                    note = note.item;
                    if (props.context_ === 0) {
                        let heading = note.content.split('\n')[0]; // lines is an array of strings
                        note.content = note.content.substring(heading.length);
                        search_html =
                            <div key={i} className={'col-md-4 p-0 m-0'}>
                                <Paper className={"col-md-4 mb-3 mr-2 ml-1 text-body p-0 text-break" + note.uniqid}>
                                    <p className="header d-flex p-0 justify-content-around">
                                        <span className="d-none id">{note.uniqid}</span>
                                        <span className="date p-3">{note.date}</span>
                                        <IconButton onClick={() => {
                                            listen_note(heading + '\n' + note.content)
                                        }} color={'primary'}>
                                            <VolumeUp/>
                                        </IconButton>
                                        <IconButton color={'primary'} onClick={(e) => {
                                            delete_note({date: note.date, noteId: note.uniqid, e: e})
                                        }}>
                                            <Delete/>
                                        </IconButton>
                                    </p>
                                    <div className="note-inner p-2 m-3 text-break" id={note.uniqid} onClick={() => {
                                    }}>
                                        <h4 className="note-heading text-break">{heading}</h4>
                                        <div className="note-content text-break pb-3">{note.content}</div>
                                    </div>

                                </Paper>
                            </div>;
                    } else {
                        console.log(note);
                        search_html =
                            <div key={i} className={'col-md-4 p-0 m-0'}>
                                <Paper className={"col-md-4 mb-3 mr-2 ml-1 text-body p-0 text-break " + note.uniqid}>
                                    <p className="header d-flex p-0 justify-content-around">
                                        <span className="d-none id">{note.uniqid}</span>
                                        <span className="date p-3">{timeAgo(note.date)}</span>
                                        <IconButton onClick={() => {
                                            listen_note(note.title + '\n' + note.body)
                                        }} color={'primary'}>
                                            <VolumeUp/>
                                        </IconButton>
                                        <IconButton color={'primary'} onClick={(e) => {
                                            deleteTodo(note.date);
                                        }}>
                                            <Delete/>
                                        </IconButton>
                                    </p>
                                    <div className="note-inner p-2 m-3 text-break" id={note.uniqid} onClick={() => {
                                    }}>
                                        <h4 className="note-heading text-break">{note.title}</h4>
                                        <div className="note-content text-break pb-3">{note.body}</div>
                                    </div>

                                </Paper>
                            </div>;

                    }
                });
                search_valChange(search_html);
            } else {
                let search_noContent =
                    <div className={"d-flex justify-content-center"}>
                        <Paper square style={{marginTop: '20vh'}}
                               className={"d-flex justify-content-center rounded-circle"} elevation={0}>
                            <img style={{width: '10rem'}} src={'assets/not_found.gif'}/>
                        </Paper>
                    </div>;
                search_valChange(search_noContent);
            }
        }
    }

    const [modal_open, modal_setOpen] = React.useState(false);

    function HideOnScroll(props) {
        const {children, window} = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({target: window ? window() : undefined});

        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        );
    }

    HideOnScroll.propTypes = {
        children: PropTypes.element.isRequired,
        /**
         * Injected by the documentation to work in an iframe.
         * You won't need it on your project.
         */
        window: PropTypes.func,
    };

    const classes = useStyles();

    function refresh_() {

//        window.location.reload(false);
//        this.state = this.state ;
    }

    const modal_Open = (m = true) => {
        Search_onFocus().then(() => {
            modal_setOpen(m);
        });

    };
    const modal_Close = () => {
        modal_setOpen(false);
    };
    const [popover_anchorEl, popover_setAnchorEl] = React.useState(null);
    let style_ = useStyles({
        transform: `translate(100px, 0px)`,
    });
    const popover_handleClick = (event) => {
        popover_setAnchorEl(event.currentTarget);
    };
    let signOut__ = <div/>;

    const popover_handleClose = () => {
        popover_setAnchorEl(null);
    };
    const UserPopup = () => {
        let html = '';
        if (store.get('user') != null || undefined) {
            const user__ = store.get('user');
            html = <div><Typography variant={'h6'} className={'my-1'}>{user__.username}</Typography>
                <Typography variant={'p'} muted
                            className={'my-1 text-muted'}>{user__.email}</Typography>
                <Divider className={'my-3'}/>
                <Button variant={'outlined'} className={'btn my-3'} onClick={() => {
                    SignOut();
                    window.location.href = '/login'
                }}><small>SIGN OUT</small></Button>
            </div>;

        }
        return html;
    };

    const popover_open = Boolean(popover_anchorEl);
    const popover_id = popover_open ? 'simple-popover' : undefined;
    return (
        <div>
            {signOut__}
            <HideOnScroll {...props}>
                <AppBar className={props.class_} position={props.appBarPos} color={'transparent'} elevation={0}>
                    <Toolbar>
                        <Paper component="form" className={classes.root}>
                            <IconButton onClick={props.drawer_} className={props.menu_btn_} aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                onClick={modal_Open}
                                placeholder="Search Kabeers Notes"
                                inputProps={{'aria-label': 'Search Kabeers Notes'}}
                            />
                            <Divider className={classes.divider} orientation="vertical"/>
                            <IconButton onClick={popover_handleClick}>
                                <AccountCircle/>
                            </IconButton>
                            <Popover
                                id={popover_id}
                                open={popover_open}
                                onClose={popover_handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                className={'p-3 w-100'}
                                style={style_}
                            >
                                <Paper className={'text-center w-100 p-3'}>
                                    <AccountCircle/>
                                    <UserPopup/>
                                </Paper>
                            </Popover>
                        </Paper>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Dialog fullScreen open={modal_open} onClose={() => {
            }}>
                <AppBar color={toolbar_color} className={`${classes.appBar} fixed-top`}>
                    <Toolbar>
                        <IconButton onClick={() => {
                            modal_Close();
                        }} color="primary" className={classes.iconButton} aria-label="directions">
                            <ArrowBack/>
                        </IconButton>
                        <InputBase
                            autoCapitalize={true}
                            autoComplete={true}
                            autoFocus={true}
                            onKeyUp={Search_onKeyUp}
                            onFocus={Search_onFocus}
                            onBlur={() => {
                                search_iconChange('visible');
                                toolbar_colorChange('#CCC')
                            }}
                            className={classes.input}
                            placeholder="Search Kabeers Notes"
                            inputProps={{'aria-label': 'Search Kabeers Notes'}}
                        />
                        <Search visibility={search_icon}/>
                    </Toolbar>
                </AppBar>
                <div class="container px-3" style={{marginTop: "5.25rem"}} id={'search_res_container'}>
                    <div class="row">
                        {search_val}
                    </div>
                </div>
            </Dialog>
        </div>

    );
}
