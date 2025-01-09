class ModalController {
    constructor() {
        this.modal = document.querySelector('.modal-container');
        this.btnOpen = document.querySelector('#new');
        this.btnOpen.addEventListener('click', () => this.openModal());
        this.modal.addEventListener('click', () => this.closeModal());
    }

    openModal() {
        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.onclick = e => {
            if (e.target.classList.contains('modal-container')) {
                this.modal.classList.remove('active')
            }
        }
    }
}
const modal = new ModalController();





