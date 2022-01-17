const express = require("express");
const socket = require('socket.io');
const app = express();
const cors = require('cors');

const port =4047;
app.use(cors({origin:'http://localhost:300'}))


app.get("/",(req,res)=>{
   res.send("connetc user");
})

const server = app.listen(port,()=>[
    console.log("port is connected")
])

const user={};

const io = socket(server,{
    cors:{
        origin:'*'
    }
});
io.on('connection',(socket=>{
    console.log(socket.id);
    socket.on('join_room',(data)=>{
        console.log(data);
        socket.join(data);
    })

    socket.on('send_message',(data)=>{
        console.log("message send data ",data)
        socket.to(data.room).emit('receive_message',data);
    })

    socket.on('typing',(data)=>{
        console.log(data);
        socket.to(data.room).emit('typing',data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })
}))