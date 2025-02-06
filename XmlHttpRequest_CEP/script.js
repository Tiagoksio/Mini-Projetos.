class DomController {
    constructor() { 
        this.btnSearch = document.querySelector('#search');
        this.btnSearch.addEventListener("click", () => this.searchCEP());
        this.result = document.querySelector("#resultado");
        this.xhr = new XMLHttpRequest();
        this.cep = document.querySelector('#iCep');
        this.url = "https://viacep.com.br/ws/";
        this.jsonResponse = undefined;
    }
    

    searchCEP() {
        this.xhr.open("GET", `${this.url}${this.cep.value}/json/`, true);
        this.xhr.setRequestHeader ("Accept", "application/json"); // header para json

        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState == 4 && this.xhr.status == 200) {
                this.jsonResponse = JSON.parse(this.xhr.responseText);
                this.resultPrint();
                this.cep.value = '';
                this.cep.focus();
            }

        }
        this.xhr.send();
    }

    resultPrint() {
        this.result.innerHTML = 
            `<dl>
            <dt>CEP<dd>${this.jsonResponse.cep}</dd></dt>
            <dt>UF<dd>${this.jsonResponse.uf}</dd></dt>
            <dt>CIDADE<dd>${this.jsonResponse.localidade}</dd></dt>
            <dt>BAIRRO<dd>${this.jsonResponse.bairro}</dd></dt>
            <dt>LOGRADOURO<dd>${this.jsonResponse.logradouro}</dd></dt>
            </dl>`
    }
}

const appCep = new DomController();