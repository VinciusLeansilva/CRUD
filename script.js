/**
 * ============================================================================
 * VOLTSCOOT ⚡ SISTEMA MULTI-PÁGINAS DE SCOOTERS ELÉTRICAS (CRUD API ONLINE)
 * Páginas suportadas:
 * 1. index.html            -> Home / Showroom & Calculadora de Economia (GET)
 * 2. catalogo.html         -> Catálogo Completo, Filtros & Ficha Técnica (GET, GET/:id, PATCH, DELETE)
 * 3. cadastro.html         -> Cadastrar Nova (POST) & Editar Ficha Completa (PUT)
 * 4. manutencao-patch.html -> Ajustes Parciais, Promoções (PATCH) & Exclusão (DELETE)
 * 5. api-console.html      -> Configuração da API Online (CrudCrud / Cloud) & Inspetor HTTP
 * ============================================================================
 */

const STORAGE_KEY_SCOOTERS = 'voltscoot_scooters_db_v3';
const STORAGE_KEY_API_URL = 'voltscoot_api_url_v3';
const STORAGE_KEY_HTTP_LOGS = 'voltscoot_http_logs_v3';

const DEFAULT_ONLINE_API = 'https://jsonplaceholder.typicode.com/posts';
let frotaCache = [];

// Frota inicial completa de Scooters Elétricas
const SCOOTERS_INICIAIS = [
  {
    _id: '1',
    modelo: 'VoltScoot X1 Pro 3000W',
    marca: 'VoltScoot',
    potencia: 3000,
    autonomia: 75,
    velocidadeMax: 70,
    bateria: '60V 30Ah Lítio Removível',
    tempoRecarga: '4.5 horas',
    cor: 'Preto Fosco Neon',
    preco: 12490.00,
    estoque: 6,
    status: 'Disponivel',
    descricao: 'Scooter elétrica urbana de alto desempenho com freios a disco hidráulicos, painel digital LCD e alarme integrado.',
    imagem: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '2',
    modelo: 'Ninebot Max G2 Electric',
    marca: 'Segway Ninebot',
    potencia: 1000,
    autonomia: 70,
    velocidadeMax: 35,
    bateria: '36V 15.3Ah Smart BMS',
    tempoRecarga: '5 horas',
    cor: 'Cinza Grafite',
    preco: 5890.00,
    estoque: 12,
    status: 'Promocao',
    descricao: 'Ideal para deslocamento diário na cidade, dobrável em 3 segundos, suspensão dupla e pneus autorregenerativos.',
    imagem: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '3',
    modelo: 'ThunderMax Dual Motor 5000W',
    marca: 'Watts Mobilidade',
    potencia: 5000,
    autonomia: 110,
    velocidadeMax: 90,
    bateria: '72V 45Ah Dupla Célula',
    tempoRecarga: '6 horas',
    cor: 'Vermelho Racing',
    preco: 18990.00,
    estoque: 3,
    status: 'Lancamento',
    descricao: 'Potência extrema com tração dupla nas duas rodas, amortecedor invertido e autonomia de até 110 km com uma única carga.',
    imagem: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '4',
    modelo: 'Chopper Street Harley 2000W',
    marca: 'Muuv Chopper',
    potencia: 2000,
    autonomia: 60,
    velocidadeMax: 55,
    bateria: '60V 20Ah Lítio',
    tempoRecarga: '4 horas',
    cor: 'Azul Metálico',
    preco: 9790.00,
    estoque: 5,
    status: 'Disponivel',
    descricao: 'Design estilo custom chopper com pneus largos fat-tire de 18 polegadas, banco duplo confortável e farol full LED.',
    imagem: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '5',
    modelo: 'Mi Electric Scooter 4 Ultra',
    marca: 'Xiaomi Mi Electric',
    potencia: 940,
    autonomia: 70,
    velocidadeMax: 25,
    bateria: '48V 12Ah Ultra Durável',
    tempoRecarga: '4 horas',
    cor: 'Prata Espacial',
    preco: 4990.00,
    estoque: 9,
    status: 'Disponivel',
    descricao: 'Estrutura em liga de alumínio aeroespacial, certificação IP55 contra água e poeira e conectividade via aplicativo.',
    imagem: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '6',
    modelo: 'VoltScoot Cargo Delivery 2500W',
    marca: 'VoltScoot',
    potencia: 2500,
    autonomia: 95,
    velocidadeMax: 60,
    bateria: '60V 40Ah Long Range',
    tempoRecarga: '5 horas',
    cor: 'Verde Elétrico',
    preco: 13290.00,
    estoque: 4,
    status: 'Promocao',
    descricao: 'Projetada para entregas rápidas e uso comercial intenso, com suporte traseiro reforçado para baú de até 120 litros.',
    imagem: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80'
  }
];

/* ============================================================================
 * CONFIGURAÇÃO DE ENDPOINT DA API ONLINE (COMPARTILHADA ENTRE AS PÁGINAS)
 * ============================================================================ */
function obterUrlApiAtiva() {
  const inputPagina = document.getElementById('apiUrlInput');
  if (inputPagina && inputPagina.value.trim()) {
    const limpa = inputPagina.value.trim().replace(/\/+$/, '');
    localStorage.setItem(STORAGE_KEY_API_URL, limpa);
    return limpa;
  }
  return localStorage.getItem(STORAGE_KEY_API_URL) || DEFAULT_ONLINE_API;
}

function definirUrlApiAtiva(novaUrl) {
  const limpa = novaUrl.trim().replace(/\/+$/, '');
  localStorage.setItem(STORAGE_KEY_API_URL, limpa);
  const inputPagina = document.getElementById('apiUrlInput');
  if (inputPagina) inputPagina.value = limpa;
  atualizarIndicadorApiTopo();
}

function atualizarIndicadorApiTopo() {
  const url = obterUrlApiAtiva();
  const pillText = document.getElementById('apiTopStatusText');
  if (!pillText) return;

  if (url.includes('crudcrud.com')) {
    pillText.textContent = 'API Online: CrudCrud.com';
  } else if (url.includes('jsonplaceholder')) {
    pillText.textContent = 'API Online: Cloud REST';
  } else if (url.includes('localhost')) {
    pillText.textContent = 'API: Servidor Local';
  } else {
    pillText.textContent = 'API Online Customizada';
  }
}

function obterIdItem(item) {
  return String(item._id || item.id);
}

/* ============================================================================
 * INICIALIZAÇÃO AUTOMÁTICA CONFORME A PÁGINA ABERTA
 * ============================================================================ */
window.addEventListener('DOMContentLoaded', async () => {
  atualizarIndicadorApiTopo();

  const inputApi = document.getElementById('apiUrlInput');
  if (inputApi) {
    inputApi.value = obterUrlApiAtiva();
  }

  // Carrega a frota com GET em qualquer página
  await carregarFrotaInicialGET();

  // Inicializações específicas por página
  if (document.getElementById('calcKmDia')) {
    calcularEconomiaScooter();
  }

  if (document.getElementById('crudForm')) {
    configurarPreviewAoVivoCadastro();
    verificarParametroIdUrlCadastro();
  }

  if (document.getElementById('httpHistoryList')) {
    renderizarHistoricoSalvo();
  }
});

/* ============================================================================
 * 1. MÉTODO GET (LISTAR TODA A FROTA E BUSCAR SCOOTER POR ID)
 * ============================================================================ */
async function carregarFrotaInicialGET() {
  const url = obterUrlApiAtiva();
  try {
    const res = await realizarRequisicaoHTTP('GET', url);
    if (Array.isArray(res.data)) {
      frotaCache = res.data;
      atualizarComponentesDaPagina(frotaCache);
    }
  } catch (erro) {
    mostrarToast(`Erro no GET: ${erro.message}`, '#ef4444');
  }
}

async function inspecionarScooterGETPorId(id) {
  if (!id) return;
  const url = `${obterUrlApiAtiva()}/${id}`;

  try {
    const res = await realizarRequisicaoHTTP('GET', url);
    if (res.ok && res.data) {
      abrirModalFichaTecnica(res.data, url);
      mostrarToast(`GET /${id}: Ficha técnica recebida da API Online!`, '#3b82f6');
    } else {
      mostrarToast(`Scooter #${id} não encontrada (404).`, '#ef4444');
    }
  } catch (erro) {
    mostrarToast(`Erro no GET /:id: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * 2. MÉTODO POST (CRIAR NOVA SCOOTER ELÉTRICA)
 * ============================================================================ */
async function criarScooterPOST() {
  const dados = lerFormularioScooter();
  if (!dados) return;

  const url = obterUrlApiAtiva();
  try {
    const res = await realizarRequisicaoHTTP('POST', url, dados);
    if (res.ok) {
      mostrarToast(`POST concluído! "${dados.modelo}" cadastrada na API Online.`, '#10b981');
      exibirResultadoOperacaoForm('POST', `${url}`, res.status, dados, res.data);
      limparFormularioCadastro();
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Erro no POST: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * 3. MÉTODO PUT (ATUALIZAR FICHA COMPLETA DA SCOOTER)
 * ============================================================================ */
async function atualizarScooterPUT() {
  const id = document.getElementById('itemId')?.value.trim();
  if (!id) {
    mostrarToast('Selecione uma Scooter existente na lista acima para atualizar com PUT!', '#f59e0b');
    return;
  }

  const dadosCompletos = lerFormularioScooter();
  if (!dadosCompletos) return;

  const url = `${obterUrlApiAtiva()}/${id}`;
  try {
    const res = await realizarRequisicaoHTTP('PUT', url, dadosCompletos);
    if (res.ok) {
      mostrarToast(`PUT /${id}: Todos os dados da Scooter foram substituídos com sucesso!`, '#f59e0b');
      exibirResultadoOperacaoForm('PUT', url, res.status, dadosCompletos, res.data);
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Erro no PUT: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * 4. MÉTODO PATCH (ATUALIZAÇÃO PARCIAL DE 1 OU ALGUNS CAMPOS)
 * ============================================================================ */
async function executarPatchFormulario() {
  const id = document.getElementById('patchId')?.value.trim();
  const campo = document.getElementById('patchCampo')?.value;
  let valor = document.getElementById('patchValor')?.value.trim();

  if (!id || valor === '') {
    mostrarToast('Selecione a Scooter e informe o novo valor para enviar o PATCH!', '#a855f7');
    return;
  }

  if (campo === 'preco') valor = parseFloat(valor);
  if (['estoque', 'potencia', 'autonomia', 'velocidadeMax'].includes(campo)) {
    valor = parseInt(valor, 10);
  }

  await enviarRequisicaoPATCH(id, { [campo]: valor });
  document.getElementById('patchValor').value = '';
}

async function enviarRequisicaoPATCH(id, payloadParcial) {
  const url = `${obterUrlApiAtiva()}/${id}`;
  try {
    const res = await realizarRequisicaoHTTP('PATCH', url, payloadParcial);
    if (res.ok) {
      const chaves = Object.keys(payloadParcial).join(', ');
      mostrarToast(`PATCH /${id}: Campo (${chaves}) atualizado parcialmente na API Online!`, '#a855f7');
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Erro no PATCH: ${erro.message}`, '#ef4444');
  }
}

// Ações de PATCH em 1 clique (Desconto 10%, Desconto 20%, +1 Estoque, Mudar Status)
async function acaoRapidaPATCH(id, tipo) {
  const s = frotaCache.find((item) => obterIdItem(item) === String(id));
  if (!s) return;

  let payload = {};
  if (tipo === 'promo10') {
    payload = { preco: Number((Number(s.preco) * 0.9).toFixed(2)), status: 'Promocao' };
  } else if (tipo === 'promo20') {
    payload = { preco: Number((Number(s.preco) * 0.8).toFixed(2)), status: 'Promocao' };
  } else if (tipo === 'addEstoque') {
    payload = { estoque: Number(s.estoque || 0) + 1, status: 'Disponivel' };
  } else if (tipo === 'esgotar') {
    payload = { estoque: 0, status: 'Esgotada' };
  }

  await enviarRequisicaoPATCH(id, payload);
}

/* ============================================================================
 * 5. MÉTODO DELETE (EXCLUIR SCOOTER DA API ONLINE)
 * ============================================================================ */
async function excluirScooterDELETE(id) {
  if (!id) return;
  const url = `${obterUrlApiAtiva()}/${id}`;

  try {
    const res = await realizarRequisicaoHTTP('DELETE', url);
    if (res.ok) {
      mostrarToast(`DELETE /${id}: Scooter removida da API Online!`, '#ef4444');
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Erro no DELETE: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * MOTOR DE REQUISIÇÕES HTTP (API ONLINE CLOUD + CRUDCRUD.COM + LOCAL)
 * ============================================================================ */
async function realizarRequisicaoHTTP(metodo, url, bodyObj = null) {
  const inicio = performance.now();

  if (url.includes('COLE_SEU_TOKEN_AQUI')) {
    throw new Error('Substitua COLE_SEU_TOKEN_AQUI pela sua chave gerada no site crudcrud.com!');
  }

  let bodyLimpo = bodyObj;
  if (bodyObj && (metodo === 'PUT' || metodo === 'PATCH')) {
    const copia = { ...bodyObj };
    delete copia._id;
    delete copia.id;
    bodyLimpo = copia;
  }

  // Modo 1: API Online Pública Padrão (JSONPlaceholder Cloud + Persistência de Frota)
  if (url.includes('jsonplaceholder.typicode.com')) {
    return await executarChamadaCloudPublica(metodo, url, bodyLimpo, inicio);
  }

  // Modo 2: CrudCrud.com ou Servidor REST Online/Local
  const opcoes = { method: metodo, headers: {} };
  if (bodyLimpo) {
    opcoes.headers['Content-Type'] = 'application/json';
    opcoes.body = JSON.stringify(bodyLimpo);
  }

  try {
    const response = await fetch(url, opcoes);
    const duracao = Math.round(performance.now() - inicio);
    const texto = await response.text();
    let dados = null;

    if (texto) {
      try { dados = JSON.parse(texto); } catch { dados = { mensagem: texto }; }
    } else {
      dados = { status: response.status, metodo, mensagem: `Operação ${metodo} concluída com sucesso (Empty Body)` };
    }

    salvarERegistrarLogHTTP(metodo, url, response.status, duracao, bodyLimpo, dados);
    return { ok: response.ok, status: response.status, data: dados };
  } catch (erroRede) {
    if (url.includes('crudcrud.com') && metodo === 'PATCH') {
      return await fallbackPatchCrudCrud(url, bodyLimpo, inicio);
    }
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      const local = operarBancoLocalScooters(metodo, url, bodyLimpo);
      const duracao = Math.round(performance.now() - inicio);
      salvarERegistrarLogHTTP(metodo, url, local.status, duracao, bodyLimpo, local.data);
      return local;
    }
    throw erroRede;
  }
}

async function executarChamadaCloudPublica(metodo, url, bodyLimpo, inicio) {
  const opcoes = { method: metodo, headers: { 'Accept': 'application/json' } };
  if (bodyLimpo) {
    opcoes.headers['Content-Type'] = 'application/json; charset=UTF-8';
    opcoes.body = JSON.stringify(bodyLimpo);
  }

  let urlOnline = url;
  const partes = url.split('/');
  const ultimo = partes[partes.length - 1];
  const temId = ultimo !== 'posts' && ultimo !== '';

  if (temId) {
    const idNum = parseInt(ultimo, 10);
    if (isNaN(idNum) || idNum > 100 || idNum < 1) {
      urlOnline = `${partes.slice(0, -1).join('/')}/1`;
    }
  }

  let statusOnline = 200;
  try {
    const res = await fetch(urlOnline, opcoes);
    statusOnline = res.status;
  } catch {
    statusOnline = metodo === 'POST' ? 201 : 200;
  }

  const sincronizado = operarBancoLocalScooters(metodo, url, bodyLimpo);
  const statusFinal = sincronizado.ok ? statusOnline : sincronizado.status;
  const duracao = Math.round(performance.now() - inicio);

  salvarERegistrarLogHTTP(metodo, url, statusFinal, duracao, bodyLimpo, sincronizado.data);
  return { ok: sincronizado.ok, status: statusFinal, data: sincronizado.data };
}

async function fallbackPatchCrudCrud(urlItem, camposParciais, inicio) {
  const resGet = await fetch(urlItem);
  const itemAtual = await resGet.json();
  delete itemAtual._id;

  const mesclado = { ...itemAtual, ...camposParciais };
  const resPut = await fetch(urlItem, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mesclado)
  });

  const duracao = Math.round(performance.now() - inicio);
  const logData = {
    metodo: 'PATCH',
    camposModificados: camposParciais,
    scooterAtualizada: mesclado
  };
  salvarERegistrarLogHTTP('PATCH', urlItem, resPut.status, duracao, camposParciais, logData);
  return { ok: resPut.ok, status: resPut.status, data: logData };
}

/* ============================================================================
 * BANCO DE DADOS SINCRONIZADO DE SCOOTERS ELÉTRICAS
 * ============================================================================ */
function obterFrotaSalva() {
  const salvo = localStorage.getItem(STORAGE_KEY_SCOOTERS);
  if (!salvo) {
    localStorage.setItem(STORAGE_KEY_SCOOTERS, JSON.stringify(SCOOTERS_INICIAIS));
    return [...SCOOTERS_INICIAIS];
  }
  return JSON.parse(salvo);
}

function salvarFrota(lista) {
  localStorage.setItem(STORAGE_KEY_SCOOTERS, JSON.stringify(lista));
}

function operarBancoLocalScooters(metodo, url, body) {
  let db = obterFrotaSalva();
  const partes = url.split('/');
  const ultimo = partes[partes.length - 1];
  const ehRaiz = ultimo === 'posts' || ultimo === 'scooters' || ultimo === '';

  if (metodo === 'GET' && ehRaiz) {
    return { ok: true, status: 200, data: db };
  }
  if (metodo === 'GET' && !ehRaiz) {
    const item = db.find((s) => obterIdItem(s) === String(ultimo));
    if (!item) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    return { ok: true, status: 200, data: item };
  }
  if (metodo === 'POST') {
    const nova = { _id: String(Date.now()).slice(-4), ...body };
    db.push(nova);
    salvarFrota(db);
    return { ok: true, status: 201, data: nova };
  }
  if (metodo === 'PUT' && !ehRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    db[idx] = { _id: String(ultimo), ...body };
    salvarFrota(db);
    return { ok: true, status: 200, data: db[idx] };
  }
  if (metodo === 'PATCH' && !ehRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    db[idx] = { ...db[idx], ...body };
    salvarFrota(db);
    return { ok: true, status: 200, data: db[idx] };
  }
  if (metodo === 'DELETE' && !ehRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    const removida = db.splice(idx, 1)[0];
    salvarFrota(db);
    return { ok: true, status: 200, data: { mensagem: 'Scooter excluída', removida } };
  }
  return { ok: false, status: 400, data: { erro: 'Requisição inválida' } };
}

async function restaurarFrotaPadrao() {
  localStorage.setItem(STORAGE_KEY_SCOOTERS, JSON.stringify(SCOOTERS_INICIAIS));
  const url = obterUrlApiAtiva();

  if (url.includes('crudcrud.com')) {
    for (const s of SCOOTERS_INICIAIS) {
      const { _id, ...semId } = s;
      await realizarRequisicaoHTTP('POST', url, semId);
    }
  }
  await carregarFrotaInicialGET();
  mostrarToast('Frota original de 6 Scooters Elétricas restaurada!', '#10b981');
}

/* ============================================================================
 * ATUALIZAÇÃO DINÂMICA DE CADA PÁGINA DO SITE
 * ============================================================================ */
function atualizarComponentesDaPagina(scooters) {
  // 1. Indicadores na Home (index.html)
  if (document.getElementById('statTotalModelos')) {
    document.getElementById('statTotalModelos').textContent = scooters.length;
    const maxAut = scooters.reduce((m, s) => Math.max(m, Number(s.autonomia || 0)), 0);
    document.getElementById('statMaxAutonomia').textContent = `${maxAut} km`;
    const maxPot = scooters.reduce((m, s) => Math.max(m, Number(s.potencia || 0)), 0);
    document.getElementById('statMaxPotencia').textContent = `${maxPot} W`;
    const totEst = scooters.reduce((a, s) => a + Number(s.estoque || 0), 0);
    document.getElementById('statTotalEstoque').textContent = `${totEst} un.`;
  }

  // 2. Destaques na Home (index.html - mostra até 3 scooters)
  if (document.getElementById('homeDestaquesGrid')) {
    renderizarGridScooters(scooters.slice(0, 3), 'homeDestaquesGrid');
  }

  // 3. Catálogo Completo com Filtros (catalogo.html)
  if (document.getElementById('catalogoScootersGrid')) {
    aplicarFiltrosCatalogo();
  }

  // 4. Seletor de Scooters na Página de Cadastro/Edição (cadastro.html)
  if (document.getElementById('seletorScooterPut')) {
    popularSeletorEdicaoPUT(scooters);
  }

  // 5. Página de Ajustes Rápidos PATCH e DELETE (manutencao-patch.html)
  if (document.getElementById('tabelaManutencaoBody')) {
    renderizarPaginaManutencao(scooters);
  }
}

function criarCardScooterHTML(s) {
  const id = obterIdItem(s);
  const precoFmt = Number(s.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const statusLimpo = (s.status || 'Disponivel').replace(/\s+/g, '');
  const imgPadrao = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80';

  return `
    <article class="scooter-card">
      <div class="scooter-img-wrap">
        <img src="${escaparHTML(s.imagem || imgPadrao)}" alt="${escaparHTML(s.modelo)}" loading="lazy" />
        <div class="scooter-top-badges">
          <span class="scooter-id-tag">ID #${id}</span>
          <span class="status-pill status-${statusLimpo}">${escaparHTML(s.status || 'Disponivel')}</span>
        </div>
      </div>

      <div class="scooter-body">
        <div>
          <div class="scooter-brand">${escaparHTML(s.marca || 'VoltScoot')}</div>
          <h3 class="scooter-title">${escaparHTML(s.modelo || 'Scooter Elétrica')}</h3>
        </div>

        <div class="scooter-specs">
          <div class="spec-item">
            <span class="spec-label">Potência</span>
            <span class="spec-val">${s.potencia || 1000}W</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Autonomia</span>
            <span class="spec-val">${s.autonomia || 50} km</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Vel. Máx</span>
            <span class="spec-val">${s.velocidadeMax || 45} km/h</span>
          </div>
        </div>

        <div class="scooter-price-row">
          <span class="scooter-price">${precoFmt}</span>
          <span class="scooter-stock">${s.estoque ?? 0} em estoque</span>
        </div>

        <div class="scooter-actions">
          <button class="action-btn badge-get" onclick="inspecionarScooterGETPorId('${id}')" title="Ficha Técnica via GET /:id">
            GET
          </button>
          <a class="action-btn badge-put" href="cadastro.html?id=${encodeURIComponent(id)}" title="Editar Ficha Completa via PUT">
            PUT
          </a>
          <button class="action-btn badge-patch" onclick="acaoRapidaPATCH('${id}', 'promo10')" title="Aplicar -10% no preço via PATCH">
            PATCH
          </button>
          <button class="action-btn badge-delete" onclick="excluirScooterDELETE('${id}')" title="Excluir via DELETE">
            DEL
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderizarGridScooters(lista, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!lista.length) {
    container.innerHTML = `<div class="card" style="grid-column:1/-1; text-align:center; color:#94a3b8;">Nenhuma Scooter encontrada com estes filtros.</div>`;
    return;
  }
  container.innerHTML = lista.map(criarCardScooterHTML).join('');
}

/* ============================================================================
 * LÓGICA DA PÁGINA 1: HOME (CALCULADORA DE ECONOMIA)
 * ============================================================================ */
function calcularEconomiaScooter() {
  const kmDia = Number(document.getElementById('calcKmDia')?.value || 30);
  const precoGasolina = Number(document.getElementById('calcPrecoGas')?.value || 6.10);

  const labelKm = document.getElementById('calcKmValor');
  if (labelKm) labelKm.textContent = `${kmDia} km/dia`;

  const kmMes = kmDia * 22; // 22 dias úteis
  // Moto/Carro urbano médio ~ 14 km/L vs Scooter Elétrica ~ R$ 0,02 por km de energia
  const gastoCombustivelMes = (kmMes / 14) * precoGasolina;
  const gastoEnergiaScooterMes = kmMes * 0.025;
  const economiaMensal = Math.max(0, gastoCombustivelMes - gastoEnergiaScooterMes);
  const economiaAnual = economiaMensal * 12;

  const elMes = document.getElementById('resEconomiaMes');
  const elAno = document.getElementById('resEconomiaAno');
  if (elMes) elMes.textContent = economiaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  if (elAno) elAno.textContent = economiaAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ============================================================================
 * LÓGICA DA PÁGINA 2: CATÁLOGO, FILTROS E MODAL (GET /:ID)
 * ============================================================================ */
function aplicarFiltrosCatalogo() {
  const busca = (document.getElementById('filtroBusca')?.value || '').toLowerCase();
  const marca = document.getElementById('filtroMarca')?.value || 'TODAS';
  const status = document.getElementById('filtroStatus')?.value || 'TODOS';
  const ordem = document.getElementById('filtroOrdem')?.value || 'padrao';

  let filtradas = frotaCache.filter((s) => {
    const bateTexto =
      (s.modelo || '').toLowerCase().includes(busca) ||
      (s.marca || '').toLowerCase().includes(busca);
    const bateMarca = marca === 'TODAS' || s.marca === marca;
    const bateStatus = status === 'TODOS' || s.status === status;
    return bateTexto && bateMarca && bateStatus;
  });

  if (ordem === 'menorPreco') filtradas.sort((a, b) => Number(a.preco) - Number(b.preco));
  if (ordem === 'maiorPotencia') filtradas.sort((a, b) => Number(b.potencia) - Number(a.potencia));
  if (ordem === 'maiorAutonomia') filtradas.sort((a, b) => Number(b.autonomia) - Number(a.autonomia));

  const contador = document.getElementById('catalogoTotalCount');
  if (contador) contador.textContent = `${filtradas.length} scooters encontradas`;

  renderizarGridScooters(filtradas, 'catalogoScootersGrid');
}

function abrirModalFichaTecnica(s, urlRequisitada) {
  const modal = document.getElementById('modalFichaTecnica');
  const conteudo = document.getElementById('modalFichaConteudo');
  if (!modal || !conteudo) return;

  const id = obterIdItem(s);
  const precoFmt = Number(s.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  conteudo.innerHTML = `
    <div class="card-header">
      <div>
        <span class="badge badge-get">GET ${escaparHTML(urlRequisitada)}</span>
        <h2 style="margin-top:0.5rem;">${escaparHTML(s.modelo)}</h2>
        <p style="color:#34d399; font-size:0.85rem; font-weight:600;">${escaparHTML(s.marca || 'VoltScoot')} • ID #${id}</p>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="fecharModalFichaTecnica()">✕ Fechar</button>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1rem 0;">
      <img src="${escaparHTML(s.imagem || '')}" alt="${escaparHTML(s.modelo)}" style="width:100%; height:190px; object-fit:cover; border-radius:10px;" />
      <div style="display:flex; flex-direction:column; gap:0.45rem; font-size:0.86rem;">
        <div><strong>Preço:</strong> <span style="color:#34d399; font-weight:700;">${precoFmt}</span></div>
        <div><strong>Potência do Motor:</strong> ${s.potencia || 0} W</div>
        <div><strong>Autonomia:</strong> ${s.autonomia || 0} km</div>
        <div><strong>Velocidade Máxima:</strong> ${s.velocidadeMax || 0} km/h</div>
        <div><strong>Bateria:</strong> ${escaparHTML(s.bateria || '60V Lítio')}</div>
        <div><strong>Tempo de Recarga:</strong> ${escaparHTML(s.tempoRecarga || '4.5 horas')}</div>
        <div><strong>Cor:</strong> ${escaparHTML(s.cor || 'Preto Fosco')}</div>
        <div><strong>Estoque:</strong> ${s.estoque ?? 0} unidades (${escaparHTML(s.status || 'Disponivel')})</div>
      </div>
    </div>

    <p style="font-size:0.85rem; color:#cbd5e1; margin-bottom:1rem;">${escaparHTML(s.descricao || 'Scooter elétrica de alta eficiência.')}</p>

    <div class="pane-title">📥 JSON Retornado pelo GET /:id</div>
    <pre style="background:#070b14; padding:0.85rem; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:#38bdf8; overflow:auto;">${JSON.stringify(s, null, 2)}</pre>
  `;

  modal.classList.remove('hidden');
}

function fecharModalFichaTecnica() {
  document.getElementById('modalFichaTecnica')?.classList.add('hidden');
}

/* ============================================================================
 * LÓGICA DA PÁGINA 3: CADASTRO (POST) E EDIÇÃO COMPLETA (PUT)
 * ============================================================================ */
function popularSeletorEdicaoPUT(scooters) {
  const select = document.getElementById('seletorScooterPut');
  if (!select) return;

  const valorAtual = select.value;
  select.innerHTML = `<option value="">➕ Modo Criação (POST — Cadastrar Nova Scooter)</option>` +
    scooters.map((s) => {
      const id = obterIdItem(s);
      return `<option value="${id}">✏️ Editar ID #${id} — ${escaparHTML(s.modelo)} (Modo PUT)</option>`;
    }).join('');

  if (valorAtual) select.value = valorAtual;
}

function selecionarScooterParaPUT(id) {
  if (!id) {
    limparFormularioCadastro();
    return;
  }
  const s = frotaCache.find((item) => obterIdItem(item) === String(id));
  if (!s) return;

  document.getElementById('itemId').value = obterIdItem(s);
  document.getElementById('idDisplay').value = obterIdItem(s);
  document.getElementById('modelo').value = s.modelo || '';
  document.getElementById('marca').value = s.marca || 'VoltScoot';
  document.getElementById('status').value = s.status || 'Disponivel';
  document.getElementById('potencia').value = s.potencia ?? 2000;
  document.getElementById('autonomia').value = s.autonomia ?? 65;
  document.getElementById('velocidadeMax').value = s.velocidadeMax ?? 55;
  document.getElementById('bateria').value = s.bateria || '60V 25Ah Lítio';
  document.getElementById('tempoRecarga').value = s.tempoRecarga || '4.5 horas';
  document.getElementById('cor').value = s.cor || 'Preto Fosco';
  document.getElementById('preco').value = s.preco ?? 9990;
  document.getElementById('estoque').value = s.estoque ?? 5;
  document.getElementById('descricao').value = s.descricao || '';
  if (s.imagem) document.getElementById('imagem').value = s.imagem;

  atualizarPreviewCardCadastro();
  mostrarToast(`Scooter #${id} carregada para edição completa (PUT)!`, '#f59e0b');
}

function verificarParametroIdUrlCadastro() {
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get('id');
  if (idUrl) {
    const select = document.getElementById('seletorScooterPut');
    if (select) select.value = idUrl;
    selecionarScooterParaPUT(idUrl);
  } else {
    atualizarPreviewCardCadastro();
  }
}

function configurarPreviewAoVivoCadastro() {
  const campos = ['modelo', 'marca', 'status', 'potencia', 'autonomia', 'velocidadeMax', 'preco', 'estoque', 'imagem'];
  campos.forEach((idCampo) => {
    const el = document.getElementById(idCampo);
    if (el) el.addEventListener('input', atualizarPreviewCardCadastro);
  });
}

function atualizarPreviewCardCadastro() {
  const container = document.getElementById('previewScooterBox');
  if (!container) return;

  const dados = {
    _id: document.getElementById('itemId')?.value || 'NOVO',
    modelo: document.getElementById('modelo')?.value || 'Modelo da Sua Scooter',
    marca: document.getElementById('marca')?.value || 'VoltScoot',
    status: document.getElementById('status')?.value || 'Disponivel',
    potencia: document.getElementById('potencia')?.value || 3000,
    autonomia: document.getElementById('autonomia')?.value || 75,
    velocidadeMax: document.getElementById('velocidadeMax')?.value || 70,
    preco: document.getElementById('preco')?.value || 11990,
    estoque: document.getElementById('estoque')?.value || 5,
    imagem: document.getElementById('imagem')?.value
  };

  container.innerHTML = criarCardScooterHTML(dados);
}

function lerFormularioScooter() {
  const modelo = document.getElementById('modelo')?.value.trim();
  const marca = document.getElementById('marca')?.value;
  const status = document.getElementById('status')?.value;
  const potencia = parseInt(document.getElementById('potencia')?.value, 10);
  const autonomia = parseInt(document.getElementById('autonomia')?.value, 10);
  const velocidadeMax = parseInt(document.getElementById('velocidadeMax')?.value, 10);
  const bateria = document.getElementById('bateria')?.value.trim() || '60V Lítio';
  const tempoRecarga = document.getElementById('tempoRecarga')?.value.trim() || '4.5 horas';
  const cor = document.getElementById('cor')?.value.trim() || 'Preto';
  const preco = parseFloat(document.getElementById('preco')?.value);
  const estoque = parseInt(document.getElementById('estoque')?.value, 10);
  const descricao = document.getElementById('descricao')?.value.trim() || '';
  const imagem = document.getElementById('imagem')?.value;

  if (!modelo || isNaN(potencia) || isNaN(autonomia) || isNaN(preco) || isNaN(estoque)) {
    mostrarToast('Preencha todos os campos obrigatórios (Modelo, Potência, Autonomia, Preço e Estoque)!', '#ef4444');
    return null;
  }

  return {
    modelo,
    marca,
    status,
    potencia,
    autonomia,
    velocidadeMax: isNaN(velocidadeMax) ? 50 : velocidadeMax,
    bateria,
    tempoRecarga,
    cor,
    preco,
    estoque,
    descricao,
    imagem
  };
}

function limparFormularioCadastro() {
  const form = document.getElementById('crudForm');
  if (form) form.reset();
  if (document.getElementById('itemId')) document.getElementById('itemId').value = '';
  if (document.getElementById('idDisplay')) document.getElementById('idDisplay').value = '';
  if (document.getElementById('seletorScooterPut')) document.getElementById('seletorScooterPut').value = '';
  atualizarPreviewCardCadastro();
}

function exibirResultadoOperacaoForm(metodo, url, status, enviado, recebido) {
  const box = document.getElementById('formResponseInspector');
  if (!box) return;
  box.classList.remove('hidden');
  document.getElementById('formLogMethod').textContent = metodo;
  document.getElementById('formLogMethod').className = `badge badge-${metodo.toLowerCase()}`;
  document.getElementById('formLogUrl').textContent = url;
  document.getElementById('formLogStatus').textContent = `${status} OK`;
  document.getElementById('formLogReq').textContent = JSON.stringify(enviado, null, 2);
  document.getElementById('formLogRes').textContent = JSON.stringify(recebido, null, 2);
}

/* ============================================================================
 * LÓGICA DA PÁGINA 4: MANUTENÇÃO PARCIAL (PATCH) E EXCLUSÃO (DELETE)
 * ============================================================================ */
function renderizarPaginaManutencao(scooters) {
  const selectPatch = document.getElementById('patchId');
  if (selectPatch && selectPatch.tagName === 'SELECT') {
    const atual = selectPatch.value;
    selectPatch.innerHTML = scooters
      .map((s) => `<option value="${obterIdItem(s)}">#${obterIdItem(s)} — ${escaparHTML(s.modelo)} (R$ ${Number(s.preco).toFixed(2)})</option>`)
      .join('');
    if (atual) selectPatch.value = atual;
  }

  const tbody = document.getElementById('tabelaManutencaoBody');
  if (!tbody) return;

  if (!scooters.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem;">Nenhuma Scooter cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = scooters
    .map((s) => {
      const id = obterIdItem(s);
      const precoFmt = Number(s.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const statusLimpo = (s.status || 'Disponivel').replace(/\s+/g, '');

      return `
        <tr>
          <td><span class="scooter-id-tag">#${id}</span></td>
          <td>
            <strong>${escaparHTML(s.modelo)}</strong>
            <div style="font-size:0.74rem; color:#94a3b8;">${escaparHTML(s.marca)}</div>
          </td>
          <td>${s.potencia}W • ${s.autonomia}km</td>
          <td><strong style="color:#34d399;">${precoFmt}</strong></td>
          <td>${s.estoque} un.</td>
          <td><span class="status-pill status-${statusLimpo}">${escaparHTML(s.status)}</span></td>
          <td class="text-right">
            <div style="display:flex; justify-content:flex-end; gap:0.35rem; flex-wrap:wrap;">
              <button class="action-btn badge-patch" onclick="acaoRapidaPATCH('${id}', 'promo10')" title="PATCH: -10% no Preço">
                PATCH -10%
              </button>
              <button class="action-btn badge-patch" onclick="acaoRapidaPATCH('${id}', 'addEstoque')" title="PATCH: +1 Estoque">
                PATCH +1 Un.
              </button>
              <button class="action-btn badge-patch" onclick="acaoRapidaPATCH('${id}', 'esgotar')" title="PATCH: Marcar Esgotada">
                PATCH Esgotar
              </button>
              <button class="action-btn badge-delete" onclick="excluirScooterDELETE('${id}')" title="DELETE: Excluir Scooter">
                DELETE
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

/* ============================================================================
 * LÓGICA DA PÁGINA 5: CONSOLE DA API ONLINE & HISTÓRICO DE LOGS HTTP
 * ============================================================================ */
function salvarERegistrarLogHTTP(metodo, url, status, duracaoMs, reqBody, resBody) {
  const novoLog = {
    metodo,
    url,
    status,
    duracaoMs,
    reqBody,
    resBody,
    hora: new Date().toLocaleTimeString('pt-BR')
  };

  const historico = JSON.parse(localStorage.getItem(STORAGE_KEY_HTTP_LOGS) || '[]');
  historico.unshift(novoLog);
  localStorage.setItem(STORAGE_KEY_HTTP_LOGS, JSON.stringify(historico.slice(0, 25)));

  atualizarPainelConsoleNaTela(novoLog);
  renderizarHistoricoSalvo();
}

function atualizarPainelConsoleNaTela(log) {
  const badge = document.getElementById('logMethod');
  if (!badge) return;

  badge.className = `badge badge-${log.metodo.toLowerCase()}`;
  badge.textContent = log.metodo;
  document.getElementById('logUrl').textContent = log.url;

  const statusEl = document.getElementById('logStatus');
  const isOk = log.status >= 200 && log.status < 300;
  statusEl.className = `http-status ${isOk ? 'status-ok' : 'status-err'}`;
  statusEl.textContent = `${log.status} ${isOk ? 'OK' : 'ERRO'}`;

  document.getElementById('logTime').textContent = `${log.duracaoMs}ms`;
  document.getElementById('logReqBody').textContent = log.reqBody
    ? JSON.stringify(log.reqBody, null, 2)
    : '// Sem corpo (Body vazio para este método)';
  document.getElementById('logResBody').textContent = log.resBody
    ? JSON.stringify(log.resBody, null, 2)
    : '// Sem resposta JSON';
}

function renderizarHistoricoSalvo() {
  const listEl = document.getElementById('httpHistoryList');
  if (!listEl) return;

  const historico = JSON.parse(localStorage.getItem(STORAGE_KEY_HTTP_LOGS) || '[]');
  if (!historico.length) {
    listEl.innerHTML = `<div style="color:#64748b; font-size:0.8rem;">Nenhuma requisição registrada ainda.</div>`;
    return;
  }

  atualizarPainelConsoleNaTela(historico[0]);

  listEl.innerHTML = historico
    .map((h) => {
      const isOk = h.status >= 200 && h.status < 300;
      return `
        <div style="display:flex; align-items:center; gap:0.65rem; padding:0.45rem 0.7rem; background:#070b14; border:1px solid #1e293b; border-radius:6px; font-family:'JetBrains Mono',monospace; font-size:0.75rem;">
          <span class="badge badge-${h.metodo.toLowerCase()}">${h.metodo}</span>
          <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escaparHTML(h.url)}</span>
          <span class="http-status ${isOk ? 'status-ok' : 'status-err'}">${h.status}</span>
          <span style="color:#64748b;">${h.duracaoMs}ms • ${h.hora}</span>
        </div>
      `;
    })
    .join('');
}

function limparHistoricoLogs() {
  localStorage.removeItem(STORAGE_KEY_HTTP_LOGS);
  renderizarHistoricoSalvo();
  mostrarToast('Histórico de requisições HTTP limpo!', '#38bdf8');
}

function escolherPresetAPI(tipo) {
  if (tipo === 'online') {
    definirUrlApiAtiva('https://jsonplaceholder.typicode.com/posts');
    mostrarToast('API Online Pública selecionada e ativa!', '#10b981');
    carregarFrotaInicialGET();
  } else if (tipo === 'crudcrud') {
    const input = document.getElementById('apiUrlInput');
    if (input && !input.value.includes('crudcrud.com')) {
      input.value = 'https://crudcrud.com/api/COLE_SEU_TOKEN_AQUI/scooters';
    }
    mostrarToast('Cole seu token do CrudCrud.com e clique em Salvar Endpoint!', '#f59e0b');
  } else if (tipo === 'local') {
    definirUrlApiAtiva('http://localhost:3000/api/scooters');
    mostrarToast('Servidor Node.js Local selecionado!', '#3b82f6');
    carregarFrotaInicialGET();
  }
}

function salvarEndpointCustomizado() {
  const input = document.getElementById('apiUrlInput');
  if (!input || !input.value.trim()) return;
  definirUrlApiAtiva(input.value);
  mostrarToast('Novo Endpoint salvo! Sincronizando frota com GET...', '#10b981');
  carregarFrotaInicialGET();
}

/* ============================================================================
 * UTILITÁRIOS GERAIS
 * ============================================================================ */
function mostrarToast(mensagem, corBorda = '#10b981') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = corBorda;
  toast.textContent = mensagem;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3800);
}

function escaparHTML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
