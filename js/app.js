/* =====================================================
   ÍCONES POR CATEGORIA
===================================================== */
const iconesCategoria = {
    "Padaria": "🥖",
    "Açougue": "🥩",
    "Peixaria": "🐟",
    "Hortifruti": "🥦",
    "Mercearia": "🛒",
    "Frios e Laticínios": "🧀",
    "Congelados": "❄️",
    "Doces e Sobremesas": "🍫",
    "Bebidas": "🥤",
    "Adega": "🍷",
    "Limpeza": "🧼",
    "Higiene Pessoal": "🧴",
    "Lavanderia": "👕",
    "Descartáveis": "🧻",
    "Utilidades Domésticas": "🏠",
    "Farmácia": "💊",
    "Pet Shop": "🐶",
    "Infantil": "🧸",
    "Bazar": "🧺",
    "Outros": "📦"
};

/* =====================================================
   ESPERAR DOM
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       ELEMENTOS
    ========================= */
    const itemNome = document.getElementById('itemNome');
    const itemQtd = document.getElementById('itemQtd');
    const itemPreco = document.getElementById('itemPreco');
    const itemCategoria = document.getElementById('itemCategoria');
    const btnAdd = document.getElementById('btnAdd');

    const listaEl = document.getElementById('listaItens');
    const totalGeralEl = document.getElementById('totalGeral');
    const qtdTotalEl = document.getElementById('qtdTotal');

    const btnFinalizar = document.getElementById('btnFinalizar');

    const modalFinalizar = document.getElementById('modalFinalizar');
    const btnCancelarFinalizar = document.getElementById('btnCancelarFinalizar');
    const btnConfirmarFinalizar = document.getElementById('btnConfirmarFinalizar');

    let listas = JSON.parse(localStorage.getItem('listas')) || {};

    /* =========================
       ADICIONAR ITEM
    ========================= */
    btnAdd.onclick = () => {
        const nome = itemNome.value.trim();
        const qtd = Number(itemQtd.value);
        const preco = Number(itemPreco.value);
        const categoria = itemCategoria.value;

        if (!nome || qtd <= 0 || preco < 0) return;

        if (!listas[categoria]) listas[categoria] = [];

        listas[categoria].push({
            nome,
            qtd,
            preco,
            comprado: false
        });

        itemNome.value = '';
        itemQtd.value = '';
        itemPreco.value = '';

        salvar();
        renderizar();
    };

    /* =========================
       MODAL FINALIZAR
    ========================= */
    btnFinalizar.onclick = () => {
        if (Object.keys(listas).length === 0) return;
        modalFinalizar.classList.add('show');
    };

    btnCancelarFinalizar.onclick = () => {
        modalFinalizar.classList.remove('show');
    };

    btnConfirmarFinalizar.onclick = () => {
        salvarCompraNoHistorico();
        listas = {};
        salvar();
        renderizar();
        modalFinalizar.classList.remove('show');
    };

    /* =========================
       SALVAR
    ========================= */
    function salvar() {
        localStorage.setItem('listas', JSON.stringify(listas));
    }

    /* =========================
       SALVAR NO HISTÓRICO
    ========================= */
    function salvarCompraNoHistorico() {
        const historico = JSON.parse(localStorage.getItem('historico')) || [];

        historico.push({
            data: new Date().toLocaleString('pt-BR'),
            itens: JSON.parse(JSON.stringify(listas))
        });

        localStorage.setItem('historico', JSON.stringify(historico));
    }

    /* =========================
       RENDERIZAR
    ========================= */
    function renderizar() {
        listaEl.innerHTML = '';
        let totalGeral = 0;
        let qtdTotal = 0;

        for (const categoria in listas) {
            const itens = listas[categoria];
            if (itens.length === 0) continue;

            const icone = iconesCategoria[categoria] || "📦";
            let totalCategoria = 0;

            const div = document.createElement('div');
            div.className = 'categoria';

            div.innerHTML = `<h3>${icone} ${categoria}</h3>`;
            const ul = document.createElement('ul');

            itens.forEach((item, index) => {
                const subtotal = item.qtd * item.preco;
                totalCategoria += subtotal;
                totalGeral += subtotal;
                qtdTotal += item.qtd;

                const li = document.createElement('li');
                li.className = item.comprado ? 'comprado' : '';

                li.innerHTML = `
                    <span>${item.qtd}x ${item.nome} — R$ ${item.preco.toFixed(2)}
                        <strong>(R$ ${subtotal.toFixed(2)})</strong>
                    </span>
                    <div class="acoes">
                        <button>✔️</button>
                        <button>🗑️</button>
                    </div>
                `;

                li.querySelectorAll('button')[0].onclick = () => {
                    item.comprado = !item.comprado;
                    salvar();
                    renderizar();
                };

                li.querySelectorAll('button')[1].onclick = () => {
                    listas[categoria].splice(index, 1);
                    if (listas[categoria].length === 0) delete listas[categoria];
                    salvar();
                    renderizar();
                };

                ul.appendChild(li);
            });

            div.appendChild(ul);

            const totalCat = document.createElement('div');
            totalCat.className = 'totalCategoria';
            totalCat.textContent = `Total ${categoria}: R$ ${totalCategoria.toFixed(2)}`;

            div.appendChild(totalCat);
            listaEl.appendChild(div);
        }

        totalGeralEl.textContent = totalGeral.toFixed(2);
        qtdTotalEl.textContent = `${qtdTotal} itens`;
    }

    renderizar();
});
