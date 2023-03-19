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
            summary: 'OK',
            location: 'Balaju',
            description: 'JJJJJ',
            start: {
                dateTime: '2023-05-28T09:00:00-07:00',
                timeZone: 'Asia/Kathmandu',
            },
            end: {
                dateTime: '2023-05-28T09:00:00-07:00',
                timeZone: 'Asia/Kathmandu',
        }}
    })
    return res.data.htmlLink
}

