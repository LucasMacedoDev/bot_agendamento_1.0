# 🤖 WhatsApp Bot - Funil de Atendimento

Um bot de atendimento automatizado via **WhatsApp** usando a biblioteca [whatsapp-web.js](https://wwebjs.dev/).  
Este bot exibe um **menu interativo** baseado em mensagens de texto e responde de acordo com a opção escolhida pelo usuário.

---

## 📌 Funcionalidades
* ✅ Conexão com WhatsApp Web via **QR Code**  
* ✅ Detecção de saudações automáticas (`oi`, `ola`, `bom dia`, etc.)  
* ✅ Envio de **menu inicial com opções numeradas**  
* ✅ Respostas personalizadas para cada opção do menu  
* ✅ Simulação de digitação (`sendStateTyping`) com delays realistas  
* ✅ Normalização de texto (funciona com acentos e variações de maiúsculas/minúsculas)  
* ✅ Tratamento para opções inválidas  

---

## 🛠 Tecnologias Utilizadas
* [Node.js](https://nodejs.org/)  
* [whatsapp-web.js](https://github.com/whatsapp-web.js)  
* [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)  

---

## 📂 Estrutura do Projeto
📦 whatsapp-funil
┣ 📜 index.js # Código principal do bot
┣ 📜 package.json
┗ 📜 README.md

---

## 🚀 Como Executar

### 1️⃣ Clonar o repositório

git clone https://github.com/LucasMacedoDev/chat_bot_wpp

2️⃣ Instalar dependências

-Novo terminal - npm install - node chatbot.js


3️⃣ Rodar o bot

node index.js

4️⃣ Conectar ao WhatsApp

* Abra o WhatsApp no celular

* Vá em Aparelhos conectados > Conectar dispositivo

* Escaneie o QR Code exibido no terminal

terminal

📖 Fluxo do Atendimento

🔹 Gatilhos iniciais:

menu, oi, ola, olá, bom dia, boa tarde, boa noite

🔹 Menu exibido ao usuário:

1️⃣ - Como funciona
2️⃣ - Valores dos planos
3️⃣ - Benefícios
4️⃣ - Como aderir
5️⃣ - Outras perguntas

🔹 Exemplos de respostas:

* Opção 1: Explicação sobre funcionamento do serviço

* Opção 2: Valores dos planos

* Opção 3: Benefícios inclusos

* Opção 4: Como aderir

* Opção 5: Outras perguntas + link do site

Se o usuário digitar um número fora do menu, o bot responde com:

❌ Opção inválida. Digite um número de 1 a 5 ou escreva menu para voltar.

🎯 Objetivo

Criar um funil de atendimento automatizado que ajude a organizar os primeiros contatos com clientes, agilizando suporte e fornecendo informações rápidas.

📌 Status

✅ Projeto funcional e pronto para uso
🚀 Melhorias futuras: integração com banco de dados e envio de mídia (imagens, PDFs, etc.)
