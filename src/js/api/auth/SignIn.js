/**
 * @return {boolean}
 */

export default async function SignInBackEnd(data) {
    let status = false, user = {};
    /*
            const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let status = false, user = {};
        await fetch('https://kabeersnotes.herokuapp.com/api/user/signin', options)
            .then(res => res.json())
            .then(res => {
                if (res.status){
                    user = res;
                    status = true;
                }
            });
     */
    await fetch('https://raw.githubusercontent.com/kabeer11000/sample-response/master/notes/api_response.json')
        .then(res => res.json())
        .then(res => {
            if (res.status) {
                user = res.user;
                status = true;
            }
        });
    //https://raw.githubusercontent.com/kabeer11000/sample-response/master/notes/api_response.json
    //https://kabeersnotes.herokuapp.com/api/user/signin
    return {status: status, user: user};
}
