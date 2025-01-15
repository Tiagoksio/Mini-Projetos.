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
        this.customersList = this.vlocalStorage.getItems();
        this.editIndex = null;
        this.save.addEventListener('click', () => this.register());
        this.load();

    }
    register() {
        let customer = {
            'name': this.name.value,
            'phone': this.phone.value, 
            'email': this.email.value, 
            'adress': this.adress.value
        }
        if(!this.validation(customer)) {
            return;
        }

        if (this.editIndex === null) {
            this.customersList.push(customer);
            this.editIndex = null;
        } else {
            this.customersList[this.editIndex] = customer;
        } 

        this.vlocalStorage.setItems(this.customersList);
    }

    load () {
        this.tbody.innerHTML = '';
        this.customersList.forEach((e, index) => {
            this.insertItem(e, index)
        });
    }


    insertItem(item, index) {

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

        this.tbody.appendChild(tr); 
    }

    edit (index) {
        this.name.value = this.customersList[index].name;
        this.phone.value = this.customersList[index].phone;
        this.email.value = this.customersList[index].email;
        this.adress.value = this.customersList[index].adress;
        this.editIndex = index;
        this.modal.openModal();

    }

    delete (index) {
        this.customersList.splice(index, 1);
        this.vlocalStorage.setItems(this.customersList);
        this.load()

    }

    validation(customer){
        if (customer.name === '' || 
            customer.phone ==='' || 
            customer.email === '' || 
            customer.adress === ''
        ) {
            alert("Preencha todos os campos!");
            return false;
        } else if (customer.phone.length < 11 || customer.phone.length > 11) {
            alert("Digite o telefone completo com o DDD!");
            return false;
        } else if (customer.email.indexOf('@') == -1){
            alert("Digite um Email válido!")
            return false;
        } else {
            return true;
        }

    }
}

const constlocalStorage = new Storage('dbLS');
const modal = new ModalController();
const crud = new Registration(modal, constlocalStorage);