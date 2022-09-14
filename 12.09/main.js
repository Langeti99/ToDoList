const openModalButton = document.querySelector('.open-modal-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.btn-close');
const addPostButton = document.querySelector('.add-post-button');
const clearBtn = document.querySelector('.clear-btn');
const archiveBtn = document.querySelector('.archive-btn');
const allBtn = document.querySelector('.all-btn');

const content = document.querySelector('.content');
const summaryContent = document.querySelector('.archiveToDos');

const inputTitle = document.querySelector('#inputTitle');
const inputDate = document.querySelector('#inputDate');
const inputCategory = document.querySelector('#inputSelect');
const inputDescription = document.querySelector('#inputDescription');
const inputDateEnd = document.querySelector('#inputDateEnd');


openModalButton.addEventListener('click' , () => {
    modal.style.display = 'flex';
})

const CloseModal = () =>{
    inputTitle.value = '';
    inputDate.value = '';
    inputCategory.value = '';
    inputDescription.value = '';
    inputDateEnd.value = '';
    modal.style.display = 'none';
}

modal.addEventListener('click', (e) => {
    if(e.target === overlay || e.target === close){
        CloseModal();
    }
})



// TODO 


let tasks = [{
    title: "Shopping list",
    dateStart: "12.09.22",
    category: "Task",
    description: "Tomatoes, bread",
    dateEnd: "13.09.22",
},{
    title: "New features",
    dateStart: "10.09.22",
    category: "Idea",
    description: "The evolution...",
    dateEnd: "15.09.22",
}];

let archive = [];

let createSummary = () => {
    return ([{
        category: 'Task',
        active: tasks.filter((item) => item.category === 'Task').length,
        archived: '2'
    }, {
        category: 'Idea',
        active: tasks.filter((item) => item.category === 'Idea').length,
        archived: '2'
    }, {
        category: 'Random Thought',
        active: tasks.filter((item) => item.category === 'Random Thought').length,
        archived: '2'
    }])
}

function Task(title, dateStart, category, description, dateEnd){
    this.title = title;
    this.dateStart = dateStart ? dateStart : '111';
    this.category = category;
    this.description = description;
    this.dateEnd = dateEnd;
}



const createTemplate = (item , index) => {
    return (
        `
        <div class="item">
            <div class="title">
            <img src="./img/cartIcon.png" alt="cart" />
            <h2>${item.title}</h2>
            </div>
            <time datetime="2022-09-13 13:00">${item.dateStart}</time>
            <p>${item.category}</p>
            <p>${item.description}</p>
            <time datetime="2022-09-13 13:00">${item.dateEnd}</time>
            <ul>
                <li><button>edit</button></li>
                <li><button onclick="archiveTask(${index})">archive</button></li>
                <li><button onclick="deleteTask(${index})">delete</button></li>
            </ul>
        </div>
        `
    )
}

const createArchiveTemplate = (item , index) => {
    return (
        `
        <div class="item">
            <div class="title">
            <img src="./img/cartIcon.png" alt="cart" />
            <h2>${item.title}</h2>
            </div>
            <time datetime="2022-09-13 13:00">${item.dateStart}</time>
            <p>${item.category}</p>
            <p>${item.description}</p>
            <time datetime="2022-09-13 13:00">${item.dateEnd}</time>
            <ul>
                <li><button>edit</button></li>
                <li><button>dearchive</button></li>
                <li><button onclick="deleteTask(${index})">delete</button></li>
            </ul>
        </div>
        `
    )
}

const createSummaryTemplate = (item, index) => {
    return (
        `
        <div class="item">
            <div class="title">
                <img src="./img/cartIcon.png" alt="cart" />
                <h2>${item.category}</h2>
            </div>
            <p>${item.active}</p>
            <p>${item.archived}</p>
        </div>
        `
    )
}

const deleteTask = index => {
    console.log(index);
    console.log(tasks)
    tasks = tasks.filter((item) => item !== tasks[index]);
    console.log(tasks)
    fillHtmlList();
    fillSummaryTable();
}

const archiveTask = index => {    
    archive.push(tasks.filter((item) => item === tasks[index])[0]);
    tasks = tasks.filter((item) => item !== tasks[index]);
    fillHtmlList();
    fillSummaryTable();
}

const fillHtmlList = () => {
    content.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach((item, index ) => {
            content.innerHTML += createTemplate(item, index)
        })
    }
}

const fillArchiveList = () => {
    content.innerHTML = "";
    if(archive.length > 0){
        archive.forEach((item, index ) => {
            content.innerHTML += createArchiveTemplate(item, index)
        })
    }
}

const fillSummaryTable = () => {
    summaryContent.innerHTML = "";
    createSummary().map((item, index) => {
            summaryContent.innerHTML += createSummaryTemplate(item, index);
    })
}



addPostButton.addEventListener('click', (e) => {
    let obj = new Task(inputTitle.value, inputDate.value, inputCategory.value, inputDescription.value, inputDateEnd.value);
    tasks.push(obj);
    CloseModal();
    fillHtmlList();
    fillSummaryTable();
})

allBtn.addEventListener('click', () => {
    fillHtmlList();
})

clearBtn.addEventListener('click', () => {
    tasks = [];
    fillHtmlList();
    fillSummaryTable();
})

fillHtmlList();
fillSummaryTable();

archiveBtn.addEventListener('click', () => {

    console.log(archive)
    fillArchiveList();
})
