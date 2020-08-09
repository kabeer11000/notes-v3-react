import React from "react";
import store from "store";
import Redirect from "react-router-dom/es/Redirect";

export default async function SignOut() {
    store.remove('user');
    store.remove('loggedIn');

    return <Redirect to={'/login'}/>
}
