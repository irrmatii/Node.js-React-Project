import React from 'react';
import IconBox from "../components/IconBox";
import useStore from "../store/main";

const SingleUserPage = () => {

    const {OtherUsersIcons, onlineUser,  askedIcons, ClearAskedIcons} = useStore(state => state)


    function sendRequest() {

        const request = {
            id: crypto.randomUUID(),
            from: onlineUser.username,
            to: OtherUsersIcons.username,
            icon: askedIcons
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        }

        fetch("http://localhost:2002/sendRequest", options)
            .then(res => res.json())
            .then(data => {
                alert(data.message)
                ClearAskedIcons()
                console.log(data)
            })
    };


    return (
        <div className="users_con f-col">
            <div className="title_col">
                <h3>Welcome to {OtherUsersIcons.username} profile</h3>
                <h4>Total icons: {OtherUsersIcons.icons.length} </h4>
            </div>
            <div className="users_col">
                {OtherUsersIcons.icons.map((icon, index) => (
                    <IconBox key={index} otherIcon={icon}/>
                ))}
            </div>
            <div className="btn_place">
                <button onClick={sendRequest}>Send Request </button>
            </div>
        </div>
    );
};

export default SingleUserPage;