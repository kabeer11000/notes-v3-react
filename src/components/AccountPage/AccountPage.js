import React from 'react';
import './AccountPage.css';
import Avatar from "@material-ui/core/Avatar";
import store from 'store';
import Typography from "@material-ui/core/Typography";

const user = store.get('user');
const AccountPage = () => (
    <div className="AccountPage">
        <div className={'container '}>
            <div className={'row'}>
                <div className={'col-md-12 d-flex justify-content-center'}>
                    <Avatar alt={user.username} src="/static/images/avatar/3.jpg"/>
                </div>
                <div className={'col-md-12 text-center'}>
                    <Typography className={'text-capitalize'}>
                        Welcome, {user.firstname}
                    </Typography>
                    <Typography>
                        <small className={'text-muted'}>
                            {user.email}
                        </small>
                    </Typography>
                </div>
            </div>
        </div>
    </div>
);

AccountPage.propTypes = {};

AccountPage.defaultProps = {};

export default AccountPage;
