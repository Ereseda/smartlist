# 🛒 SmartList

SmartList é uma aplicação web de **lista de compras inteligente**, desenvolvida em **HTML, CSS e JavaScript puro**, com foco em **organização por categorias**, **experiência mobile**, **persistência local** e **histórico de compras**.

O projeto foi pensado para uso **no dia a dia**, funcionando diretamente no navegador e podendo ser instalado no celular como **PWA**.

---

## ✨ Funcionalidades

- ➕ Adicionar itens com:
  - Nome
  - Quantidade
  - Preço unitário
  - Categoria
- 📂 Organização automática por **categorias**
- 😀 Ícones visuais para cada categoria
- ✅ Marcar itens como comprados
- 🗑 Excluir itens individualmente
- 💰 Cálculo automático:
  - Total por categoria
  - Total geral da compra
- 📜 **Histórico de compras**
  - Compras salvas com data
  - Visualização detalhada por categoria
  - Exclusão de compras com confirmação via modal
- 🧠 Persistência de dados usando **localStorage**
- 🪟 Modais customizadas (sem `alert` ou `confirm`)
- 📱 Layout responsivo (desktop e mobile)
- 📦 Suporte a **PWA (offline básico)**

---

## 📱 Uso no celular

O SmartList pode ser usado normalmente no navegador do celular.

No **Chrome (Android)**:
1. Acesse o link do projeto
2. Toque nos três pontos (⋮)
3. Selecione **“Adicionar à tela inicial”**
4. O app será instalado como um aplicativo

---

## 🧱 Tecnologias utilizadas

- HTML5 (estrutura semântica)
- CSS3 (layout responsivo e estilização)
- JavaScript (lógica da aplicação)
- localStorage (persistência de dados)
- Service Worker (offline básico / PWA)
- Git & GitHub
- Vercel (deploy)

---

## 🗂 Estrutura do projeto

```text
/
├── index.html
├── historico.html
├── manifest.json
├── service-worker.js
├── css/
│   ├── style.css
│   └── historico.css
├── js/
│   ├── app.js
│   └── historico.js


## 🚀 Próximas evoluções
- Histórico de compras
- Múltiplas listas
- Compartilhamento

