const openModalButton = document.querySelector('.open-modal-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.btn-close');
const addPostButton = document.querySelector('.add-post-button');
const clearBtn = document.querySelector('.clear-btn');
const archiveBtn = document.querySelector('.archive-btn');
const allBtn = document.querySelector('.all-btn');
const editModal = document.querySelector('.edit');
const editBtn = document.querySelector('.edit-button');
const closeEdit = document.querySelector('.btn-close-edit');
const overlayEditModal = document.querySelector('.edit-overlay');

const content = document.querySelector('.content');
const summaryContent = document.querySelector('.archiveToDos');

const inputTitle = document.querySelector('#inputTitle');
const inputCategory = document.querySelector('#inputSelect');
const inputDescription = document.querySelector('#inputDescription');
const inputDateEnd = document.querySelector('#inputDateEnd');

const inputEditTitle = document.querySelector('#inputEditTitle');
const inputEditCategory = document.querySelector('#inputEditSelect');
const inputEditDescription = document.querySelector('#inputEditDescription');
const inputEditDateEnd = document.querySelector('#inputEditDateEnd');


openModalButton.addEventListener('click' , () => {
    modal.style.display = 'flex';
})

const clearInputs = () => {
    inputTitle.value = '';
    inputCategory.value = '';
    inputDescription.value = '';
    inputDateEnd.value = '';
}

const CloseModal = () =>{
    clearInputs();
    modal.style.display = 'none';
}

const CloseEditModal = () => {
    editModal.style.display = 'none';
}



modal.addEventListener('click', (e) => {
    if(e.target === overlay || e.target === close){
        CloseModal();
    }
})

editModal.addEventListener('click', (e) => {
    if(e.target === overlayEditModal || e.target === closeEdit){
        CloseEditModal();
    }
})






// TODO 


let tasks = [{
    title: "Shopping list",
    dateStart: "12.09.22",
    category: "Task",
    description: "Tomatoes, bread",
    dateEnd: "2022-09-15",
},{
    title: "New features",
    dateStart: "10.09.22",
    category: "Idea",
    description: "The evolution...",
    dateEnd: "2022-09-15",
}];

let archive = [];


const months = ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'];


let createSummary = () => {
    return ([{
        category: 'Task',
        active: tasks.filter((item) => item.category === 'Task').length,
        archived: archive.filter((item) => item.category === 'Task').length
    }, {
        category: 'Idea',
        active: tasks.filter((item) => item.category === 'Idea').length,
        archived: archive.filter((item) => item.category === 'Idea').length
    }, {
        category: 'Random Thought',
        active: tasks.filter((item) => item.category === 'Random Thought').length,
        archived: archive.filter((item) => item.category === 'Random Thought').length
    }])
}

const createDate = (months) => {    
    let date = new Date();
    let month = months.find((item, index ) => index === date.getMonth());
    let str = `${month} ${date.getDate()}, ${date.getFullYear()}`; 
    return str;
}

function Task(title, category, description, dateEnd){
    this.title = title ? title : 'Some name';
    this.category = category;
    this.description = description ? description : 'Some description';
    this.dateEnd = dateEnd;
}



const createTemplate = (item , index, array) => {
    return (
        `
        <div class="item">
            <div class="title">
            <img src="./img/cartIcon.png" alt="cart" />
            <h2>${item.title}</h2>
            </div>
            <time datetime="2022-09-13 13:00">${createDate(months)}</time>
            <p>${item.category}</p>
            <p>${item.description}</p>
            <time datetime="2022-09-13 13:00">${item.dateEnd ? item.dateEnd : createDate(months)}</time>
            <ul>
                <li><button onclick="editTask(${index})">edit</button></li>
                <li><button onclick="archiveTask(${index})">archive</button></li>
                <li><button onclick="deleteTask(${index})">delete</button></li>
            </ul>
        </div>
        `
    )
}

const createArchiveTemplate = (item , index, array) => {
    return (
        `
        <div class="item">
            <div class="title">
            <img src="./img/cartIcon.png" alt="cart" />
            <h2>${item.title}</h2>
            </div>
            <time datetime="2022-09-13 13:00">${createDate(months)}</time>
            <p>${item.category}</p>
            <p>${item.description}</p>
            <time datetime="2022-09-13 13:00">${item.dateEnd ? item.dateEnd : createDate(months)}</time>
            <ul>
                <li><button onclick="editTask(${index})">edit</button></li>
                <li><button onclick="unarchiveTask(${index})">unarchive</button></li>
                <li><button onclick="deleteArchiveTask(${index})">delete</button></li>
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

let editObj = {};

const editTask = index => {
    let {title, dateStart, category, description, dateEnd} = tasks[index];
    editModal.style.display = 'flex';
    inputEditTitle.value = title;
    inputEditCategory.value = category;
    inputEditDescription.value = description;
    inputEditDateEnd.value = dateEnd;
    editObj = {
        id: index,
    }
    console.log(editObj)
}

const deleteTask = index => {
    tasks = tasks.filter((item) => item !== tasks[index]);
    fillHtmlList();
    fillSummaryTable();
}

const deleteArchiveTask = index => {
    archive = archive.filter((item) => item !== archive[index]);
    fillArchiveList();
    fillSummaryTable();
}

const archiveTask = index => {    
    archive.push(tasks.filter((item) => item === tasks[index])[0]);
    tasks = tasks.filter((item) => item !== tasks[index]);
    fillHtmlList();
    fillSummaryTable();
}

const unarchiveTask = index => {
    tasks.push(archive.filter((item) => item === archive[index])[0]);
    archive = archive.filter((item) => item !== archive[index]);
    fillArchiveList();
    fillSummaryTable();
}

const fillHtmlList = () => {
    content.innerHTML = "";
    if(tasks.length > 0){
        tasks.map((item, index ) => {
            content.innerHTML += createTemplate(item, index)
        })
    }
}

const fillArchiveList = () => {
    content.innerHTML = "";
    if(archive.length > 0){
        archive.map((item, index ) => {
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
    let obj = new Task(inputTitle.value, inputCategory.value, inputDescription.value, inputDateEnd.value);
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
    archive = [];
    fillHtmlList();
    fillArchiveList();
    fillSummaryTable();
})

archiveBtn.addEventListener('click', () => {
    fillArchiveList();
})

editBtn.addEventListener('click', () => {
    tasks[editObj.id].title = inputEditTitle.value;
    tasks[editObj.id].category = inputEditCategory.value;
    tasks[editObj.id].description = inputEditDescription.value;
    fillHtmlList();
    CloseEditModal();
});


fillHtmlList();
fillSummaryTable();
