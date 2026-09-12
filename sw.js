/* Noite de Jogos — service worker
   Aumente a versão abaixo sempre que publicar uma mudança (inclusive nos
   arquivos de /data) para forçar os celulares a baixarem a versão nova. */
const CACHE = 'noite-jogos-v14';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './icon-180.png',
  './favicon.svg',
  './favicon.ico',
  './data/adivinhe-a-regra.csv',
  './data/concorda-ou-discorda.txt',
  './data/debate-inutil.txt',
  './data/dilema-do-botao.txt',
  './data/duas-verdades-dicas.txt',
  './data/entrevista-invertida.txt',
  './data/escala-oculta.txt',
  './data/historia-em-turnos.txt',
  './data/mais-provavel.txt',
  './data/mimica.txt',
  './data/momentos-quentes.txt',
  './data/palavra-proibida.csv',
  './data/pares-perguntas.csv',
  './data/personagens.txt',
  './data/quem-disse-isso.txt',
  './data/temas/animais.txt',
  './data/temas/anime.txt',
  './data/temas/comidas.txt',
  './data/temas/desenhos.txt',
  './data/temas/filmes.txt',
  './data/temas/futebol.txt',
  './data/temas/games.txt',
  './data/temas/geral.txt',
  './data/temas/herois.txt',
  './data/temas/lugares.txt',
  './data/temas/marcas.txt',
  './data/temas/musica.txt',
  './data/temas/objetos.txt',
  './data/temas/profissoes.txt',
  './data/verdades-silenciosas.txt',
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // adiciona um a um pra não falhar tudo se um arquivo faltar
    for (const a of ASSETS) { try { await c.add(a); } catch (_) {} }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

// Rede primeiro (pra pegar conteúdo novo), cache como reserva (pra funcionar offline)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    try {
      const fresh = await fetch(e.request);
      const c = await caches.open(CACHE);
      c.put(e.request, fresh.clone());
      return fresh;
    } catch (_) {
      const cached = await caches.match(e.request, { ignoreSearch: true });
      return cached || caches.match('./index.html');
    }
  })());
});
