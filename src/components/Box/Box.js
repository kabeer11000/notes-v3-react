import React from 'react';
//import PropTypes from 'prop-types';
import './Box.css';
//import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import getFromServer from "../../js/utils/server/get-from-server";
import speak from "../../js/utils/speech/speak";
import IconButton from "@material-ui/core/IconButton";
import {Delete, VolumeUp} from '@material-ui/icons';
import {deleteNote} from "../../js/utils/server/delete-from-server";
import {makeStyles} from "@material-ui/core/styles";
import ContentEditable from "../ContentEditable/ContentEditable";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));


export class Box extends React.Component {
    contentEditable_paper(e) {
        e.contentEditable = true;
        console.log(e.closest('.note-heading'));
//    e.closest('h4').remove();
        /*
            document.getElementById(`#${e}`).contentEditable=true;
            document.getElementById(`#${e}`).closest('h3').remove();
        */
    }

    listen_note(c) {
        speak(c, () => {
        })
    }


    delete_note(d) {
        deleteNote(d.date, '123456', d.noteId);
        console.log(d.e.target.parentNode.parentNode.parentNode.parentNode.closest('.col-md-4').remove())
//        document.querySelector(`#${d.noteId}`).remove();
    }

    state = {
        preloader: 'd-block',
        showContentEditable: false,
    };

    componentDidMount() {
        this.state.preloader = 'd-none';
        this.renderPosts();
    }

    c_e_helper(note) {
        this.setState({
            showContentEditable: true,
        });
        //render(ContentEditable({content: note.content, date: note.date, uniqid: note.uniqid}));
    }

    //   classes = useStyles();
    renderPosts = async () => {
        try {
            let posts = await getFromServer('123456');
            //let posts = [{"date":"8\/3\/2020, 1:51:33 PM","content":"Registered Sex Offender","uniqid":"5f27d0158fdf3c","user_id":"123456"},{"date":"8\/3\/2020, 2:11:41 PM","content":"localStorage.getItem(&#039;draft&#039;)","uniqid":"5f27d4cdf74bc8","user_id":"123456"}];
            // this will re render the view with new data
            if (posts.length) {
                this.setState({
                    notes: posts.map((note, i) => {
                        let nc = note.content;
                        let heading = note.content.split('\n')[0]; // lines is an array of strings
                        note.content = note.content.substring(heading.length);
                        return (
                            <div key={i} className={'col-md-4 p-0 m-0'}>
                                <Paper onDoubleClick={() => {
                                    return (<ContentEditable content={nc} date={note.date} uniqid={note.uniqid}/>);
                                }}
                                       className={"col-md-4 mb-3 mr-2 ml-1 text-body p-0 text-break " + note.uniqid}>
                                    <p className="header d-flex p-0 justify-content-around">
                                        <span className="d-none id">{note.uniqid}</span>
                                        <span className="date p-3">{note.date}</span>
                                        <IconButton onClick={() => {
                                            this.listen_note(heading + '\n' + note.content)
                                        }} color={'primary'}>
                                            <VolumeUp/>
                                        </IconButton>
                                        <IconButton color={'primary'} onClick={(e) => {
                                            this.delete_note({date: note.date, noteId: note.uniqid, e: e})
                                        }}>
                                            <Delete/>
                                        </IconButton>
                                    </p>
                                    <div class="note-inner p-2 m-3 text-break" id={note.uniqid} onClick={() => {
                                    }}>
                                        <h4 class="note-heading text-break">{heading}</h4>
                                        <div class="note-content text-break">{note.content}</div>
                                    </div>

                                </Paper>
                            </div>
                        )
                    })
                });
            } else {
                let x = <div className="d-flex justify-content-between">
                    <img src="assets/icons/kabeersnetwork.svg" style={{height: '5rem', width: 'auto'}}/>
                </div>;

                this.setState({
                    notes: x
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div class="container-fluid px-1">
                <div class="row">
                    <div style={{marginTop: '8rem'}} className={` preload_spinner ${this.state.preloader}`}>
                        <div className={'d-flex justify-content-center'}>
                            <svg className="spinner_" width="65px" height="65px" viewBox="0 0 66 66"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33"
                                        cy="33" r="30"/>
                            </svg>
                        </div>
                    </div>
                    {this.state.notes}
                </div>
            </div>
        );
    }
}

function refresh_() {
    this.forceUpdate();
}

Box.propTypes = {};

Box.defaultProps = {};

export default Box;
