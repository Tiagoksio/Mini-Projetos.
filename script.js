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
        this.load();

    }

    register() {

        this.customersList.push({
            'name': this.name.value,
            'phone': this.phone.value, 
            'email': this.email.value, 
            'adress': this.adress.value
        });
        
        this.vlocalStorage.setItems(this.customersList);
        

    }

    load () {
        this.customersList = this.vlocalStorage.getItems();

        this.customersList.forEach((e, index) => {
            this.insertItem(e, index)
        });
    }


    insertItem(item, index) {
        // O parâmetro index seria para identificar os botões de edição e deleção, porém falta uma solução. Poderia implementar uma função direto no html, talvez.

        let tr = document.createElement('tr')

        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td>${item.adress}</td>
            <td class="action">
                <button class='edit-btn'><i class='bx bx-edit'></i></button>
            </td>
            <td class="action">
                <button class='delete-btn'><i class='bx bx-trash'></i></button>
            </td>
        `
        tr.querySelector('.edit-btn').addEventListener('click', () => this.edit(index));
        tr.querySelector('.delete-btn').addEventListener('click', () => this.delete(index));

        this.tbody.appendChild(tr)    
    }

    edit (index) {
        this.name.value = this.customersList[index].name
        this.phone.value = this.customersList[index].phone
        this.email.value = this.customersList[index].email
        this.adress.value = this.customersList[index].adress
        this.modal.openModal()

    }

    delete (index) {
        alert(`Delete ${index}`)

    }
}

const constlocalStorage = new Storage('dbLS');
const modal = new ModalController();
const crud = new Registration(modal, constlocalStorage);