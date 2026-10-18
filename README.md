# 魔女審判模擬 — 孤島監牢

粉絲向《魔法少女的魔女審判》辯論小遊戲。使用原作角色名稱；劇情為粉絲向短案，非遊戲本篇。

## 文本切換

標題畫面可自由選擇文本：

| 文本 | 說明 |
|------|------|
| **無聲的鐘樓** | 現行重寫稿（對白對齊本篇人設） |
| **祈禱堂的餘燼** | 封存舊稿（已微調艾瑪／希羅口吻） |

選擇會記在瀏覽器本地，並重置目前進度。

## 章節流程

1. **序章** — 十三人抵達監獄島、醒來、互相認識  
2. 日常（限次探訪：關鍵必去、選修換筆記）  
3. 事件  
4. 搜索  
5. 審判辯論（圈選矛盾句 + 出示證據）→ 指認  
6. 結局（正／誤）  
7. **終章**（僅正解）— 眾人收拾殘局、訂下規矩、繼續活下去  

左下角可開**推理筆記**；右上角可**跳過本章**。容錯 3 次。指認需自行推理（介面不劇透兇手）。

## 本機執行

```bash
npm install
npm run dev
```

開發伺服器：`http://127.0.0.1:47321`

```bash
npm run build
npm run build:pages   # 產出 GitHub Pages 用的 /magia-verdict/ 路徑
npm run count:chars
```

## GitHub Pages（手機可開的公開網頁）

倉庫需在 **github.com** 上，並啟用 Pages（此專案已附 `.github/workflows/deploy-pages.yml`）：

1. 在 GitHub 建立（或推送）同名倉庫 `magia-verdict`，建議設為 **Public**（免費方案才能用 Pages）。
2. **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
3. 推送 `main` 或 `develop` 後，Actions 會自動建置並發布。
4. 網址約為：`https://<你的GitHub帳號>.github.io/magia-verdict/`

若倉庫目前只在 Cursor Origin、尚未連到 github.com，請先在 GitHub 建庫並把遠端推上去，Pages 才會生效。

## 技術

Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion

## 分支

遊戲開發請在 `develop` 進行；勿直接推 `main`。
