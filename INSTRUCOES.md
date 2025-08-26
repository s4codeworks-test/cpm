# 🚀 Instruções de Uso - Sistema CPM

## ✅ Status Atual do Sistema

**Servidor Backend:** ✅ Funcionando  
**API REST:** ✅ Funcionando  
**Painel Admin:** ✅ Atualizado  
**Credenciais:** ✅ Atualizadas  

## 🔐 Novas Credenciais de Login

- **Usuário:** `cpmadmin2025`
- **Senha:** `cpm9299`

## 📋 Como Usar o Sistema

### 1. Verificar se o Servidor Está Rodando
```bash
# No terminal, execute:
npm start
```

O servidor deve exibir:
```
🚀 Servidor rodando em http://localhost:3000
📊 Painel administrativo: http://localhost:3000/painel.html
🏆 Site principal: http://localhost:3000/index.html
📋 Login do painel: cpmadmin2025 / cpm9299
```

### 2. Acessar o Sistema

#### Site Principal (Usuários)
- **URL:** http://localhost:3000/index.html
- **Função:** Visualizar partidas e placares

#### Painel Administrativo
- **URL:** http://localhost:3000/painel.html
- **Login:** cpmadmin2025 / cpm9299
- **Função:** Gerenciar partidas

#### Página de Teste (Diagnóstico)
- **URL:** http://localhost:3000/teste.html
- **Função:** Verificar conectividade

### 3. Solucionando Problemas de Conectividade

Se o painel mostrar erro de conexão:

1. **Verificar Servidor:**
   ```bash
   curl http://localhost:3000/api/matches
   ```

2. **Testar Login:**
   ```bash
   curl -X POST -H "Content-Type: application/json" \
   -d '{"username":"cpmadmin2025","password":"cpm9299"}' \
   http://localhost:3000/login
   ```

3. **Usar Página de Teste:**
   - Acesse http://localhost:3000/teste.html
   - Clique em "Testar Servidor" e "Testar Login"
   - Verifique os resultados

### 4. Reiniciar o Sistema

Se necessário, reinicie o servidor:

```bash
# Parar o servidor (Ctrl+C no terminal)
# Depois executar:
npm start
```

### 5. Funcionalidades do Painel

1. **Dashboard:** Estatísticas em tempo real
2. **Adicionar Partidas:** 
   - Selecione a fase
   - Digite nomes dos times
   - Adicione logos (opcional)
   - Informe placares (opcional)
3. **Gerenciar:** Visualizar e excluir partidas

## 🛠 Melhorias Implementadas

- ✅ Credenciais atualizadas para cpmadmin2025/cpm9299
- ✅ CORS configurado corretamente
- ✅ Headers de debugging adicionados
- ✅ Tratamento de erro melhorado
- ✅ Múltiplas URLs de conexão testadas
- ✅ Página de teste criada
- ✅ Design moderno mantido

## 📞 Se o Problema Persistir

1. Verifique se não há firewall bloqueando a porta 3000
2. Teste usando 127.0.0.1:3000 em vez de localhost:3000
3. Abra o console do navegador (F12) para ver erros
4. Use a página de teste para diagnóstico completo

---

**Sistema totalmente funcional e pronto para uso!** 🎉