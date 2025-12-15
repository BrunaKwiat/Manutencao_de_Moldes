document.getElementById('formMolde').addEventListener('submit', function(e) {
e.preventDefault();


const dados = {
molde: molde.value,
responsavel: responsavel.value,
dataInicio: dataIni.value,
dataTermino: dataTer.value,
limpeza: document.querySelector('input[name="limpeza"]:checked')?.value,
molas: {
cor: molaCor.value,
diametro: molaDiam.value,
quantidade: molaQtd.value
},
parafusos: {
quantidade: parafusoQtd.value,
medida: parafusoMedida.value
},
pinosExtrator: {
quantidade: pinoQtd.value,
diametro: pinoDiam.value
},
engatesAgua: document.querySelector('input[name="agua"]:checked')?.value,
polimento: document.querySelector('input[name="polimento"]:checked')?.value
};


localStorage.setItem('manutencaoMolde', JSON.stringify(dados, null, 2));
document.getElementById('saida').textContent = JSON.stringify(dados, null, 2);
});