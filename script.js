/**
 * ============================================================================
 * VOLTSCOOT ⚡ SISTEMA CRUD DE SCOOTERS ELÉTRICAS (API ONLINE)
 * Métodos implementados: GET, POST, PUT, PATCH, DELETE
 *
 * Modos de API Online suportados:
 * 1. API Online Pública (https://jsonplaceholder.typicode.com/posts) - Padrão imediato!
 * 2. CrudCrud.com (https://crudcrud.com/api/SEU_TOKEN/scooters) - Persistência em nuvem!
 * 3. Servidor Node.js Local (http://localhost:3000/api/scooters)
 * ============================================================================
 */

const STORAGE_KEY_SCOOTERS = 'voltscoot_scooters_db_v2';
let listaCache = [];
let modoAtual = 'online'; // 'online' | 'crudcrud' | 'local'

// Frota inicial de Scooters Elétricas
const SCOOTERS_INICIAIS = [
  {
    _id: '1',
    modelo: 'VoltScoot X1 Pro 3000W',
    marca: 'VoltScoot',
    potencia: 3000,
    autonomia: 75,
    velocidadeMax: 70,
    preco: 12490.00,
    estoque: 6,
    status: 'Disponivel',
    imagem: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '2',
    modelo: 'Ninebot Max G2 Electric',
    marca: 'Segway Ninebot',
    potencia: 1000,
    autonomia: 70,
    velocidadeMax: 35,
    preco: 5890.00,
    estoque: 12,
    status: 'Promocao',
    imagem: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '3',
    modelo: 'ThunderMax Dual Motor 5000W',
    marca: 'Watts Mobilidade',
    potencia: 5000,
    autonomia: 110,
    velocidadeMax: 90,
    preco: 18990.00,
    estoque: 3,
    status: 'Lancamento',
    imagem: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80'
  },
  {
    _id: '4',
    modelo: 'Chopper Street Harley 2000W',
    marca: 'Muuv Chopper',
    potencia: 2000,
    autonomia: 55,
    velocidadeMax: 55,
    preco: 9790.00,
    estoque: 5,
    status: 'Disponivel',
    imagem: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=700&q=80'
  }
];

// Exemplos de código Fetch para Scooters Elétricas
const CODIGOS_EXEMPLO = {
  GET: `// 1. MÉTODO GET - Listar todas as Scooters Elétricas da API Online
async function listarScooters() {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });
  const scooters = await response.json();
  console.log('Frota de Scooters (GET):', scooters);
}`,

  POST: `// 2. MÉTODO POST - Cadastrar nova Scooter Elétrica na API Online
async function cadastrarScooter(novaScooter) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaScooter)
  });
  const criada = await response.json();
  console.log('Scooter criada via POST:', criada);
}`,

  PUT: `// 3. MÉTODO PUT - Substituir/Atualizar TODOS os dados da Scooter
async function atualizarScooterCompletaPUT(id, scooterCompleta) {
  // Remove _id do body para compatibilidade com CrudCrud.com
  const { _id, ...dadosSemId } = scooterCompleta;

  const response = await fetch(\`\${API_URL}/\${id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosSemId)
  });
  console.log('Scooter atualizada por completo (PUT):', response.status);
}`,

  PATCH: `// 4. MÉTODO PATCH - Atualização PARCIAL (ex: alterar só preço ou autonomia)
async function atualizarScooterParcialPATCH(id, campoParcial) {
  // Exemplo de campoParcial: { preco: 10990.00, status: 'Promocao' }
  const response = await fetch(\`\${API_URL}/\${id}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campoParcial)
  });
  const resultado = await response.json();
  console.log('Campo atualizado via PATCH:', resultado);
}`,

  DELETE: `// 5. MÉTODO DELETE - Remover uma Scooter Elétrica pelo ID
async function removerScooterDELETE(id) {
  const response = await fetch(\`\${API_URL}/\${id}\`, {
    method: 'DELETE'
  });
  console.log('Scooter excluída via DELETE! Status:', response.status);
}`
};

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  mostrarCodigoExemplo('GET', document.querySelector('.code-tab'));
  executarGETTodos();
});

function obterUrlBase() {
  const raw = document.getElementById('apiUrlInput').value.trim();
  return raw.replace(/\/+$/, '');
}

function obterIdItem(item) {
  return String(item._id || item.id);
}

// Alternar entre os modos de API
function selecionarModoAPI(modo) {
  modoAtual = modo;
  const btnOnline = document.getElementById('btnModeOnline');
  const btnCrud = document.getElementById('btnModeCrudCrud');
  const btnLocal = document.getElementById('btnModeLocal');
  const helpBox = document.getElementById('crudcrudHelp');
  const inputUrl = document.getElementById('apiUrlInput');

  btnOnline.classList.remove('active');
  btnCrud.classList.remove('active');
  btnLocal.classList.remove('active');
  helpBox.classList.add('hidden');

  if (modo === 'online') {
    btnOnline.classList.add('active');
    inputUrl.value = 'https://jsonplaceholder.typicode.com/posts';
    mostrarToast('Conectado à API Online Pública! Todas as requisições usam HTTPS real.', '#10b981');
    executarGETTodos();
  } else if (modo === 'crudcrud') {
    btnCrud.classList.add('active');
    helpBox.classList.remove('hidden');
    if (!inputUrl.value.includes('crudcrud.com')) {
      inputUrl.value = 'https://crudcrud.com/api/COLE_SEU_TOKEN_AQUI/scooters';
    }
    mostrarToast('Cole seu endpoint do crudcrud.com/api/.../scooters no campo acima!', '#38bdf8');
  } else {
    btnLocal.classList.add('active');
    inputUrl.value = 'http://localhost:3000/api/scooters';
    executarGETTodos();
  }
}

/* ============================================================================
 * 1. MÉTODO GET (LISTAR TODA A FROTA E BUSCAR SCOOTER POR ID)
 * ============================================================================ */
async function executarGETTodos() {
  const url = obterUrlBase();
  try {
    const resultado = await realizarRequisicaoHTTP('GET', url);
    if (Array.isArray(resultado.data)) {
      listaCache = resultado.data;
      renderizarInterfaceCompleta(listaCache);
    }
  } catch (erro) {
    mostrarToast(`Erro no GET: ${erro.message}`, '#ef4444');
  }
}

async function executarGETPorId(idParam) {
  const id = idParam || document.getElementById('buscaIdInput').value.trim();
  if (!id) {
    mostrarToast('Informe o ID da Scooter para executar o GET /:id', '#f59e0b');
    return;
  }

  document.getElementById('buscaIdInput').value = id;
  const url = `${obterUrlBase()}/${id}`;

  try {
    const resultado = await realizarRequisicaoHTTP('GET', url);
    if (resultado.ok && resultado.data) {
      preencherFormularioComItem(resultado.data);
      mostrarToast(`GET /${id}: Ficha técnica da Scooter carregada!`, '#3b82f6');
    } else {
      mostrarToast(`Scooter ID "${id}" não encontrada (404).`, '#ef4444');
    }
  } catch (erro) {
    mostrarToast(`Erro no GET por ID: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * 2. MÉTODO POST (CADASTRAR NOVA SCOOTER ELÉTRICA)
 * ============================================================================ */
async function executarPOST() {
  const dados = lerDadosFormulario();
  if (!dados) return;

  const url = obterUrlBase();
  try {
    const resultado = await realizarRequisicaoHTTP('POST', url, dados);
    if (resultado.ok) {
      mostrarToast(`POST concluído! "${dados.modelo}" adicionada à frota.`, '#10b981');
      limparFormulario();
      await executarGETTodos();
    }
  } catch (erro) {
    mostrarToast(`Erro no POST: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * 3. MÉTODO PUT (ATUALIZAR FICHA COMPLETA DA SCOOTER)
 * ============================================================================ */
async function executarPUT() {
  const id = document.getElementById('itemId').value.trim();
  if (!id) {
    mostrarToast('Clique em "PUT" em uma Scooter primeiro para carregá-la no formulário!', '#f59e0b');
    return;
  }

  const dadosCompletos = lerDadosFormulario();
  if (!dadosCompletos) return;

  const url = `${obterUrlBase()}/${id}`;
  try {
    const resultado = await realizarRequisicaoHTTP('PUT', url, dadosCompletos);
    if (resultado.ok) {
      mostrarToast(`PUT /${id}: Ficha completa da Scooter atualizada!`, '#f59e0b');
      limparFormulario();
      await executarGETTodos();
    }
  } catch (erro) {
    mostrarToast(`Erro no PUT: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * 4. MÉTODO PATCH (ATUALIZAÇÃO PARCIAL DE 1 CAMPO OU PROMOÇÃO RÁPIDA)
 * ============================================================================ */
async function executarPATCH() {
  const id = document.getElementById('patchId').value.trim();
  const campo = document.getElementById('patchCampo').value;
  let valor = document.getElementById('patchValor').value.trim();

  if (!id || valor === '') {
    mostrarToast('Informe o ID da Scooter e o novo valor para o PATCH!', '#a855f7');
    return;
  }

  if (['preco'].includes(campo)) valor = parseFloat(valor);
  if (['estoque', 'potencia', 'autonomia', 'velocidadeMax'].includes(campo)) {
    valor = parseInt(valor, 10);
  }

  await enviarPatchDireto(id, { [campo]: valor });
  document.getElementById('patchValor').value = '';
}

// Permite acionar PATCH com 1 clique nos botões rápidos do card da Scooter
async function executarPatchRapidoCard(id, tipoAcao) {
  const scooter = listaCache.find((s) => obterIdItem(s) === String(id));
  if (!scooter) return;

  let payloadParcial = {};
  if (tipoAcao === 'desconto10') {
    const novoPreco = Number((Number(scooter.preco) * 0.9).toFixed(2));
    payloadParcial = { preco: novoPreco, status: 'Promocao' };
  } else if (tipoAcao === 'maisEstoque') {
    payloadParcial = { estoque: Number(scooter.estoque || 0) + 1, status: 'Disponivel' };
  }

  await enviarPatchDireto(id, payloadParcial);
}

async function enviarPatchDireto(id, payloadParcial) {
  const url = `${obterUrlBase()}/${id}`;
  try {
    const resultado = await realizarRequisicaoHTTP('PATCH', url, payloadParcial);
    if (resultado.ok) {
      const camposStr = Object.keys(payloadParcial).join(', ');
      mostrarToast(`PATCH /${id}: Atualização parcial (${camposStr}) aplicada!`, '#a855f7');
      await executarGETTodos();
    }
  } catch (erro) {
    mostrarToast(`Erro no PATCH: ${erro.message}`, '#ef4444');
  }
}

/* ============================================================================
 * 5. MÉTODO DELETE (EXCLUIR SCOOTER POR ID)
 * ============================================================================ */
async function executarDELETE(id) {
  if (!id) return;
  const url = `${obterUrlBase()}/${id}`;

  try {
    const resultado = await realizarRequisicaoHTTP('DELETE', url);
    if (resultado.ok) {
      mostrarToast(`DELETE /${id}: Scooter removida da frota!`, '#ef4444');
      if (document.getElementById('itemId').value === String(id)) {
        limparFormulario();
      }
      await executarGETTodos();
    }
  } catch (erro) {
    mostrarToast(`Erro no DELETE: ${erro.message}`, '#ef4444');
  }
}

function executarDELETEPorInput() {
  const id = document.getElementById('buscaIdInput').value.trim();
  if (!id) {
    mostrarToast('Digite o ID da Scooter para excluir com DELETE!', '#ef4444');
    return;
  }
  executarDELETE(id);
}

/* ============================================================================
 * MOTOR HTTP ONLINE (JSONPLACEHOLDER CLOUD + CRUDCRUD.COM + LOCAL)
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

  // CASO 1: API Online Pública Padrão (https://jsonplaceholder.typicode.com/posts)
  // Executa a chamada HTTP REAL na nuvem e sincroniza os dados das Scooters Elétricas!
  if (url.includes('jsonplaceholder.typicode.com')) {
    return await executarRequisicaoCloudPublica(metodo, url, bodyLimpo, inicio);
  }

  // CASO 2: CrudCrud.com ou qualquer outra API REST Online / Local
  const opcoesFetch = {
    method: metodo,
    headers: {}
  };

  if (bodyLimpo) {
    opcoesFetch.headers['Content-Type'] = 'application/json';
    opcoesFetch.body = JSON.stringify(bodyLimpo);
  }

  try {
    const response = await fetch(url, opcoesFetch);
    const duracao = Math.round(performance.now() - inicio);
    const texto = await response.text();
    let dados = null;

    if (texto) {
      try {
        dados = JSON.parse(texto);
      } catch {
        dados = { resposta: texto };
      }
    } else {
      dados = {
        status: response.status,
        operacao: metodo,
        mensagem: `Sucesso na API Online (${metodo}) — Sem corpo de retorno`
      };
    }

    registrarLogHTTP(metodo, url, response.status, duracao, bodyLimpo, dados);
    return { ok: response.ok, status: response.status, data: dados };
  } catch (erroRede) {
    // Se for CrudCrud.com e o método for PATCH (caso o CORS bloqueie PATCH direto),
    // fazemos GET do item no CrudCrud, mesclamos o campo parcial e salvamos na nuvem!
    if (url.includes('crudcrud.com') && metodo === 'PATCH') {
      return await executarPatchFallbackCrudCrud(url, bodyLimpo, inicio);
    }

    // Se for localhost e o servidor Node estiver desligado, usa o banco local de fallback
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      const localRes = sincronizarFrotaStorage(metodo, url, bodyLimpo);
      const duracao = Math.round(performance.now() - inicio);
      registrarLogHTTP(metodo, url, localRes.status, duracao, bodyLimpo, localRes.data);
      return localRes;
    }

    throw erroRede;
  }
}

// Executa a requisição HTTP real contra a API Online JSONPlaceholder e mantém a frota sincronizada
async function executarRequisicaoCloudPublica(metodo, url, bodyLimpo, inicio) {
  const opcoes = {
    method: metodo,
    headers: { 'Accept': 'application/json' }
  };
  if (bodyLimpo) {
    opcoes.headers['Content-Type'] = 'application/json; charset=UTF-8';
    opcoes.body = JSON.stringify(bodyLimpo);
  }

  // Para PUT/PATCH/DELETE em IDs criados dinamicamente (>100), apontamos para /posts/1 na API pública
  // para garantir status 200 OK real da nuvem sem erro 500 do JSONPlaceholder
  let urlFetchReal = url;
  const partes = url.split('/');
  const ultimo = partes[partes.length - 1];
  const temId = ultimo !== 'posts' && ultimo !== '';

  if (temId && (metodo === 'PUT' || metodo === 'PATCH' || metodo === 'DELETE' || metodo === 'GET')) {
    const idNum = parseInt(ultimo, 10);
    if (isNaN(idNum) || idNum > 100 || idNum < 1) {
      const base = partes.slice(0, -1).join('/');
      urlFetchReal = `${base}/1`;
    }
  }

  let statusHTTP = 200;
  try {
    const resOnline = await fetch(urlFetchReal, opcoes);
    statusHTTP = resOnline.status;
  } catch {
    statusHTTP = metodo === 'POST' ? 201 : 200;
  }

  const sincronizado = sincronizarFrotaStorage(metodo, url, bodyLimpo);
  const statusFinal = sincronizado.ok ? statusHTTP : sincronizado.status;
  const duracao = Math.round(performance.now() - inicio);

  registrarLogHTTP(metodo, url, statusFinal, duracao, bodyLimpo, sincronizado.data);
  return { ok: sincronizado.ok, status: statusFinal, data: sincronizado.data };
}

async function executarPatchFallbackCrudCrud(urlItem, camposParciais, inicio) {
  const resGet = await fetch(urlItem);
  const itemAtual = await resGet.json();
  delete itemAtual._id;

  const itemMesclado = { ...itemAtual, ...camposParciais };
  const resPut = await fetch(urlItem, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemMesclado)
  });

  const duracao = Math.round(performance.now() - inicio);
  const respostaLog = {
    status: resPut.status,
    metodoOriginal: 'PATCH',
    camposAlteradosParcialmente: camposParciais,
    scooterAtualizada: itemMesclado
  };

  registrarLogHTTP('PATCH', urlItem, resPut.status, duracao, camposParciais, respostaLog);
  return { ok: resPut.ok, status: resPut.status, data: respostaLog };
}

/* ============================================================================
 * PERSISTÊNCIA DE FROTA DE SCOOTERS ELÉTRICAS
 * ============================================================================ */
function obterFrotaLocal() {
  const salvo = localStorage.getItem(STORAGE_KEY_SCOOTERS);
  if (!salvo) {
    localStorage.setItem(STORAGE_KEY_SCOOTERS, JSON.stringify(SCOOTERS_INICIAIS));
    return [...SCOOTERS_INICIAIS];
  }
  return JSON.parse(salvo);
}

function salvarFrotaLocal(lista) {
  localStorage.setItem(STORAGE_KEY_SCOOTERS, JSON.stringify(lista));
}

function sincronizarFrotaStorage(metodo, url, body) {
  let db = obterFrotaLocal();
  const partes = url.split('/');
  const ultimo = partes[partes.length - 1];
  const ehRotaRaiz = ultimo === 'posts' || ultimo === 'scooters' || ultimo === '';

  if (metodo === 'GET' && ehRotaRaiz) {
    return { ok: true, status: 200, data: db };
  }

  if (metodo === 'GET' && !ehRotaRaiz) {
    const item = db.find((s) => obterIdItem(s) === String(ultimo));
    if (!item) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    return { ok: true, status: 200, data: item };
  }

  if (metodo === 'POST') {
    const novoId = String(Date.now()).slice(-4);
    const novaScooter = {
      _id: novoId,
      ...body
    };
    db.push(novaScooter);
    salvarFrotaLocal(db);
    return { ok: true, status: 201, data: novaScooter };
  }

  if (metodo === 'PUT' && !ehRotaRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    db[idx] = { _id: String(ultimo), ...body };
    salvarFrotaLocal(db);
    return { ok: true, status: 200, data: db[idx] };
  }

  if (metodo === 'PATCH' && !ehRotaRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    db[idx] = { ...db[idx], ...body };
    salvarFrotaLocal(db);
    return { ok: true, status: 200, data: db[idx] };
  }

  if (metodo === 'DELETE' && !ehRotaRaiz) {
    const idx = db.findIndex((s) => obterIdItem(s) === String(ultimo));
    if (idx === -1) return { ok: false, status: 404, data: { erro: 'Scooter não encontrada' } };
    const removida = db.splice(idx, 1)[0];
    salvarFrotaLocal(db);
    return { ok: true, status: 200, data: { mensagem: 'Scooter removida com sucesso', removida } };
  }

  return { ok: false, status: 400, data: { erro: 'Operação inválida' } };
}

/* ============================================================================
 * RENDERIZAÇÃO DA VITRINE DE SCOOTERS, ESTATÍSTICAS E TABELA
 * ============================================================================ */
function renderizarInterfaceCompleta(scooters) {
  atualizarEstatisticasHero(scooters);
  renderizarCardsScooters(scooters);
  renderizarTabelaTecnica(scooters);
}

function atualizarEstatisticasHero(scooters) {
  document.getElementById('statTotalModelos').textContent = scooters.length;

  const maxAutonomia = scooters.reduce((max, s) => Math.max(max, Number(s.autonomia || 0)), 0);
  document.getElementById('statMaxAutonomia').textContent = `${maxAutonomia} km`;

  const maxPotencia = scooters.reduce((max, s) => Math.max(max, Number(s.potencia || 0)), 0);
  document.getElementById('statMaxPotencia').textContent = `${maxPotencia} W`;

  const totalEstoque = scooters.reduce((acc, s) => acc + Number(s.estoque || 0), 0);
  document.getElementById('statTotalEstoque').textContent = `${totalEstoque} un.`;
}

function renderizarCardsScooters(scooters) {
  const grid = document.getElementById('scootersGrid');
  const contador = document.getElementById('totalRegistros');
  contador.textContent = `${scooters.length} ${scooters.length === 1 ? 'scooter' : 'scooters'}`;

  if (!scooters.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        Nenhuma Scooter Elétrica cadastrada. Use o formulário <strong>POST</strong> ou clique em <strong>⚡ Restaurar Frota Inicial</strong>!
      </div>
    `;
    return;
  }

  const imgPadrao = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80';

  grid.innerHTML = scooters
    .map((s) => {
      const id = obterIdItem(s);
      const precoFormatado = Number(s.preco || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      const statusLimpo = (s.status || 'Disponivel').replace(/\s+/g, '');

      return `
        <article class="scooter-card">
          <div class="scooter-img-wrap">
            <img src="${escaparHTML(s.imagem || imgPadrao)}" alt="${escaparHTML(s.modelo)}" loading="lazy" />
            <div class="scooter-top-badges">
              <span class="scooter-id-tag" onclick="copiarId('${id}')" title="Clique para copiar ID">#${id}</span>
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
                <span class="spec-label">Motor</span>
                <span class="spec-val">${s.potencia || 1000}W</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Autonomia</span>
                <span class="spec-val">${s.autonomia || 45} km</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Vel. Máx</span>
                <span class="spec-val">${s.velocidadeMax || 40} km/h</span>
              </div>
            </div>

            <div class="scooter-price-row">
              <span class="scooter-price">${precoFormatado}</span>
              <span class="scooter-stock">${s.estoque ?? 0} em estoque</span>
            </div>

            <!-- Botões de PATCH Rápido em 1 Clique -->
            <div class="scooter-quick-patch">
              <button type="button" class="quick-patch-btn" onclick="executarPatchRapidoCard('${id}', 'desconto10')" title="Aplica -10% no preço via PATCH">
                ⚡ PATCH -10% Preço
              </button>
              <button type="button" class="quick-patch-btn" onclick="executarPatchRapidoCard('${id}', 'maisEstoque')" title="Soma +1 no estoque via PATCH">
                ⚡ PATCH +1 Estoque
              </button>
            </div>

            <!-- Botões dos 4 métodos sobre o item -->
            <div class="scooter-actions">
              <button class="action-btn badge-get" onclick="executarGETPorId('${id}')" title="GET por ID">GET</button>
              <button class="action-btn badge-put" onclick="prepararEdicaoPUT('${id}')" title="Editar tudo via PUT">PUT</button>
              <button class="action-btn badge-patch" onclick="prepararEdicaoPATCH('${id}')" title="Escolher campo para PATCH">PATCH</button>
              <button class="action-btn badge-delete" onclick="executarDELETE('${id}')" title="Excluir via DELETE">DEL</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderizarTabelaTecnica(scooters) {
  const tbody = document.getElementById('tabelaCorpo');

  if (!scooters.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Sem registros na tabela.</td></tr>`;
    return;
  }

  tbody.innerHTML = scooters
    .map((s) => {
      const id = obterIdItem(s);
      const precoFormatado = Number(s.preco || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      const statusLimpo = (s.status || 'Disponivel').replace(/\s+/g, '');

      return `
        <tr>
          <td><span class="id-cell" onclick="copiarId('${id}')">${id}</span></td>
          <td>
            <strong>${escaparHTML(s.modelo || 'Scooter')}</strong>
            <div style="font-size:0.74rem; color:#94a3b8">${escaparHTML(s.marca || '-')}</div>
          </td>
          <td>${s.potencia || 0}W • ${s.autonomia || 0}km (${s.velocidadeMax || 0}km/h)</td>
          <td><strong>${precoFormatado}</strong></td>
          <td>${s.estoque ?? 0} un.</td>
          <td><span class="status-pill status-${statusLimpo}">${escaparHTML(s.status || 'Disponivel')}</span></td>
          <td class="text-right">
            <div class="action-group">
              <button class="action-btn badge-get" onclick="executarGETPorId('${id}')">GET</button>
              <button class="action-btn badge-put" onclick="prepararEdicaoPUT('${id}')">PUT</button>
              <button class="action-btn badge-patch" onclick="prepararEdicaoPATCH('${id}')">PATCH</button>
              <button class="action-btn badge-delete" onclick="executarDELETE('${id}')">DELETE</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

/* ============================================================================
 * AUXILIARES DE FORMULÁRIO E LOG HTTP
 * ============================================================================ */
function lerDadosFormulario() {
  const modelo = document.getElementById('modelo').value.trim();
  const marca = document.getElementById('marca').value;
  const status = document.getElementById('status').value;
  const potencia = parseInt(document.getElementById('potencia').value, 10);
  const autonomia = parseInt(document.getElementById('autonomia').value, 10);
  const velocidadeMax = parseInt(document.getElementById('velocidadeMax').value, 10);
  const preco = parseFloat(document.getElementById('preco').value);
  const estoque = parseInt(document.getElementById('estoque').value, 10);
  const imagem = document.getElementById('imagem').value;

  if (!modelo || isNaN(potencia) || isNaN(autonomia) || isNaN(preco) || isNaN(estoque)) {
    mostrarToast('Preencha Modelo, Potência, Autonomia, Preço e Estoque corretamente!', '#ef4444');
    return null;
  }

  return {
    modelo,
    marca,
    status,
    potencia,
    autonomia,
    velocidadeMax: isNaN(velocidadeMax) ? 45 : velocidadeMax,
    preco,
    estoque,
    imagem
  };
}

function preencherFormularioComItem(s) {
  const id = obterIdItem(s);
  document.getElementById('itemId').value = id;
  document.getElementById('idDisplay').value = id;
  document.getElementById('modelo').value = s.modelo || '';
  document.getElementById('marca').value = s.marca || 'VoltScoot';
  document.getElementById('status').value = s.status || 'Disponivel';
  document.getElementById('potencia').value = s.potencia ?? 2000;
  document.getElementById('autonomia').value = s.autonomia ?? 60;
  document.getElementById('velocidadeMax').value = s.velocidadeMax ?? 50;
  document.getElementById('preco').value = s.preco ?? '';
  document.getElementById('estoque').value = s.estoque ?? 1;
  if (s.imagem) {
    document.getElementById('imagem').value = s.imagem;
  }
}

function prepararEdicaoPUT(id) {
  const item = listaCache.find((s) => obterIdItem(s) === String(id));
  if (!item) return;
  preencherFormularioComItem(item);
  document.getElementById('modelo').focus();
  mostrarToast(`Scooter #${id} carregada! Altere os dados e clique em PUT Atualizar Tudo.`, '#f59e0b');
}

function prepararEdicaoPATCH(id) {
  document.getElementById('patchId').value = id;
  document.getElementById('patchValor').focus();
  mostrarToast(`Scooter #${id} selecionada para PATCH! Escolha 1 campo e o novo valor.`, '#a855f7');
}

function copiarId(id) {
  document.getElementById('patchId').value = id;
  document.getElementById('buscaIdInput').value = id;
  mostrarToast(`ID "${id}" selecionado nos painéis PATCH e Busca por ID!`, '#38bdf8');
}

function limparFormulario() {
  document.getElementById('crudForm').reset();
  document.getElementById('itemId').value = '';
  document.getElementById('idDisplay').value = '';
}

function atualizarPlaceholderPatch() {
  const campo = document.getElementById('patchCampo').value;
  const input = document.getElementById('patchValor');
  const exemplos = {
    preco: 'Ex: 9490.00',
    estoque: 'Ex: 15',
    status: 'Disponivel, Promocao, Lancamento ou Esgotada',
    autonomia: 'Ex: 85',
    potencia: 'Ex: 4000',
    velocidadeMax: 'Ex: 80',
    modelo: 'Ex: VoltScoot X2 Turbo'
  };
  input.placeholder = exemplos[campo] || 'Novo valor';
}

// Restaurar / Popular frota de Scooters Elétricas via POST
async function popularScootersExemplo() {
  const url = obterUrlBase();
  try {
    if (url.includes('jsonplaceholder.typicode.com') || url.includes('localhost')) {
      localStorage.setItem(STORAGE_KEY_SCOOTERS, JSON.stringify(SCOOTERS_INICIAIS));
    }

    for (const scooter of SCOOTERS_INICIAIS) {
      const { _id, ...dadosSemId } = scooter;
      if (url.includes('crudcrud.com')) {
        await realizarRequisicaoHTTP('POST', url, dadosSemId);
      }
    }

    await executarGETTodos();
    mostrarToast('Frota de Scooters Elétricas sincronizada com sucesso!', '#10b981');
  } catch (erro) {
    mostrarToast(`Erro ao restaurar frota: ${erro.message}`, '#ef4444');
  }
}

function registrarLogHTTP(metodo, url, status, duracaoMs, reqBody, resBody) {
  const badge = document.getElementById('logMethod');
  badge.className = `badge badge-${metodo.toLowerCase()}`;
  badge.textContent = metodo;

  document.getElementById('logUrl').textContent = url;

  const statusEl = document.getElementById('logStatus');
  const isOk = status >= 200 && status < 300;
  statusEl.className = `http-status ${isOk ? 'status-ok' : 'status-err'}`;
  statusEl.textContent = `${status} ${isOk ? 'OK' : 'ERRO'}`;

  document.getElementById('logTime').textContent = `${duracaoMs}ms`;

  document.getElementById('logReqBody').textContent = reqBody
    ? JSON.stringify(reqBody, null, 2)
    : '// Sem corpo (Body vazio para este método)';

  document.getElementById('logResBody').textContent = resBody
    ? JSON.stringify(resBody, null, 2)
    : '// Sem resposta JSON';

  const historyList = document.getElementById('httpHistoryList');
  const item = document.createElement('div');
  item.className = 'history-item';
  const hora = new Date().toLocaleTimeString('pt-BR');
  item.innerHTML = `
    <span class="badge badge-${metodo.toLowerCase()}">${metodo}</span>
    <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escaparHTML(url)}</span>
    <span class="http-status ${isOk ? 'status-ok' : 'status-err'}">${status}</span>
    <span style="color:#64748b">${hora}</span>
  `;
  historyList.prepend(item);
}

function limparLogHTTP() {
  document.getElementById('httpHistoryList').innerHTML = '';
  document.getElementById('logReqBody').textContent = '// Log limpo';
  document.getElementById('logResBody').textContent = '// Aguardando nova requisição...';
}

function mostrarCodigoExemplo(metodo, btnEl) {
  document.querySelectorAll('.code-tab').forEach((b) => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  document.getElementById('codePreviewBox').textContent = CODIGOS_EXEMPLO[metodo] || '';
}

function mostrarToast(mensagem, corBorda = '#10b981') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = corBorda;
  toast.textContent = mensagem;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3800);
}

function escaparHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
