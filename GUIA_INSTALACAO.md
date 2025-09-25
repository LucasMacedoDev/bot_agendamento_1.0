# 🚀 Guia de Instalação - Sistema de Agendamento Odontológico

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatórios
- **Python 3.8+**: [Download Python](https://www.python.org/downloads/)
- **Node.js 16+**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)

### Verificação dos Pré-requisitos
```bash
# Verificar Python
python --version
# ou
python3 --version

# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

## 📁 1. Preparação do Ambiente

### 1.1. Clonar ou Extrair o Projeto
Se você recebeu um arquivo ZIP:
```bash
# Extrair o arquivo ZIP
unzip bot_agendamento_integrado.zip
cd bot_agendamento_integrado
```

Se você tem acesso ao repositório Git:
```bash
# Clonar o repositório
git clone [URL_DO_REPOSITORIO]
cd bot_agendamento_integrado
```

### 1.2. Estrutura do Projeto
Após extrair/clonar, você deve ver esta estrutura:
```
bot_agendamento_integrado/
├── src/                    # Código do backend Flask
├── chatbot_integrado.js    # Bot do WhatsApp
├── package.json           # Dependências Node.js
├── requirements.txt       # Dependências Python
├── venv/                  # Ambiente virtual (pode não existir ainda)
└── documentação/          # Arquivos de documentação
```

## 🐍 2. Configuração do Backend (Python/Flask)

### 2.1. Criar Ambiente Virtual
```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# No Windows:
venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate
```

**Importante**: Você deve ver `(venv)` no início da linha do seu terminal, indicando que o ambiente virtual está ativo.

### 2.2. Instalar Dependências Python
```bash
# Com o ambiente virtual ativo
pip install -r requirements.txt

# Ou instalar manualmente:
pip install flask flask-sqlalchemy flask-cors requests
```

### 2.3. Testar o Backend
```bash
# Iniciar o servidor Flask
python src/main.py
```

**O que esperar**:
```
 * Serving Flask app 'main'
 * Debug mode: on
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5001
 * Running on http://[SEU_IP]:5001
```

**Teste no navegador**: Acesse `http://localhost:5001` - você deve ver a página de agendamento.

## 📱 3. Configuração do Bot WhatsApp (Node.js)

### 3.1. Instalar Dependências Node.js
Em um **novo terminal** (mantenha o Flask rodando no primeiro):
```bash
# Navegar para a pasta do projeto
cd bot_agendamento_integrado

# Instalar dependências
npm install
```

### 3.2. Iniciar o Bot WhatsApp
```bash
# Iniciar o bot
node chatbot_integrado.js
```

**O que esperar**: Um QR Code será exibido no terminal.

### 3.3. Conectar o WhatsApp
1. **No seu celular**, abra o WhatsApp
2. Vá em **Configurações** → **Aparelhos Conectados**
3. Toque em **Conectar um aparelho**
4. **Escaneie o QR Code** que apareceu no terminal
5. Aguarde a mensagem: `🦷 Bot da Clínica Odontológica conectado!`

## ✅ 4. Teste Completo do Sistema

### 4.1. Testar a Página Web
1. Acesse `http://localhost:5001` no navegador
2. Preencha o formulário de agendamento:
   - **Nome**: Seu nome
   - **Telefone**: Seu número do WhatsApp
   - **Data**: Uma data futura (ex: amanhã)
   - **Horário**: Selecione um horário disponível
   - **Serviço**: Escolha um tipo de consulta
3. Clique em **"Agendar Consulta"**
4. Você deve receber uma confirmação no WhatsApp!

### 4.2. Testar o Bot WhatsApp
1. **No seu celular**, envie uma mensagem para o número conectado
2. Digite **"oi"** ou **"menu"**
3. Teste as opções:
   - **1**: Agendar consulta (recebe link da página)
   - **2**: Consultar horários (digite uma data como "30/09/2025")
   - **3, 4, 5**: Outras informações

## 🔧 5. Configurações Avançadas

### 5.1. Alterar Porta do Servidor
Se a porta 5001 estiver ocupada, edite `src/main.py`:
```python
# Linha final do arquivo
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)  # Altere para 5002
```

### 5.2. Personalizar Horários de Funcionamento
Edite `src/routes/agendamento.py`:
```python
# Encontre esta linha e altere os horários
horarios_funcionamento = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
```

### 5.3. Personalizar Mensagens do Bot
Edite `chatbot_integrado.js` para alterar as mensagens automáticas.

## 🚨 6. Solução de Problemas Comuns

### Problema: "Python não encontrado"
**Solução**:
- **Windows**: Reinstale o Python marcando "Add Python to PATH"
- **macOS/Linux**: Use `python3` em vez de `python`

### Problema: "npm não encontrado"
**Solução**: Reinstale o Node.js do site oficial

### Problema: "Erro ao ativar ambiente virtual"
**Solução Windows PowerShell**:
```powershell
# Execute como Administrador
Set-ExecutionPolicy RemoteSigned
```

### Problema: "QR Code não aparece"
**Solução**:
1. Pare o bot (Ctrl+C)
2. Delete a pasta `.wwebjs_auth` se existir
3. Reinicie: `node chatbot_integrado.js`

### Problema: "Página não carrega"
**Verificações**:
1. Flask está rodando? Veja se aparece a mensagem "Running on..."
2. Porta correta? Acesse `http://localhost:5001`
3. Firewall bloqueando? Temporariamente desative

### Problema: "Bot não responde"
**Verificações**:
1. QR Code foi escaneado corretamente?
2. WhatsApp Web está funcionando no navegador?
3. Conexão com internet estável?

### Problema: "Horários não carregam na página"
**Verificações**:
1. Backend está rodando?
2. Teste a API: `http://localhost:5001/api/disponibilidade?data=2025-09-30`
3. Console do navegador mostra erros? (F12 → Console)

## 📱 7. Uso em Produção

### 7.1. Configurações de Segurança
```python
# Em src/main.py, altere para produção:
app.run(host='0.0.0.0', port=5001, debug=False)  # debug=False
```

### 7.2. Banco de Dados
- Para produção, considere migrar de SQLite para PostgreSQL ou MySQL
- Faça backups regulares do arquivo `src/database/app.db`

### 7.3. Servidor Web
- Use um servidor WSGI como Gunicorn para o Flask
- Configure um proxy reverso com Nginx

## 📞 8. Comandos Úteis

### Parar os Serviços
```bash
# Parar Flask: Ctrl+C no terminal do Flask
# Parar Bot: Ctrl+C no terminal do Bot
```

### Reiniciar Tudo
```bash
# Terminal 1 - Backend
cd bot_agendamento_integrado
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows
python src/main.py

# Terminal 2 - Bot
cd bot_agendamento_integrado
node chatbot_integrado.js
```

### Verificar Logs
```bash
# Logs do Flask aparecem no terminal onde foi iniciado
# Logs do Bot aparecem no terminal onde foi iniciado
```

## 🎯 9. Próximos Passos

Após a instalação bem-sucedida:

1. **Personalize** as mensagens e horários conforme sua clínica
2. **Teste** extensivamente com diferentes cenários
3. **Treine** sua equipe para usar o sistema
4. **Configure** backups automáticos
5. **Monitore** o uso e performance

## 📚 10. Recursos Adicionais

- **Documentação Completa**: `DOCUMENTACAO_COMPLETA.md`
- **Código Fonte**: Explore os arquivos em `src/`
- **Personalização**: Edite `src/static/index.html` para alterar a página

---

**🎉 Parabéns! Seu sistema de agendamento odontológico está funcionando!**

Se você seguiu todos os passos e ainda tem problemas, verifique:
1. Todos os pré-requisitos estão instalados?
2. Os dois terminais estão rodando (Flask + Bot)?
3. O QR Code foi escaneado corretamente?
4. A internet está funcionando?

**Dica**: Mantenha os dois terminais abertos enquanto usar o sistema!

