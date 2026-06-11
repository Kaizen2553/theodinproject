import {apiCall} from './modules/apiHandler.js'
const formClass = document.querySelector('.form');
const submitClass = document.querySelector('.submit-btn');
const inputField = document.querySelector('.input')
const modalOverlay = document.querySelector('.modal_overlay')
const modal = document.querySelector('.modal');
const cancelbtn = document.querySelector('.cancelbtn');
cancelbtn.addEventListener('click',() => {

    hideModal();
    modal.innerHTML = `<div>
                      <p class="loading">Loading.....</p>
                    </div>`;
    return;
})



const showModal = () => {
    modalOverlay.classList.remove('hidden');
}

const hideModal = () => {
    modalOverlay.classList.add('hidden');
}
const handleSubmit = async () => {
    showModal();
    try{
        const city = inputField.value;
        const res = await apiCall(city);
        modal.innerHTML = res;
    }catch(err){
        console.log(err);
        modal.innerHTML = err;
    }
   
}

submitClass.addEventListener('click',handleSubmit);