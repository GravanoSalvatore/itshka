<template>
    <div :class="{ 'dark-mode': isDarkMode }" class="crypto-news">
        <h3 class="text-center">Новости от зарубежных коллег</h3>
      <!-- Горизонтальный список кнопок -->
      <div class="crypto-buttons">
        <button
          :class="{ 'dark-mode': isDarkMode }"
          v-for="coin in coins"
          :key="coin"
          class="crypto-button"
          @click="fetchNews(coin)"
        >
          <img :src="getCoinIcon(coin)" :alt="coin" class="coin-icon" />
          {{ coin }}
        </button>
      </div>
  
      <!-- Блок с новостями -->
      <div v-if="loading" class="loading text-center">  
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      <div v-else class="news-list">
        <div
          v-for="(article, index) in paginatedArticles"
          :key="article.id"
          class="news-item"
        >
          <div
            :class="{ 'dark-mode': isDarkMode }"
            class="h-100 news-card"
            style="max-height: 500px"
          >
            <img
              :src="article.imageurl || 'https://via.placeholder.com/300x200'"
              class="card-img-top img-fluid"
              alt="news image"
              style="height: 200px; object-fit: cover"
            />
            <div
              :class="{ 'dark-mode': isDarkMode }"
              class="card-body d-flex flex-column"
            >
              <p>
                <img
                  style="width: 35px; height: 35px"
                  :src="article.source_info?.img || 'https://via.placeholder.com/35x35'"
                />
                {{ article.source_info?.name || 'Unknown Source' }}
              </p>
              <a :href="article.url" target="_blank" class="mt-auto">
                <h5 style="font-size: 14px;" class="card-title p-2 fw-bold">
                  {{ article.title || 'No Title Available' }}
                </h5>
              </a>
              <p style="color: cornflowerblue" class="card-text p-2">
                {{ article.published_on
                  ? formatDate(article.published_on)
                  : 'Unknown Date' }}
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <button
        class="close-button"
        v-if="articles.length > 0"
        @click="clearNews"
      >
        Close
      </button>
  
      <!-- Пагинация -->
      <div v-if="articles.length > 0" class="pagination">
        <button
          :class="{ 'dark-mode': isDarkMode }"
          v-if="visibleCount < articles.length"
          class="btn-pagination"
          @click="showMore"
        >
          Show
        </button>
        <button
          :class="{ 'dark-mode': isDarkMode }"
          v-if="visibleCount > 9"
          class="btn-pagination"
          @click="hideNews"
        >
          Hide
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        progress: 0,
        
        
  coins: [
    // Previous 44 coins
    "BTC", "ETH", "XRP", "SOL", "TRX", "ADA", "DOGE", "XLM", "LINK", "LTC", 
    "MATIC", "UNI", "USDT", "DOT", "AVAX", "FIL", 
    "ATOM", "BNB", "ALGO", "NEAR", "ICP", "SAND", "MANA", "COMP", "MKR", 
    "BAT", "ZRX", "HBAR", "YFI", "AAVE",  "GRT", "QNT", "FLOW", 
    "XTZ", "DASH", "ZEC", "ETC", "NEO",
    // 6 New additions
    "USDC", "THETA", "ONE", "WAVES", "AR", "CHZ"
  ],
  coinIcons: {
    // Previous 44 icons
    'BTC': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    'ETH': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    'XRP': 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    'SOL': 'https://cryptologos.cc/logos/solana-sol-logo.png',
    'TRX': 'https://cryptologos.cc/logos/tron-trx-logo.png',
    'ADA': 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    'DOGE': 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    'XLM': 'https://cryptologos.cc/logos/stellar-xlm-logo.png',
    'LINK': 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    'LTC': 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    'MATIC': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    'UNI': 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    'USDT': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    'DOT': 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    'AVAX': 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    'FIL': 'https://cryptologos.cc/logos/filecoin-fil-logo.png',
    'ATOM': 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
    'BNB': 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    'ALGO': 'https://cryptologos.cc/logos/algorand-algo-logo.png',
    'NEAR': 'https://cryptologos.cc/logos/near-protocol-near-logo.png',
    'ICP': 'https://cryptologos.cc/logos/internet-computer-icp-logo.png',
    'SAND': 'https://cryptologos.cc/logos/the-sandbox-sand-logo.png',
    'MANA': 'https://cryptologos.cc/logos/decentraland-mana-logo.png',
    'COMP': 'https://cryptologos.cc/logos/compound-comp-logo.png',
    'MKR': 'https://cryptologos.cc/logos/maker-mkr-logo.png',
    'BAT': 'https://cryptologos.cc/logos/basic-attention-token-bat-logo.png',
    'ZRX': 'https://cryptologos.cc/logos/0x-zrx-logo.png',
    'CRV': 'https://cryptologos.cc/logos/curve-dao-crv-logo.png',
    'YFI': 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.png',
    'AAVE': 'https://cryptologos.cc/logos/aave-aave-logo.png',
    
    'GRT': 'https://cryptologos.cc/logos/the-graph-grt-logo.png',
    'QNT': 'https://cryptologos.cc/logos/quant-qnt-logo.png',
    'FLOW': 'https://cryptologos.cc/logos/flow-flow-logo.png',
    'XTZ': 'https://cryptologos.cc/logos/tezos-xtz-logo.png',
    'DASH': 'https://cryptologos.cc/logos/dash-dash-logo.png',
    'ZEC': 'https://cryptologos.cc/logos/zcash-zec-logo.png',
    'ETC': 'https://cryptologos.cc/logos/ethereum-classic-etc-logo.png',
    'NEO': 'https://cryptologos.cc/logos/neo-neo-logo.png',
    // 6 New icons
    'HBAR': 'https://cryptologos.cc/logos/hedera-hashgraph-hbar-logo.png',
  
    'USDC': 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    'THETA': 'https://cryptologos.cc/logos/theta-theta-logo.png',
    'ONE': 'https://cryptologos.cc/logos/harmony-one-logo.png',
    'WAVES': 'https://cryptologos.cc/logos/waves-waves-logo.png',
    'AR': 'https://cryptologos.cc/logos/arweave-ar-logo.png',
    'CHZ': 'https://cryptologos.cc/logos/chiliz-chz-logo.png'
  }

,
        showAllNews: true,
        articles: [],
        loading: false,
        isDarkMode: false,
        visibleCount: 10,
      };
    },
    computed: {
      paginatedArticles() {
        return this.articles.slice(0, this.visibleCount);
      },
    },
    methods: {
      getCoinIcon(coin) {
        return this.coinIcons[coin] || 'https://via.placeholder.com/35x35';
      },
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      async fetchNews(coin) {
        this.loading = true;
        this.articles = [];
        this.visibleCount = 10;
        this.progress = 0;
        const interval = setInterval(() => {
          if (this.progress < 90) {
            this.progress += 10;
          }
        }, 200);
        try {
          const response = await axios.get(
            `https://min-api.cryptocompare.com/data/v2/news/?categories=${coin}&excludeCategories=Sponsored`
          );
  
          this.articles = response.data.Data.map((item) => ({
            id: item.id,
            title: item.title || "No Title Available",
            snippet: item.body || "No Snippet Available",
            url: item.url || "#",
            imageurl: item.imageurl || "https://via.placeholder.com/300x200",
            source_info: item.source_info || {
              img: "https://via.placeholder.com/35x35",
              name: "Unknown Source",
            },
            published_on: item.published_on || null,
          }));
          this.progress = 100;
        } catch (error) {
          console.error("Ошибка при получении новостей:", error.message);
          this.articles = [];
        } finally {
          clearInterval(interval);
          setTimeout(() => {
            this.loading = false;
            this.progress = 0;
          }, 500);
         this.loading = false;
        }
      },
      toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
      },
      showMore() {
        this.visibleCount += 10;
      },
      hideNews() {
        this.visibleCount = 10;
        this.scrollToTop();
      },
      clearNews() {
        this.articles = [];
        this.visibleCount = 10;
        this.scrollToTop();
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    },
  };
  </script>
  
  <!-- <style scoped>
  .crypto-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .crypto-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .crypto-button:hover {
    background-color: #f0f0f0;
  }
  
  .coin-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .dark-mode .crypto-button {
    background-color: #333;
    color: white;
    border-color: #555;
  }
  
  .dark-mode .crypto-button:hover {
    background-color: #444;
  }
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .progress-bar-container {
    width: 300px;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #4CAF50;
    transition: width 0.3s ease;
  }
  
  .news-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .news-item {
    display: flex;
  }
  
  .news-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }
  
  .news-card:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn-pagination, .close-button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-pagination:hover, .close-button:hover {
    background-color: #f0f0f0;
  }
  
  .dark-mode {
    background-color: #1a1a1a;
    color: #fff;
  }
  
  .dark-mode .news-card {
    background-color: #2a2a2a;
    border-color: #444;
  }
  </style>
  
   -->
  <style scoped>
    .crypto-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .crypto-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .crypto-button:hover {
    background-color: #f0f0f0;
  }
  
  .coin-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .dark-mode .crypto-button {
    background-color: #333;
    color: white;
    border-color: #555;
  }
  
  .dark-mode .crypto-button:hover {
    background-color: #444;
  }
  .progress-bar-container {
  width: 100%;
  /* background-color: #ffffff; */
  border-radius: 5px;
  overflow: hidden;
  height: 5px;
  margin: 20px 0;
}

.progress-bar {
  height: 100%;
  background-color:var(--text-color);
  /* background-color: cornflowerblue; */
  transition: width 0.2s;
}

  :root {
    --link-color: #000000;
    --text-color: #000000;
    --box-shadow-color: rgba(73, 69, 69, 0.3);
    background-color: #ffffff;
  }
  
  .dark-mode {
    --link-color: #ffffff;
    --text-color: #ffffff;
    --box-shadow-color: rgba(238, 235, 235, 0.3);
    background-color: rgba(9, 21, 32, 0.9);
  }
  
  body,
  .dark-mode {
    color: var(--text-color);
    background-color: var(--background-color);
  }
  
  .crypto-news {
    padding: 20px;
  }
  
  .crypto-buttons {
    display: flex;
    gap: 10px;
    /* margin-bottom: 20px; */
    flex-wrap: wrap;
  }
  .crypto-button:hover {
    color:orange;
  }
  .crypto-button {
    color: var(--link-color);
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: transparent !important;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: bold;
  }
  
  .news-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 20px;
  }
  
  .news-item {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .news-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
  
  .card-body {
    color: var(--text-color);
  }
  
  .pagination {
    text-align: center;
    margin: 20px 0;
  }
  
  .btn-pagination {
    font-weight: bold;
    padding: 10px 20px;
   background-color: transparent !important;
   color: var(--link-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  a{
   
    color: var(--link-color);
    text-decoration: none;
  }
  .close-button {
    font-weight: bold;
    color: red;
    /* color: var(--text-color); */
    /* margin-top: 20px; */
    /* position: fixed;
    bottom: 20px;
    right: 20px; */
    background-color: transparent !important;
    /* color: white; */
    border: none;
    /* border-radius: 50%;
    width: 50px;
    height: 50px; */
    font-size: 14px;
    cursor: pointer;
  }
  
  .close-button:hover {
    background-color: darkred;
  }
  </style>