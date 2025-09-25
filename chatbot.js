// Dependências
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

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
// FUNIL DE ATENDIMENTO
// -----------------------------------

client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) return; // Ignora grupos

    // Normaliza texto (minúsculo e sem acentos)
    const texto = msg.body
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    // Gatilhos de saudação
    const saudacoes = ['menu', 'oi', 'ola', 'bom dia', 'boa tarde', 'boa noite'];

    // MENU INICIAL
    if (saudacoes.some(s => texto.includes(s))) {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
        const name = contact.pushname?.split(" ")[0] || 'amigo';

        await chat.sendStateTyping();
        await delay(1500);
        await client.sendMessage(msg.from, `Olá, ${name}! 👋 Sou o assistente virtual da *Empresa Tal*.`);

        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from,
            "Como posso ajudar hoje? Escolha uma opção:\n\n" +
            "1️⃣ - Como funciona\n" +
            "2️⃣ - Valores dos planos\n" +
            "3️⃣ - Benefícios\n" +
            "4️⃣ - Como aderir\n" +
            "5️⃣ - Outras perguntas"
        );
        return;
    }

    // RESPOSTAS DO MENU
    const respostas = {
        "1": [
            "Nosso serviço oferece consultas médicas 24h pelo WhatsApp. 🚑\n\nSem carência, atendimento ilimitado, receitas e benefícios extras.",
            "👉 COMO FUNCIONA?\n\n1️⃣ Faça seu cadastro e escolha o plano.\n2️⃣ Após o pagamento, acesso imediato.\n3️⃣ Sempre que precisar, fale pelo WhatsApp.",
            "🔗 Link para cadastro: https://site.com"
        ],
        "2": [
            "*Plano Individual:* R$22,50/mês.\n\n*Plano Família:* R$39,90/mês (você +3 dependentes).\n\n*Plano TOP Individual:* R$42,50/mês.\n\n*Plano TOP Família:* R$79,90/mês (você +3 dependentes).",
            "🔗 Link para cadastro: https://site.com"
        ],
        "3": [
            "🎁 Sorteio de prêmios anuais.\n👨‍⚕️ Atendimento médico ilimitado 24h.\n💊 Receitas de medicamentos.",
            "🔗 Link para cadastro: https://site.com"
        ],
        "4": [
            "Você pode aderir aos planos pelo site ou WhatsApp.\n\nApós a adesão, terá acesso imediato. 🚀",
            "🔗 Link para cadastro: https://site.com"
        ],
        "5": [
            "Se tiver outras dúvidas, fale por aqui ou visite nosso site: https://site.com"
        ]
    };

    if (respostas[texto]) {
        const chat = await msg.getChat();
        for (let resposta of respostas[texto]) {
            await chat.sendStateTyping();
            await delay(2000);
            await client.sendMessage(msg.from, resposta);
        }
    } else if (/^\d+$/.test(texto)) {
        // Fallback para números inválidos
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(1500);
        await client.sendMessage(msg.from, "❌ Opção inválida. Digite um número de *1 a 5* ou escreva *menu* para voltar.");
    }
});
