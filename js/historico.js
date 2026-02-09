/* =====================================================
   ÍCONES POR CATEGORIA (MESMO PADRÃO DO APP)
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
   SELETORES
===================================================== */
const listaHistorico = document.getElementById('listaHistorico');

const modalExcluir = document.getElementById('modalExcluir');
const btnCancelarExcluir = document.getElementById('btnCancelarExcluir');
const btnConfirmarExcluir = document.getElementById('btnConfirmarExcluir');

/* =====================================================
   DADOS
===================================================== */
let historico = JSON.parse(localStorage.getItem('historico')) || [];
let indexExcluir = null;

/* =====================================================
   RENDERIZAR HISTÓRICO
===================================================== */
function renderizarHistorico() {
    listaHistorico.innerHTML = '';

    if (historico.length === 0) {
        listaHistorico.innerHTML = `
            <div class="historico-vazio">
                🧾 Nenhuma compra registrada ainda.
            </div>
        `;
        return;
    }

    const container = document.createElement('div');
    container.className = 'historico-container';

    historico.slice().reverse().forEach((compra, indexInvertido) => {
        const indexReal = historico.length - 1 - indexInvertido;
        let totalCompra = 0;

        const card = document.createElement('div');
        card.className = 'historico-card';

        let html = `
            <div class="historico-card-header">
                <h3>🧾 Compra ${indexReal + 1}</h3>

                <button class="btn-excluir-compra"
                        title="Excluir compra"
                        data-index="${indexReal}">
                    🗑️
                </button>
            </div>

            <div class="historico-data">
                📅 ${compra.data}
            </div>
        `;

        for (const categoria in compra.itens) {
            const icone = iconesCategoria[categoria] || "📦";

            html += `
                <div class="historico-categoria">
                    <h4>${icone} ${categoria}</h4>
                    <ul>
            `;

            compra.itens[categoria].forEach(item => {
                const subtotal = item.qtd * item.preco;
                totalCompra += subtotal;

                html += `
                    <li>
                        <span>${item.qtd}x ${item.nome}</span>
                        <strong>R$ ${subtotal.toFixed(2)}</strong>
                    </li>
                `;
            });

            html += `
                    </ul>
                </div>
            `;
        }

        html += `
            <div class="historico-total">
                Total da compra: <strong>R$ ${totalCompra.toFixed(2)}</strong>
            </div>
        `;

        card.innerHTML = html;
        container.appendChild(card);
    });

    listaHistorico.appendChild(container);

    ativarExcluirCompra();
}

/* =====================================================
   ATIVAR EXCLUSÃO
===================================================== */
function ativarExcluirCompra() {
    document.querySelectorAll('.btn-excluir-compra').forEach(btn => {
        btn.onclick = () => {
            indexExcluir = Number(btn.dataset.index);
            modalExcluir.classList.add('show');
        };
    });
}

/* =====================================================
   MODAL EXCLUIR
===================================================== */
btnCancelarExcluir.onclick = () => {
    indexExcluir = null;
    modalExcluir.classList.remove('show');
};

btnConfirmarExcluir.onclick = () => {
    if (indexExcluir !== null) {
        historico.splice(indexExcluir, 1);
        localStorage.setItem('historico', JSON.stringify(historico));
        renderizarHistorico();
    }

    indexExcluir = null;
    modalExcluir.classList.remove('show');
};

/* =====================================================
   INICIALIZAÇÃO
===================================================== */
renderizarHistorico();
