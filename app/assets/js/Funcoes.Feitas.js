function FormatarCpfCnpj(str) {
    str = FormatarSomenteNumero(str)
    let temp = "";
    if (str.length === 11) { // CPF
        temp = str.substring(0, 3) + ".";
        temp += str.substring(3, 6) + ".";
        temp += str.substring(6, 9) + "-";
        temp += str.substring(9);
    } else if (str.length === 14) { // CNPJ
        temp = str.substring(0, 2) + ".";
        temp += str.substring(2, 5) + ".";
        temp += str.substring(5, 8) + "/";
        temp += str.substring(8, 12) + "-";
        temp += str.substring(12);
    } else {
        console.log("Formato inválido: a entrada deve ter 11 (CPF) ou 14 (CNPJ) dígitos.");
    }
    return temp;
}

function FormatarTelefoneCelular(str) {
    str = FormatarSomenteNumero(str)
    let temp = "";
    if (str.length === 12) { // 034999999999 -> 12
        temp = "(" + str.substring(0, 3) + ") ";
        temp += str.substring(6);
    } else if (str.length === 11) { //34999999999 -> 11
        temp = "(" + str.substring(0, 2) + ") ";
        temp += str.substring(2);
    } else if (str.length === 10) { // 3434531490 -> 10
        temp = "(" + str.substring(0, 2) + ") " ;
        temp += str.substring(2); 
    } else if (str.length === 8) { // 34531490 -> 8
        temp = "(00) ";
        temp += str.substring(0);
    }else{
        temp = str
        console.log("Formato inválido: a entrada deve ter 13 (CELULAR) ou 11 (TELEFONE) dígitos.");
    }
    return temp;
}

function FormatarSomenteNumero(num) {
    if(typeof num === 'string'){
        temp = num.replace(/[^0-9]/g, '')
    }else{
        temp =  num ;
    }
    return temp
}

/* FORMATA EM REAL */
function getFloat(str) {
    return str.replace(",", ".")
}

function formatarReal(valor) {
    // Arredonda o valor para duas casas decimais
    const valorFormatado = parseFloat(valor).toFixed(2);

    // Divide o valor em reais e centavos
    let [reais, centavos] = valorFormatado.split('.');

    // Adiciona o ponto de milhar aos reais
    reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Formata o valor com vírgula e o símbolo de R$
    const valorFinal = `R$ ${reais},${centavos.padEnd(2, '0')}`;

    return valorFinal;
}

/* FORMATA EM REAL */

/* FORMATAR DOUBLE PARA STRING */

function getDoubleString(valor) {
    const temp = valor.replace(/[^0-9,]/g, '').replace(/,/g, '.');
    return parseFloat(temp);
}

/* FORMATAR DOUBLE PARA STRING */

/* FORMATAR DATA ATUAL */
function formatDate(data) {
    const dataNova = new Date()
    let tempData = "nada"

    if (data == "") {
        const tempDia = dataNova.getDate()
        const tempMes = dataNova.getMonth() + 1
        const tempAno = dataNova.getFullYear()
        tempData = `${tempAno}-${tempMes.toString().padStart(2, '0')}-${tempDia.toString().padStart(2, '0')}`

    } else { /* CONVERTE DATE TIME PARA STRING MODELO DIA MES ANO */
        const  dt1 = FormatarSomenteNumero(data);
        const  dt2 = dt1.substring(0,8)
        const ano = dt2.substring(0,4)
        const mes = dt2.substring(4,6)
        const dia = dt2.substring(6,8)
        tempData = `${dia}-${mes}-${ano}`
    } 

    return tempData
}
/* FORMATAR DATA ATUAL */

/* FORMATAR DATA */
function timeTempParaDate(date) {
    if(typeof date === 'string'){
        const temp = new Date(date);
        let tempDia = temp.getDate();
        let tempMes = temp.getMonth() + 1;
        const tempAno = temp.getFullYear();
        tempDia = tempDia < 10 ? "0" + tempDia : tempDia;
        tempMes = tempMes < 10 ? "0" + tempMes : tempMes;
        return `${tempAno}-${tempMes}-${tempDia}`
    }else{
        return date
    }
    
    
}
/* FORMATAR DATA */

function TelaAvisos(parametro, mensagem) {

    if (document.getElementById("alerta").classList.contains("d-none")) {
        document.getElementById("alerta").classList.remove("d-none");
    }

    if (parametro === "verdadeiro") {

        document.querySelector(".alertas").classList.add("sucess");
        document.querySelector(".alertas .alertas-mensagens").textContent = mensagem;
        setInterval(() => {
            document.querySelector(".alertas").classList.remove("sucess");
            document.querySelector(".alertas .alertas-mensagens").textContent = "";
        }, 5000);

    } else if (parametro === "falso") {

        document.querySelector(".alertas").classList.add("warning");
        document.querySelector(".alertas .alertas-mensagens").textContent = mensagem;
        setInterval(() => {
            document.querySelector(".alertas").classList.remove("warning");
            document.querySelector(".alertas .alertas-mensagens").textContent = "";
        }, 3000);

    } else {

        document.querySelector(".alertas").classList.add("error");
        document.querySelector(".alertas .alertas-mensagens").textContent = mensagem;
        setInterval(() => {
            document.querySelector(".alertas").classList.remove("error");
            document.querySelector(".alertas .alertas-mensagens").textContent = "";
        }, 3000);

    }

    if (!document.getElementById("alerta").classList.contains("d-none")) {
        document.getElementById("alerta").classList.add("d-none");
    }

}


function ChamarTelaCarregando(fadeInOut) {
    if(fadeInOut == "FadeIn"){
        document.querySelector(".tela-cadastrar").classList.remove("d-none")
    }else{
        document.querySelector(".tela-cadastrar").classList.add("d-none")
    }
}

function limparInputs(form) {
    // Obtém todos os elementos de entrada dentro do formulário
    const Form = document.getElementById(form);
    const inputs = Form.querySelectorAll('input');
    
    // Itera sobre cada elemento e limpa seu valor
    inputs.forEach(input => {
        if(input.getAttribute("type") !== "date" ){
            input.value = '';
        }
    });

    // Opcional: Se houver textareas ou selects
    const textareas = Form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.value = '';
    });

    const selects = Form.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });

    const checkeds = Form.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    checkeds.forEach(check => {
        check.checked = false;
    });

    const esconder = Form.querySelectorAll('.QtdParcelas')
    esconder.forEach(esconde =>{
        esconde.classList.add("d-none")
        esconde.querySelector("input").value = 0;
    });
}

// Função para criar e clicar no botão de fechar modal
function fecharModal(idModal) {
    const modal = document.getElementById(idModal); // Substitua 'modalCadastro' pelo ID do seu modal
    
    // Cria o botão de fechar
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close';
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Fechar');
    closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

    // Adiciona o botão ao modal
    modal.appendChild(closeButton);

    // Clica no botão para fechar o modal
    closeButton.click();
}


