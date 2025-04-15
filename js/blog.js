async function carregarLista() {
  const resp = await fetch('lista.txt');
  const txt = await resp.text();
  return txt.trim().split('\n').map(linha => {
    const [arquivo, titulo, data] = linha.split('|');
    return { arquivo, titulo, data };
  });
}

async function carregarPost(arquivo, titulo) {
  const resp = await fetch(`posts/${arquivo}`);
  const md = await resp.text();
  const html = marked.parse(md);
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `
    <h2>${titulo}</h2>
    <div>${html}</div>
  `;
  hljs.highlightAll();
}

async function montarBlog() {
  const lista = await carregarLista();
  const postListDiv = document.getElementById('post-list');

  lista.forEach(({ arquivo, titulo }) => {
    const link = document.createElement('a');
    link.textContent = titulo;
    link.className = 'post-link';
    link.onclick = () => carregarPost(arquivo, titulo);
    postListDiv.appendChild(link);
  });

  // Carregar primeiro post automaticamente (opcional)
  if (lista.length > 0) {
    carregarPost(lista[0].arquivo, lista[0].titulo);
  }
}

montarBlog();
