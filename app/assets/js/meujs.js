document.querySelectorAll("input").forEach(inputSelecionado => {
    inputSelecionado.addEventListener("focus", () => {
        const labelSelect = inputSelecionado.previousElementSibling;
        labelSelect.style = `opacity: 1;`;
    })
});
document.querySelectorAll("input").forEach(inputSelecionado => {
    inputSelecionado.addEventListener("focusout", () => {
        const labelSelect = inputSelecionado.previousElementSibling;
        labelSelect.style = `opacity: 0;`;
    })
})

document.querySelectorAll("select").forEach(inputSelecionado => {
    inputSelecionado.addEventListener("focus", () => {
        const labelSelect = inputSelecionado.previousElementSibling;
        labelSelect.style = `opacity: 1;`;
    })
});
document.querySelectorAll("select").forEach(inputSelecionado => {
    inputSelecionado.addEventListener("focusout", () => {
        const labelSelect = inputSelecionado.previousElementSibling;
        labelSelect.style = `opacity: 0;`;
    })
})