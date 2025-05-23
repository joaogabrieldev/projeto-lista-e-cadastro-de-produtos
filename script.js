// Variáveis de Controle
let contador = 0;
let acumuladorValor = 0;
// Elementos Resgatados do HTML
const nome = document.getElementById("produtos");
const descricao = document.getElementById("descricao");
const disponivel = document.getElementsByName("radios");
const quantidade = document.getElementById("quantidadeProdutos");
const quantidadeReal = Number(quantidade.value);
let tabela = document.getElementById("tabela");
let botao = document.getElementById("botaoAdicionar");
const botaoApagarLinha = document.getElementById("apagarLinha");
const botaoreset = document.getElementById("botaoreset");
const tabelaFinalizar = document.getElementById("tabela-finalizar");
const divtabela = document.getElementById("div-tabela");
const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
let resultadoValorFormatado;
let valor;
// Função
document
  .getElementById("botaoAdicionar")
  .addEventListener("click", function () {
    valor = Number(document.getElementById("valorProdutos").value);

    const valorFormatado = formatarMoeda.format(valor);

    // Definição dos Erros
    if (nome.value.length == 0) {
      // window.alert("[ERRO] Informe o Nome do Produto");
      Swal.fire({
        icon: "error",
        title: "Eita...",
        text: "Informe o Nome do Produto!",
      });
    } else if (valor.length == 0 || valor.value == 0) {
      // window.alert("[ERRO] Informe o Valor do Produto");
      Swal.fire({
        icon: "error",
        title: "Eita...",
        text: "Informe o Valor do Produto!",
      });
    } else if (
      disponivel[0].checked == false &&
      disponivel[1].checked == false
    ) {
      // window.alert(
      //   "[ERRO] Informe se o Produto está Disponível ou Não para Venda"
      // );
      Swal.fire({
        icon: "error",
        title: "Eita...",
        text: "Informe se o Produto está Disponível ou Não para Venda",
      });
    } else if (quantidade.value.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Eita...",
        text: `Informe a quantidade de ${nome.value} no Estoque!`,
      });
    } else if (quantidade.value == 0) {
      // window.alert("Produto Esgostado");
      Swal.fire({
        icon: "info",
        title: "Opss...",
        text: `${nome.value} está Esgotado!...`,
      });
    }

    // Agora Sim, às condições
    else {
      contador++;

      if (contador === 1) {
        botaoApagarLinha.style.display = "block";

        if (disponivel[0].checked == true) {
          tabela.innerHTML = 
          `<thead>
              <tr>
                  <th>PRODUTO</th> 
                  <th>VALOR</th>
                  <th>DESCRIÇÃO DO PRODUTO</th>
                  <th>QUANTIDADE</th>
                  <th>DISPONÍVEL PARA VENDA?</th>  
              </tr>
            </thead> 
                 
                <tbody id="tbody-main">
                    <tr>
                        <td>${nome.value}</td>
                        <td>${valorFormatado}</td>
                        <td>${descricao.value}</td>                       
                        <td>${quantidade.value}</td>
                        <td>Sim</td>   
                    </tr>
                </tbody>`;
        } else if (disponivel[1].checked == true) {
          tabela.innerHTML = 
          `<thead>
                    <tr>
                        <th>PRODUTO</th> 
                        <th>VALOR</th>
                        <th>DESCRIÇÃO DO PRODUTO</th>
                        <th>QUANTIDADE</th>
                        <th>DISPONÍVEL PARA VENDA?</th>
                    </tr>
                </thead> 
                 
                 <tbody id="tbody-main">
                     <tr>
                         <td>${nome.value}</td>
                         <td>${valorFormatado}</td>
                         <td>${descricao.value}</td>                       
                         <td>${quantidade.value}</td>
                         <td>Não</td>
                         
                     </tr>
                 </tbody>`;
        }

        botao.value = "Adicionar Novo Produto!";

        acumuladorValor += valor;

        divtabela.style.marginTop = "50px";
        divtabela.style.marginBottom = "50px";
      } else if (contador > 1) {
        let tbody = document.getElementById("tbody-main");

        if (disponivel[0].checked == true) {
          tbody.innerHTML += 
          `<tr>
                <td>${nome.value}</td>
                <td>${valorFormatado}</td>
                <td>${descricao.value}</ td>                       
                <td>${quantidade.value}</td>
                <td>Sim</td>                    
          </tr>`;

          if (contador >= 5) {
            botaoreset.style.display = "block";
            tabelaFinalizar.style.display = "block";
          }
        } else if (disponivel[1].checked == true) {
          tbody.innerHTML += 
          `<tr>
            <td>${nome.value}</td>
            <td>${valorFormatado}</td>
            <td>${descricao.value}</td>                       
            <td>${quantidade.value}</td>
            <td>Não</td>                               
        </tr>`;

          if (contador >= 5) {
            botaoreset.style.display = "block";
            tabelaFinalizar.style.display = "block";
          }
        }

        acumuladorValor += valor;
      }
    }
  });

function apagarLinha() {
  let tbody = document.getElementById("tbody-main");
  tbody.deleteRow(-1);
  acumuladorValor = acumuladorValor - valor;
  contador--;
  if (contador == 0){
    tabelaFinalizar.style.display = 'none'

  } else if (contador < 0){
    Swal.fire({
      icon: "error",
      title: "Calma lá...",
      text: 'Não Há Mais Linhas para Apagar!',
    });


  }
}

// Apagar a Linha
function resetar() {
  botao.value = "Criar Nova Tabela";
  if (tabela.parentNode) {
    tabela.parentNode.removeChild(tabela);
  }
  window.location.reload();
}

function finalizarTabela() {
  let contador2 = 0;
  contador2++;

  resultadoValorFormatado = formatarMoeda.format(acumuladorValor);

  if (contador2 == 1) {
    let tfoot = document.getElementById("tfoot-main");
    if (!tfoot) {
      tabela.innerHTML += 
        `<tfoot id="tfoot-main">
            <tr>
              <th>GASTO TOTAL:</th>
              <td id="td-main-gastoTotal">${resultadoValorFormatado}</td>
            </tr>
        </tfoot>`;
    } else {
      document.getElementById("td-main-gastoTotal").innerText =
        resultadoValorFormatado;
    }
  }
}
