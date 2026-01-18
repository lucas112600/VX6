import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// 初始化 Gemini (具名參數)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 中間件配置
app.use(cors());
app.use(bodyParser.json());

// --- [ 1. 核心 API 路由區塊 (最高優先級) ] ---

/**
 * Discord OAuth2 認證交換
 */
app.post('/api/auth/token', async (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ 
            error: 'Missing code', 
            message: '缺少 Authorization Code，無法完成認證流程。' 
        });
    }

    try {
        console.log(`[AUTH] 正在處理認證請求...`);
        
        const clientSecret = process.env.DISCORD_CLIENT_SECRET;
        if (!clientSecret) {
            console.error("[AUTH] 缺失 DISCORD_CLIENT_SECRET 環境變數");
            return res.status(500).json({ error: 'Server configuration error', message: '伺服器端 Discord 金鑰配置錯誤。' });
        }

        const params = new URLSearchParams({
            client_id: '1461898209268994090',
            client_secret: clientSecret, 
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://vx6-tickets-pro-dashboard-802805842262.us-west1.run.app/',
        });

        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const tokenData = await tokenResponse.json();
        if (!tokenResponse.ok) {
            console.error("[AUTH] Discord API Token 錯誤:", tokenData);
            return res.status(tokenResponse.status).json(tokenData);
        }

        // 獲取使用者資料與伺服器列表
        const [userRes, guildsRes] = await Promise.all([
            fetch('https://discord.com/api/users/@me', { 
                headers: { Authorization: `Bearer ${tokenData.access_token}` } 
            }),
            fetch('https://discord.com/api/users/@me/guilds', { 
                headers: { Authorization: `Bearer ${tokenData.access_token}` } 
            })
        ]);

        const user = await userRes.json();
        const guilds = await guildsRes.json();

        if (!userRes.ok || !guildsRes.ok) {
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }

        // 過濾具有管理權限或擁有權的伺服器 (Manage Guild permission: 0x20)
        const manageableGuilds = Array.isArray(guilds) 
            ? guilds.filter(g => (BigInt(g.permissions) & 0x20n) === 0x20n || g.owner) 
            : [];

        res.json({ user, guilds: manageableGuilds });
    } catch (err) {
        console.error("[AUTH] 內部伺服器錯誤:", err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

/**
 * AI 對話分析
 */
app.post('/api/ai/analyze', async (req, res) => {
    const { messages, industry } = req.body;
    try {
        const prompt = `你是一位專業的 ${industry || '通用'} 領域 Discord 管理專家。請分析以下工單對話紀錄，並回傳純 JSON 物件，包含 summary (摘要), sentiment (情緒), recommendation (行動建議), estimatedProfit (預估價值，純數字)。\n對話內容：\n${messages?.join('\n')}`;
        
        const result = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        
        res.json(JSON.parse(result.text.trim()));
    } catch (err) {
        console.error("[AI] 分析失敗:", err);
        res.status(500).json({ error: 'AI Analysis Failed' });
    }
});

/**
 * 工單清單 (Mock)
 */
app.get('/api/tickets', (req, res) => {
    res.json([]);
});

// --- [ 2. API 專用 404 捕獲器 ] ---
// 確保所有 /api/* 的未定義請求回傳 JSON 錯誤，而非 index.html
app.all('/api/*', (req, res) => {
    res.status(404).json({ 
        error: 'API Not Found', 
        message: `找不到路徑: ${req.method} ${req.path}`,
        status: 404
    });
});

// --- [ 3. 靜態資源服務 ] ---
app.use(express.static(__dirname));

// --- [ 4. SPA 路由 Fallback ] ---
// 非 API 且找不到檔案的請求，統一導向 index.html 由 React Router 處理
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 全域錯誤處理
app.use((err, req, res, next) => {
    console.error(`[CRITICAL ERROR] ${err.stack}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`[VX6 PRO] 後端核心已啟動，監聽埠號: ${PORT}`);
    console.log(`[VX6 PRO] API 路由與 404 捕獲器已就緒。`);
});