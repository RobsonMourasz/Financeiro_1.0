async function CarregarTabela() {
    document.getElementById("tela-carregamento").classList.remove("d-none");
   
    let formData = new FormData(document.getElementById("formPesquisar"));
    formData.append("Requisicao", "Pesquisar");

    const response = await fetch("assets/php/Request/Despesa.php",{
        body: formData ,
        method: "POST",
    });

    if (response.ok){
        document.querySelector(".tela-carregamento").classList.toggle("d-none");
    }
}