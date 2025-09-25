const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const axios = require('axios'); // Adicionado para fazer requisições HTTP

const client = new Client();

// URL base da API do backend (onde o Flask estará rodando)
const API_BASE_URL = 'http://localhost:5001/api';

// QR Code para login
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Conexão concluída
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Inicialização
client.initialize();

// Função delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// -----------------------------------
// FUNIL DE ATENDIMENTO INTEGRADO
// -----------------------------------

client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) return; // Ignora grupos

    const texto = msg.body
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname?.split(" ")[0] || 'amigo';

    // Gatilhos de saudação e menu inicial
    const saudacoes = ['menu', 'oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'agendar'];

    if (saudacoes.some(s => texto.includes(s))) {
        await chat.sendStateTyping();
        await delay(1500);
        await client.sendMessage(msg.from, `Olá, ${name}! 👋 Sou o assistente virtual da *Clínica Odontológica Premium*.`);

        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            "🦷 Como posso ajudar hoje? Escolha uma opção:\n\n" +
            "1️⃣ - Agendar Consulta Online\n" +
            "2️⃣ - Consultar Horários Disponíveis\n" +
            "3️⃣ - Nossos Serviços\n" +
            "4️⃣ - Localização e Contato\n" +
            "5️⃣ - Falar com Atendente"
        );
        return;
    }

    // RESPOSTAS DO NOVO MENU
    switch (texto) {
        case '1': // Agendar Consulta Online
            await chat.sendStateTyping();
            await delay(1500);
            await client.sendMessage(msg.from, `Para agendar sua consulta de forma rápida e ver os horários disponíveis em tempo real, acesse nossa página de agendamento online: http://localhost:5001`);
            break;

        case '2': // Consultar Horários Disponíveis
            await chat.sendStateTyping();
            await delay(1500);
            await client.sendMessage(msg.from, `Para consultar os horários disponíveis, por favor, me diga a data desejada no formato DD/MM/AAAA (ex: 25/09/2025).`);
            break;

        case '3': // Nossos Serviços
            await chat.sendStateTyping();
            await delay(1500);
            await client.sendMessage(msg.from, `Oferecemos uma gama completa de serviços odontológicos, incluindo:\n\n*   Limpeza e Profilaxia\n*   Restaurações\n*   Extrações\n*   Tratamento de Canal\n*   Clareamento Dental\n*   Implantes e Próteses\n*   Ortodontia\n\nPara mais detalhes, visite nosso site ou agende uma avaliação!`);
            break;

        case '4': // Localização e Contato
            await chat.sendStateTyping();
            await delay(1500);
            await client.sendMessage(msg.from, `Estamos localizados na Rua Exemplo, 123 - Centro, Cidade. Nosso telefone é (11) 99999-9999. Aguardamos sua visita!`);
            break;

        case '5': // Falar com Atendente
            await chat.sendStateTyping();
            await delay(1500);
            await client.sendMessage(msg.from, `Um de nossos atendentes entrará em contato em breve para te ajudar. Por favor, aguarde.`);
            // Aqui você pode integrar com um sistema de CRM ou notificar um humano
            break;

        default:
            // Tenta interpretar como data para consulta de disponibilidade
            const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            const match = texto.match(dataRegex);

            if (match) {
                const [_, dia, mes, ano] = match;
                const dataFormatada = `${ano}-${mes}-${dia}`;
                try {
                    const response = await axios.get(`${API_BASE_URL}/disponibilidade?data=${dataFormatada}`);
                    const { horarios_disponiveis, horarios_ocupados } = response.data;

                    let mensagemDisponibilidade = `🗓️ *Horários disponíveis para ${dia}/${mes}/${ano}:*
`;
                    if (horarios_disponiveis.length > 0) {
                        mensagemDisponibilidade += `✅ ${horarios_disponiveis.join(', ')}\n`;
                    } else {
                        mensagemDisponibilidade += `Nenhum horário disponível.\n`;
                    }
                    if (horarios_ocupados.length > 0) {
                        mensagemDisponibilidade += `
❌ Horários ocupados: ${horarios_ocupados.join(', ')}\n`;
                    }
                    mensagemDisponibilidade += `
Para agendar, acesse: http://localhost:5001`;

                    await chat.sendStateTyping();
                    await delay(1500);
                    await client.sendMessage(msg.from, mensagemDisponibilidade);

                } catch (error) {
                    console.error('Erro ao consultar disponibilidade:', error.message);
                    await chat.sendStateTyping();
                    await delay(1500);
                    await client.sendMessage(msg.from, `Desculpe, não consegui consultar a disponibilidade para essa data. Por favor, tente novamente mais tarde ou verifique o formato da data (DD/MM/AAAA).`);
                }
            } else {
                // Fallback para opções inválidas
                await chat.sendStateTyping();
                await delay(1500);
                await client.sendMessage(msg.from, "❌ Opção inválida. Digite um número de *1 a 5*, uma *data (DD/MM/AAAA)* para consultar horários, ou escreva *menu* para voltar.");
            }
            break;
    }
});


