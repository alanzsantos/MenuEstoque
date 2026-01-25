
$(document).ready(function () {
    showButton("save");
    listarTodos();
});

function incluirProduto() {
    var nome = $('#Nome').val();
    var descricao = $('#Descricao').val();
    var preco = $('#Preco').val();
    var codigo = $('#Codigo').val();
    
    if (validaForm()) {
        $.ajax({
            url: '/Home/IncluirProduto',
            type: 'POST',
            data: {
                NOME_Produto: nome,
                DESC_Produto: descricao,
                PRECO_Produto: preco,
                ID: null,
                _token: '{{ csrf_token() }}'
            },
            success: function (response) {
                
                limpar();
                listarTodos();
                alert("Incluido!");
            },
            
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function deletarProduto(id) {
        $.ajax({
            url: '/Home/DeletarProduto',
            type: 'POST',
            data: {
                ID: id,
            },
            success: function (response) {

                listarTodos();
                alert("Excluído!");
            },

            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
}

function validaForm() {

    var nome = $('#Nome').val();
    var descricao = $('#Descricao').val();
    var preco = $('#Preco').val();

    if (nome == null || nome == "" || nome.length <= 3) {
        alert("Nome incompleto ou invalido!");
        return false;
    }

    if (descricao == null || descricao == "") {
        alert("Descrição invalido!");
        return false;
    }

    if (preco == null || preco == "") {
        alert("Preço invalido!");
        return false;
    }

    return true;

}

function alterarProduto(id) {
    
    $.ajax({
        url: '/Home/AlterarProduto',
        type: 'POST',
        data: {
            ID: id,
        },
        success: function (response) {
            var produto = response;

            var NOME = produto.nomE_Produto;
            var PRECO = produto.precO_Produto;
            var ID = produto.id;
            var DESC = produto.desC_Produto;

            $('#Nome').val(NOME);
            $('#Preco').val(PRECO);
            $('#Codigo').val(ID);
            $('#Descricao').val(DESC);

            showButton("update");
        },

        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function limpar() {
    $('#Nome').val("");
    $('#Descricao').val("");
    $('#Preco').val("");
    $('#Codigo').val("");
    showButton("save");
}

function listarTodos() {
    $.ajax({
        url: '/Home/ListarTodos',
        type: 'POST',
        data: {},
        success: function (response) {


            var tabela = $('#idtabela');
            tabela.empty();

            var produtos = response;

            if (produtos.length > 0) {
                for (var i = 0; i < produtos.length; i++) {

                    var produto = produtos[i];
                    var NOME = produto.nomE_Produto;
                    var PRECO = produto.precO_Produto;
                    var ID = produto.id;
                    var DESC = produto.desC_Produto;

                    var produtoDiv = `<tr>
                                        <td>`+ID+`</td>
                                        <td>`+ NOME +`</td>
                                        <td> R$ `+ PRECO +`</td>
                                        <td>`+ DESC +`</td>
				                        <td>
					                        <svg id="dItem" onclick="deletarProduto(`+ID+`)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
						                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
						                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
					                        </svg>
					                        <svg id="dAlterarItem" onclick="alterarProduto(`+ID+`)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
						                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
						                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
					                        </svg>
				                        </td>
                                      </tr>`;

                    tabela.append(produtoDiv);
                }
            } else {
                alert("Nenhum produto encontrado.");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function salvarAlterarProduto() {
    var nome = $('#Nome').val();
    var descricao = $('#Descricao').val();
    var preco = $('#Preco').val();
    var codigo = $('#Codigo').val();
    if (validaForm()) {
        $.ajax({
            url: '/Home/SalvarAlterarProduto',
            type: 'POST',
            data: {
                NOME_Produto: nome,
                DESC_Produto: descricao,
                PRECO_Produto: preco,
                ID: codigo,
                _token: '{{ csrf_token() }}'
            },
            success: function (response) {

                limpar();
                showButton("save");
                listarTodos();
                alert("Alterado!");
            },

            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function showButton(button) {
    if (button == "save") {
        $('#saveButton').show()
        $('#updateButton').hide();
    } else {
        $('#updateButton').show();
        $('#saveButton').hide()
    }
}                                           