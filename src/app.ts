import express, { Application } from 'express'
import cors from 'cors'
import routesSetup from './routes'
import dotenv from 'dotenv'
import connect from './config/dbconnection'
import cron from './helpers/scheduler'
const configureApplication = async() =>{
    dotenv.config()
    await connect()
    const app:Application = express()
    app.use(cors())
    app.use(express.json())
    const server = app.listen(5000,()=>{
        console.log("The application is running")
    })
    cron
    const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000"
    }
    })
    let users:any = []

    const addUser = (userId:any,socketId:any)=>{
        !users.some((user:any)=>user.userId===userId) && 
        users.push({userId,socketId})
    }

    const removeUser =  (socketId:any) =>{
        users = users.filter((user:any)=>user.socketId !== socketId)
    }

    const getUser = (userId:any) =>{
        return users.find((user:any)=>user.userId === userId)
    }

    io.on("connection",(socket:any)=>{
        //when connect
        console.log("a user connected")

        //take userId and sockerId from user
        socket.on("addUser",(userId:any)=>{
            addUser(userId,socket.id)
            io.emit("getUsers",users)
        })

        //send and get message
        socket.on("sendMessage",({senderId,receiverId,text}:any)=>{
            const user = getUser(receiverId)
            if (user && user.socketId){
            io.to(user.socketId).emit("getMessage",{
                senderId,
                text
            })}
        })

        //when disconnect
        socket.on("disconnect",()=>{
            console.log("a user disconnected")
            removeUser(socket.id)
            io.emit("getUsers",users)
        })

        })
    routesSetup(app)
    return app
}

configureApplication()