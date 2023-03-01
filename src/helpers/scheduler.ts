import cron from "node-cron"
import patientRequest from "../models/PatientRequest"
import donorRequest from "../models/Request"
import { CronJob } from 'cron';

const donorJob = new CronJob('*/2 * * * *', async () => {
  const date = new Date()
  date.setDate(date.getMinutes() - 1)// substract 7 days from the current date
  const requests = await donorRequest.find({
    status: { $in: ['approved', 'rejected'] },
    updatedAt: { $lt: date },
  });

  //update the status of each request to open
  requests.forEach(async (request) => {
    request.status = "open";
    await request.save();
  });
}, null, true, 'Asia/Kathmandu');

const patientJob = new CronJob('*/2 * * * *', async()=>{
    const date = new Date()
    date.setDate(date.getMinutes()-1)
    const requests = await patientRequest.find({
        status:{$in:['approved','rejected']},
        updatedAt:{$lt:date},
    })

    //update the status
    requests.forEach(async(request)=>{
        request.status = "open";
        await request.save()
    })
},null,true,'Asia/Kathmandu')

export default [donorJob,patientJob];

// Schedule a job to run every day at 12:00 AM
// cron.schedule('0 0 * * *', async()=>{
//     const date = new Date()
//     date.setDate(date.getDate() - 7)// substract 7 days from the current date
//     const requests = await donorRequest.find({
//         status:{$in:['approved','rejected']},
//         updatedAt:{$lt:date},
//     });

//     //update the status of each request to open
//     requests.forEach(async(request)=>{
//         request.status = "open",
//         await request.save()
//     })
// },{
//     timezone:'Asia/Kathmandu',
// })