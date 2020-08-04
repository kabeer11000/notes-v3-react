import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AppBar from "@material-ui/core/AppBar";

export default function BNav() {
    const [BNav_value, BNav_setValue] = React.useState('notes');

    const BNav_handleChange = (event, newValue) => {
        BNav_setValue(newValue);
    };

    return (
        <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
            <BottomNavigation value={BNav_value} onChange={BNav_handleChange}>
                <BottomNavigationAction label="One" icon={<LocationOnIcon/>}/>
                <BottomNavigationAction label="Two" icon={<LocationOnIcon/>}/>
            </BottomNavigation>
        </AppBar>
    );
}
