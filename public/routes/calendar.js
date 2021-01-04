if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
var app = express()
const router = express.Router();
let model = require('../model/calendar_info.js');
const { MongoClient } = require("mongodb");
//const { Model } = require('mongoose');
app.use(express.json());
// connect Mongoose
const url = process.env.MongoDB;

const client = new MongoClient(url);

 // The database to use
 const dbName = "calendar";

client.connect().then(() => {
    console.log('mongodb connected')
})
// function to add data
 async function insert_data(data) {
    try {
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("calendar-people");
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(data);
        } catch (err) {
         console.log(err.stack);
     }
 
}


// Delete Data from database function
async function deleteData(event) {
    const db = client.db(dbName)
    const col = db.collection("calendar-people");
    await col.deleteOne({ eventName: event }, function (err) {
        if (err) return handleError(err);
        console.log('Event ' + event + ' has been deleted')
      });
}


// Find Data From database
async function findData() {
    const db = client.db(dbName);
    const col = db.collection("calendar-people");
    const cursor = await col.find({});
    const results = await cursor.toArray();
    if (results.length > 0) {
        results.forEach((result) => {
            return result
        })
        return results
    }
}



/* Post to /calendar/mongodb
   schedule.js --> mongodb (CREATE) */
router.post('/mongodb', async (req, res) =>{
    const { start, end, eventName, details} = req.body;
    const newEvent = model({
        start:start,
        end: end,
        eventName: eventName,
       details: details
   });
    insert_data(newEvent).catch(console.dir)
    res.redirect('/')
})


/* GET to /calendar/information
   mongodb --> schedule.js  (FIND) */
router.get('/information', async (req, res) =>{
    let newData = await findData().then()
    res.json(newData)
})

/* POST to /calendar/delete
   delete.ejs --> mongodb (DELETE) */
router.post('/delete', (req, res) =>{
    const event = req.body.eventName
    deleteData(event).then()
    res.redirect('/');
})

// GET to /calendar/create
router.get('/create', (req, res) => res.render('calendar'))

// GET to /calendar/schedule
router.get('/schedule', (req, res) =>{res.render('schedule')})

// GET to /calendar/delete
router.get('/delete', (req, res) => {res.render('delete')})


module.exports = router;