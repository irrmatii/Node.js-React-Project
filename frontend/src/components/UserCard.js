import React from 'react';
import "./UserCard.css"
import useStore from "../store/main";
import {useNavigate} from 'react-router-dom'



const UserCard = (props) => {

    const {onlineUser, ChooseReceiver, GetVisitedUserIcons, OtherUsersIcons} = useStore(state => state)
    const navigate = useNavigate();


    function visitProfile () {

        fetch(`http://localhost:2002/users/${props.user.username}`)
            .then(res => res.json())
            .then(data => {

                if (data.error){
                    return alert(data.message)
                }

                GetVisitedUserIcons(data)
                console.log(data.icons)
                console.log(OtherUsersIcons)

                navigate(`/users/${props.user.username}`)
            })

    }

    return (
        <div className="user_card">
            <div>
                <h4 className="orange">User: {props.user.username}</h4>
            </div>
            <div className="btn_section">
                {onlineUser.username !== props.user.username ? (
                    <>
                        <button onClick={() => ChooseReceiver(props.user.username)}>Send Message</button>
                        <button onClick={visitProfile}>Visit Profile</button>
                    </>

                ) : null}
            </div>
        </div>
    );
};

export default UserCard;