export const APP_NAME = "VX6 Pro";
export const CLIENT_ID = "1461898209268994090";
export const REDIRECT_URI = "https://vx6-tickets-pro-dashboard-802805842262.us-west1.run.app/";

export type IndustryType = 'proxy' | 'studio' | 'community' | 'club';

export const DISCORD_LOGIN_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds+email`;

export const BOT_INVITE_URL = `https://discord.com/authorize?client_id=${CLIENT_ID}&permissions=8&integration_type=0&scope=bot+applications.commands`;

export interface AppConfig {
  industry: IndustryType;
}

export const getIndustryConfig = (): IndustryType => {
  return (localStorage.getItem('vx6_industry') as IndustryType) || 'studio';
};

export const setIndustryConfig = (type: IndustryType) => {
  localStorage.setItem('vx6_industry', type);
};

export const getBotConfig = (): AppConfig => {
  return {
    industry: getIndustryConfig(),
  };
}