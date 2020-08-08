export default async function FactoryReset(user_id) {

    localStorage.clear();
    await fetch("api/delete/all/" + user_id)
        .then(() => {
            fetch("account/logout")
                .then(() => {
                    window.location.href = '/login';
                });
        });
}
