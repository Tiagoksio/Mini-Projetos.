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

 
class Storage {
    constructor(key) {
        this.key = key;
    }

    getItems() {
        return JSON.parse(localStorage.getItem(this.key)) ?? [];
    }

    setItems(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
    }
}


class Registration {
    constructor(pModal, pLocalStorage) {
        this.modal = pModal;
        this.vlocalStorage = pLocalStorage;
        this.tbody = document.querySelector('tbody');
        this.name = document.querySelector('#m-name');
        this.phone = document.querySelector('#m-phone');
        this.email = document.querySelector('#m-email');
        this.adress = document.querySelector('#m-adress');
        this.save = document.querySelector('#btnSave');
        this.customersList = [];
        this.save.addEventListener('click', () => this.register());

    }

    register() {

        this.customersList.push({
            'nome': this.name.value,
            'fone': this.phone.value, 
            'email': this.email.value, 
            'endereco': this.adress.value
        });
        
        this.vlocalStorage.setItems(this.customersList);

        /*
        let tr = document.createElement('tr')

        tr.innerHTML = `
            <td>${this.name.value}</td>
            <td>${this.phone.value}</td>
            <td>${this.email.value}</td>
            <td>${this.adress.value}</td>
            <td class="action">
            </td>
            <td class="action">
            </td>
        `
        this.tbody.appendChild(tr)

        */
        

    }

    load () {
       
    }

    edit () {

    }

    delete () {

    }
}

const constlocalStorage = new Storage('dbLS');
const modal = new ModalController();
const crud = new Registration(modal, constlocalStorage);


// LocalStorage inicializando --> Verificar carregamento dos dados.

