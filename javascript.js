document.getElementById('manutencaoForm').addEventListener('submit', function(event) {
    // Impede o envio padrão do formulário (que recarregaria a página)
    event.preventDefault(); 

    // Coleta o formulário e a área de resultado
    const form = event.target;
    const resultadoDiv = document.getElementById('resultado');

    // Cria um objeto FormData para pegar todos os valores do formulário
    const formData = new FormData(form);
    let dadosRegistro = "--- NOVO REGISTRO ADICIONADO ---\n";

    // Itera sobre os dados e formata para exibição
    for (const [key, value] of formData.entries()) {
        // Formata as chaves para melhor leitura (ex: "dataIni" vira "Data Início")
        const label = key.replace(/([A-Z])/g, ' $1')
                         .replace(/^./, str => str.toUpperCase());

        // Adiciona ao texto do registro
        dadosRegistro += `${label}: ${value || 'Não Informado'}\n`;
    }

    // Exibe a mensagem de sucesso e os dados coletados
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `
        <p>✅ **REGISTRO ADICIONADO COM SUCESSO!**</p>
        <pre>${dadosRegistro}</pre>
        <p>Estes dados seriam enviados para o seu servidor ou banco de dados.</p>
    `;

    // Opcional: Limpa o formulário após o envio
    // form.reset(); 
});