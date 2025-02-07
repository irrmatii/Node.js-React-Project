import React from 'react';
import './ColorCard.css'
import useStore from "../store/main";


const ColorCard = (props) => {

    const {GetAllCards} = useStore(state => state)

    function deleteCard(){

        const postInfo = {
            id: props.card.id
        }

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(postInfo)
        }

        fetch("http://localhost:2002/deletePost", options)
            .then(res => res.json())
            .then(data => {

                if (data.error) {
                    alert(data.message); // If there was an error, display it
                } else {
                    GetAllCards(data.allCards); // Update the UI with the latest posts
                    alert(data.message);
                    console.log(data)
                }
            })
    }




    return (
        <div className="user_card" style={{backgroundColor: props.card.color}}>
            <h4>{props.card.username}</h4>
            <button onClick={deleteCard}>Delete Post</button>
        </div>
    );
};

export default ColorCard;