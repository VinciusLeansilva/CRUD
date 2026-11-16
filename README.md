# ⚡ VoltScoot — Site Multi-Páginas de Scooters Elétricas (CRUD Online)

Site completo de Concessionária e Gestão de Frota de **Scooters Elétricas** dividido em **5 páginas interligadas**, conectado por padrão a uma **API Online** e suportando os 5 métodos HTTP (`GET`, `POST`, `PUT`, `PATCH` e `DELETE`).

---

## 🗺️ Estrutura das 5 Páginas do Site

1. **`index.html` — Início & Showroom Oficial**:
   - Banner principal, indicadores da frota em tempo real, vitrine de Scooters em destaque (carregadas via `GET`), diferenciais e **Simulador Interativo de Economia Mensal/Anual** (Scooter Elétrica vs. Gasolina).
2. **`catalogo.html` — Catálogo Completo & Ficha Técnica (`GET` e `GET /:id`)**:
   - Busca por nome/modelo, filtros por Marca, Status e Ordenação (Menor Preço, Maior Potência, Maior Autonomia).
   - Ao clicar em **`GET`** em qualquer card, executa `GET /:id` e abre um **Modal de Ficha Técnica Completa** com o JSON retornado pela API Online.
3. **`cadastro.html` — Cadastrar Nova (`POST`) & Editar Scooter Inteira (`PUT`)**:
   - Formulário completo para criar uma nova Scooter Elétrica com **`POST`** ou selecionar uma Scooter existente para substituir todos os seus dados com **`PUT`**.
   - Conta com **Pré-visualização do Card em Tempo Real (Live Preview)** enquanto você preenche os campos.
4. **`manutencao-patch.html` — Central de Promoções, Estoque (`PATCH`) & Exclusão (`DELETE`)**:
   - Painel dedicado ao método **`PATCH` (Atualização Parcial)** para alterar apenas 1 campo específico (ex.: só `preco`, só `estoque`, só `status` ou `autonomia`) sem reenviar o objeto completo, além de botões rápidos em 1 clique e exclusão via **`DELETE`**.
5. **`api-console.html` — Configurador da API Online (`CrudCrud.com` / Cloud) & Logs HTTP**:
   - Permite alternar entre a **API Online Pública** (ativa por padrão), o seu endpoint do **CrudCrud.com** ou o **Servidor Local**, além de exibir o histórico completo de requisições HTTP feitas no site.
