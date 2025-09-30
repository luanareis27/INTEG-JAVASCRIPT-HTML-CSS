// Questão 1
function converterData(){
  let data = document.getElementById("dataInput").value;
  let partes = data.split("/");
  let meses = ["janeiro","fevereiro","março","abril","maio","junho",
               "julho","agosto","setembro","outubro","novembro","dezembro"];
  if(partes.length !== 3){ alert("Data inválida!"); return; }
  let dia = parseInt(partes[0]), mes = parseInt(partes[1]), ano = parseInt(partes[2]);
  if(isNaN(dia)||isNaN(mes)||isNaN(ano)|| mes<1||mes>12){ alert("Data inválida!"); return; }
  let dataObj = new Date(ano, mes-1, dia);
  if(dataObj.getDate() !== dia || dataObj.getMonth() !== mes-1 || dataObj.getFullYear() !== ano){
    alert("Data inválida!"); return;
  }
  document.getElementById("dataExtenso").textContent = `${dia} de ${meses[mes-1]} de ${ano}`;
}

// Questão 2
function calcularEmprestimo(){
  let valor = parseFloat(document.getElementById("valor").value);
  let n = parseInt(document.getElementById("parcelas").value);
  let juros = parseFloat(document.getElementById("juros").value)/100;
  if(isNaN(valor)||isNaN(n)||isNaN(juros)||n<1||n>36){ alert("Dados inválidos!"); return; }

  let parcela;
  if(juros === 0){
    parcela = valor / n;
  } else {
    parcela = valor * (juros*Math.pow(1+juros,n))/(Math.pow(1+juros,n)-1);
  }
  let total = parcela * n;
  document.getElementById("resultadoEmprestimo").textContent = 
    `Parcela: R$ ${parcela.toFixed(2)} | Total a pagar: R$ ${total.toFixed(2)}`;

  let saldo = valor;
  let tbody = document.getElementById("tabelaParcelas");
  tbody.innerHTML = "";
  for(let i=1;i<=n;i++){
    let jurosMes = saldo * juros;
    let amort = parcela - jurosMes;
    saldo -= amort;
    if(saldo < 0.01) saldo = 0;
    tbody.innerHTML += `<tr><td>${i}</td><td>R$ ${parcela.toFixed(2)}</td><td>R$ ${saldo.toFixed(2)}</td></tr>`;
  }
}

// Questão 3
function calcularConsumo(){
  let nome = document.getElementById("nomeCliente").value;
  if(!nome){ alert("Informe o nome!"); return; }
  let itens = [];
  let total = 0;
  if(document.getElementById("suco").checked){ itens.push("Suco"); total+=4; }
  if(document.getElementById("refri").checked){ itens.push("Refrigerante"); total+=2.5; }
  if(document.getElementById("agua").checked){ itens.push("Água"); total+=1.5; }
  if(document.getElementById("bolo").checked){ itens.push("Bolo"); total+=3.5; }
  if(document.getElementById("pastel").checked){ itens.push("Pastel"); total+=3; }
  if(document.getElementById("torta").checked){ itens.push("Torta"); total+=4; }
  if(itens.length === 0){
    document.getElementById("resultadoConsumo").textContent = `${nome} não consumiu nada.`;
    return;
  }
  document.getElementById("resultadoConsumo").textContent = 
    `${nome} consumiu: ${itens.join(", ")} | Total: R$ ${total.toFixed(2)}`;
}

// Questão 4
function corrigirQuiz(){
  const respostas = {q1:"Brasília", q2:"4", q3:"CSS"};
  const form = document.getElementById("quizForm");
  let pontos = 0;
  let resultado = "";

  for(let q in respostas){
    const elements = form.elements[q];
    let marcada = null;
    if(elements){
      for(let i=0;i<elements.length;i++){
        if(elements[i].checked){ marcada = elements[i].value; break; }
      }
      if(marcada === null && elements.value) marcada = elements.value;
    }

    if(marcada === null){
      resultado += `⚪ ${q} sem resposta<br>`;
    } else if(marcada === respostas[q]){
      pontos++;
      resultado += `✔ ${q} correta<br>`;
    } else {
      resultado += `✘ ${q} errada (marcada: ${marcada})<br>`;
    }
  }

  resultado += `Pontuação final: ${pontos}/3<br>`;
  resultado += pontos===3?"Excelente!":"Continue estudando!";
  document.getElementById("resultadoQuiz").innerHTML = resultado;
}

// Questão 5
function adicionarTarefa(){
  let tarefa = document.getElementById("tarefaInput").value.trim();
  if(!tarefa){ alert("Digite uma tarefa!"); return; }
  let li = document.createElement("li");
  li.className="list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `<span>${tarefa}</span>
                  <div>
                    <button class="btn btn-sm btn-success me-1" onclick="this.parentElement.parentElement.querySelector('span').style.textDecoration='line-through'">Concluir</button>
                    <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.remove()">Remover</button>
                  </div>`;
  document.getElementById("listaTarefas").appendChild(li);
  document.getElementById("tarefaInput").value="";
}
