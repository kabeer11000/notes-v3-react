import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import speak from "../../js/utils/speech/speak";
import IconButton from "@material-ui/core/IconButton";
import {Delete, Label, VolumeUp} from '@material-ui/icons';
import deleteTodo from "../../js/main/delete-todo";
import getTodos, {getTodosByLabel} from "../../js/main/get-todos";
import Divider from "@material-ui/core/Divider";
import timeAgo from "../../js/utils/ui/timeago";
import ToDoChips from "../TodoChips/TodoChips";

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

export class Box extends React.Component {

    listen_note(c) {
        speak(c, () => {
        })
    }

    todosArray = {
        array_: [],
    };

    delete_note(d) {
        deleteTodo(d.date);

        document.getElementById(`todo_${d.noteId}`).remove();
        //        document.querySelector(`#${d.noteId}`).remove();
    }

    state = {
        preloader: 'd-block',
    };

    componentDidMount() {
        this.state.preloader = 'd-none';
        getTodos().then(value => {
            this.renderPosts(value);
        })
    }


    check_if_null(a) {
        if (a !== undefined || null || '') {
            return a;
        } else {
            return 'Nothing Here!';
        }
    }

    refresh = () => {
        getTodos().then(value => {
            this.renderPosts(value);
        })
    };
    handleChip_ = (v) => {
        getTodosByLabel(v).then(value => {
            if (value !== null) {
                this.renderPosts(value);
                console.log(value);
            }
        });
    };
    renderPosts = async (posts) => {
        try {
            console.log(posts);
            // this will re render the view with new data
            if (posts.length) {
                this.setState({
                    notes: posts.map((note, i) => {
                        return (
                            <div class="col-md-4 p-0 mr-2 my-2" id={`todo_${note.uniqid}`}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>
                                            <small class="text-muted small text-truncate mb-2" style={{
                                                wordWrap: 'break-word',
                                                whiteSpace: 'pre-wrap'
                                            }}>About {timeAgo(note.date)} | <Label/> {note.label}</small><br/><br/>
                                            <div className={'mt-2'}>{this.check_if_null(note.title)}</div>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className={'w-100 text-truncate'}>
                                            {this.check_if_null(note.body)}
                                            <Divider/>
                                        </Typography>
                                        <p className="header d-flex p-0 justify-content-around w-100">
                                            <span className="d-none id">{note.uniqid}</span>
                                            <IconButton onClick={() => {
                                                this.listen_note(note.title + '' + note.body)
                                            }} color={'primary'}>
                                                <VolumeUp/>
                                            </IconButton>
                                            <IconButton color={'primary'} onClick={(e) => {
                                                this.delete_note({date: note.date, noteId: note.uniqid, e: e})
                                            }}>
                                                <Delete/>
                                            </IconButton>
                                        </p>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                });
            } else {
                let x =
                    <div className={'w-100 h-100'}>
                        <div className={"d-flex justify-content-center"}>
                            <div square style={{marginTop: '15vh', backgroundColor: 'transparent'}}
                                 className={"d-flex justify-content-center rounded-circle"} elevation={0}>
                                <img style={{width: '10rem', opacity: '80%'}} src={'assets/icons/ic_launcher.png'}/>
                            </div>
                        </div>
                        <div className={'text-center text-muted'}>Todos Will Appear Here!</div>
                    </div>;
                this.setState({
                    notes: x,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };


//onClick={(e) => this.contentEditable_paper(e.target)}
    render() {
        return (
            <div className={'container p-0 m-0 w-100'}>
                <div className={'row p-0 m-0'}>
                    <div style={{marginTop: '8rem'}} className={` preload_spinner ${this.state.preloader}`}>
                        <div className={'d-flex justify-content-center'}>
                            <svg className="spinner_" width="65px" height="65px" viewBox="0 0 66 66"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33"
                                        cy="33" r="30"/>
                            </svg>
                        </div>
                    </div>
                    <div className={'col-md-12'}>
                        <ToDoChips chip_val={this.handleChip_} chip_blur={this.refresh}/>
                    </div>
                    {this.state.notes}
                </div>
            </div>
        );
    }

}


Box.propTypes = {};

Box.defaultProps = {};

export default Box;

