export type Step = 'welcome' | 'intro' | 'style' | 'categories' | 'detail';

export type CategoryKey = 'rules' | 'board' | 'scripts' | 'companion';

export interface SkyStats {
  server: string; // e.g. 官服/双平台
  wings: string; // e.g. 12翼 (228光翼)
  height: string; // e.g. 0号大只 / 猛男
  entrySeason: string; // e.g. 圣岛季 / 归属季
  usualOutfits: string[]; // e.g. ["白鸟发型", "黑金斗篷", "武士裤", "排箫"]
  favoriteMaps: string[]; // e.g. ["云野大厅", "霞谷终点", "千鸟城", "雨林树屋"]
  onlineTime: string; // e.g. 晚间 19:30 - 24:00 (周末全天可约)
}

export interface ReviewItem {
  id: string;
  clientName: string;
  avatarSeed?: string;
  date: string;
  rating: number; // 1-5
  tag: string;
  content: string;
  reply?: string;
  likes: number;
}

export interface ScriptItem {
  id: string;
  category: '日常问候' | '跑图护航' | '树屋夜聊' | '治愈安慰' | '特殊节日';
  title: string;
  quote: string;
  context: string;
  tone: string;
}

export interface NoticeSection {
  title: string;
  iconName: string;
  items: string[];
}

export interface ProfileData {
  siteTitle: string;
  siteSubtitle: string;
  welcomeGreeting: string;
  welcomeIntro: string;
  avatarUrl: string;
  bannerUrl?: string;
  infoImageUrl?: string;
  nickname: string;
  handle: string;
  badgeTitle: string;
  contactUid: string;
  contactWeChatOrQQ: string;
  bioSummary: string;
  fullBio: string;
  skyStats: SkyStats;
  styleTags: string[];
  styleDescription: string;
  styleHighlights: {
    title: string;
    description: string;
    badge: string;
  }[];
  screenshots: {
    url: string;
    caption: string;
  }[];
  notices: NoticeSection[];
  boardReviews: ReviewItem[];
  scripts: ScriptItem[];
  companionReviews: ReviewItem[];
}
