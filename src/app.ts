import express, { Application } from 'express'
import cors from 'cors'
import routesSetup from './routes'
const configureApplication = async() =>{
    const app:Application = express()
    app.use(cors())
    app.use(express.json())
    app.listen(5000,()=>{
        console.log("The application is running")
    })
    routesSetup(app)
    return app
}

configureApplication()