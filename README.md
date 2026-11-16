# ⚡ VoltScoot — Site de Scooters Elétricas com CRUD Online (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)

Site completo de Concessionária e Gestão de Frota de **Scooters Elétricas** conectado por padrão a uma **API Online**, com suporte aos 5 verbos HTTP:

- **`GET`** — Lista todas as Scooters Elétricas do catálogo ou consulta a ficha técnica de uma scooter por ID (`GET /:id`)
- **`POST`** — Cadastra uma nova Scooter Elétrica (Modelo, Marca, Potência em W, Autonomia em km, Velocidade Máx em km/h, Preço, Estoque, Status e Foto)
- **`PUT`** — Substitui/atualiza a ficha técnica **completa** de uma Scooter existente (`PUT /:id`)
- **`PATCH`** — Atualização **parcial** de apenas 1 campo (ex.: alterar somente o Preço, Autonomia ou Estoque, além de botões rápidos nos cards de `-10% Preço via PATCH` e `+1 Estoque via PATCH`)
- **`DELETE`** — Remove uma Scooter Elétrica pelo ID (`DELETE /:id`)

---

## 🌐 Modos de API Online Disponíveis no Site

1. **🌐 API Online Pública (Ativa por Padrão)**:
   - Já vem configurada no topo com `https://jsonplaceholder.typicode.com/posts` combinada com sincronização de frota, disparando requisições `fetch()` HTTPS reais pela internet para `GET`, `POST`, `PUT`, `PATCH` e `DELETE` sem exigir cadastro ou token.
2. **🔥 CrudCrud.com (Seu Token na Nuvem)**:
   - Clique no botão **"🔥 CrudCrud.com (Seu Token)"** no topo da página, cole sua URL gerada em [https://crudcrud.com](https://crudcrud.com) com `/scooters` ao final (ex.: `https://crudcrud.com/api/SEU_TOKEN/scooters`) e clique em **⚡ Restaurar Frota Inicial**.
3. **💻 API Servidor Local (`http://localhost:3000/api/scooters`)**:
   - Caso queira rodar localmente com `node server.js`.
