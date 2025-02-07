import React, {useState} from 'react';
import './IconBox.css'
import useStore from "../store/main";

const IconBox = (props) => {

    const {AskForIcons} = useStore(state => state)
    const [selected, setSelected] = useState(false);


    function selectItem (){
        setSelected(true)
        AskForIcons(props.otherIcon)
    }


    return (
        <>
            {props.otherIcon ? (
                <div onClick={selectItem} style={{backgroundColor : selected ? '#cb7039' : 'transparent'}} className="icon_box">{props.otherIcon}</div>
            ) : <div className="icon_box">{props.icon}</div>
            }
        </>
    );
};

export default IconBox;