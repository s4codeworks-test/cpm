# 🏆 Sistema CPM - Campeonato Paulista de MamoBall

Sistema completo para gerenciamento do Campeonato Paulista de MamoBall com API backend e painel administrativo moderno.

## 🚀 Status do Sistema

✅ **Servidor Backend** - Funcionando em http://localhost:3000
✅ **API REST** - Endpoints funcionais para CRUD de partidas
✅ **Painel Administrativo** - Design moderno e responsivo
✅ **Frontend Dinâmico** - Carregamento automático dos dados
✅ **Persistência** - Dados salvos em arquivo JSON

## 📱 Acesso ao Sistema

### Site Principal
- **URL**: http://localhost:3000/index.html
- **Funcionalidades**: 
  - Visualização das partidas por fase
  - Placares em tempo real
  - Design responsivo
  - Atualização automática a cada 30 segundos

### Painel Administrativo
- **URL**: http://localhost:3000/painel.html
- **Credenciais**:
  - Usuário: `cpmadmin2025`
  - Senha: `cpm9299`
- **Funcionalidades**:
  - Dashboard com estatísticas
  - Adicionar partidas com placares
  - Visualizar todas as partidas registradas
  - Excluir partidas
  - Design moderno com glassmorphism

## 🎮 Como Usar

### 1. Acessar o Painel
1. Abra http://localhost:3000/painel.html
2. Faça login com admin/cpm2024
3. Use o dashboard para gerenciar partidas

### 2. Adicionar Partidas
1. Selecione a fase (Oitavas, Quartas, Semifinais, Final)
2. Digite os nomes dos times
3. Informe os logos (opcional)
4. Adicione placares (opcional para partidas agendadas)
5. Clique em "Adicionar Partida"

### 3. Visualizar no Site
1. Abra http://localhost:3000/index.html
2. Navegue entre as abas das diferentes fases
3. Veja partidas finalizadas com placares
4. Partidas sem placar aparecem como "Agendadas"

## 🛠 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + CSS3 + JavaScript vanilla
- **Persistência**: Arquivo JSON
- **UI/UX**: Design moderno com glassmorphism e animações
- **Responsividade**: Mobile-first design

## 📊 API Endpoints

### Autenticação
- `POST /login` - Login do painel administrativo

### Partidas
- `GET /api/matches` - Listar todas as partidas
- `POST /api/add-match` - Adicionar nova partida
- `PUT /api/update-match/:id` - Atualizar partida
- `DELETE /api/delete-match/:id` - Excluir partida

## 🎨 Recursos do Design

### Painel Administrativo
- ✨ Glassmorphism com blur effects
- 🎯 Dashboard com estatísticas em tempo real
- 📱 Totalmente responsivo
- 🚀 Animações suaves
- 🎨 Paleta de cores moderna
- 💫 Feedback visual para todas as ações

### Site Principal
- 🏆 Visual esportivo profissional
- 📊 Exibição clara de placares
- 🏅 Destaque para times vencedores
- ⚡ Atualização automática
- 📱 Experiência mobile otimizada

## 📈 Exemplos de Uso

### Partida Finalizada
```json
{
  "round": "oitavas",
  "teamA": {"name": "Corinthians Steamrollers", "logo": "corinthians.png"},
  "teamB": {"name": "Santos Tsunamis", "logo": "santos.png"},
  "scoreA": 3,
  "scoreB": 1
}
```

### Partida Agendada
```json
{
  "round": "quartas",
  "teamA": {"name": "Palmeiras Esmeraldas", "logo": "palmeiras.png"},
  "teamB": {"name": "São Paulo Soberanos", "logo": "saopaulo.png"}
}
```

## 🔧 Manutenção

- Dados armazenados em `/workspace/matches.json`
- Logs do servidor disponíveis no terminal
- Backup automático a cada alteração
- Sistema resiliente com fallbacks

---

**Sistema desenvolvido e testado** ✅  
**Pronto para uso em produção** 🚀