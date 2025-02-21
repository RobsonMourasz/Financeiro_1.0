async function CarregarTabela() {
    document.getElementById("tela-carregamento").classList.remove("d-none");

    let formData = new FormData(document.getElementById("formPesquisar"));
    formData.append("Requisicao", "Pesquisar");
    formData.append("Tipo", "D");
    if (document.getElementById("pesqCat").getAttribute("id-sub") != ""){
        formData.append("SubCategoria", document.getElementById("pesqCat").getAttribute("id-sub"));
    }

    const response = await fetch("assets/php/Request/Despesa.php", {
        body: formData,
        method: "POST",
    });

    if (response.ok) {
        document.querySelector(".tela-carregamento").classList.toggle("d-none");
        try {
            const cp_lancamentos = await response.json();

            let tbody = document.getElementById("tbody");
            tbody.textContent = "";
            if (cp_lancamentos.Retorno === "OK") {
                if (cp_lancamentos.Dados.length > 0) {
                    for (let i = 0; i < cp_lancamentos.Dados.length; i++) {

                        let tr = tbody.insertRow();
                        let td_Descricao = tr.insertCell();
                        let td_Vencimento = tr.insertCell();
                        let td_Valor = tr.insertCell();
                        let td_Situacao = tr.insertCell();

                        
                        td_Descricao.setAttribute("scope", "row");
                        td_Descricao.textContent = cp_lancamentos.Dados[i].Descricao;
                        td_Vencimento.textContent = timeTempParaDate(cp_lancamentos.Dados[i].DataVencimento);

                        td_Valor.textContent = formatarReal(cp_lancamentos.Dados[i].ValorParcela);
                        if (cp_lancamentos.Dados[i].Confirmada === "S") {
                            td_Situacao.classList.add("badge")
                            td_Situacao.classList.add("rounded-pill")
                            td_Situacao.classList.add("text-bg-primary")
                            td_Situacao.textContent = "Confirmado"
                        } else {
                            td_Situacao.classList.add("badge")
                            td_Situacao.classList.add("rounded-pill")
                            td_Situacao.classList.add("text-bg-danger")
                            td_Situacao.textContent = "Aberto"
                        }

                        if (cp_lancamentos.Dados[i].DataVencimento <= formatDate("")){
                            td_Descricao.style.color = "red";
                            td_Vencimento.style.color = "red";
                            td_Valor.style.color = "red";
                        }
                    }
                } else {
                    let tr = tbody.insertRow();
                    let linha = tr.insertCell();
                    linha.setAttribute("colspan", "4");
                    linha.classList.add("text-center")
                    linha.textContent = "NENHUM REGISTRO ENCONTRADO!";
                }

            } else {
                let tr = tbody.insertRow();
                let linha = tr.insertCell();
                linha.classList.add("text-center")
                linha.setAttribute("colspan", "4");
                linha.textContent = "NENHUM REGISTRO ENCONTRADO!";
            }
        } catch (error) {
            console.error("cp_lancamentos: " + error);
        }
    }
}

(() => {
    document.getElementById("formPesquisar").addEventListener("submit", (e)=>{
        e.preventDefault();
    });
})();