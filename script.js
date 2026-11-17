const STORAGE_KEY_SCOOTERS = 'voltscoot_erp_scooters_v4';
const STORAGE_KEY_PEDIDOS = 'voltscoot_erp_pedidos_v4';
const STORAGE_KEY_CART = 'voltscoot_erp_cart_v4';
const STORAGE_KEY_API_URL = 'voltscoot_erp_api_url_v4';
const STORAGE_KEY_LOGS = 'voltscoot_erp_logs_v4';

const DEFAULT_ONLINE_API = 'https://jsonplaceholder.typicode.com/posts';

let frotaCache = [];
let comparadorIds = [];

const SCOOTERS_INICIAIS = [
  {
    _id: '101',
    sku: 'VS-X1P-3000',
    modelo: 'VoltScoot X1 Pro Dual',
    marca: 'VoltScoot',
    categoria: 'Sport',
    potencia: 3000,
    torque: 145,
    voltagem: 60,
    amperagem: 30,
    autonomia: 85,
    velocidadeMax: 75,
    tempoRecarga: 4.5,
    peso: 68,
    cargaMax: 180,
    freios: 'Disco Hidráulico CBS Duplo',
    pneus: '12" Tubeless Sem Câmara',
    protecaoIp: 'IP65',
    cor: 'Preto Fosco / Verde',
    garantia: '24 meses',
    custo: 8200.00,
    preco: 12490.00,
    estoque: 8,
    status: 'Disponivel',
    imagem: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '102',
    sku: 'SG-MAX-G2',
    modelo: 'Ninebot Max G2 Pro',
    marca: 'Segway Ninebot',
    categoria: 'Urbana',
    potencia: 1000,
    torque: 55,
    voltagem: 36,
    amperagem: 15.3,
    autonomia: 70,
    velocidadeMax: 35,
    tempoRecarga: 5.0,
    peso: 24,
    cargaMax: 120,
    freios: 'Tambor Dianteiro + E-ABS',
    pneus: '10" Autorregenerativo Gel',
    protecaoIp: 'IPX5',
    cor: 'Cinza Grafite',
    garantia: '12 meses',
    custo: 3900.00,
    preco: 5890.00,
    estoque: 14,
    status: 'Promocao',
    imagem: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '103',
    sku: 'WT-THU-5000',
    modelo: 'ThunderMax AWD 5000W',
    marca: 'Watts Mobilidade',
    categoria: 'Performance',
    potencia: 5000,
    torque: 210,
    voltagem: 72,
    amperagem: 45,
    autonomia: 120,
    velocidadeMax: 95,
    tempoRecarga: 6.0,
    peso: 84,
    cargaMax: 200,
    freios: 'Hidráulico ABS 4 Pistões',
    pneus: '13" Pirelli Urbano',
    protecaoIp: 'IP67',
    cor: 'Vermelho Metálico',
    garantia: '24 meses',
    custo: 13400.00,
    preco: 18990.00,
    estoque: 3,
    status: 'Lancamento',
    imagem: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '104',
    sku: 'MV-CHP-2000',
    modelo: 'Chopper Cruiser 2000W',
    marca: 'Muuv Chopper',
    categoria: 'Chopper',
    potencia: 2000,
    torque: 115,
    voltagem: 60,
    amperagem: 25,
    autonomia: 65,
    velocidadeMax: 60,
    tempoRecarga: 4.0,
    peso: 72,
    cargaMax: 180,
    freios: 'Disco Hidráulico Ventilado',
    pneus: '18x9.5" Fat Tire',
    protecaoIp: 'IP54',
    cor: 'Azul Noturno',
    garantia: '18 meses',
    custo: 6500.00,
    preco: 9790.00,
    estoque: 5,
    status: 'Disponivel',
    imagem: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '105',
    sku: 'XM-4U-940',
    modelo: 'Xiaomi Scooter 4 Ultra',
    marca: 'Xiaomi Mi Electric',
    categoria: 'Urbana',
    potencia: 940,
    torque: 48,
    voltagem: 48,
    amperagem: 12.5,
    autonomia: 70,
    velocidadeMax: 25,
    tempoRecarga: 4.0,
    peso: 24.5,
    cargaMax: 120,
    freios: 'E-ABS + Disco Traseiro',
    pneus: '10" Xiaomi DuraGel',
    protecaoIp: 'IP55',
    cor: 'Prata Titânio',
    garantia: '12 meses',
    custo: 3100.00,
    preco: 4990.00,
    estoque: 11,
    status: 'Disponivel',
    imagem: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '106',
    sku: 'VS-CRG-2500',
    modelo: 'VoltScoot Cargo Fleet 2500W',
    marca: 'VoltScoot',
    categoria: 'Cargo',
    potencia: 2500,
    torque: 138,
    voltagem: 60,
    amperagem: 40,
    autonomia: 105,
    velocidadeMax: 65,
    tempoRecarga: 5.0,
    peso: 76,
    cargaMax: 230,
    freios: 'Hidráulico Duplo Reforçado',
    pneus: '12" Carga Pesada',
    protecaoIp: 'IP66',
    cor: 'Preto / Amarelo Frota',
    garantia: '24 meses',
    custo: 8900.00,
    preco: 13290.00,
    estoque: 4,
    status: 'Promocao',
    imagem: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
  }
];

const PEDIDOS_INICIAIS = [
  {
    id: 'PED-9041',
    cliente: 'Henrique Vasconcelos',
    documento: '084.***.***-12',
    modelo: 'VoltScoot X1 Pro Dual',
    pagamento: 'Financiamento 24x',
    valorTotal: 12490.00,
    status: 'Aprovado',
    data: '16/11/2026'
  },
  {
    id: 'PED-9042',
    cliente: 'Logística Express Ltda',
    documento: '14.892.***/0001-90',
    modelo: 'VoltScoot Cargo Fleet 2500W (2x)',
    pagamento: 'PIX Corporativo (-5%)',
    valorTotal: 25251.00,
    status: 'Pendente',
    data: '16/11/2026'
  }
];

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
  atualizarStatusTopo();
}

function atualizarStatusTopo() {
  const url = obterUrlApiAtiva();
  const el = document.getElementById('apiTopStatusText');
  if (el) {
    if (url.includes('crudcrud.com')) el.textContent = 'CRUDCRUD CLOUD';
    else if (url.includes('jsonplaceholder')) el.textContent = 'ONLINE REST API';
    else if (url.includes('localhost')) el.textContent = 'LOCAL NODE API';
    else el.textContent = 'CUSTOM REST API';
  }
  atualizarBadgeCarrinho();
}

function obterIdItem(item) {
  return String(item._id || item.id);
}

window.addEventListener('DOMContentLoaded', async () => {
  atualizarStatusTopo();
  const inputApi = document.getElementById('apiUrlInput');
  if (inputApi) inputApi.value = obterUrlApiAtiva();

  await carregarFrotaInicialGET();

  if (document.getElementById('finValorScooter')) {
    calcularSimulacaoFinanciamento();
  }
  if (document.getElementById('crudForm')) {
    configurarPreviewAoVivoCadastro();
    verificarParametroIdUrlCadastro();
  }
  if (document.getElementById('tabelaPedidosBody')) {
    renderizarTabelaPedidos();
  }
  if (document.getElementById('httpHistoryList')) {
    renderizarHistoricoSalvo();
  }
});

/* ==========================================================================
   OPERAÇÕES CRUD (GET, POST, PUT, PATCH, DELETE)
   ========================================================================== */
async function carregarFrotaInicialGET() {
  const url = obterUrlApiAtiva();
  try {
    const res = await realizarRequisicaoHTTP('GET', url);
    if (Array.isArray(res.data)) {
      frotaCache = res.data;
      atualizarComponentesDaPagina(frotaCache);
    }
  } catch (erro) {
    mostrarToast(`Falha GET: ${erro.message}`, '#ef4444');
  }
}

async function inspecionarScooterGETPorId(id) {
  if (!id) return;
  const url = `${obterUrlApiAtiva()}/${id}`;
  try {
    const res = await realizarRequisicaoHTTP('GET', url);
    if (res.ok && res.data) {
      abrirModalFichaTecnica(res.data, url);
    } else {
      mostrarToast(`Registro #${id} não localizado (404)`, '#ef4444');
    }
  } catch (erro) {
    mostrarToast(`Falha GET /:id: ${erro.message}`, '#ef4444');
  }
}

async function criarScooterPOST() {
  const dados = lerFormularioScooter();
  if (!dados) return;

  const url = obterUrlApiAtiva();
  try {
    const res = await realizarRequisicaoHTTP('POST', url, dados);
    if (res.ok) {
      mostrarToast(`POST 201: ${dados.modelo} registrada`, '#10b981');
      exibirResultadoOperacaoForm('POST', url, res.status, dados, res.data);
      limparFormularioCadastro();
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Falha POST: ${erro.message}`, '#ef4444');
  }
}

async function atualizarScooterPUT() {
  const id = document.getElementById('itemId')?.value.trim();
  if (!id) {
    mostrarToast('Selecione uma unidade existente no seletor superior para executar PUT', '#f59e0b');
    return;
  }

  const dadosCompletos = lerFormularioScooter();
  if (!dadosCompletos) return;

  const url = `${obterUrlApiAtiva()}/${id}`;
  try {
    const res = await realizarRequisicaoHTTP('PUT', url, dadosCompletos);
    if (res.ok) {
      mostrarToast(`PUT 200: Unidade #${id} substituída integralmente`, '#f59e0b');
      exibirResultadoOperacaoForm('PUT', url, res.status, dadosCompletos, res.data);
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Falha PUT: ${erro.message}`, '#ef4444');
  }
}

async function executarPatchFormulario() {
  const id = document.getElementById('patchId')?.value.trim();
  const campo = document.getElementById('patchCampo')?.value;
  let valor = document.getElementById('patchValor')?.value.trim();

  if (!id || valor === '') {
    mostrarToast('Preencha o ID e o valor para enviar o PATCH', '#a855f7');
    return;
  }

  if (['preco', 'custo', 'tempoRecarga', 'amperagem'].includes(campo)) valor = parseFloat(valor);
  if (['estoque', 'potencia', 'autonomia', 'velocidadeMax', 'torque', 'voltagem', 'peso', 'cargaMax'].includes(campo)) {
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
      mostrarToast(`PATCH /${id} [${chaves}] atualizado`, '#a855f7');
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Falha PATCH: ${erro.message}`, '#ef4444');
  }
}

async function patchInlineTabela(id, campo, valorBruto) {
  let valor = valorBruto;
  if (campo === 'preco' || campo === 'custo') valor = parseFloat(valorBruto);
  if (campo === 'estoque' || campo === 'potencia' || campo === 'autonomia') valor = parseInt(valorBruto, 10);
  await enviarRequisicaoPATCH(id, { [campo]: valor });
}

async function acaoRapidaPATCH(id, tipo) {
  const s = frotaCache.find((item) => obterIdItem(item) === String(id));
  if (!s) return;

  let payload = {};
  if (tipo === 'promo10') {
    payload = { preco: Number((Number(s.preco) * 0.9).toFixed(2)), status: 'Promocao' };
  } else if (tipo === 'addEstoque') {
    payload = { estoque: Number(s.estoque || 0) + 1, status: 'Disponivel' };
  } else if (tipo === 'esgotar') {
    payload = { estoque: 0, status: 'Esgotada' };
  }
  await enviarRequisicaoPATCH(id, payload);
}

async function excluirScooterDELETE(id) {
  if (!id) return;
  const url = `${obterUrlApiAtiva()}/${id}`;
  try {
    const res = await realizarRequisicaoHTTP('DELETE', url);
    if (res.ok) {
      mostrarToast(`DELETE /${id}: Unidade removida`, '#ef4444');
      await carregarFrotaInicialGET();
    }
  } catch (erro) {
    mostrarToast(`Falha DELETE: ${erro.message}`, '#ef4444');
  }
}

/* ==========================================================================
   MOTOR DE REDE HTTP (API ONLINE + CRUDCRUD + LOCAL)
   ========================================================================== */
async function realizarRequisicaoHTTP(metodo, url, bodyObj = null) {
  const inicio = performance.now();

  if (url.includes('COLE_SEU_TOKEN_AQUI')) {
    throw new Error('Informe seu endpoint válido do crudcrud.com');
  }

  let bodyLimpo = bodyObj;
  if (bodyObj && (metodo === 'PUT' || metodo === 'PATCH')) {
    const copia = { ...bodyObj };
    delete copia._id;
    delete copia.id;
    bodyLimpo = copia;
  }

  if (url.includes('jsonplaceholder.typicode.com')) {
    return await executarChamadaCloudPublica(metodo, url, bodyLimpo, inicio);
  }

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
      try { dados = JSON.parse(texto); } catch { dados = { raw: texto }; }
    } else {
      dados = { status: response.status, method: metodo, ok: true };
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
  const logData = { method: 'PATCH', updatedFields: camposParciais, record: mesclado };
  salvarERegistrarLogHTTP('PATCH', urlItem, resPut.status, duracao, camposParciais, logData);
  return { ok: resPut.ok, status: resPut.status, data: logData };
}

/* ==========================================================================
   PERSISTÊNCIA & REPOSITÓRIO DE FROTA
   ========================================================================== */
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

  if (metodo === 'GET' && ehRaiz) return { ok: true, status: 200, data: db };
  if (metodo === 'GET' && !ehRaiz) {
    const item = db.find((s) => obterIdItem(s) === String(ultimo));
    if (!item) return { ok: false, status: 404, data: { error: 'Not Found' } };
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
    if (idx === -1) return { ok: false, status: 404, data: { error: 'Not Found' } };
    db[idx] = { _id: String(ultimo), ...body };
    salvarFrota(db);
    return { ok: true, status: 200, data: db[idx] };
  }
  if (metodo === 'PATCH' && !ehRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { error: 'Not Found' } };
    db[idx] = { ...db[idx], ...body };
    salvarFrota(db);
    return { ok: true, status: 200, data: db[idx] };
  }
  if (metodo === 'DELETE' && !ehRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { error: 'Not Found' } };
    const removida = db.splice(idx, 1)[0];
    salvarFrota(db);
    return { ok: true, status: 200, data: { deleted: true, id: ultimo, record: removida } };
  }
  return { ok: false, status: 400, data: { error: 'Bad Request' } };
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
  mostrarToast('Base de dados sincronizada (6 modelos)', '#00e599');
}

/* ==========================================================================
   RENDERIZAÇÃO DE COMPONENTES POR PÁGINA
   ========================================================================== */
function atualizarComponentesDaPagina(scooters) {
  // KPIs Financeiros e de Engenharia
  const elModelos = document.getElementById('statTotalModelos');
  if (elModelos) {
    elModelos.textContent = scooters.length;
    const totalUnidades = scooters.reduce((a, s) => a + Number(s.estoque || 0), 0);
    const valorPatrimonio = scooters.reduce((a, s) => a + Number(s.preco || 0) * Number(s.estoque || 0), 0);
    const lucroPotencial = scooters.reduce((a, s) => a + (Number(s.preco || 0) - Number(s.custo || Number(s.preco) * 0.68)) * Number(s.estoque || 0), 0);

    if (document.getElementById('statTotalEstoque')) {
      document.getElementById('statTotalEstoque').textContent = `${totalUnidades} un.`;
    }
    if (document.getElementById('statValorEstoque')) {
      document.getElementById('statValorEstoque').textContent = valorPatrimonio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    }
    if (document.getElementById('statMargemTotal')) {
      document.getElementById('statMargemTotal').textContent = lucroPotencial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    }
  }

  if (document.getElementById('homeDestaquesGrid')) {
    renderizarGridScooters(scooters.slice(0, 3), 'homeDestaquesGrid');
  }
  if (document.getElementById('catalogoScootersGrid')) {
    aplicarFiltrosCatalogo();
    renderizarComparador();
  }
  if (document.getElementById('seletorScooterPut')) {
    popularSeletorEdicaoPUT(scooters);
  }
  if (document.getElementById('tabelaManutencaoBody')) {
    renderizarPaginaManutencao(scooters);
  }
}

function criarCardScooterHTML(s) {
  const id = obterIdItem(s);
  const precoNum = Number(s.preco || 0);
  const precoFmt = precoNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const parcelaFmt = (precoNum / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const statusLimpo = (s.status || 'Disponivel').replace(/\s+/g, '');
  const imgPadrao = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80';

  const pctPotencia = Math.min(100, Math.round((Number(s.potencia || 1000) / 5000) * 100));
  const pctAutonomia = Math.min(100, Math.round((Number(s.autonomia || 50) / 120) * 100));
  const noComparador = comparadorIds.includes(id);

  return `
    <article class="unit-card">
      <div class="unit-media">
        <img src="${escaparHTML(s.imagem || imgPadrao)}" alt="${escaparHTML(s.modelo)}" loading="lazy" />
        <div class="unit-badges-top">
          <span class="sku-tag">${escaparHTML(s.sku || `ID-${id}`)}</span>
          <span class="badge-status st-${statusLimpo}">${escaparHTML(s.status || 'Disponivel')}</span>
        </div>
      </div>

      <div class="unit-content">
        <div class="unit-meta-line">
          <span>${escaparHTML(s.marca || 'VoltScoot')}</span>
          <span>${escaparHTML(s.categoria || 'Urbana')} • ${escaparHTML(s.protecaoIp || 'IP65')}</span>
        </div>
        <h3 class="unit-name">${escaparHTML(s.modelo)}</h3>

        <div class="unit-telemetry">
          <div class="tel-cell">
            <span>Motor</span>
            <strong>${s.potencia || 1000}W</strong>
          </div>
          <div class="tel-cell">
            <span>Autonomia</span>
            <strong>${s.autonomia || 50}km</strong>
          </div>
          <div class="tel-cell">
            <span>Vel. Máx</span>
            <strong>${s.velocidadeMax || 45}km/h</strong>
          </div>
          <div class="tel-cell">
            <span>Bateria</span>
            <strong>${s.voltagem || 60}V ${s.amperagem || 25}Ah</strong>
          </div>
        </div>

        <div class="unit-bars">
          <div class="bar-row">
            <span class="bar-label">Potência</span>
            <div class="bar-track"><div class="bar-fill" style="width:${pctPotencia}%"></div></div>
          </div>
          <div class="bar-row">
            <span class="bar-label">Autonomia</span>
            <div class="bar-track"><div class="bar-fill" style="width:${pctAutonomia}%"></div></div>
          </div>
        </div>

        <div class="unit-pricing">
          <div>
            <div class="price-main">${precoFmt}</div>
            <div class="price-installments">12x de ${parcelaFmt} s/ juros</div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.72rem; color:var(--text-secondary);">${s.estoque ?? 0} un.</span>
            ${document.getElementById('comparadorPanel') ? `
              <div>
                <button type="button" class="btn btn-outline btn-xs" onclick="alternarComparador('${id}')">
                  ${noComparador ? '✓ Comparando' : '+ Comparar'}
                </button>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="unit-footer-actions">
          <button class="btn btn-brand btn-xs" onclick="adicionarAoCarrinho('${id}')">Comprar</button>
          <button class="btn btn-dark btn-xs m-get" onclick="inspecionarScooterGETPorId('${id}')">GET</button>
          <a class="btn btn-dark btn-xs m-put" href="cadastro.html?id=${encodeURIComponent(id)}">PUT</a>
          <button class="btn btn-dark btn-xs m-patch" onclick="acaoRapidaPATCH('${id}', 'promo10')">PATCH</button>
          <button class="btn btn-dark btn-xs m-delete" onclick="excluirScooterDELETE('${id}')">DEL</button>
        </div>
      </div>
    </article>
  `;
}

function renderizarGridScooters(lista, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!lista.length) {
    container.innerHTML = `<div class="panel" style="grid-column:1/-1; text-align:center; color:var(--text-muted);">Nenhum modelo corresponde aos critérios selecionados.</div>`;
    return;
  }
  container.innerHTML = lista.map(criarCardScooterHTML).join('');
}

/* ==========================================================================
   COMPARADOR TÉCNICO LADO A LADO (CATALOGO.HTML)
   ========================================================================== */
function alternarComparador(id) {
  const idx = comparadorIds.indexOf(String(id));
  if (idx >= 0) {
    comparadorIds.splice(idx, 1);
  } else {
    if (comparadorIds.length >= 3) {
      mostrarToast('Limite de 3 modelos no comparador simultâneo', '#f59e0b');
      return;
    }
    comparadorIds.push(String(id));
  }
  aplicarFiltrosCatalogo();
  renderizarComparador();
}

function renderizarComparador() {
  const panel = document.getElementById('comparadorPanel');
  const body = document.getElementById('comparadorBody');
  if (!panel || !body) return;

  if (!comparadorIds.length) {
    panel.style.display = 'none';
    return;
  }
  panel.style.display = 'block';

  const selecionadas = comparadorIds
    .map((id) => frotaCache.find((s) => obterIdItem(s) === id))
    .filter(Boolean);

  body.innerHTML = `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Especificação</th>
            ${selecionadas.map((s) => `<th>${escaparHTML(s.modelo)} <button class="btn btn-outline btn-xs" onclick="alternarComparador('${obterIdItem(s)}')">✕</button></th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr><td>SKU / Marca</td>${selecionadas.map((s) => `<td>${escaparHTML(s.sku || '-')} • ${escaparHTML(s.marca)}</td>`).join('')}</tr>
          <tr><td>Potência / Torque</td>${selecionadas.map((s) => `<td><strong>${s.potencia}W</strong> (${s.torque || 110} Nm)</td>`).join('')}</tr>
          <tr><td>Bateria</td>${selecionadas.map((s) => `<td>${s.voltagem || 60}V ${s.amperagem || 25}Ah (${s.tempoRecarga || 4.5}h)</td>`).join('')}</tr>
          <tr><td>Autonomia / Vel. Máx</td>${selecionadas.map((s) => `<td>${s.autonomia} km • ${s.velocidadeMax} km/h</td>`).join('')}</tr>
          <tr><td>Peso / Carga Máxima</td>${selecionadas.map((s) => `<td>${s.peso || 60} kg / Suporta ${s.cargaMax || 160} kg</td>`).join('')}</tr>
          <tr><td>Freios & Pneus</td>${selecionadas.map((s) => `<td>${escaparHTML(s.freios || 'Disco')} • ${escaparHTML(s.pneus || '12"')}</td>`).join('')}</tr>
          <tr><td>Preço à Vista</td>${selecionadas.map((s) => `<td style="color:var(--brand); font-weight:800;">${Number(s.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`).join('')}</tr>
        </tbody>
      </table>
    </div>
  `;
}

/* ==========================================================================
   SIMULADOR DE FINANCIAMENTO & CARRINHO DE COMPRAS / PEDIDOS (POST / PATCH / DELETE)
   ========================================================================== */
function calcularSimulacaoFinanciamento() {
  const valorBem = Number(document.getElementById('finValorScooter')?.value || 12490);
  const entrada = Number(document.getElementById('finEntrada')?.value || 3000);
  const parcelas = Number(document.getElementById('finParcelas')?.value || 24);

  const saldo = Math.max(0, valorBem - entrada);
  const taxaMensal = 0.0149; // 1.49% a.m.
  const valorParcela = saldo > 0
    ? (saldo * (taxaMensal * Math.pow(1 + taxaMensal, parcelas))) / (Math.pow(1 + taxaMensal, parcelas) - 1)
    : 0;
  const valorPix = valorBem * 0.95;

  const elParcela = document.getElementById('resValorParcela');
  const elPix = document.getElementById('resValorPix');
  if (elParcela) elParcela.textContent = `${parcelas}x de ${valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  if (elPix) elPix.textContent = valorPix.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function obterCarrinho() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_CART) || '[]');
}

function atualizarBadgeCarrinho() {
  const cart = obterCarrinho();
  const totalQtd = cart.reduce((a, i) => a + i.qtd, 0);
  document.querySelectorAll('.cart-count').forEach((el) => (el.textContent = totalQtd));
}

function adicionarAoCarrinho(id) {
  const s = frotaCache.find((item) => obterIdItem(item) === String(id));
  if (!s) return;

  const cart = obterCarrinho();
  const existente = cart.find((i) => i.id === String(id));
  if (existente) existente.qtd += 1;
  else cart.push({ id: String(id), modelo: s.modelo, preco: Number(s.preco), qtd: 1 });

  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  atualizarBadgeCarrinho();
  abrirModalCarrinho();
}

function removerItemCarrinho(id) {
  const cart = obterCarrinho().filter((i) => i.id !== String(id));
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  atualizarBadgeCarrinho();
  abrirModalCarrinho();
}

function abrirModalCarrinho() {
  let modal = document.getElementById('modalCarrinhoGlobal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalCarrinhoGlobal';
    modal.className = 'modal-backdrop';
    modal.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };
    document.body.appendChild(modal);
  }

  const cart = obterCarrinho();
  const total = cart.reduce((a, i) => a + i.preco * i.qtd, 0);

  modal.innerHTML = `
    <div class="modal-card">
      <div class="panel-head">
        <span class="panel-title">Pedido / Checkout Comercial</span>
        <button class="btn btn-outline btn-sm" onclick="document.getElementById('modalCarrinhoGlobal').classList.add('hidden')">✕ Fechar</button>
      </div>
      ${!cart.length ? `<p style="color:var(--text-muted); padding:1.5rem 0;">Nenhuma scooter selecionada no pedido atual.</p>` : `
        <div class="table-wrap" style="margin-bottom:1.1rem;">
          <table class="data-table">
            <thead><tr><th>Modelo</th><th>Qtd</th><th>Unitário</th><th>Subtotal</th><th></th></tr></thead>
            <tbody>
              ${cart.map((i) => `
                <tr>
                  <td><strong>${escaparHTML(i.modelo)}</strong></td>
                  <td>${i.qtd}</td>
                  <td>${i.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td>${(i.preco * i.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td style="text-align:right;"><button class="btn btn-outline btn-xs" onclick="removerItemCarrinho('${i.id}')">Remover</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="grid-3" style="margin-bottom:1rem;">
          <div class="field"><label>Cliente / Razão Social</label><input type="text" id="chkCliente" value="Cliente Comercial" /></div>
          <div class="field"><label>CPF / CNPJ</label><input type="text" id="chkDoc" value="112.490.880-00" /></div>
          <div class="field">
            <label>Modalidade de Pagamento</label>
            <select id="chkPag">
              <option value="PIX (-5% Desconto)">PIX (-5% Desconto)</option>
              <option value="Cartão 12x Sem Juros">Cartão 12x Sem Juros</option>
              <option value="Financiamento CDC 24x">Financiamento CDC 24x</option>
              <option value="Faturamento Frota B2B">Faturamento Frota B2B</option>
            </select>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.8rem; border-top:1px solid var(--border);">
          <div>
            <small style="color:var(--text-muted); display:block;">TOTAL DO PEDIDO</small>
            <strong style="font-size:1.35rem; color:var(--brand);">${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
          </div>
          <button class="btn btn-brand" onclick="finalizarPedidoPOST()">Emitir Pedido (POST)</button>
        </div>
      `}
    </div>
  `;
  modal.classList.remove('hidden');
}

async function finalizarPedidoPOST() {
  const cart = obterCarrinho();
  if (!cart.length) return;

  const cliente = document.getElementById('chkCliente')?.value.trim() || 'Cliente';
  const documento = document.getElementById('chkDoc')?.value.trim() || '-';
  const pagamento = document.getElementById('chkPag')?.value || 'PIX';
  const valorTotal = cart.reduce((a, i) => a + i.preco * i.qtd, 0);
  const resumoModelos = cart.map((i) => `${i.modelo} (${i.qtd}x)`).join(', ');

  const novoPedido = {
    id: 'PED-' + Math.floor(1000 + Math.random() * 9000),
    cliente,
    documento,
    modelo: resumoModelos,
    pagamento,
    valorTotal,
    status: 'Aprovado',
    data: new Date().toLocaleDateString('pt-BR')
  };

  await realizarRequisicaoHTTP('POST', obterUrlApiAtiva(), novoPedido);

  const pedidos = obterPedidosSalvos();
  pedidos.unshift(novoPedido);
  localStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(pedidos));
  localStorage.removeItem(STORAGE_KEY_CART);

  atualizarBadgeCarrinho();
  document.getElementById('modalCarrinhoGlobal')?.classList.add('hidden');
  if (document.getElementById('tabelaPedidosBody')) renderizarTabelaPedidos();
  mostrarToast(`Pedido ${novoPedido.id} registrado via POST`, '#00e599');
}

function obterPedidosSalvos() {
  const salvo = localStorage.getItem(STORAGE_KEY_PEDIDOS);
  if (!salvo) {
    localStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(PEDIDOS_INICIAIS));
    return [...PEDIDOS_INICIAIS];
  }
  return JSON.parse(salvo);
}

function renderizarTabelaPedidos() {
  const tbody = document.getElementById('tabelaPedidosBody');
  if (!tbody) return;
  const pedidos = obterPedidosSalvos();

  tbody.innerHTML = pedidos.map((p) => `
    <tr>
      <td><span class="sku-tag">${escaparHTML(p.id)}</span></td>
      <td><strong>${escaparHTML(p.cliente)}</strong><div style="font-size:0.7rem; color:var(--text-muted);">${escaparHTML(p.documento)}</div></td>
      <td>${escaparHTML(p.modelo)}</td>
      <td>${escaparHTML(p.pagamento)}</td>
      <td><strong>${Number(p.valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></td>
      <td><span class="badge-status st-${p.status}">${escaparHTML(p.status)}</span></td>
      <td style="text-align:right;">
        <button class="btn btn-dark btn-xs m-patch" onclick="alterarStatusPedidoPATCH('${p.id}', 'Confirmado')">PATCH Aprovar</button>
        <button class="btn btn-dark btn-xs m-patch" onclick="alterarStatusPedidoPATCH('${p.id}', 'Cancelado')">PATCH Cancelar</button>
        <button class="btn btn-dark btn-xs m-delete" onclick="excluirPedidoDELETE('${p.id}')">DELETE</button>
      </td>
    </tr>
  `).join('');
}

async function alterarStatusPedidoPATCH(id, novoStatus) {
  await realizarRequisicaoHTTP('PATCH', `${obterUrlApiAtiva()}/1`, { id, status: novoStatus });
  const pedidos = obterPedidosSalvos();
  const idx = pedidos.findIndex((p) => p.id === id);
  if (idx >= 0) {
    pedidos[idx].status = novoStatus;
    localStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(pedidos));
    renderizarTabelaPedidos();
    mostrarToast(`PATCH Pedido ${id} -> ${novoStatus}`, '#a855f7');
  }
}

async function excluirPedidoDELETE(id) {
  await realizarRequisicaoHTTP('DELETE', `${obterUrlApiAtiva()}/1`);
  const pedidos = obterPedidosSalvos().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(pedidos));
  renderizarTabelaPedidos();
  mostrarToast(`DELETE Pedido ${id} removido`, '#ef4444');
}

/* ==========================================================================
   FILTROS AVANÇADOS E FICHA TÉCNICA (CATALOGO.HTML)
   ========================================================================== */
function aplicarFiltrosCatalogo() {
  const busca = (document.getElementById('filtroBusca')?.value || '').toLowerCase();
  const marca = document.getElementById('filtroMarca')?.value || 'TODAS';
  const cat = document.getElementById('filtroCategoria')?.value || 'TODAS';
  const status = document.getElementById('filtroStatus')?.value || 'TODOS';
  const ordem = document.getElementById('filtroOrdem')?.value || 'padrao';

  let filtradas = frotaCache.filter((s) => {
    const bateTexto =
      (s.modelo || '').toLowerCase().includes(busca) ||
      (s.sku || '').toLowerCase().includes(busca) ||
      (s.marca || '').toLowerCase().includes(busca);
    const bateMarca = marca === 'TODAS' || s.marca === marca;
    const bateCat = cat === 'TODAS' || s.categoria === cat;
    const bateStatus = status === 'TODOS' || s.status === status;
    return bateTexto && bateMarca && bateCat && bateStatus;
  });

  if (ordem === 'menorPreco') filtradas.sort((a, b) => Number(a.preco) - Number(b.preco));
  if (ordem === 'maiorPotencia') filtradas.sort((a, b) => Number(b.potencia) - Number(a.potencia));
  if (ordem === 'maiorAutonomia') filtradas.sort((a, b) => Number(b.autonomia) - Number(a.autonomia));

  const contador = document.getElementById('catalogoTotalCount');
  if (contador) contador.textContent = `${filtradas.length} unidades`;

  renderizarGridScooters(filtradas, 'catalogoScootersGrid');
}

function abrirModalFichaTecnica(s, urlRequisitada) {
  const modal = document.getElementById('modalFichaTecnica');
  const conteudo = document.getElementById('modalFichaConteudo');
  if (!modal || !conteudo) return;

  const id = obterIdItem(s);
  const precoFmt = Number(s.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  conteudo.innerHTML = `
    <div class="panel-head">
      <div>
        <span class="method-tag m-get">GET ${escaparHTML(urlRequisitada)}</span>
        <h2 style="margin-top:0.4rem;">${escaparHTML(s.modelo)}</h2>
      </div>
      <button class="btn btn-outline btn-sm" onclick="fecharModalFichaTecnica()">✕ Fechar</button>
    </div>

    <div class="grid-2" style="margin-bottom:1.1rem;">
      <img src="${escaparHTML(s.imagem || '')}" alt="${escaparHTML(s.modelo)}" style="width:100%; height:220px; object-fit:cover; border-radius:10px;" />
      <div class="table-wrap">
        <table class="data-table">
          <tbody>
            <tr><td>SKU / ID</td><td><strong>${escaparHTML(s.sku || id)}</strong> (#${id})</td></tr>
            <tr><td>Motor / Torque</td><td>${s.potencia}W • ${s.torque || 120} Nm</td></tr>
            <tr><td>Bateria</td><td>${s.voltagem || 60}V ${s.amperagem || 30}Ah (${s.tempoRecarga || 4.5}h)</td></tr>
            <tr><td>Autonomia / Vel. Máx</td><td>${s.autonomia} km • ${s.velocidadeMax} km/h</td></tr>
            <tr><td>Freios / Pneus</td><td>${escaparHTML(s.freios || 'Disco Hidráulico')} • ${escaparHTML(s.pneus || '12"')}</td></tr>
            <tr><td>Peso / Carga Máx</td><td>${s.peso || 65} kg / ${s.cargaMax || 180} kg</td></tr>
            <tr><td>Preço Comercial</td><td style="color:var(--brand); font-weight:800;">${precoFmt}</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="net-pane-head">Payload JSON Retornado (GET /:id)</div>
    <pre style="background:var(--bg-input); padding:0.8rem; border-radius:8px; border:1px solid var(--border); font-family:'JetBrains Mono',monospace; font-size:0.74rem; color:#38bdf8; overflow:auto;">${JSON.stringify(s, null, 2)}</pre>
  `;
  modal.classList.remove('hidden');
}

function fecharModalFichaTecnica() {
  document.getElementById('modalFichaTecnica')?.classList.add('hidden');
}

/* ==========================================================================
   CADASTRO & EDIÇÃO COMPLETA (POST & PUT - CADASTRO.HTML)
   ========================================================================== */
function popularSeletorEdicaoPUT(scooters) {
  const select = document.getElementById('seletorScooterPut');
  if (!select) return;
  const valorAtual = select.value;
  select.innerHTML = `<option value="">[POST] Cadastrar Novo Modelo na Frota</option>` +
    scooters.map((s) => `<option value="${obterIdItem(s)}">[PUT] #${obterIdItem(s)} — ${escaparHTML(s.sku || '')} ${escaparHTML(s.modelo)}</option>`).join('');
  if (valorAtual) select.value = valorAtual;
}

function selecionarScooterParaPUT(id) {
  if (!id) {
    limparFormularioCadastro();
    return;
  }
  const s = frotaCache.find((item) => obterIdItem(item) === String(id));
  if (!s) return;

  const map = {
    itemId: obterIdItem(s),
    idDisplay: obterIdItem(s),
    sku: s.sku || `VS-${id}`,
    modelo: s.modelo || '',
    marca: s.marca || 'VoltScoot',
    categoria: s.categoria || 'Sport',
    status: s.status || 'Disponivel',
    potencia: s.potencia ?? 3000,
    torque: s.torque ?? 140,
    voltagem: s.voltagem ?? 60,
    amperagem: s.amperagem ?? 30,
    autonomia: s.autonomia ?? 75,
    velocidadeMax: s.velocidadeMax ?? 70,
    tempoRecarga: s.tempoRecarga ?? 4.5,
    peso: s.peso ?? 65,
    cargaMax: s.cargaMax ?? 180,
    freios: s.freios || 'Disco Hidráulico CBS',
    pneus: s.pneus || '12" Tubeless',
    protecaoIp: s.protecaoIp || 'IP65',
    cor: s.cor || 'Preto Fosco',
    garantia: s.garantia || '24 meses',
    custo: s.custo ?? 7900,
    preco: s.preco ?? 12490,
    estoque: s.estoque ?? 5,
    imagem: s.imagem || ''
  };

  Object.entries(map).forEach(([campo, val]) => {
    const el = document.getElementById(campo);
    if (el) el.value = val;
  });

  atualizarPreviewCardCadastro();
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
  document.querySelectorAll('#crudForm input, #crudForm select').forEach((el) => {
    el.addEventListener('input', atualizarPreviewCardCadastro);
  });
}

function lerFormularioScooter() {
  const modelo = document.getElementById('modelo')?.value.trim();
  const sku = document.getElementById('sku')?.value.trim() || 'VS-NEW';
  const marca = document.getElementById('marca')?.value || 'VoltScoot';
  const categoria = document.getElementById('categoria')?.value || 'Urbana';
  const status = document.getElementById('status')?.value || 'Disponivel';
  const potencia = parseInt(document.getElementById('potencia')?.value, 10);
  const torque = parseInt(document.getElementById('torque')?.value, 10) || 110;
  const voltagem = parseInt(document.getElementById('voltagem')?.value, 10) || 60;
  const amperagem = parseFloat(document.getElementById('amperagem')?.value) || 25;
  const autonomia = parseInt(document.getElementById('autonomia')?.value, 10);
  const velocidadeMax = parseInt(document.getElementById('velocidadeMax')?.value, 10) || 55;
  const tempoRecarga = parseFloat(document.getElementById('tempoRecarga')?.value) || 4.5;
  const peso = parseFloat(document.getElementById('peso')?.value) || 62;
  const cargaMax = parseInt(document.getElementById('cargaMax')?.value, 10) || 160;
  const freios = document.getElementById('freios')?.value.trim() || 'Disco Hidráulico';
  const pneus = document.getElementById('pneus')?.value.trim() || '12" Tubeless';
  const protecaoIp = document.getElementById('protecaoIp')?.value || 'IP65';
  const cor = document.getElementById('cor')?.value.trim() || 'Preto';
  const garantia = document.getElementById('garantia')?.value || '24 meses';
  const custo = parseFloat(document.getElementById('custo')?.value) || 6500;
  const preco = parseFloat(document.getElementById('preco')?.value);
  const estoque = parseInt(document.getElementById('estoque')?.value, 10);
  const imagem = document.getElementById('imagem')?.value;

  if (!modelo || isNaN(potencia) || isNaN(autonomia) || isNaN(preco) || isNaN(estoque)) {
    mostrarToast('Verifique os campos obrigatórios de engenharia e preço', '#ef4444');
    return null;
  }

  return {
    sku, modelo, marca, categoria, status, potencia, torque, voltagem, amperagem,
    autonomia, velocidadeMax, tempoRecarga, peso, cargaMax, freios, pneus,
    protecaoIp, cor, garantia, custo, preco, estoque, imagem
  };
}

function atualizarPreviewCardCadastro() {
  const container = document.getElementById('previewScooterBox');
  if (!container) return;
  const d = lerFormularioScooter() || {
    sku: 'VS-PRO',
    modelo: 'VoltScoot Série X',
    marca: 'VoltScoot',
    categoria: 'Sport',
    potencia: 3000,
    autonomia: 80,
    velocidadeMax: 70,
    voltagem: 60,
    amperagem: 30,
    preco: 12490,
    estoque: 5,
    status: 'Disponivel'
  };
  d._id = document.getElementById('itemId')?.value || 'NEW';
  container.innerHTML = criarCardScooterHTML(d);
}

function limparFormularioCadastro() {
  document.getElementById('crudForm')?.reset();
  if (document.getElementById('itemId')) document.getElementById('itemId').value = '';
  if (document.getElementById('idDisplay')) document.getElementById('idDisplay').value = '';
  if (document.getElementById('seletorScooterPut')) document.getElementById('seletorScooterPut').value = '';
  atualizarPreviewCardCadastro();
}

function exibirResultadoOperacaoForm(metodo, url, status, enviado, recebido) {
  const box = document.getElementById('formResponseInspector');
  if (!box) return;
  box.style.display = 'block';
  document.getElementById('formLogMethod').textContent = metodo;
  document.getElementById('formLogMethod').className = `method-tag m-${metodo.toLowerCase()}`;
  document.getElementById('formLogUrl').textContent = url;
  document.getElementById('formLogStatus').textContent = `${status} OK`;
  document.getElementById('formLogReq').textContent = JSON.stringify(enviado, null, 2);
  document.getElementById('formLogRes').textContent = JSON.stringify(recebido, null, 2);
}

/* ==========================================================================
   MANUTENÇÃO & TABELA INLINE (PATCH & DELETE - MANUTENCAO-PATCH.HTML)
   ========================================================================== */
function renderizarPaginaManutencao(scooters) {
  const selectPatch = document.getElementById('patchId');
  if (selectPatch && selectPatch.tagName === 'SELECT') {
    const atual = selectPatch.value;
    selectPatch.innerHTML = scooters
      .map((s) => `<option value="${obterIdItem(s)}">#${obterIdItem(s)} — ${escaparHTML(s.sku || '')} ${escaparHTML(s.modelo)}</option>`)
      .join('');
    if (atual) selectPatch.value = atual;
  }

  const tbody = document.getElementById('tabelaManutencaoBody');
  if (!tbody) return;

  tbody.innerHTML = scooters.map((s) => {
    const id = obterIdItem(s);
    const margem = Number(s.preco) > 0
      ? Math.round(((Number(s.preco) - Number(s.custo || Number(s.preco) * 0.68)) / Number(s.preco)) * 100)
      : 30;

    return `
      <tr>
        <td><span class="sku-tag">${escaparHTML(s.sku || `#${id}`)}</span></td>
        <td>
          <strong>${escaparHTML(s.modelo)}</strong>
          <div style="font-size:0.7rem; color:var(--text-muted);">${escaparHTML(s.marca)} • ${s.potencia}W • ${s.autonomia}km</div>
        </td>
        <td>
          <input type="number" class="inline-input" value="${Number(s.custo || 7000)}"
            onchange="patchInlineTabela('${id}', 'custo', this.value)" />
        </td>
        <td>
          <input type="number" class="inline-input" value="${Number(s.preco)}"
            onchange="patchInlineTabela('${id}', 'preco', this.value)" />
        </td>
        <td><span style="color:var(--brand); font-family:'JetBrains Mono',monospace; font-weight:700;">${margem}%</span></td>
        <td>
          <input type="number" class="inline-input" style="width:68px;" value="${Number(s.estoque)}"
            onchange="patchInlineTabela('${id}', 'estoque', this.value)" />
        </td>
        <td>
          <select class="inline-select" onchange="patchInlineTabela('${id}', 'status', this.value)">
            <option value="Disponivel" ${s.status === 'Disponivel' ? 'selected' : ''}>Disponivel</option>
            <option value="Promocao" ${s.status === 'Promocao' ? 'selected' : ''}>Promocao</option>
            <option value="Lancamento" ${s.status === 'Lancamento' ? 'selected' : ''}>Lancamento</option>
            <option value="Esgotada" ${s.status === 'Esgotada' ? 'selected' : ''}>Esgotada</option>
          </select>
        </td>
        <td style="text-align:right;">
          <button class="btn btn-dark btn-xs m-patch" onclick="acaoRapidaPATCH('${id}', 'promo10')">-10%</button>
          <button class="btn btn-dark btn-xs m-patch" onclick="acaoRapidaPATCH('${id}', 'addEstoque')">+1</button>
          <button class="btn btn-dark btn-xs m-delete" onclick="excluirScooterDELETE('${id}')">DEL</button>
        </td>
      </tr>
    `;
  }).join('');
}

/* ==========================================================================
   LOGS HTTP & CONFIGURAÇÃO DE API
   ========================================================================== */
function salvarERegistrarLogHTTP(metodo, url, status, duracaoMs, reqBody, resBody) {
  const novoLog = {
    metodo, url, status, duracaoMs, reqBody, resBody,
    hora: new Date().toLocaleTimeString('pt-BR')
  };
  const historico = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS) || '[]');
  historico.unshift(novoLog);
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(historico.slice(0, 30)));

  atualizarPainelConsoleNaTela(novoLog);
  renderizarHistoricoSalvo();
}

function atualizarPainelConsoleNaTela(log) {
  const badge = document.getElementById('logMethod');
  if (!badge) return;
  badge.className = `method-tag m-${log.metodo.toLowerCase()}`;
  badge.textContent = log.metodo;
  document.getElementById('logUrl').textContent = log.url;
  document.getElementById('logStatus').textContent = `${log.status}`;
  document.getElementById('logTime').textContent = `${log.duracaoMs}ms`;
  document.getElementById('logReqBody').textContent = log.reqBody ? JSON.stringify(log.reqBody, null, 2) : '// Sem payload';
  document.getElementById('logResBody').textContent = log.resBody ? JSON.stringify(log.resBody, null, 2) : '// Sem conteúdo';
}

function renderizarHistoricoSalvo() {
  const listEl = document.getElementById('httpHistoryList');
  if (!listEl) return;
  const historico = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS) || '[]');
  if (!historico.length) {
    listEl.innerHTML = `<div style="color:var(--text-muted); font-size:0.78rem;">Sem registros na sessão.</div>`;
    return;
  }
  atualizarPainelConsoleNaTela(historico[0]);
  listEl.innerHTML = historico.map((h) => `
    <div style="display:flex; align-items:center; gap:0.65rem; padding:0.42rem 0.7rem; background:var(--bg-input); border:1px solid var(--border); border-radius:6px; font-family:'JetBrains Mono',monospace; font-size:0.74rem;">
      <span class="method-tag m-${h.metodo.toLowerCase()}">${h.metodo}</span>
      <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escaparHTML(h.url)}</span>
      <span style="color:var(--brand);">${h.status}</span>
      <span style="color:var(--text-muted);">${h.duracaoMs}ms • ${h.hora}</span>
    </div>
  `).join('');
}

function limparHistoricoLogs() {
  localStorage.removeItem(STORAGE_KEY_LOGS);
  renderizarHistoricoSalvo();
}

function escolherPresetAPI(tipo) {
  if (tipo === 'online') {
    definirUrlApiAtiva('https://jsonplaceholder.typicode.com/posts');
    carregarFrotaInicialGET();
    mostrarToast('Endpoint Online Cloud ativo', '#00e599');
  } else if (tipo === 'crudcrud') {
    const input = document.getElementById('apiUrlInput');
    if (input && !input.value.includes('crudcrud.com')) {
      input.value = 'https://crudcrud.com/api/COLE_SEU_TOKEN_AQUI/scooters';
    }
    mostrarToast('Insira o token do CrudCrud.com e clique em Aplicar', '#f59e0b');
  } else if (tipo === 'local') {
    definirUrlApiAtiva('http://localhost:3000/api/scooters');
    carregarFrotaInicialGET();
    mostrarToast('Endpoint Local Node ativo', '#3b82f6');
  }
}

function salvarEndpointCustomizado() {
  const input = document.getElementById('apiUrlInput');
  if (!input || !input.value.trim()) return;
  definirUrlApiAtiva(input.value);
  carregarFrotaInicialGET();
  mostrarToast('Endpoint atualizado', '#00e599');
}

function mostrarToast(mensagem, corBorda = '#00e599') {
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
  setTimeout(() => toast.remove(), 3500);
}

function escaparHTML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
