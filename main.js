let task = document.getElementById('task');
let addTask = document.getElementById('addTask');
let container = document.getElementById('container');
let tasksList = document.getElementById('tasksList');
let search = document.getElementById('search');
let modebtn = document.getElementById('modebtn');
let circle = document.getElementById('circle');
let input = document.querySelectorAll('input');

let tasks = [];
let t;
let currentMode = 'light';

onload = function(){
    tasks = JSON.parse(localStorage.TASKS);
    currentMode = JSON.parse(localStorage.MODE);
    showT();
}

// addT
function addT(){
    let taskO = {
        text: task.value,
        done: 'NO',
    };
    tasks.push(taskO);
    task.value = '';
}

// showT
function showT(){
    t = '';
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].done == 'YES'){
            doneT(i);
        } else {
            t += `
            <div class="box">
                <div onclick='makeDone(${i})'>${tasks[i].text}</div>
                <i onclick='delT(${i})' class="fa-solid fa-trash"></i>
            </div>
            `;
        }
    }
    document.getElementById('tasksBox').innerHTML = t;
    if (tasks.length > 0){
        tasksList.style.display = 'flex';
    } else {
        tasksList.style.display = 'none';
    }
    if (currentMode == 'dark'){
        modeDark();
    } else {
        modeLight();
    }
    locStorage();
}

// makeDone
function makeDone(index){
    if (tasks[index].done == 'NO'){
        tasks[index].done = 'YES';
    } else {
        tasks[index].done = 'NO';
    }
    showT();
}

// delT
function delT(index){
    tasks.splice(index, 1);
    if (search.value == ''){
        showT();
    } else {
        filter();
    }
}

// doneT
function doneT(index){
    t += `
            <div class="box">
                <div onclick='makeDone(${index})'><span>&nbsp${tasks[index].text}&nbsp</span></div>
                <i onclick='delT(${index})' class="fa-solid fa-trash"></i>
            </div>
            `;
}

// delAll
function delAll(){
    tasks.splice(0);
    showT();
}

// filter
function filter(){
    t = '';
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].text.toLowerCase().includes(search.value.toLowerCase())){
            t += `
            <div class="box">
                <div onclick='makeDone(${i})'>${tasks[i].text}</div>
                <i onclick='delT(${i})' class="fa-solid fa-trash"></i>
            </div>
            `;
        }
    }
    document.getElementById('tasksBox').innerHTML = t;
}

// mode
function modeLight(){
    container.className = '';
    document.getElementById('h1').style.color = '#219b8e';
    document.body.style.background = 'white';
    input[0].style.background = 'white';
    input[1].style.background = 'white';
    input[0].style.color = 'black';
    input[1].style.color = 'black';
    currentMode = 'light';
    // circle.className = '';
    circle.style.marginLeft = '2px';
}
function modeDark(){
    container.className = 'dark';
    document.getElementsByTagName('h1')[0].style.color = 'white';
    document.body.style.background = 'black';
    input[0].style.background = 'black';
    input[1].style.background = 'black';
    input[0].style.color = 'white';
    input[1].style.color = 'white';
    currentMode = 'dark';
    // circle.className = 'circleDark';
    circle.style.marginLeft = '28px';
}

// locStorage
function locStorage(){
    localStorage.TASKS = JSON.stringify(tasks)
    localStorage.MODE = JSON.stringify(currentMode);
}

addTask.onclick = function(){
    addT();
    showT();
}

modebtn.onclick = function(){
    if (currentMode == 'light'){
        modeDark();
    } else {
        modeLight();
    }
    locStorage();
}
