import React, {useRef, useEffect} from 'react';
import useStore from '../store/main'
import { useNavigate } from 'react-router-dom';
import "./LogForm.css"

const Log = () => {

    const {logPage, RegisterUser, LogInUser, changeLogPage, changeMainNav, logTitle} = useStore(state => state)

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const navigate = useNavigate();


    function register(){

        const newUser = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        }

        fetch("http://localhost:2002/register", options)
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    return alert(data.message)
                }

                alert("User registered successfully");

                navigate('/logIn');
                changeLogPage(true, "LogIn")
            })
    }

    useEffect(() => {
        fetch("http://localhost:2002/users")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            RegisterUser(data)
        })
    },[])


    function login(){

        const newUser = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        }

        fetch("http://localhost:2002/logIn", options)
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    return alert(data.message)
                }

                if (!data.token) {
                    return alert("Token not found in response from backend");
                }

                LogInUser(data.username, data.token);
                localStorage.setItem("token", data.token)
                changeMainNav(true)
                alert(data.message);
                console.log(data)
                navigate('/users');
            })
    }


    return (
        <div className="log_con">
            <div className="log_header">
                <span>{logTitle}</span>
            </div>
            <div className="input_box">
                {!logPage ? (
                    <input type="text" placeholder='Email' ref={emailRef}/>
                ): null}
                <input type="text" placeholder='Username' ref={usernameRef}/>
                <input type="text" placeholder='Password' ref={passwordRef}/>
                {!logPage ? (
                    <>
                        <input type="text" placeholder='Repeat Password' ref={password2Ref}/>
                        <button className="log_btn" onClick={register}>Register</button>
                    </>
                ): (<button className="log_btn" onClick={login}>LogIn</button>
                )}
            </div>



        </div>
    );
};

export default Log;