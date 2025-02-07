import React, {useEffect} from 'react';
import useStore from "../store/main";
import IconBox from "../components/IconBox";
import MessageBox from "../components/MessageBox";


const IconsPage = () => {

    const {GetAllIcons, AllIcons, AllRequestsIcons, onlineUser, GetAllRequests} = useStore(state => state)


    useEffect(() => {
        fetch("http://localhost:2002/icons")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(AllIcons);
            GetAllIcons(data);
        })
    }, []);

    useEffect(() => {
        fetch("http://localhost:2002/request")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const findRequests = data.filter(request => request.to === onlineUser.username)
                GetAllRequests(findRequests)
            })
    }, []);


    return (
        <div className="users_con">
            <div className="left_col">
                <div className="title_col">
                    <h3>You have {AllIcons.length} icons</h3>
                </div>
                <div className="users_col">
                    {AllIcons.map((icon, index) => (
                        <IconBox key={index} icon={icon}/>
                    ))}
                </div>
            </div>
            <div className="sideBar">
                <div className="msg_con">
                    {AllRequestsIcons.map((request, i) => (
                        <MessageBox key={i} request={request} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default IconsPage;