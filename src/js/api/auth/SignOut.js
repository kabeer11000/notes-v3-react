import React from "react";
import store from "store";

export default async function SignOut() {
    store.remove('user');
    store.remove('loggedIn');
}
