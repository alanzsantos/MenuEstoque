using MenuEstoque.Models;

namespace MenuEstoque.Repositorio
{
    public interface IProdutoRepositorio
    {
        ProdutoModel IncluirProduto(ProdutoModel produto);
        ProdutoModel SalvarAlterarProduto(ProdutoModel produto);
        ProdutoModel AlterarProduto(int id);
        int DeletarProduto(int id);
        List<ProdutoModel> ListarTodos();
    }
}
