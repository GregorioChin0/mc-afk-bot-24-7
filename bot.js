const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Vanillaz724.aternos.me', 
        port: 39463,                
        username: 'BOT_247',    
        version: '1.21.1' // <-- Cambiado a una versión ultra estable para evitar fallos de protocolo con ViaVersion
    });

    bot.on('spawn', () => {
        console.log(`[NPC] El bot ha aparecido correctamente en el mapa.`);
        // Si tu servidor No-Premium requiere contraseña, descomenta la línea de abajo:
        // setTimeout(() => bot.chat('/login tu_contraseña'), 4000);
    });

    bot.on('login', () => {
        console.log(`[NPC] Conexión establecida con el servidor de Minecraft.`);
    });

    // Rutina Anti-AFK segura: Solo realiza saltos periódicos para evitar la expulsión por inactividad
    setInterval(async () => {
        if (!bot || !bot.entity) return;

        try {
            // Ejecutar acción de salto físico para evitar la inactividad de forma segura
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            console.log('[NPC] Acción anti-inactividad (salto) completada con éxito.');

        } catch (err) {
            console.log(`[NPC] Error en el ciclo de ejecución: ${err.message}`);
        }
    }, 45000);

    // Sistema de auto-reconexión segura tras expulsiones o reinicios del servidor
    bot.on('end', (reason) => {
        console.log(`[NPC] Conexión finalizada por: ${reason}. Reintentando en 25 segundos...`);
        setTimeout(createBot, 25000);
    });

    bot.on('error', (err) => console.log(`[NPC] Error crítico de red detectado: ${err}`));
}

createBot();
