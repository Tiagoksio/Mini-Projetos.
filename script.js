const modal = document.querySelector('.modal-container');
const customerForm = document.querySelector('modal');

function openCloseModal() {
    modal.classList.add('active')
    closeModal()
}

function closeModal() {
    modal.onclick = e => {
        if (e.target.classList.contains('modal-container')) {
          modal.classList.remove('active')
        }
    }
}
