
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
  
function objectClicked(start, end, eventName, details) {
    this.start = start;
    this.end = end;
    this.eventName = eventName;
    this.details = details;
}

// gets todays date
const myData = [];
getData().then(createCalendar());


let calendarShow = 1;
function settingDate(date, day){
    // changes date into date object
    date = new Date(date);
    // sets day of the month to the date object
    date.setDate(day);
    date.setHours(23);
    return date;
}
// sets the date to today
function settingTodayDate(){
    date = new Date();
    date.setDate(31);
    date.setHours(23);
    return date;
}
function  getDatesBetween(date1, date2){
    // changes date1 and date2 to date objects
    let range1 = new Date();
    let range2 = new Date(date2);
    date1 = settingTodayDate();
    date2 = settingDate(date2, 31);

    // tempory Variable 
    let temp;
    // dates array to store dates 
    let dates = [];

    // Finds out the first date/day of each month
    while (date1 <= date2){
        if (date1.getDate() != 31) {
            temp = settingDate(date1, 0);
            if (temp >= range1 && temp <= range2) dates.push(temp);
            date1 = settingDate(date1, 31);
        } else {
            temp = new Date(date1);
            if (temp >= range1 && temp <= range2) dates.push(temp);
            date1.setMonth(date1.getMonth()+1);
        }
    }
    // initates content variable 
    let content="<div class='calendarBtns'><button id='calendarPrev' disabled onclick='callprev()'>Prev</button> | <button id='calendarNext' onclick='callnext()'>Next</button></div>";

    // stores weekdays in an array of weekDays
    let weekDays = [
        {shortDay:"Mon", fullDay:"Monday"},
        {shortDay:"Tue", fullDay:"Tuesday"},
        {shortDay:"Wed", fullDay:"Wednesday"},
        {shortDay:"Thu", fullDay:"Thursday"},
        {shortDay:"Fri", fullDay:"Friday"},
        {shortDay:"Sat", fullDay:"Saturday"},
        {shortDay:"Sun", fullDay:"Sunday"}
    ];

    // displays the calendar
    for (let i = 0; i < dates.length; i++){
        LastDate = dates[i];
        firstDate= new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);

        content += "<div id='calendarTable_"+(i+1)+"' class='calendarDiv'>";
        // The Header {ex. Apr.2020}, Splits object and returns 2nd to get month
        content += "<h2>"+firstDate.toString().split(" ")[1]+"-"+firstDate.getFullYear()+"</h2>";
        content += "<table>";
        content += "<thead>";
        // prints out Days of week {ex. Monday, Friday}
        weekDays.map(item => {
            content += "<th>"+ item.shortDay+"</th>"
        })
        content += "</thead>";
        content += "<tbody>";
        content += "<table id='numberTable'>"
        content += "<thead>"
        let j=1;
        let displayNum;
        // loops through days of month and prints out each day
        while(j <= LastDate.getDate()){
            content += "<tr>"
            // Gets every 7 days of the week
            for (let k = 0; k < 7; k++){
                
                displayNum = j<10?"0"+j:j;
                if(j == 1){
                    // if the first day of the month == the first weekday
                    if(firstDate.toString().split(" ")[0] == weekDays[k].shortDay){
                        // prints day of month {ex. 10 or 25}
                    let dateTrue = true
                    // loops through myData and produces it as result variable
                    myData.forEach((result) =>{
                        if(firstDate.toString().split(" ")[1] == result.start.toString().split(" ")[1]){
                            // if day number = starting day 
                            if(displayNum == result.start.toString().split(" ")[2]){
                                
                                content += "<th>";
                                content += "<div id='event'><span id='eventClicked'>"+ result.eventName +"</span></div>"
                                content += "</th>"
                                // prevents second day printed 
                                dateTrue = false;
                            }
                        }
                    })
                    // checks to see if the day is alread printed
                    if (dateTrue == true){
                        content += "<th>" + displayNum + "</th>"
  
                    }
                        j++;
                    }else{
                        // prints nothing for days before month starts
                        content += "<th></th>";
                    }
                }else if(j > LastDate.getDate()){
                    // prints nothing for days before month ends
                    content += "<th></th>"
                }else{
                    // prints day of month {ex. 10 or 25}
                    let dateTrue = true
                    let secondDay = false;

                    // loops through myData and produces it as result variable
                    for(w=0; w<myData.length; w++){
                        if(firstDate.toString().split(" ")[1] == myData[w].start.toString().split(" ")[1]){
                            // if day number = starting day 
                            if(displayNum == myData[w].start.toString().split(" ")[2]){
                                if(secondDay == false){
                                content += "<th>" + displayNum;
                                content += "<div id='eventOutside'><div id='event'><a id='popupup'onclick='modal("+JSON.stringify(myData[w])+")'><span>"+ myData[w].eventName +"</span></a></div></div>"
                                
                            dateTrue=false
                        }else{
                                    secondDay =false
                                    content += "<div id='eventOutside'><div id='event'><a id='popupup'onclick='modal("+JSON.stringify(myData[w])+")'><span>"+ myData[w].eventName +"</span></a></div></div>"
                                    dateTrue=false
                                    content += "</th>" 
                                }
                              // prevents second day printed 
                                    
                            for(q=1; q<myData.length; q++){
                            if(myData[w].start.toString().split(" ")[1] == myData[q].start.toString().split(" ")[1] && myData[w].start.toString().split(" ")[1] == myData[w].start.toString().split(" ")[1]){
                                  secondDay = true;
                              }else {
                                content += "</th>" 
                              }}
                                
                                
                            }
                        }
                    }
                     //checks to see if the day is alread printed
                    if (dateTrue == true){
                        content += "<th>" + displayNum +"</th>"
                    }
                    j++;
                    
                }
            }

                        content += "</tr>"
        }
        content += "</thead>"
        content += "</table>"
        content += "</tbody>";
        content += "</table>";
        content += "</div>";
    }
   // myData.forEach((result)=>{
   //     singleEvent.push(new objectClicked(result.start, result.end, result.eventName, result.details))

  //  })
    dataTable()
    return content;
    

};
// button clicked prev
function callprev(){
    let alltable = document.getElementsByClassName('calendarDiv');
    document.getElementById('calendarNext').disabled=false;
    calendarShow--;
    if (calendarShow >= 1){
        for(let i = 0; i < alltable.length; i++){
            alltable[i].style.display = "none";
        }
    };
    document.getElementById("calendarTable_"+calendarShow).style.display = "block";
    // disabled on first page
    if (calendarShow == 1){
        document.getElementById('calendarPrev').disabled = true;
    }
}
// button clicked next
function callnext(){
    let alltable = document.getElementsByClassName('calendarDiv');
    document.getElementById('calendarPrev').disabled=false;
    calendarShow++;
    if (calendarShow <= alltable.length){
        for(let i = 0; i < alltable.length; i++){
            alltable[i].style.display = "none";
        }
    };
    document.getElementById("calendarTable_"+calendarShow).style.display = "block";
    // disabled when no more pages
    if (calendarShow == alltable.length){
        document.getElementById('calendarNext').disabled = true;
    }
}

function createCalendar(){
setTimeout(() =>{
    let content = getDatesBetween("2021/01/01", "2025/01/01");
    // Puts content into the html page 
    document.getElementById('calendar').innerHTML = content
},500)
}
 // sets whether it is am or pm 
 function TimeOfDate(hour,min){
     if(min < 10){
         min = "0" + min
     }
    if (hour > 12){
        hour = hour - 12;
        return hour +":" + min +"pm"
    }else{
        return hour + ":" + min + "am"
    }
 }

const overlay = document.getElementById('overlay')

// modal
function modal(result){
    const modal = document.getElementById('modal')
    start = new Date(result.start)
    end = new Date(result.end)

    startMin = start.getMinutes();
    startHour = start.getHours();
    endMin = end.getMinutes();
    endHour = end.getHours();
    document.getElementById('time').innerHTML =  TimeOfDate(startHour,startMin) + '-' + TimeOfDate(endHour,endMin);
    document.getElementById('details').innerHTML =  result.details;
    document.getElementById('modalTitle').innerHTML = result.eventName;
    openModal(modal)
}
// makes it so when you click outside the modal it closes it
overlay.addEventListener('click', ()=>{
    const modal = document.querySelector('.modal.active')
    closingModal(modal)
    });

// runs when closing the modal
function closingModal(){
    button = document.getElementById('closeButton')
    const modal = document.getElementById('modal')
    modal.classList.remove('active')
    overlay.classList.remove('active')
    let end_time = document.getElementById('details');
    let start_time = document.getElementById('start-time') ;
    if (start_time != null){   
        start_time.innerHTML = '';
     }
    if (end_time != null){   
        end_time.innerHTML = '';
    }
}
// function that opens the modal
function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}


// function that creates the datatable
function dataTable(){
    setTimeout(() =>{
    let divContent = '';
    const eventTable = document.getElementById('event-table');
        myData.slice().reverse().forEach((result)=>{
    //let startDate = new Date(result.start)
   // let endDate = new Date(result.end)
    //console.log(startDate)
    let startDay = result.start.toString().split(" ")[2]
    let startMonth = result.start.toString().split(' ')[1]
    let startWeekday = result.start.toString().split(' ')[0]
    let startTime = result.start.toString().split(' ')[3]
    let endWeekday = result.end.toString().split(' ')[0]
    let endDay = result.end.toString().split(' ')[2]
    let endTime = result.end.toString().split(' ')[3]
    startMin = result.start.getMinutes();
    startHour = result.start.getHours();
    endMin = result.end.getMinutes();
    endHour = result.end.getHours();
    // TimeOfDate(startHour,startMin) + '-' + TimeOfDate(endHour,endMin);
    divContent += '<div class="container-event"><div class ="event-left"><div class="event-date">'
    // adds start date to date div
    divContent += '<div class="date">'+ startDay+'</div>'
    // adds startMonth to month div
    divContent += '<div class="month">' + startMonth + '</div></div></div>'
    divContent +=' <div class="event-right">'
    // adds Event Name to event-title div
    divContent += '<h3 class="event-title">' + result.eventName + '</h3>'
    // adds Details to event-description div
    divContent += '<div class="event-description">' + result.details + '</div>'
    // adds timing infomation for Start Time
    divContent += '<div class="event-timing"><div class="event-start">Start:' + TimeOfDate(startHour,startMin)+ ' ' + startWeekday + ' ' + startDay + ' ' + startTime +'</div>'
    // adds timing information for End Time 
    divContent += '<div class="event-end">End:' + TimeOfDate(endHour,endMin)+ ' ' + endWeekday + ' ' + endDay + ' ' + endTime +'</div></div></div></div>'
    // puts all div elements into html form
    })
    eventTable.innerHTML = divContent
})
}


async function getData(){
    // fetches data from /calendar/information
    const response = await fetch('/calendar/information');
    // Store this json data in a variable called data
    const data = await response.json()
    // Gets rid of array and returns data
    data.forEach((result) => {        
        // Puts data into object in myData array
        myData.push({
            start: new Date(result.start),
            end: new Date(result.end),
            eventName: result.eventName,
            details: result.details
        })
    })

}
  }
  