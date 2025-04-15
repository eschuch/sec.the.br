#!/bin/bash

# Caminho para a pasta de posts
PASTA_POSTS="posts"
# Arquivo de saída
ARQUIVO_LISTA="lista.txt"

# Limpa o arquivo de saída
> "$ARQUIVO_LISTA"

# Itera sobre os arquivos .md na pasta de posts
for arquivo in "$PASTA_POSTS"/*.md; do
  # Extrai o nome do arquivo
  nome_arquivo=$(basename "$arquivo")
  
  # Extrai o título do post (primeira linha que começa com '#')
  titulo=$(grep -m 1 '^#' "$arquivo" | sed 's/^#\s*//')
  
  # Se não encontrar um título, usa o nome do arquivo como título
  if [ -z "$titulo" ]; then
    titulo="$nome_arquivo"
  fi
  
  # Obtém a data de modificação do arquivo no formato YYYY-MM-DD
  data=$(date -r "$arquivo" '+%Y-%m-%d')
  
  # Escreve a linha no arquivo de saída
  echo "${nome_arquivo}|${titulo}|${data}" >> "$ARQUIVO_LISTA"
done

echo "Arquivo '$ARQUIVO_LISTA' atualizado com sucesso."
