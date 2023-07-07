/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/crises';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.Crises.forEach(item => insertList(item.data_crise, item.nome, item.prazo, item.detalhes))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputData, inputTitulo, inputPrazo, inputProblema) => {
  const formData = new FormData();

  formData.append('data_crise', inputData);
  formData.append('nome', inputTitulo);
  formData.append('prazo', inputPrazo);
  formData.append('detalhes', inputProblema);

  let url = 'http://127.0.0.1:5000/crise';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/crise?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova  crise com data , titulo , prazo e descrição do problema 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputData = document.getElementById("newData").value;
  let inputTitulo = document.getElementById("newTitulo").value;
  let inputPrazo = document.getElementById("newPrazo").value;
  let inputProblema = document.getElementById("newProblema").value;

  var patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (inputTitulo === '') {
    alert("Titulo não preenchido !");
  } else if ( inputProblema === '') {
    alert("Problema não preenchido !");
  } else if ( !patternData.test(inputData)) {  
    alert("Data não esta em um formato válido, Dia/Mês/Ano");
  } else if ( isNaN(inputPrazo)) {
    alert("Informe um prazo válido. Numero inteiro.");
  } else {
    insertList(inputData, inputTitulo, inputPrazo, inputProblema )
    postItem(inputData, inputTitulo, inputPrazo, inputProblema )
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir crise na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (data_crise, nome, prazo, detalhes) => {
  var item = [data_crise, nome, prazo,detalhes]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newData").value = "";
  document.getElementById("newTitulo").value = "";
  document.getElementById("newPrazo").value = "";
  document.getElementById("newProblema").value = "";

  removeElement()
}