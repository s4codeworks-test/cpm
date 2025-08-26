const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('.'));

// Headers adicionais para debugging
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Arquivo para armazenar partidas
const MATCHES_FILE = path.join(__dirname, 'matches.json');

// Credenciais de admin (em produção, use um sistema mais seguro)
const ADMIN_CREDENTIALS = {
  username: 'cpmadmin2025',
  password: 'cpm9299'
};

// Funções utilitárias
async function readMatches() {
  try {
    if (await fs.pathExists(MATCHES_FILE)) {
      return await fs.readJson(MATCHES_FILE);
    }
    return {
      oitavas: [],
      quartas: [],
      semifinais: [],
      final: []
    };
  } catch (error) {
    console.error('Erro ao ler partidas:', error);
    return {
      oitavas: [],
      quartas: [],
      semifinais: [],
      final: []
    };
  }
}

async function writeMatches(matches) {
  try {
    await fs.writeJson(MATCHES_FILE, matches, { spaces: 2 });
    return true;
  } catch (error) {
    console.error('Erro ao salvar partidas:', error);
    return false;
  }
}

// Rotas da API

// Login do painel administrativo
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.json({ success: true, message: 'Login realizado com sucesso' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

// Obter todas as partidas
app.get('/api/matches', async (req, res) => {
  try {
    const matches = await readMatches();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Adicionar uma nova partida
app.post('/api/add-match', async (req, res) => {
  try {
    const { round, teamA, teamB, scoreA, scoreB } = req.body;
    
    // Validação básica
    if (!round || !teamA?.name || !teamB?.name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados obrigatórios: round, teamA.name, teamB.name' 
      });
    }

    const matches = await readMatches();
    
    // Criar nova partida
    const newMatch = {
      id: Date.now(), // ID simples baseado em timestamp
      teamA: {
        name: teamA.name,
        logo: teamA.logo || 'default_logo.png'
      },
      teamB: {
        name: teamB.name,
        logo: teamB.logo || 'default_logo.png'
      },
      scoreA: scoreA ? parseInt(scoreA) : null,
      scoreB: scoreB ? parseInt(scoreB) : null,
      createdAt: new Date().toISOString()
    };

    // Adicionar à fase correspondente
    if (!matches[round]) {
      matches[round] = [];
    }
    
    matches[round].push(newMatch);
    
    // Salvar no arquivo
    const saved = await writeMatches(matches);
    
    if (saved) {
      res.json({ 
        success: true, 
        message: 'Partida adicionada com sucesso',
        match: newMatch
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Erro ao salvar partida' 
      });
    }
    
  } catch (error) {
    console.error('Erro ao adicionar partida:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Atualizar uma partida existente
app.put('/api/update-match/:id', async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);
    const { round, teamA, teamB, scoreA, scoreB } = req.body;
    
    const matches = await readMatches();
    let matchFound = false;
    
    // Procurar e atualizar a partida
    for (const roundKey in matches) {
      const matchIndex = matches[roundKey].findIndex(match => match.id === matchId);
      if (matchIndex !== -1) {
        matches[roundKey][matchIndex] = {
          ...matches[roundKey][matchIndex],
          teamA: teamA || matches[roundKey][matchIndex].teamA,
          teamB: teamB || matches[roundKey][matchIndex].teamB,
          scoreA: scoreA !== undefined ? parseInt(scoreA) : matches[roundKey][matchIndex].scoreA,
          scoreB: scoreB !== undefined ? parseInt(scoreB) : matches[roundKey][matchIndex].scoreB,
          updatedAt: new Date().toISOString()
        };
        matchFound = true;
        break;
      }
    }
    
    if (!matchFound) {
      return res.status(404).json({
        success: false,
        message: 'Partida não encontrada'
      });
    }
    
    const saved = await writeMatches(matches);
    
    if (saved) {
      res.json({ 
        success: true, 
        message: 'Partida atualizada com sucesso' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Erro ao salvar alterações' 
      });
    }
    
  } catch (error) {
    console.error('Erro ao atualizar partida:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Deletar uma partida
app.delete('/api/delete-match/:id', async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);
    const matches = await readMatches();
    let matchFound = false;
    
    // Procurar e remover a partida
    for (const roundKey in matches) {
      const matchIndex = matches[roundKey].findIndex(match => match.id === matchId);
      if (matchIndex !== -1) {
        matches[roundKey].splice(matchIndex, 1);
        matchFound = true;
        break;
      }
    }
    
    if (!matchFound) {
      return res.status(404).json({
        success: false,
        message: 'Partida não encontrada'
      });
    }
    
    const saved = await writeMatches(matches);
    
    if (saved) {
      res.json({ 
        success: true, 
        message: 'Partida removida com sucesso' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Erro ao salvar alterações' 
      });
    }
    
  } catch (error) {
    console.error('Erro ao deletar partida:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Painel administrativo: http://localhost:${PORT}/painel.html`);
  console.log(`🏆 Site principal: http://localhost:${PORT}/index.html`);
  console.log(`📋 Login do painel: cpmadmin2025 / cpm9299`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Servidor sendo encerrado...');
  process.exit(0);
});