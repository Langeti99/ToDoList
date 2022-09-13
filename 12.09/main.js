const createBtn = document.querySelector('.create-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.btn-close');

createBtn.addEventListener('click' , () => {
    modal.style.display = 'flex';
})

modal.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target === overlay || e.target === close){
        modal.style.display = 'none';
    }
})

// TODO 

