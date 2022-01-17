import React,{useState,useEffect} from 'react'
import socket from '../io'
function ChatBox() {
const [inputField,setInputField]=useState({
    name:'',
    room:'',
    message:""
})
const [isChatting, setIsChatting]=useState(false);
const [messageList,setMessageList]=useState([]);
const [typing,setTyping]=useState(false)
const [typestName,setTypestName]=useState("");
useEffect(()=>{
socket.on('receive_message',(data)=>{
    console.log('client side data',data);
    console.log(messageList);
    let newMessageList =messageList;
    messageList.push(data);
    setMessageList(newMessageList);
    
})

socket.on('typing',data=>{
    setTyping(true);
    setTypestName(data.name)
    console.log("client side data");
    console.log(data);
})

},[]);
const inputHandler = (e)=>{
console.log("Faizan")
console.log(e.target.name)
    if(e.target.name=="message"){
        console.log("typing")
        socket.emit('typing',inputField);
    }
    console.log(e.target.name)
    setInputField({
        ...inputField,
        [e.target.name]:e.target.value,
       
        
    })
   

}
const enterRoom = ()=>{
    console.log(inputField);
    setIsChatting(true);
    socket.emit('join_room',inputField.room);
}

const sendMessage =async ()=>{
    console.log("before send message",messageList);
    setTyping(false);
   await socket.emit("send_message",inputField);
   let newMessageList = messageList;
   newMessageList.push(inputField)
   setMessageList(newMessageList);
   

   console.log("send message ",messageList);
//    console.log(inputField);
}
console.log(messageList);

    return (
        <div>
            <h1>Chat App</h1>
          { !isChatting ?( <><div>
                <input type="text" placeholder="enter your name" name="name" onChange={inputHandler}/>
                <input type="text" placeholder="enter your room" name="room" onChange={inputHandler}/>
            </div>
            <br/>
            <button onClick={enterRoom}>Enter your chat room</button></>):
            (<>
            <h1>chat box</h1>
            {
                messageList.map((item,index)=>{
                    return(
                        <>
                      <div>
                          {item.name}:{item.message}</div>

                         

                        </>
                    )
                })
            }
            {typing && <h3>{typestName}  Typing....</h3>}
            <input type="text" placeholder="enter your message" name="message" onChange={inputHandler}/>
            <button onClick={sendMessage}>Send Message</button>

            </>)}
        </div>
    )
}

export default ChatBox
