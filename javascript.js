 // Helpers
    const qs = s => document.querySelector(s);
    const qsa = s => document.querySelectorAll(s);

    // Molas table handling
    const molas = [];
    const molasTableBody = qs('#molasTable tbody');
    const renderMolas = () => {
      molasTableBody.innerHTML = '';
      molas.forEach((m, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(m.cor)}</td><td>${escapeHtml(m.diam)}</td><td>${m.qtd}</td><td><button data-index="${i}" class="btn secondary removeMola">Remover</button></td>`;
        molasTableBody.appendChild(tr);
      });
      updatePreview();
    };

    function escapeHtml(str){ return String(str||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

    qs('#addMola').addEventListener('click', ()=>{
      const cor = qs('#molasCor').value.trim();
      const diam = qs('#molasDiam').value.trim();
      const qtd = Number(qs('#molasQtd').value) || 0;
      if(!cor && !diam && qtd===0){ alert('Preencha ao menos um campo de mola.'); return; }
      molas.push({cor, diam, qtd});
      qs('#molasCor').value = '';
      qs('#molasDiam').value = '';
      qs('#molasQtd').value = 0;
      renderMolas();
    });

    molasTableBody.addEventListener('click', (e)=>{
      if(e.target.matches('.removeMola')){
        const i = Number(e.target.dataset.index);
        molas.splice(i,1);
        renderMolas();
      }
    });

    // Form operations
    function readForm(){
      const form = {};
      form.moldeQuantidade = Number(qs('#moldeQuantidade').value) || 0;
      form.responsavel = qs('#responsavel').value;
      form.dataInicio = qs('#dataInicio').value;
      form.dataTermino = qs('#dataTermino').value;
      form.limpeza = (qs('input[name=limpeza]:checked')||{}).value || null;
      form.molas = [...molas];
      form.parafusos = {
        quantidade: Number(qs('#parafQtd').value)||0,
        alen: qs('#parafAlen').value,
        mm: qs('#parafMM').value
      };
      form.pinos = { quantidade: Number(qs('#pinosQtd').value)||0, diametro: qs('#pinosDiam').value };
      form.engates = { value: (qs('input[name=engates]:checked')||{}).value || null, quantidade: Number(qs('#engatesQtd').value)||0 };
      form.polimento = (qs('input[name=polimento]:checked')||{}).value || null;
      return form;
    }

    function fillForm(data){
      qs('#moldeQuantidade').value = data.moldeQuantidade || 0;
      qs('#responsavel').value = data.responsavel || '';
      qs('#dataInicio').value = data.dataInicio || '';
      qs('#dataTermino').value = data.dataTermino || '';
      if(data.limpeza) qs(`input[name=limpeza][value="${data.limpeza}"]`).checked = true;
      molas.splice(0, molas.length, ...(data.molas||[]));
      renderMolas();
      qs('#parafQtd').value = (data.parafusos && data.parafusos.quantidade) || 0;
      qs('#parafAlen').value = (data.parafusos && data.parafusos.alen) || '';
      qs('#parafMM').value = (data.parafusos && data.parafusos.mm) || '';
      qs('#pinosQtd').value = (data.pinos && data.pinos.quantidade) || 0;
      qs('#pinosDiam').value = (data.pinos && data.pinos.diametro) || '';
      if(data.engates && data.engates.value) qs(`input[name=engates][value="${data.engates.value}"]`).checked = true;
      qs('#engatesQtd').value = (data.engates && data.engates.quantidade) || 0;
      if(data.polimento) qs(`input[name=polimento][value="${data.polimento}"]`).checked = true;
      updatePreview();
    }

    // Preview
    function updatePreview(){
      const data = readForm();
      qs('#preview').textContent = JSON.stringify(data, null, 2);
    }

    // Wire inputs to preview updates
    qsa('input,select').forEach(i=>i.addEventListener('input', updatePreview));

    // Save / Load localStorage
    const STORAGE_KEY = 'formMolde:v1';
    qs('#saveBtn').addEventListener('click', ()=>{
      const data = readForm();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      alert('Salvo localmente no navegador.');
    });
    qs('#loadBtn').addEventListener('click', ()=>{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw){ alert('Nenhum dado salvo localmente.'); return; }
      try{ const data = JSON.parse(raw); fillForm(data); alert('Dados carregados.'); }catch(e){ alert('Erro ao carregar.'); }
    });

    // Export JSON
    qs('#exportBtn').addEventListener('click', ()=>{
      const data = readForm();
      const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'form_molde.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    });

    // Print
    qs('#printBtn').addEventListener('click', ()=>{
      // Prepare a printable view
      const data = readForm();
      const w = window.open('', '_blank');
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Relatório</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:20px}pre{white-space:pre-wrap}</style></head><body><h2>Relatório - Molde e Componentes</h2><pre>${escapeHtml(JSON.stringify(data,null,2))}</pre></body></html>`;
      w.document.open(); w.document.write(html); w.document.close();
      w.focus();
      // give the new window a moment then print
      setTimeout(()=>{ w.print(); }, 300);
    });

    // Initial preview
    renderMolas();
    updatePreview();

    // update preview when molas array changes (already called in render)
  