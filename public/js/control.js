import { openModal, closeModal, escBtn} from './modal.js';

const createListBtn = document.querySelector('.create-list');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');


createListBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

escBtn();