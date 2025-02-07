import React, {useEffect} from 'react';
import './MessageBox.css'
import useStore from "../store/main";

const MessageBox = (props) => {

    const {onlineUser, GetAllRequests} = useStore(state => state)

    function acceptRequest(){

        const request = {
            id: props.request.id,
            username: props.request.from,
            icon: props.request.icon
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        }

        fetch("http://localhost:2002/acceptRequest", options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const findRequests = data.requestsSent.filter(request => request.to === onlineUser.username)
                GetAllRequests(findRequests)
                alert(data.message)
            })
    }


    function denyRequest(){

        const request = {
            id: props.request.id
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        }

        fetch("http://localhost:2002/declineRequest", options)
            .then(res => res.json())
            .then(data => {
                const findRequests = data.requestsSent.filter(request => request.to === onlineUser.username)
                GetAllRequests(findRequests)
                alert(data.message)
            })
    }



    return (
        <>
            {props.message ? (
                    <div className="msg_box">
                        <p className="sendTo orange">From: {props.message.from} </p>
                        <p>{props.message.text}</p>
                    </div>
                ) :
                <div className="msg_box req_box">
                    <div>{props.request.icon}</div>
                    <div className="text_col">
                        <p>{props.request.from} is asking for icon</p>
                    </div>
                    <div className="btn_section">
                        <button onClick={acceptRequest}>accept</button>
                        <button onClick={denyRequest}>decline</button>
                    </div>
                </div>
            }
        </>


    );
};

export default MessageBox;