let listaPosts = [];
let indiceAtual = 0;

async function carregarReadme() {
  try {
    const resp = await fetch('README.md');
    const md = await resp.text();
    const html = marked.parse(md);
    document.getElementById('readme-container').innerHTML = html;
  } catch (error) {
    console.error('Erro ao carregar README.md:', error);
  }
}

async function carregarLista() {
  const resp = await fetch('lista.txt');
  const txt = await resp.text();
  listaPosts = txt.trim().split('\n').map(linha => {
    const [arquivo, titulo, data] = linha.split('|');
    return { arquivo, titulo, data };
  });
}

async function carregarPost(indice) {
  const { arquivo, titulo } = listaPosts[indice];
  const resp = await fetch(`posts/${arquivo}`);
  const md = await resp.text();

  // Remove a primeira linha se for um título (começa com '# ')
  // const mdSemTitulo = md.replace(/^# .*\n/, '');

  const html = marked.parse(mdSemTitulo);
  const contentDiv = document.getElementById('content');

  // Atualiza o conteúdo do post
  contentDiv.innerHTML = `
    <div id="nav-arrows" style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
      <button id="prev-post" ${indice === 0 ? 'disabled' : ''}>&lt; Anterior</button>
      <button id="next-post" ${indice === listaPosts.length - 1 ? 'disabled' : ''}>Próximo &gt;</button>
    </div>
    <!-- <h2>${titulo}</h2> -->
    <div>${html}</div>
  `;

  // Atualiza o índice atual
  indiceAtual = indice;

  // Adiciona eventos aos botões
  document.getElementById('prev-post').addEventListener('click', () => {
    if (indiceAtual > 0) {
      carregarPost(indiceAtual - 1);
    }
  });

  document.getElementById('next-post').addEventListener('click', () => {
    if (indiceAtual < listaPosts.length - 1) {
      carregarPost(indiceAtual + 1);
    }
  });

  hljs.highlightAll();
}

async function montarBlog() {
  await carregarReadme();
  await carregarLista();

  const postListDiv = document.getElementById('post-list');

  listaPosts.forEach((post, index) => {
    const slug = post.arquivo.replace('.md', '');
    const link = document.createElement('a');
    link.href = `#${slug}`;
    link.className = 'post-link';
    link.innerHTML = `
      <div style="margin-bottom: 1rem; line-height: 1.2;">
        <div style="font-size: 1em; color: #222;">${post.titulo}</div>
        <div style="font-size: 0.75em; color: #888;">${post.data}</div>
      </div>`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = `#${slug}`;
      carregarPost(index);
    });
    postListDiv.appendChild(link);
  });

  // Carregar post do hash da URL
  function carregarDoHash() {
    const slug = window.location.hash.replace('#', '');
    const index = listaPosts.findIndex(p => p.arquivo === `${slug}.md`);
    if (index >= 0) {
      carregarPost(index);
    } else if (listaPosts.length > 0) {
      carregarPost(0); // fallback
    }
  }

  window.addEventListener('hashchange', carregarDoHash);
  carregarDoHash(); // executa na carga inicial
}



montarBlog();
