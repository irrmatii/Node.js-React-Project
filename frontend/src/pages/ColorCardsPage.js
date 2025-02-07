import React, {useEffect, useRef} from 'react';
import ColorCard from "../components/ColorCard";
import useStore from "../store/main";

const ColorCardsPage = () => {


    const {onlineUser, GetAllCards, AllCards} = useStore(state => state)
    const colorRef = useRef()



    function createCard(){

        const card = {
            username: onlineUser.username,
            color: colorRef.current.value,
            id:  Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
        }

        if (!colorRef.current.value) return alert("Please choose a color")


        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(card)
        }

        fetch("http://localhost:2002/createCard", options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            GetAllCards(data.allCards);
            colorRef.current.value = ""
            alert(data.message)
        })
    }


    useEffect(() => {
        fetch('http://localhost:2002/colorCards')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched Color Cards:", data);
                GetAllCards(data)
            })
    }, []);




    return (
        <div className="users_con">
            <div className="create_con">
                <div className="create_box">
                    <p className="sendTo">Press to choose color</p>
                    <input type="color" ref={colorRef}/>
                    <button onClick={createCard}>Create Card</button>
                </div>
            </div>
            <div className="users_col">
                {AllCards.map((card, index) => (
                    <ColorCard key={index} card={card}/>
                ))}
            </div>

        </div>
    );
};

export default ColorCardsPage;