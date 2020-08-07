import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import './TodoChips.css';
import {getTodos_non_async} from "../../js/main/get-todos";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'no-wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        width: '100%',
        overflow: 'scroll'
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function ToDoChips(props) {
    const classes = useStyles();
    let labels_ = getTodos_non_async(), b = [];
    labels_.forEach(value => {
        b.push(value.label);
    });
    labels_ = b.filter(function (item, pos) {
        return b.indexOf(item) === pos;
    });

    console.log(labels_);
    const [chipData, setChipData] = React.useState(labels_);


    function handleChip(v) {
        props.chip_val(v);
//        props.chip_val = v;
    }

    function chipShowAll() {
        props.chip_val(getTodos_non_async());
    }

    return (
        <div className={`scrollmenu`}>
            {chipData.map((data, i) => {
                let icon;

                if (data.label === 'React') {
                    icon = <TagFacesIcon/>;
                }

                return (
                    <div key={i}>
                        <Chip
                            clickable={true}
                            onClick={() => {
                                handleChip(data)
                            }}
                            icon={icon}
                            onBlur={() => {
                                props.chip_blur()
                            }}
                            label={data}
                            className={classes.chip}
                        />
                    </div>
                );
            })}
        </div>
    );
}
