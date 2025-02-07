import React, {useRef, useEffect} from 'react';
import UserCard from "../components/UserCard";
import useStore from "../store/main";
import MessageBox from "../components/MessageBox";


const UsersPage = () => {

    const {AllUsers, MsgReceiver, onlineUser, GetAllMessages, AllMessages} = useStore(state => state)
    const messageRef = useRef()

    const findUsersMessages = AllMessages.filter(message => message.to === onlineUser.username)


    function sendMessage() {

        const message = {
            from: onlineUser.username,
            to: MsgReceiver,
            text: messageRef.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message)
        }

        fetch("http://localhost:2002/sendMessage", options)
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    return alert(data.message)
                }
                alert(data.message)
            })
    };


    useEffect(() => {
        fetch("http://localhost:2002/message")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                GetAllMessages(data)
            })
    }, [])


    return (
        <div className="users_con">
            <div className="users_col">
                {AllUsers.map((user, i) => (
                    <UserCard key={i} user={user} />
                ))}
            </div>
            <div className="sideBar">
                <div className="msg_con">
                    <div className="title_col">
                        <h4>Messages</h4>
                    </div>

                    {findUsersMessages.map((message, i) => (
                        <MessageBox key={i} message={message} />
                    ))}
                </div>

                <div className="text_box">
                    <div className="receiver">
                        <p className="sendTo orange">To:</p>
                        <p className="sendTo">{MsgReceiver}</p>
                    </div>
                    <textarea ref={messageRef}></textarea>
                    <div className="btn_place">
                        <button className="send_btn" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;