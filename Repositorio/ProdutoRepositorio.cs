using MenuEstoque.Data;
using MenuEstoque.Models;

namespace MenuEstoque.Repositorio
{
    public class ProdutoRepositorio : IProdutoRepositorio
    {
        private readonly BancoContext _bancocontext;

        public ProdutoRepositorio(BancoContext bancocontext)
        {
            _bancocontext = bancocontext;
        }

        public ProdutoModel IncluirProduto(ProdutoModel produto)
        {
            _bancocontext.Produto.Add(produto);
            _bancocontext.SaveChanges();
            return produto;
        }

        public ProdutoModel AlterarProduto(int id)
        {
            var produtoDB = buscarProduto(id);
            return produtoDB;
        }

        public ProdutoModel SalvarAlterarProduto(ProdutoModel produto)
        {
            var produtoDB = buscarProduto(produto.ID);

            produtoDB.NOME_Produto = produto.NOME_Produto;
            produtoDB.PRECO_Produto = produto.PRECO_Produto;
            produtoDB.DESC_Produto = produto.DESC_Produto;
            _bancocontext.Update(produtoDB);
            _bancocontext.SaveChanges();
            return produtoDB;
        }

        public int DeletarProduto(int id)
        {
            var produtoDB = buscarProduto(id);
            if (produtoDB == null) throw new System.Exception("Houve um erro ao atulizar as informações");
            _bancocontext.Remove(produtoDB);
            _bancocontext.SaveChanges();
            return id;
        }

        public ProdutoModel buscarProduto(int id)
        {
            var produto = _bancocontext.Produto.FirstOrDefault(p => p.ID == id)!;
            return produto;
        }

        public List<ProdutoModel> ListarTodos()
        {
            return _bancocontext.Produto.ToList();
        }

    }
}
