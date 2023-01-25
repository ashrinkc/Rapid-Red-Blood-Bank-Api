const io = require("socket.io")(5000,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users:any = []

const addUser = (userId,socketId)=>{
    !users.some((user:any)=>user.userId===userId) && 
    users.push({userId,socketId})
}

const removeUser =  (socketId) =>{
    users = users.filter((user:any)=>user.sockerId !== socketId)
}

const getUser = (userId) =>{
    return users.find((user:any)=>user.userId === userId)
}

io.on("connection",(socket)=>{
    //when connect
    console.log("a user connected")

    //take userId and sockerId from user
    socket.on("addUser",userId=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })

    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId)
        io.to(user.sockerId).emit("getMessage",{
            senderId,
            text
        })
    })

    //when disconnect
    socket.on("disconnect",()=>{
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers",users)
    })

})