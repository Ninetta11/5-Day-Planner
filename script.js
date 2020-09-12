var currentDate = document.querySelector('#currentDay');
var timeSlot = document.querySelector('.time-block');
var inputEl = document.querySelectorAll('input');
var saveBtn = document.querySelectorAll('button');

var schedule = [
    {time: 9, task: ""},
    {time: 10, task: ""},
    {time: 11, task: ""},
    {time: 12, task: ""},
    {time: 13, task: ""},
    {time: 14, task: ""},
    {time: 15, task: ""},
    {time: 16, task: ""},
    {time: 17, task: ""},
];

// function to change background color based on time
function backgroundColour(){
    for (var i = 0; i < timeSlot.children.length; i++){
        $(timeSlot.children[i].children[0]).addClass('hour');
        var time = moment().hour();
        if (parseInt(timeSlot.children[i].id) === time) {
            $(timeSlot.children[i].children[1]).addClass('present');
        }
        else if (parseInt(timeSlot.children[i].id) < time) {
            $(timeSlot.children[i].children[1]).addClass('past');
        } 
        else {
            $(timeSlot.children[i].children[1]).addClass('future');
        };
    };
};

// sets stored tasks from local storage to inputs
function renderSavedTasks(){
    var savedtasks = JSON.parse(localStorage.getItem("schedule"));
    for (var i = 0; i < savedtasks.length; i++){
        timeSlot.children[i].children[1].value = savedtasks[i].task;
        schedule[i].task = savedtasks[i].task;
     };    
};

// function to save content entered into input 
function saveTask(){
    if (event.target.matches("button")){
        // adds text content of event target to array object of same id
        var hour = parseInt(event.target.parentElement.id);
        var variance = parseInt(timeSlot.children[0].id);
        var taskText = inputEl[hour - variance].value;
        for (var i = 0; i < schedule.length; i++){
           if (hour === schedule[i].time){
               schedule[i].task = taskText;
           };
        };
        // sets array to local storage
        localStorage.setItem("schedule", JSON.stringify(schedule));
    }; 
};

// sets current date
currentDate.textContent = moment().format(' dddd, Do MMMM');

$(saveBtn).addClass('saveBtn far fa-save');

backgroundColour();

renderSavedTasks();

timeSlot.addEventListener('click', saveTask);




