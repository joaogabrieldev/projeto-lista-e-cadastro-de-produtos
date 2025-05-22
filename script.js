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
let botao = document.getElementById("btn1");
const botaoreset = document.getElementById("botaoreset");
const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// Função
document.getElementById("btn1").addEventListener("click", function () {
  const valor = Number(document.getElementById("valorProdutos").value);

  const valorFormatado = formatarMoeda.format(valor);

  // Definição dos Erros
  if (nome.value.length == 0) {
    window.alert("[ERRO] Informe o Nome do Produto");
  } else if (valor.length == 0 || valor.value == 0) {
    window.alert("[ERRO] Informe o Valor do Produto");
  } else if (disponivel[0].checked == false && disponivel[1].checked == false) {
    window.alert(
      "[ERRO] Informe se o Produto está Disponível ou Não para Venda"
    );
  } else if (quantidade.value == 0) {
    window.alert("Produto Esgostado");
  }

  // Agora Sim, às condições
  else {
    contador++;

    if (contador === 1) {
      if (disponivel[0].checked == true) {
        tabela.innerHTML = `<thead>
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
        tabela.innerHTML = `<thead>
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
    } else if (contador > 1) {
      // Quando voltar da faculdade, criar outro o elemento tbody e dar um jeito de adicionalo dentro da tabela
      let tbody = document.getElementById("tbody-main");

      if (disponivel[0].checked == true) {
        tbody.innerHTML += 
            `<tr>
                <td>${nome.value}</td>
                <td>${valorFormatado}</td>
                <td>${descricao.value}</td>                       
                <td>${quantidade.value}</td>
                <td>Sim</td>
                     
            </tr>`;

        if (contador >= 5) {
          botaoreset.style.display = "block";
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
        }
      }
    }
  }
});

function resetar() {
  tabela.innerHTML = 
    `<thead>
        <tr>
            <th>PRODUTO</th> 
            <th>VALOR</th>
            <th>DESCRIÇÃO DO PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>DISPONÍVEL PARA VENDA?</th>                    
        </tr>
    </thead>`;
}
