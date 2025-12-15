document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formManutencao');
    const historicoDiv = document.getElementById('historico');
    
    // Função para carregar e exibir os registros
    function carregarHistorico() {
        // Pega os dados do LocalStorage (simulando um BD)
        const registros = JSON.parse(localStorage.getItem('manutencaoRegistros')) || [];
        
        historicoDiv.innerHTML = '<h2>Histórico de Manutenções</h2>'; // Limpa
        
        if (registros.length === 0) {
            historicoDiv.innerHTML += '<p>Nenhum registro de manutenção encontrado.</p>';
            return;
        }

        // Exibe cada registro
        registros.forEach((registro, index) => {
            const div = document.createElement('div');
            div.className = 'manutencao-registro';
            
            let htmlContent = `
                <p><strong>Molde:</strong> ${registro.molde}</p>
                <p><strong>Responsável:</strong> ${registro.responsavel}</p>
                <p><strong>Início:</strong> ${registro.dataIni} | <strong>Término:</strong> ${registro.dataTer}</p>
                <p><strong>Limpeza:</strong> ${registro.limpeza}</p>
                <p><strong>Molas:</strong> Cor: ${registro.molasCor || '-'}, Diâmetro: ${registro.molasDiametro || '-'}, QTD: ${registro.molasQtd || '-'}</p>
                `;
            
            div.innerHTML = htmlContent;
            historicoDiv.appendChild(div);
        });
    }

    // Ação ao submeter o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão
        
        // 1. Captura dos dados (Exemplo com os campos definidos)
        const novoRegistro = {
            molde: document.getElementById('molde').value,
            dataIni: document.getElementById('dataIni').value,
            dataTer: document.getElementById('dataTer').value,
            responsavel: document.getElementById('responsavel').value,
            
            // Itens de checklist
            limpeza: document.querySelector('input[name="limpeza"]:checked').value,
            molasCor: document.getElementById('molasCor').value,
            molasDiametro: document.getElementById('molasDiametro').value,
            molasQtd: document.getElementById('molasQtd').value,
            // ... adicione os demais campos aqui
        };

        // 2. Armazenamento no LocalStorage
        const registros = JSON.parse(localStorage.getItem('manutencaoRegistros')) || [];
        registros.push(novoRegistro);
        localStorage.setItem('manutencaoRegistros', JSON.stringify(registros));
        
        // 3. Feedback e Atualização
        alert('Registro de manutenção salvo com sucesso!');
        form.reset(); // Limpa o formulário após o registro
        carregarHistorico();
    });

    // Carrega o histórico ao iniciar a página
    carregarHistorico();
});