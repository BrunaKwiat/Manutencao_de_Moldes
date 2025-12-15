const API_URL = 'http://localhost:8080/manutencoes'; // Endereço do seu servidor Kotlin Ktor

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formManutencao');
    // ... (restante das variáveis)

    // Função para carregar os registros (agora via API)
    async function carregarHistorico() {
        historicoDiv.innerHTML = '<h2>Histórico de Manutenções</h2><p>Carregando...</p>';
        try {
            const response = await fetch(API_URL);
            const registros = await response.json();
            
            historicoDiv.innerHTML = '<h2>Histórico de Manutenções</h2>'; 
            
            // ... (Lógica para exibir os registros como antes, usando os dados 'registros')
            
        } catch (error) {
            historicoDiv.innerHTML = `<h2>Histórico de Manutenções</h2><p style="color:red;">Erro ao conectar com o servidor Kotlin: ${error.message}</p>`;
        }
    }

    // Ação ao submeter o formulário (agora enviando para a API)
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        // 1. Captura e formata dos dados (O objeto DEVE bater com a classe Manutencao em Kotlin!)
        const novoRegistro = {
            molde: document.getElementById('molde').value,
            dataIni: document.getElementById('dataIni').value,
            dataTer: document.getElementById('dataTer').value || null, // Se vazio, envia null (Kotlin pode lidar com String?)
            responsavel: document.getElementById('responsavel').value,
            // ... (demais campos)
            
            // O ID é deixado fora, pois será gerado pelo Backend Kotlin
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoRegistro),
            });
            
            if (response.ok) {
                alert('Registro de manutenção salvo com sucesso no servidor!');
                form.reset(); 
                await carregarHistorico();
            } else {
                const errorText = await response.text();
                alert(`Erro ao salvar no servidor: ${errorText}`);
            }

        } catch (error) {
            alert(`Falha na conexão de rede: ${error.message}`);
        }
    });

    carregarHistorico();
});