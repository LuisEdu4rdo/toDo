//Refatorar o codigo!  

const getBanco = () => JSON.parse(localStorage.getItem('list')) ?? [];
var banco = getBanco();

const setBanco = (banco) => localStorage.setItem('list', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label");
    item.classList.add("todoItem");
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice= ${indice}>
        <div class="itemValue">${tarefa}</div>
        <input type="button" value="X" data-indice= ${indice}>
        `
    document.getElementById("todoList").appendChild(item);
}

const limparTarefa = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefa();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const addNovoItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value;

    function limparTexto() {
        evento.target.value = '';
    }

    if (tecla === 'Enter') {
        banco.push({ 'tarefa': texto, 'status': '' });
        setBanco(banco);
        atualizarTela();
        limparTexto();
    }
}

const removerItem = (indice) => {
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    if (banco[indice].status === '') {
        banco[indice].status = 'checked';
    } else {
        banco[indice].status = '';
    }
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === "button") {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('addNovoItem').addEventListener('keypress', addNovoItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();  
