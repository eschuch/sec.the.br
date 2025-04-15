# 🛠️ Construindo um Blog Estático com GitHub Pages, JavaScript e Markdown

Este post documenta a criação de um blog estático utilizando GitHub Pages, JavaScript puro e arquivos Markdown, sem a necessidade de Jekyll ou ferramentas de build.

## ⚙️ Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
/
├── .nojekyll
├── index.html
├── lista.txt
├── README.md
├── posts/
│   ├── post1.md
│   └── post2.md
├── imagens/
│   └── exemplo.jpg
└── js/
    └── blog.js
```

- `.nojekyll`: Desativa o processamento automático do Jekyll no GitHub Pages.
- `index.html`: Página principal do blog.
- `lista.txt`: Lista dos posts no formato `arquivo.md|Título|Data`.
- `README.md`: Conteúdo exibido acima da lista de posts.
- `posts/`: Diretório contendo os arquivos Markdown dos posts.
- `imagens/`: Diretório para armazenar imagens utilizadas nos posts.
- `js/blog.js`: Script responsável por carregar e renderizar os posts.

## 🧩 Funcionalidades Implementadas

### 1. Renderização de Posts em Markdown

Utilizamos a biblioteca [Marked.js](https://marked.js.org/) para converter os arquivos Markdown em HTML e exibi-los na página.

### 2. Destaque de Código

Integramos o [Highlight.js](https://highlightjs.org/) para aplicar destaque de sintaxe em blocos de código dentro dos posts.

### 3. Navegação entre Posts

Adicionamos botões de navegação "Anterior" e "Próximo" para facilitar a leitura sequencial dos posts.

### 4. Sidebar com Lista de Posts

Implementamos uma barra lateral que exibe a lista de posts disponíveis, permitindo ao usuário selecionar o post que deseja ler.

### 5. Exibição do README.md

O conteúdo do `README.md` é carregado e exibido acima da lista de posts, fornecendo uma introdução ou descrição do blog.

## 🖼️ Inclusão de Imagens nos Posts

Para adicionar imagens aos posts, utilize a sintaxe padrão do Markdown:

```markdown
![Descrição da imagem](../imagens/exemplo.jpg)
```

Certifique-se de que o caminho para a imagem esteja correto em relação à localização do arquivo Markdown.

## 🚀 Publicação no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos do projeto.
2. Acesse as configurações do repositório e ative o GitHub Pages, selecionando a branch principal como fonte.
3. Aguarde alguns minutos e acesse o link fornecido para visualizar seu blog online.

---

Este projeto demonstra como é possível criar um blog funcional e esteticamente agradável utilizando apenas tecnologias web básicas. A simplicidade da abordagem facilita a manutenção e a personalização conforme suas necessidades.
