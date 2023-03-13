
//creating Open Modal
export const openModal = function(){
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    modal.classList.remove('hide');
    overlay.classList.remove('hide');
}

//creating Close Modal
export const closeModal = function(){
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    
    modal.classList.add('hide');
    overlay.classList.add('hide');
}

//creating event that if Escape was pressed, new ticket will hide
export const escBtn = document.addEventListener('keydown', function(e){
    const modal = document.querySelector('.modal');

if (e.key === 'Escape' && !modal.classList.contains('hide')){
        closeModal();
    }   
})