using MenuEstoque.Data;
using MenuEstoque.Models;
using MenuEstoque.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace MenuEstoque.Controllers
{
    public class HomeController : Controller
    {

        private readonly IProdutoRepositorio _bancocontext;

        public HomeController(IProdutoRepositorio produtoRepositorio)
        {
            _bancocontext = produtoRepositorio;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult AlterarProduto(int id)
        {
            ProdutoModel produto = _bancocontext.AlterarProduto(id);
            return new JsonResult(produto);
        }

        public IActionResult SalvarAlterarProduto(ProdutoModel produtoModel)
        {
            _bancocontext.SalvarAlterarProduto(produtoModel);
            return new JsonResult(produtoModel);
        }

        public IActionResult IncluirProduto(ProdutoModel produto)
        {
            _bancocontext.IncluirProduto(produto);
            return new JsonResult(produto);

        }

        public IActionResult DeletarProduto(int id)
        {
            _bancocontext.DeletarProduto(id);
            return new JsonResult(id);

        }

        public IActionResult ListarTodos()
        {
            List<ProdutoModel> produto = _bancocontext.ListarTodos();
            return new JsonResult(produto);
        }
    }
}
