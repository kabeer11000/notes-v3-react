import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Settings} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

export default function RouteButtons(props) {
    return (
        <List>
            <ListItem button>
                <ListItemIcon><Settings/></ListItemIcon>
                <ListItemText primary={'Settings'}/>
            </ListItem>
        </List>
    );
}
