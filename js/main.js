const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  createElement(elemento);
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['quantidade'];

  const currentItem = {
    "nome": nome.value,
    "quantidade": quantidade.value
  };

  const exist = itens.find(elemento => elemento.nome === nome.value);
  if (exist) {
    currentItem.id = exist.id;
    updateElement(currentItem);
    itens[itens.findIndex(elemento => elemento.id === exist.id)] = currentItem;
  } else {
    currentItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
    createElement(currentItem);
    itens.push(currentItem);
  };

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

function createElement(item) {
  const newItem = document.createElement('li');
  const itemNumber = document.createElement('strong');

  newItem.classList.add('item');

  itemNumber.innerHTML = item.quantidade;
  itemNumber.dataset.id = item.id;

  newItem.appendChild(itemNumber);
  newItem.innerHTML += item.nome;
  newItem.appendChild(createDeleteButton(item.id));

  lista.appendChild(newItem);
}

function updateElement(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function createDeleteButton(id) {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = "X";

  buttonElement.addEventListener("click", function () {
    deleteElement(this.parentNode, id);
  });

  return buttonElement;
}

function deleteElement(elemento, id) {
  elemento.remove();
  itens.splice(itens.findIndex(elemento => elemento.id == id), 1);
  localStorage.setItem("itens", JSON.stringify(itens));
}