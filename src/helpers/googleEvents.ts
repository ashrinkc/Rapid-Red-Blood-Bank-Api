import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import dotenv from 'dotenv'
dotenv.config()

const SCOPES = 'https://www.googleapis.com/auth/calendar'

export const insertEvent = async(data:any)=>{
    const client = new JWT({
        email: process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
        key: process.env.GOOGLE_CALENDAR_PRIVATE_KEY,
        scopes: SCOPES,
        // subject: process.env.GOOGLE_CALENDAR_IMPERSONATED_EMAIL,
    })

    const calendar = google.calendar({version:"v3"})
    const eventStartDate = ``
    const eventEndDate = ``

    const res = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        auth:client,
        sendUpdates:'all',
        sendNotifications:true,
        requestBody: {
            summary: data.eventName,
            location: data.eventLocation,
            description: data.eventDescription,
            start: {
                dateTime: data.eventTime,
                timeZone: 'Asia/Kathmandu',
            },
            end: {
                dateTime: data.eventEndTime,
                timeZone: 'Asia/Kathmandu',
        }}
    })
    return res.data.htmlLink
}

