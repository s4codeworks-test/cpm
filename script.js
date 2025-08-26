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

  // ===== NOVO: CARREGAR DADOS =====
  // Fase A (sem backend): buscar data.json da mesma pasta
  const SOURCE = 'http://localhost:3000/api/matches';

  async function loadData() {
    try {
      const res = await fetch(SOURCE);
      if (!res.ok) throw new Error('Falha ao carregar dados');
      const data = await res.json();
      renderMatches('oitavas', data.oitavas);
      renderMatches('quartas', data.quartas);
      renderMatches('semifinais', data.semifinais);
      renderMatches('final', data.final);
    } catch (e) {
      console.error(e);
      // Mostra mensagem simples nos containers
      ['oitavas','quartas','semifinais','final'].forEach(id => {
        const c = document.querySelector(`#${id} .matches-container`);
        if (c) c.innerHTML = `<p style="opacity:.8">Erro ao carregar ${id}.</p>`;
      });
    }
  }

  function renderMatches(roundId, matches = []) {
    const container = document.querySelector(`#${roundId} .matches-container`);
    if (!container) return;
    container.innerHTML = '';

    if (!matches.length) {
      container.innerHTML = `<p style="text-align:center; opacity:.8">Sem jogos definidos nesta fase.</p>`;
      return;
    }

    matches.forEach(match => {
      const scoreA = match.scoreA ?? '';
      const scoreB = match.scoreB ?? '';
      const card = document.createElement('div');
      card.className = 'match-card';
      card.innerHTML = `
        <div class="team team-a">
          <img src="${match.teamA.logo}" alt="Logo ${match.teamA.name}" class="team-logo">
          <span class="team-name">${match.teamA.name}</span>
          ${scoreA !== '' ? `<span class="team-score" style="font-weight:700;margin-top:6px;">${scoreA}</span>` : ''}
        </div>
        <span class="vs">VS</span>
        <div class="team team-b">
          <img src="${match.teamB.logo}" alt="Logo ${match.teamB.name}" class="team-logo">
          <span class="team-name">${match.teamB.name}</span>
          ${scoreB !== '' ? `<span class="team-score" style="font-weight:700;margin-top:6px;">${scoreB}</span>` : ''}
        </div>
        <div class="match-overlay">
          <button class="match-button">Ver Partida</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  loadData();
});