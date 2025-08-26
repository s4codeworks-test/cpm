// ===== VISUAIS JÁ EXISTENTES =====
console.log("Site do Campeonato Paulista de MamoBall carregado!");

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  const handleScroll = () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handleScroll);

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(elem => revealObserver.observe(elem));

  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const round = button.dataset.round;
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(round).classList.add('active');
    });
  });

  // ===== CARREGAR DADOS DO BACKEND =====
  const API_URL = 'http://localhost:3000/api/matches';

  async function loadData() {
    try {
      console.log('Carregando dados do backend...');
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      
      console.log('Dados carregados:', data);
      
      // Renderizar cada fase
      renderMatches('oitavas', data.oitavas || []);
      renderMatches('quartas', data.quartas || []);
      renderMatches('semifinais', data.semifinais || []);
      renderMatches('final', data.final || []);
      
      // Atualizar a cada 30 segundos para mostrar mudanças em tempo real
      setTimeout(loadData, 30000);
      
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
      
      // Tentar carregar dados do arquivo local como fallback
      try {
        console.log('Tentando carregar dados locais como fallback...');
        const localRes = await fetch('./data.json');
        if (localRes.ok) {
          const localData = await localRes.json();
          renderMatches('oitavas', localData.oitavas || []);
          renderMatches('quartas', localData.quartas || []);
          renderMatches('semifinais', localData.semifinais || []);
          renderMatches('final', localData.final || []);
          console.log('Dados locais carregados com sucesso');
        }
      } catch (localError) {
        console.error('Erro ao carregar dados locais:', localError);
        // Mostra mensagem de erro nos containers
        ['oitavas','quartas','semifinais','final'].forEach(id => {
          const c = document.querySelector(`#${id} .matches-container`);
          if (c) c.innerHTML = `
            <div style="text-align:center; padding:2rem; opacity:0.8;">
              <p style="color:#ef4444; margin-bottom:1rem;">⚠️ Erro ao carregar dados</p>
              <p style="font-size:0.9rem;">Verifique se o servidor está rodando</p>
            </div>
          `;
        });
      }
    }
  }

  function renderMatches(roundId, matches = []) {
    const container = document.querySelector(`#${roundId} .matches-container`);
    if (!container) return;
    container.innerHTML = '';

    if (!matches.length) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem; opacity:0.8;">
          <p style="color:#64748b; margin-bottom:0.5rem;">📅 Nenhuma partida agendada</p>
          <p style="font-size:0.9rem; color:#94a3b8;">As partidas desta fase serão definidas em breve</p>
        </div>
      `;
      return;
    }

    matches.forEach(match => {
      const scoreA = match.scoreA;
      const scoreB = match.scoreB;
      const hasScore = scoreA !== null && scoreA !== undefined && scoreB !== null && scoreB !== undefined;
      const isFinished = hasScore;
      
      const card = document.createElement('div');
      card.className = 'match-card';
      
      // Determinar o vencedor se houver placar
      let winnerClass = '';
      if (isFinished) {
        if (scoreA > scoreB) {
          winnerClass = 'winner-a';
        } else if (scoreB > scoreA) {
          winnerClass = 'winner-b';
        }
      }
      
      card.innerHTML = `
        <div class="team team-a ${winnerClass === 'winner-a' ? 'winner' : ''}">
          <img src="${match.teamA.logo}" alt="Logo ${match.teamA.name}" class="team-logo" 
               onerror="this.src='cpm.png'; this.style.opacity='0.5';">
          <span class="team-name">${match.teamA.name}</span>
          ${isFinished ? `<span class="team-score">${scoreA}</span>` : ''}
        </div>
        
        <div class="vs-container">
          ${isFinished ? 
            `<span class="score-display">${scoreA} x ${scoreB}</span>` : 
            `<span class="vs">VS</span>`
          }
          ${isFinished ? '<div class="match-status finished">Finalizada</div>' : '<div class="match-status scheduled">Agendada</div>'}
        </div>
        
        <div class="team team-b ${winnerClass === 'winner-b' ? 'winner' : ''}">
          <img src="${match.teamB.logo}" alt="Logo ${match.teamB.name}" class="team-logo"
               onerror="this.src='cpm.png'; this.style.opacity='0.5';">
          <span class="team-name">${match.teamB.name}</span>
          ${isFinished ? `<span class="team-score">${scoreB}</span>` : ''}
        </div>
        
        <div class="match-overlay">
          <button class="match-button">
            ${isFinished ? 'Ver Resultado' : 'Ver Partida'}
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  loadData();
});