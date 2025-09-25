# Sistema de Agendamento Odontológico Integrado com WhatsApp

## 📋 Visão Geral

Este sistema integra seu bot de WhatsApp existente com uma página web de agendamento e um backend robusto para gerenciar consultas odontológicas. O sistema oferece:

- **Bot WhatsApp Inteligente**: Baseado no seu projeto original, agora com funcionalidades de agendamento
- **Página Web Responsiva**: Interface moderna para agendamento de consultas
- **Backend API**: Sistema completo de gerenciamento de horários e disponibilidade
- **Banco de Dados**: Armazenamento seguro de agendamentos e dados dos pacientes
- **Integração Completa**: Comunicação em tempo real entre todos os componentes

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Bot WhatsApp  │◄──►│  Backend Flask  │◄──►│ Banco de Dados  │
│  (Node.js)      │    │   (Python)      │    │   (SQLite)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Usuários      │    │  Página Web     │
│   WhatsApp      │    │   (HTML/JS)     │
└─────────────────┘    └─────────────────┘
```

## 🚀 Funcionalidades Principais

### Bot WhatsApp
- **Menu Interativo**: 5 opções principais de atendimento
- **Consulta de Disponibilidade**: Verificação de horários livres por data
- **Direcionamento para Agendamento**: Link direto para a página web
- **Confirmações Automáticas**: Notificações de agendamento via WhatsApp
- **Atendimento 24h**: Disponível a qualquer momento

### Página Web
- **Design Responsivo**: Funciona em desktop e mobile
- **Verificação de Disponibilidade**: Horários atualizados em tempo real
- **Formulário Inteligente**: Validação automática e formatação de dados
- **Interface Profissional**: Visual moderno e atrativo
- **Integração WhatsApp**: Confirmações automáticas após agendamento

### Backend API
- **Gestão de Horários**: Controle completo de disponibilidade
- **Validação de Dados**: Verificação de conflitos e dados inválidos
- **Notificações WhatsApp**: Integração com o bot para confirmações
- **Banco de Dados**: Armazenamento seguro e eficiente
- **CORS Habilitado**: Permite requisições do frontend

## 📁 Estrutura do Projeto

```
bot_agendamento_integrado/
├── src/
│   ├── models/
│   │   ├── agendamento.py      # Modelo de dados dos agendamentos
│   │   └── user.py             # Modelo de dados dos usuários
│   ├── routes/
│   │   ├── agendamento.py      # Rotas da API de agendamento
│   │   └── user.py             # Rotas da API de usuários
│   ├── static/
│   │   ├── index.html          # Página web de agendamento
│   │   └── dentista-nova.jpg   # Imagem da dentista
│   ├── database/
│   │   └── app.db              # Banco de dados SQLite
│   └── main.py                 # Aplicação Flask principal
├── chatbot_integrado.js        # Bot WhatsApp integrado
├── package.json                # Dependências Node.js
├── requirements.txt            # Dependências Python
└── venv/                       # Ambiente virtual Python
```

## 🛠️ Tecnologias Utilizadas

### Backend (Python)
- **Flask**: Framework web minimalista e eficiente
- **SQLAlchemy**: ORM para gerenciamento do banco de dados
- **Flask-CORS**: Habilitação de requisições cross-origin
- **SQLite**: Banco de dados leve e confiável

### Frontend (HTML/CSS/JavaScript)
- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilização responsiva com gradientes e animações
- **JavaScript ES6+**: Funcionalidades interativas e requisições AJAX
- **Fetch API**: Comunicação com o backend

### Bot WhatsApp (Node.js)
- **whatsapp-web.js**: Biblioteca para integração com WhatsApp
- **axios**: Cliente HTTP para requisições ao backend
- **qrcode-terminal**: Exibição do QR Code no terminal

## 📊 Fluxo de Funcionamento

### 1. Interação Inicial
```
Usuário → WhatsApp → Bot → Menu de Opções
```

### 2. Consulta de Disponibilidade
```
Usuário → Bot → "Consultar horários" → Backend API → Resposta com horários livres
```

### 3. Agendamento via Web
```
Usuário → Link da página → Formulário → Backend API → Banco de Dados → Confirmação WhatsApp
```

### 4. Confirmação Automática
```
Backend → Bot WhatsApp → Mensagem de confirmação → Usuário
```

## 🔧 APIs Disponíveis

### GET /api/disponibilidade
**Descrição**: Consulta horários disponíveis para uma data específica

**Parâmetros**:
- `data` (string): Data no formato YYYY-MM-DD

**Resposta**:
```json
{
  "data": "2025-09-30",
  "horarios_disponiveis": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  "horarios_ocupados": []
}
```

### POST /api/agendar
**Descrição**: Cria um novo agendamento

**Corpo da Requisição**:
```json
{
  "nome": "João Silva",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "data": "2025-09-30",
  "horario": "10:00",
  "servico": "consulta-geral",
  "observacoes": "Primeira consulta"
}
```

**Resposta de Sucesso**:
```json
{
  "success": true,
  "message": "Agendamento criado com sucesso",
  "agendamento_id": 1
}
```

## 🎯 Comandos do Bot WhatsApp

### Menu Principal
- **"oi"**, **"olá"**, **"menu"**: Exibe o menu principal
- **"1"**: Agendar consulta (envia link da página web)
- **"2"**: Consultar horários disponíveis
- **"3"**: Informações sobre serviços
- **"4"**: Localização da clínica
- **"5"**: Contato e emergências

### Consulta de Horários
- **Data no formato DD/MM/AAAA**: Ex: "30/09/2025"
- Retorna horários disponíveis para a data informada

## 💾 Banco de Dados

### Tabela: agendamentos
```sql
CREATE TABLE agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    data DATE NOT NULL,
    horario TIME NOT NULL,
    servico VARCHAR(50) NOT NULL,
    observacoes TEXT,
    status VARCHAR(20) DEFAULT 'agendado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Horários de Funcionamento
- **Segunda a Sexta**: 08:00 às 12:00 e 14:00 às 18:00
- **Intervalos**: Consultas de 1 hora
- **Horários Disponíveis**: 08:00, 09:00, 10:00, 11:00, 14:00, 15:00, 16:00, 17:00

## 🔒 Segurança e Validações

### Validações do Frontend
- **Campos Obrigatórios**: Nome, telefone, data, horário e serviço
- **Formatação Automática**: Telefone brasileiro com máscara
- **Data Mínima**: Não permite agendamento em datas passadas
- **Horários Dinâmicos**: Apenas horários disponíveis são exibidos

### Validações do Backend
- **Conflito de Horários**: Impede agendamentos duplicados
- **Formato de Data**: Validação de formato e data válida
- **Dados Obrigatórios**: Verificação de campos essenciais
- **Sanitização**: Limpeza de dados de entrada

## 📱 Responsividade

### Desktop (1200px+)
- Layout em duas colunas
- Formulário lado a lado com informações da clínica
- Imagem de fundo com overlay

### Tablet (768px - 1199px)
- Layout adaptado para telas médias
- Elementos reorganizados para melhor usabilidade

### Mobile (até 767px)
- Layout em coluna única
- Formulário em tela cheia
- Botões e campos otimizados para toque

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: #25D366 (Verde WhatsApp)
- **Secundária**: #128C7E (Verde escuro)
- **Gradiente de Fundo**: #667eea → #764ba2
- **Texto**: #333333 (Escuro) / #666666 (Médio)

### Tipografia
- **Fonte Principal**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tamanhos**: 2.5rem (títulos), 1.2rem (subtítulos), 1rem (texto)

### Animações
- **Hover Effects**: Transformações suaves nos botões
- **Focus States**: Bordas coloridas e sombras nos campos
- **Transições**: 0.3s ease para todas as interações

## 🚀 Próximos Passos e Melhorias

### Funcionalidades Futuras
1. **Sistema de Lembretes**: Notificações automáticas antes da consulta
2. **Reagendamento**: Possibilidade de alterar horários via WhatsApp
3. **Cancelamento**: Opção de cancelar consultas
4. **Histórico**: Consulta de agendamentos anteriores
5. **Múltiplos Profissionais**: Agendamento com dentistas específicos

### Melhorias Técnicas
1. **Autenticação**: Sistema de login para pacientes
2. **Dashboard Admin**: Interface para gerenciar agendamentos
3. **Relatórios**: Estatísticas de agendamentos e ocupação
4. **Backup Automático**: Cópia de segurança do banco de dados
5. **Deploy em Produção**: Configuração para servidor real

### Integrações Adicionais
1. **Calendário Google**: Sincronização com agenda do dentista
2. **Sistema de Pagamento**: Integração com gateways de pagamento
3. **SMS**: Confirmações via SMS além do WhatsApp
4. **Email Marketing**: Campanhas automáticas para pacientes

## 📞 Suporte e Manutenção

### Logs e Monitoramento
- **Logs do Flask**: Registros de todas as requisições
- **Logs do Bot**: Histórico de conversas e comandos
- **Banco de Dados**: Timestamps de todas as operações

### Backup e Recuperação
- **Banco de Dados**: Backup diário recomendado
- **Arquivos Estáticos**: Versionamento de imagens e assets
- **Configurações**: Backup das configurações do bot

### Troubleshooting Comum
1. **Bot não conecta**: Verificar QR Code e conexão
2. **API não responde**: Verificar se o Flask está rodando
3. **Horários não carregam**: Verificar CORS e conectividade
4. **Agendamento falha**: Verificar validações e banco de dados

---

**Desenvolvido com ❤️ para revolucionar o agendamento odontológico através da automação inteligente.**

