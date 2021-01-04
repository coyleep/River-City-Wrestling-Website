const { time, timeEnd } = require('console');
const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    start: {type:String, required:true},
    end: {type:String, required:true},
    eventName:{type:String, required:true},
    details:{type:String} 
},
{collection: 'calendar-storage'});


const model = mongoose.model('calendarSchema', calendarSchema);
module.exports = model;