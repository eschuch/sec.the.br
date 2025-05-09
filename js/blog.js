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

async function carregarListaDinamica() {
  let index = 1;

  while (true) {
    const resp = await fetch(`posts/${index}.md`);
    if (!resp.ok) break; // se o arquivo não existir, para tudo

    const md = await resp.text();
    const linhas = md.trim().split('\n');

    if (
      linhas.length >= 6 &&
      linhas[2].startsWith('# ') &&
      linhas[3].startsWith('## ') &&
      linhas[4].startsWith('### ') &&
      linhas[5].startsWith('---')
    ) {
      listaPosts.push({
        arquivo: `${index}.md`,
        titulo: linhas[2].replace(/^# /, '').trim(),
        data: linhas[0].trim()
      });
    }

    index++; // continua verificando mesmo se o arquivo for inválido
  }

  listaPosts.reverse();
}

async function carregarPost(indice) {
  const { arquivo, titulo } = listaPosts[indice];
  const resp = await fetch(`posts/${arquivo}`);
  const md = await resp.text();
  const html = marked.parse(md);

  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `
    <div id="nav-arrows">
      <button id="prev-post" ${indice === 0 ? 'disabled' : ''}>&lt; Anterior</button>
      <button id="next-post" ${indice === listaPosts.length - 1 ? 'disabled' : ''}>Próximo &gt;</button>
    </div>
    <div>${html}</div>
  `;

  indiceAtual = indice;
  window.location.hash = arquivo.replace('.md', '');

  document.getElementById('prev-post').addEventListener('click', () => {
    if (indiceAtual > 0) carregarPost(indiceAtual - 1);
  });

  document.getElementById('next-post').addEventListener('click', () => {
    if (indiceAtual < listaPosts.length - 1) carregarPost(indiceAtual + 1);
  });

  hljs.highlightAll();
}

async function montarBlog() {
  await carregarReadme();
  await carregarListaDinamica();

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

  function carregarDoHash() {
    const slug = window.location.hash.replace('#', '');
    const index = listaPosts.findIndex(p => p.arquivo === `${slug}.md`);
    if (index >= 0) {
      carregarPost(index);
    } else if (listaPosts.length > 0) {
      carregarPost(0);
    }
  }

  window.addEventListener('hashchange', carregarDoHash);
  carregarDoHash();
}

montarBlog();
