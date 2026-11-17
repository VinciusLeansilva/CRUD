

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

let scooters = [
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

function lerBodyJSON(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
  });
}

function enviarJSON(res, status, dados) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept'
  });
  res.end(JSON.stringify(dados));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });
    return res.end();
  }

  const urlLimpa = req.url.split('?')[0].replace(/\/+$/, '') || '/';

  if (urlLimpa === '/api/scooters' || urlLimpa.startsWith('/api/scooters/')) {
    const partes = urlLimpa.split('/');
    const id = partes[3] || null;

    try {
      // GET
      if (req.method === 'GET') {
        if (!id) return enviarJSON(res, 200, scooters);
        const item = scooters.find((s) => s._id === id);
        if (!item) return enviarJSON(res, 404, { erro: 'Scooter não encontrada' });
        return enviarJSON(res, 200, item);
      }

      // POST
      if (req.method === 'POST' && !id) {
        const body = await lerBodyJSON(req);
        const nova = {
          _id: String(Date.now()).slice(-4),
          ...body
        };
        scooters.push(nova);
        return enviarJSON(res, 201, nova);
      }

      // PUT
      if (req.method === 'PUT' && id) {
        const idx = scooters.findIndex((s) => s._id === id);
        if (idx === -1) return enviarJSON(res, 404, { erro: 'Scooter não encontrada para PUT' });
        const body = await lerBodyJSON(req);
        scooters[idx] = { _id: id, ...body };
        return enviarJSON(res, 200, scooters[idx]);
      }

      // PATCH
      if (req.method === 'PATCH' && id) {
        const idx = scooters.findIndex((s) => s._id === id);
        if (idx === -1) return enviarJSON(res, 404, { erro: 'Scooter não encontrada para PATCH' });
        const bodyParcial = await lerBodyJSON(req);
        delete bodyParcial._id;
        scooters[idx] = { ...scooters[idx], ...bodyParcial };
        return enviarJSON(res, 200, scooters[idx]);
      }

      // DELETE
      if (req.method === 'DELETE' && id) {
        const idx = scooters.findIndex((s) => s._id === id);
        if (idx === -1) return enviarJSON(res, 404, { erro: 'Scooter não encontrada para DELETE' });
        const removida = scooters.splice(idx, 1)[0];
        return enviarJSON(res, 200, { mensagem: 'Scooter removida com sucesso', removida });
      }

      return enviarJSON(res, 405, { erro: 'Método não suportado' });
    } catch (erro) {
      return enviarJSON(res, 400, { erro: erro.message });
    }
  }

  // Servir arquivos estáticos
  let filePath = urlLimpa === '/' ? 'index.html' : urlLimpa.slice(1);
  const fullPath = path.join(__dirname, filePath);

  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
  };

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 - Arquivo não encontrado');
    }
    const ext = path.extname(fullPath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`=====================================================`);
  console.log(`⚡ Site VoltScoot Scooters Elétricas: http://localhost:${PORT}`);
  console.log(`📡 Endpoint Local: http://localhost:${PORT}/api/scooters`);
  console.log(`🌐 API Online configurada por padrão no frontend!`);
  console.log(`=====================================================`);
});
