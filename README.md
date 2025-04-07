# 🌴 專案名稱：放假好去處

根據使用者輸入的喜好、時間與地點條件，快速查詢最適合的活動與出遊地點，輕鬆規劃放假行程！

---

## 🔎 專案背景與動機

這個專案旨在解決「假日不知道去哪」的煩惱，使用者可透過選擇喜好類型、出發日期與地點，快速查詢符合條件的活動建議。  
我希望透過這個專案練習 API 串接、使用者輸入流程設計、前端條件過濾邏輯與 Tailwind + MUI 的混搭開發方式。

---

## 🧪 使用技術與堆疊

- **Next.js (React 18)**  
  使用 React + Next.js 建構應用，支援路由與頁面管理。

- **TypeScript**  
  加入靜態型別檢查，提升開發效率與程式可讀性。

- **Tailwind CSS**  
  原子化樣式工具，快速建構 RWD 並提升維護性。

- **MUI (Material UI)**  
  輔助輸入元件使用（如 Autocomplete、DatePicker），增強表單體驗。

- **React Hooks**  
  利用 `useState`、`useEffect`、`useCallback` 管理條件與查詢邏輯。

- **axios + SWR**  
  axios 負責抓資料，SWR 管理快取與更新邏輯，提升使用者體驗。

---

## 🧩 功能亮點

- ✅ **條件選擇介面**：支援選擇類型（如展覽、音樂）、地點、出發日期與費用
- ✅ **即時查詢與資料過濾**：根據條件調用 API 並過濾活動資料
- ✅ **活動清單顯示**：卡片列表呈現活動資訊，包含標題、時間、地點與費用
- ✅ **重新查詢功能**：快速返回首頁修改條件，提升搜尋體驗

---

## 🧱 專案架構簡介

📁 /components
└─ UI 元件，如 CitySelect、FavSelect、SubmitButton、Results

📁 /hooks
└─ 自定義 Hook，如 useFetchData 處理資料查詢與過濾

📁 /pages
└─ 主頁面，如 index.tsx，整合搜尋與顯示邏輯

📁 /utils
└─ 工具方法，如 createEmotionCache、過濾條件處理邏輯

---

## ⚙️ 開發過程中的挑戰與解決

- 💡 **資料過濾邏輯處理複雜：**  
  為了讓活動搜尋結果更精確，根據使用者輸入的多項條件（文字、日期、地點、費用）進行交叉比對與正則處理，讓搜尋結果更符合需求。

- 💡 **輸入體驗與互動性不足：**  
  透過 MUI 的 `Autocomplete` 與 `DatePicker` 元件，強化使用者輸入流程與錯誤提示，並使用 Tailwind 調整細節樣式，讓介面更直覺。

---

## 🎓 學習收穫

- 🔹 實作多條件查詢與前端資料過濾邏輯的整合方式
- 🔹 練習 SWR 快取與即時更新的資料管理流程
- 🔹 將 Tailwind 與 MUI 混合使用以達到風格與元件需求兼容
- 🔹 提升處理使用者輸入與 UX 流程的實戰能力
- 🔹 更熟悉 Next.js 架構與 hooks 的整體應用

---

## 🚀 線上展示與原始碼連結

- 🔗 [👉 線上 Try ](https://next-ts-where-to-play.vercel.app/)
- 🧑‍💻 [GitHub 原始碼](https://github.com/54hanyi/next-ts-whereToPlay)
