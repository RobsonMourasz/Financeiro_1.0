document.querySelectorAll("input").forEach(inputSelecionado => {
    inputSelecionado.addEventListener("focus", () => {
        const labelSelect = inputSelecionado.nextElementSibling;
        const topInput = inputSelecionado.getBoundingClientRect();
        console.log("asdasd" + topInput)
        labelSelect.style = `top:${topInput+10}%`;
    })
});
document.querySelectorAll("input").forEach(inputSelecionado => {
    inputSelecionado.addEventListener("focusout", () => {
        const labelSelect = inputSelecionado.nextElementSibling;
        labelSelect.style = "top: 0;";
    })
})