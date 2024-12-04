<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="crypto-news">
    <h4 class="text-center">Новости альткоинов от зарубежных коллег</h4>

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

    <!-- Модальное окно для новостей -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div  class="modal-container">
        <div class="modal-header">
          <h4 class="mt-3">{{ selectedCoin }}</h4>
          <button
            style="color: cornflowerblue"
            @click="closeModal"
            class="close-modal-btn"
          >
            ×
          </button>
        </div>

        <!-- Индикатор загрузки -->
        <div v-if="loading" class="loading text-center">
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
        </div>

        <!-- Список новостей в модальном окне -->
        <div   v-else class="modal-news-list">
          <div
            v-for="article in paginatedArticles"
            :key="article.id"
            class="news-item"
          >
            <div class="h-100 news-card" style="max-height: 500px">
              <img
                :src="article.imageurl || 'https://via.placeholder.com/300x200'"
                class="card-img-top img-fluid"
                alt="news image"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body d-flex flex-column">
                <p>
                  <img
                    style="width: 35px; height: 35px"
                    :src="
                      article.source_info?.img ||
                      'https://via.placeholder.com/35x35'
                    "
                  />
                  {{ article.source_info?.name || "Unknown Source" }}
                </p>
                <a :href="article.url" target="_blank" class="mt-auto">
                  <h5 style="font-size: 14px" class="card-title p-2 fw-bold">
                    {{ article.title || "No Title Available" }}
                  </h5>
                </a>
                <p style="color: cornflowerblue" class="card-text p-2">
                  {{
                    article.published_on
                      ? formatDate(article.published_on)
                      : "Unknown Date"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Пагинация в модальном окне -->
        <div v-if="articles.length > 0" class="modal-pagination">
          <button
            v-if="visibleCount < articles.length"
            class="btn-pagination"
            @click="showMore"
          >
            Show More
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
        "BTC",
        "ETH",
        "XRP",
        "SOL",
        "TRX",
        "ADA",
        "DOGE",
        "XLM",
        "LINK",
        "LTC",
        "MATIC",
        "UNI",
        "USDT",
        "DOT",
        "AVAX",
        "FIL",
        "ATOM",
        "BNB",
        "ALGO",
        "NEAR",
        "ICP",
        "SAND",
        "MANA",
        "COMP",
        "MKR",
        "BAT",
        "ZRX",
        "HBAR",
        "YFI",
        "AAVE",
        "GRT",
        "QNT",
        "FLOW",
        "XTZ",
        "DASH",
        "ZEC",
        "ETC",
        "NEO",
        // 6 New additions
        "USDC",
        "THETA",
        "ONE",
        "WAVES",
        "AR",
        "CHZ",
      ],
      coinIcons: {
        // Previous 44 icons
        BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
        SOL: "https://cryptologos.cc/logos/solana-sol-logo.png",
        TRX: "https://cryptologos.cc/logos/tron-trx-logo.png",
        ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png",
        DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
        XLM: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
        LINK: "https://cryptologos.cc/logos/chainlink-link-logo.png",
        LTC: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
        MATIC: "https://cryptologos.cc/logos/polygon-matic-logo.png",
        UNI: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
        USDT: "https://cryptologos.cc/logos/tether-usdt-logo.png",
        DOT: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
        AVAX: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
        FIL: "https://cryptologos.cc/logos/filecoin-fil-logo.png",
        ATOM: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
        BNB: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        ALGO: "https://cryptologos.cc/logos/algorand-algo-logo.png",
        NEAR: "https://cryptologos.cc/logos/near-protocol-near-logo.png",
        ICP: "https://cryptologos.cc/logos/internet-computer-icp-logo.png",
        SAND: "https://cryptologos.cc/logos/the-sandbox-sand-logo.png",
        MANA: "https://cryptologos.cc/logos/decentraland-mana-logo.png",
        COMP: "https://cryptologos.cc/logos/compound-comp-logo.png",
        MKR: "https://cryptologos.cc/logos/maker-mkr-logo.png",
        BAT: "https://cryptologos.cc/logos/basic-attention-token-bat-logo.png",
        ZRX: "https://cryptologos.cc/logos/0x-zrx-logo.png",
        CRV: "https://cryptologos.cc/logos/curve-dao-crv-logo.png",
        YFI: "https://cryptologos.cc/logos/yearn-finance-yfi-logo.png",
        AAVE: "https://cryptologos.cc/logos/aave-aave-logo.png",

        GRT: "https://cryptologos.cc/logos/the-graph-grt-logo.png",
        QNT: "https://cryptologos.cc/logos/quant-qnt-logo.png",
        FLOW: "https://cryptologos.cc/logos/flow-flow-logo.png",
        XTZ: "https://cryptologos.cc/logos/tezos-xtz-logo.png",
        DASH: "https://cryptologos.cc/logos/dash-dash-logo.png",
        ZEC: "https://cryptologos.cc/logos/zcash-zec-logo.png",
        ETC: "https://cryptologos.cc/logos/ethereum-classic-etc-logo.png",
        NEO: "https://cryptologos.cc/logos/neo-neo-logo.png",
        // 6 New icons
        HBAR: "https://cryptologos.cc/logos/hedera-hashgraph-hbar-logo.png",

        USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
        THETA: "https://cryptologos.cc/logos/theta-theta-logo.png",
        ONE: "https://cryptologos.cc/logos/harmony-one-logo.png",
        WAVES: "https://cryptologos.cc/logos/waves-waves-logo.png",
        AR: "https://cryptologos.cc/logos/arweave-ar-logo.png",
        CHZ: "https://cryptologos.cc/logos/chiliz-chz-logo.png",
      },
      showModal: false,
      selectedCoin: "",
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
      return this.coinIcons[coin] || "https://via.placeholder.com/35x35";
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
      this.selectedCoin = coin;
      this.articles = [];
      this.visibleCount = 12;
      this.progress = 0;
      this.showModal = true;

      const interval = setInterval(() => {
        if (this.progress < 90) {
          this.progress += 12;
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
      }
    },
    closeModal() {
      this.showModal = false;
      this.articles = [];
      this.visibleCount = 12;
    },
    showMore() {
      this.visibleCount += 12;
    },
    hideNews() {
      this.visibleCount = 12;
    },
  },
};
</script>

<style scoped>
:root {
    --link-color: #000000; /* Цвет ссылок в светлой теме */
    --text-color: #000000; /* Основной цвет текста в светлой теме */
    --background-color: #ffffff;
  }
  
  .dark-mode {
    --link-color: #ffffff; /* Цвет ссылок в тёмной теме */
    --text-color: #ffffff; /* Основной цвет текста в тёмной теме */
    /* background-color: #01263f; */
    --background-color: #01263f;
  }
  
  body, .dark-mode {
    color: var(--text-color); /* Использование переменной для цвета текста */
    background-color: var(--background-color);
  }



.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: var(--background-color); */
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: var(--background-color);
  width: 90%;
  max-width: auto;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.close-modal-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-news-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

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

.coin-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.progress-bar-container {
  width: 100%;

  border-radius: 5px;
  overflow: hidden;
  height: 5px;
  margin: 20px 0;
}

.progress-bar {
  height: 100%;
  background-color: var(--text-color);

  transition: width 0.2s;
}

.crypto-news {
  padding: 20px;
}

.crypto-buttons {
  display: flex;
  gap: 10px;

  flex-wrap: wrap;
}
.crypto-button:hover {
  color: orange;
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

a {
  color: var(--link-color);
  text-decoration: none;
}
</style>
