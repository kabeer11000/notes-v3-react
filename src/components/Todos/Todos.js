import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import speak from "../../js/utils/speech/speak";
import IconButton from "@material-ui/core/IconButton";
import {Delete, VolumeUp} from '@material-ui/icons';
import deleteTodo from "../../js/main/delete-todo";
import getTodos from "../../js/main/get-todos";
import Divider from "@material-ui/core/Divider";
import timeAgo from "../../js/utils/ui/timeago";
import Paper from "@material-ui/core/Paper";

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

    delete_note(d) {
        deleteTodo(d.date);
        console.log(d.e.target.parentNode.parentNode.parentNode.parentNode.closest('.col-md-4').remove())
//        document.querySelector(`#${d.noteId}`).remove();
    }

    state = {
        preloader: 'd-block',
    };

    componentDidMount() {
        this.state.preloader = 'd-none';
        this.renderPosts();
    }

    check_if_null(a) {
        if (a !== undefined || null || '') {
            return a;
        } else {
            return 'Nothing Here!';
        }
    }


    renderPosts = async () => {
        try {
            let posts = await getTodos();
            console.log(posts);
            // this will re render the view with new data
            if (posts.length) {
                this.setState({
                    notes: posts.map((note, i) => {
                        return (
                            <div class="col-md-4 p-0 m-0 my-2">
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
                                            }}>About {timeAgo(note.date)}</small><br/>
                                            <div className={'mt-2'}>{this.check_if_null(note.title)}</div>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className={'w-100'}>
                                            {this.check_if_null(note.body)}
                                            <Divider/>
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
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                });
            } else {
                let x =
                    <div className={"d-flex justify-content-center"}>
                        <Paper square style={{marginTop: '20vh'}}
                               className={"d-flex justify-content-center rounded-circle"} elevation={0}>
                            <img style={{width: '10rem'}} src={'assets/not_found.gif'}/>
                        </Paper>
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
            <div className={'container p-0 m-0'}>
                <div className={'row p-0 m-0'}>
                    <div style={{marginTop: '8rem'}} className={` preload_spinner ${this.state.preloader}`}>
                        <div className={'d-flex justify-content-center'}>
                            <svg className="spinner_" width="65px" height="65px" viewBox="0 0 66 66"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"/>
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

