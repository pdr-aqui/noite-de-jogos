# Noite de Jogos

Jogos de festa para jogar com um só celular, passando de mão em mão.
Sem servidor, sem banco de dados, sem login. Um HTML, uma pasta de texto.

## Como publicar (GitHub Pages)

1. Suba todos os arquivos deste repositório para o GitHub.
2. Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. Abra o endereço que o GitHub mostrar. No celular, use "Adicionar à Tela de Início" para instalar como app.

Importante: abrir o `index.html` com dois cliques **não funciona**, porque o navegador
bloqueia a leitura da pasta `data/` a partir de arquivo local. Precisa ser por um endereço
http(s): GitHub Pages, Vercel, Netlify, ou um servidor local (`python3 -m http.server`).

## Onde está o conteúdo dos jogos

Todo o conteúdo fica em `data/`. Para acrescentar perguntas, temas ou palavras, edite esses
arquivos. Não precisa mexer no `index.html`.

| Arquivo | Jogo | Formato |
|---|---|---|
| `data/temas/*.txt` | Camaleão, Coordenada Errada, Duplo Impostor e outros que usam tema | 1ª linha = nome do tema (com emoji); depois `palavra;dica`, uma por linha |
| `data/pares-perguntas.csv` | Pergunta Invertida | `pergunta_maioria;pergunta_impostor` |
| `data/adivinhe-a-regra.csv` | Adivinhe a Regra | `nome;instrucao;regra_secreta` |
| `data/palavra-proibida.csv` | Palavra Proibida | `palavra;proibida1;…;proibida5` |
| `data/escala-oculta.txt` | Escala Oculta | uma frase por linha |
| `data/dilema-do-botao.txt` | O Dilema do Botão | uma frase por linha |
| `data/concorda-ou-discorda.txt` | Concorda ou Discorda | uma frase por linha |
| `data/debate-inutil.txt` | Debate Inútil | uma frase por linha |
| `data/personagens.txt` | Entrevista Invertida (personagens) | um por linha |
| `data/entrevista-invertida.txt` | Entrevista Invertida (perguntas) | uma por linha |
| `data/historia-em-turnos.txt` | História em Turnos | uma palavra por linha |
| `data/mais-provavel.txt` | Quem é mais provável de… | uma frase por linha |
| `data/duas-verdades-dicas.txt` | Duas Verdades e Uma Mentira | uma dica por linha |
| `data/quem-disse-isso.txt` | Quem Disse Isso? | uma frase por linha |
| `data/verdades-silenciosas.txt` | Verdades Silenciosas | uma pergunta por linha |
| `data/momentos-quentes.txt` | Momentos Quentes | uma pergunta por linha |
| `data/mimica.txt` | Mímica | uma palavra ou ação por linha (tem que dar pra fazer com o corpo) |

## Dica pro impostor

No Camaleão e no Duplo Impostor, o impostor recebe uma pista vaga da palavra secreta
(ex.: `Pikachu;amarelo`). A dica é o que vem depois do `;` em `data/temas/*.txt`.
Regras para escrever uma boa dica: tem que servir para pelo menos 5 outras palavras
do mesmo tema (senão entrega o segredo), e nunca ser a categoria óbvia ("pokémon").
Palavra sem `;` funciona normalmente, só que o impostor não recebe dica naquela rodada.
O jogador pode desligar em **Ajustes → Dica pro impostor**. Vem ligada por padrão.

Regras dos arquivos:

- Uma entrada por linha. Linhas vazias e linhas começando com `#` são ignoradas.
- Nos `.csv`, o separador é `;` (ponto e vírgula), como o Excel em português. Não use `;` dentro do texto.
- Salve sempre em UTF-8 (padrão do VS Code, Bloco de Notas moderno e Google Sheets).
- Para criar um tema novo: crie `data/temas/nome.txt` e adicione `nome` na lista `THEME_KEYS` no começo do `<script>` do `index.html`.

## Depois de mudar qualquer coisa

Abra `sw.js` e aumente o número em `const CACHE = 'noite-jogos-v12'` (v13, v14…).
Sem isso, celulares que já instalaram o app continuam com a versão antiga em cache.

## Estrutura

```
index.html            app inteiro (telas, regras dos 20 jogos, lógica)
data/                 conteúdo dos jogos (texto)
sw.js                 cache offline (PWA)
manifest.webmanifest  nome, ícones e cores do app instalado
icon-*.png, favicon.* ícones
og-image.png          imagem de prévia ao compartilhar o link
```
