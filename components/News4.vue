<!-- <template>
    <div class="container-fluid">
      <div class="row">
        
        <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
          <div class="sidebar-content">
            <div v-for="crypto in topCryptos" :key="crypto.id" class="sidebar-crypto-item">
              <div class="sidebar-crypto-card d-flex align-items-center">
                <img :src="crypto.image" class="crypto-icon" alt="crypto icon" />
                <div class="crypto-info ms-2">
                  <h5 class="crypto-name">{{ crypto.name }}</h5>
                  <p class="crypto-price">Цена: {{ crypto.current_price.toFixed(2) }} USD</p>
                  <p class="crypto-market-cap">Капитализация: {{ formatMarketCap(crypto.market_cap) }}</p>
                  <p class="crypto-change d-flex align-items-center">
                    <span :class="{'text-success': crypto.price_change_percentage_24h >= 0, 'text-danger': crypto.price_change_percentage_24h < 0}">
                      <i :class="{'fas fa-arrow-up': crypto.price_change_percentage_24h >= 0, 'fas fa-arrow-down': crypto.price_change_percentage_24h < 0}"></i>
                      {{ crypto.price_change_percentage_24h.toFixed(2) }}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
       
        <div class="col-12 col-md-9" ref="newsContainer">
          <div class="row">
            <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="col-12 col-md-12 col-lg-4 mb-4">
              <div class="card h-100 news-card" style="max-height: 500px;">
                <img
                  v-if="newsItem.urlToImage"
                  :src="newsItem.urlToImage"
                  class="card-img-top"
                  alt="news image"
                  style="height: 200px; object-fit: cover;"
                />
                <div class="card-body d-flex flex-column">
                  <a :href="newsItem.url" target="_blank" class="mt-auto">
                    <h5 class="card-title">{{ newsItem.title }}</h5>
                  </a>
                  <p class="card-text text-muted">
                    {{ formatDate(newsItem.publishedAt) }}
                  </p>
                  <div class="card-content-scroll">
                    <p class="card-text">
                      {{ newsItem.content || 'Описание отсутствует' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
         
          <div v-if="!isLoading" class="d-flex justify-content-center ">
            <span
              class="pointer mx-2"
              :disabled="currentPage === 1"
              @click="prevPage"
            >
              Назад
            </span>
            <span
              class="pointer mx-2"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              Вперед
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        news: [],
        topCryptos: [],
        currentPage: 1,
        pageSize: 9,
        isLoading: true, // Изначально true
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.news.length / this.pageSize);
      },
      paginatedNews() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.news.slice(start, end);
      },
    },
    async mounted() {
      await this.fetchData();
      this.isLoading = false; // Изменяем на false после загрузки данных
    },
    methods: {
      async fetchData() {
        try {
          await this.fetchNews();
          await this.fetchTopCryptos();
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      },
      async fetchNews() {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.news = data.items;
      },
      async fetchTopCryptos() {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await response.json();
        this.topCryptos = data;
      },
      formatMarketCap(marketCap) {
        if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
        if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
        return `$${marketCap.toFixed(2)}`;
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
        this.scrollToTop();
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
        this.scrollToTop();
      },
      scrollToTop() {
        this.$refs.newsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    },
  };
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .fixed-sidebar {
    max-height: 100vh;
    overflow-y: auto;
    position: sticky;
    top: 0;
  }
  .sidebar-crypto-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .crypto-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .crypto-info {
    display: flex;
    flex-direction: column;
  }
  .crypto-name {
    font-size: 0.9rem;
    font-weight: bold;
  }
  .crypto-price,
  .crypto-market-cap,
  .crypto-change {
    font-size: 0.8rem;
    color: #6c757d;
  }
  .text-success {
    color: #28a745;
  }
  .text-danger {
    color: #dc3545;
  }
  .card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .news-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  .card-content-scroll {
    max-height: 100px;
    overflow-y: auto;
  }
  .card-title {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .card-text {
    font-size: 0.9rem;
    color: #6c757d;
  }
  @media (max-width: 767px) {
    .fixed-sidebar {
      max-height: auto;
      position: static;
    }
    .sidebar-content,
    .card-content-scroll {
      overflow-y: auto;
    }
  }
  </style>
   -->
   <template>
    <div class="container-fluid">
      <div class="row">
        <!-- Левая колонка для топ-100 криптовалют с поиском -->
        <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
          <input
          v-if="!isLoading"
          style="box-shadow: none !important;"
            type="text"
            v-model="searchQuery"
            placeholder="Поиск криптовалюты"
            class="form-control mb-3 mt-4"
          />
          <div class="sidebar-content">
            <div
              v-for="crypto in filteredCryptos"
              :key="crypto.id"
              class="sidebar-crypto-item"
            >
              <div class="sidebar-crypto-card d-flex align-items-center">
                <img :src="crypto.image" class="crypto-icon" alt="crypto icon" />
                <div class="crypto-info ms-2">
                  <h5 class="crypto-name">{{ crypto.name }}</h5>
                  <p class="crypto-price">Цена: {{ crypto.current_price.toFixed(2) }} USD</p>
                  <p class="crypto-market-cap">Капитализация: {{ formatMarketCap(crypto.market_cap) }}</p>
                  <p class="crypto-change d-flex align-items-center">
                    <span
                      :class="{
                        'text-success': crypto.price_change_percentage_24h >= 0,
                        'text-danger': crypto.price_change_percentage_24h < 0
                      }"
                    >
                      <i
                        :class="{
                          'fas fa-arrow-up': crypto.price_change_percentage_24h >= 0,
                          'fas fa-arrow-down': crypto.price_change_percentage_24h < 0
                        }"
                      ></i>
                      {{ crypto.price_change_percentage_24h.toFixed(2) }}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Основная колонка с карточками новостей -->
        <div class="col-12 col-md-9" ref="newsContainer">
          <div class="row">
            <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="col-12 col-md-12 col-lg-4 mb-4">
              <div class="car h-100 news-card" style="max-height: 500px;">
                <img
                  v-if="newsItem.urlToImage"
                  :src="newsItem.urlToImage"
                  class="card-img-top"
                  alt="news image"
                  style="height: 200px; object-fit: cover;"
                />
                
                <div class="card-body d-flex flex-column">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {{ newsItem.author }}</p>
                  <a :href="newsItem.url" target="_blank" class="mt-auto">
                    <h5 class="card-title">{{ newsItem.title }}</h5>
                  </a>
                  <p class="card-text text-muted">
                    {{ formatDate(newsItem.publishedAt) }}
                  </p>
                  <div class="card-content-scroll">
                    <p class="card-text">
                      {{ newsItem.content || 'Описание отсутствует' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Пагинация -->
          <div v-if="!isLoading" class="d-flex justify-content-center ">
            <span class="pointer mx-2" :disabled="currentPage === 1" @click="prevPage">
              Назад
            </span>
            <span class="pointer mx-2" :disabled="currentPage === totalPages" @click="nextPage">
              Вперед
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        news: [],
        topCryptos: [],
        currentPage: 1,
        pageSize: 9,
        isLoading: true,
        searchQuery: "", // для хранения текста поиска
      };
    },
    computed: {
      filteredCryptos() {
        return this.topCryptos.filter((crypto) =>
          crypto.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      totalPages() {
        return Math.ceil(this.news.length / this.pageSize);
      },
      paginatedNews() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.news.slice(start, end);
      },
    },
    async mounted() {
      await this.fetchData();
      this.isLoading = false;
    },
    methods: {
      async fetchData() {
        try {
          await this.fetchNews();
          await this.fetchTopCryptos();
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      },
      async fetchNews() {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.news = data.items;
      },
      async fetchTopCryptos() {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await response.json();
        this.topCryptos = data;
      },
      formatMarketCap(marketCap) {
        if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
        if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
        return `$${marketCap.toFixed(2)}`;
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
        this.scrollToTop();
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
        this.scrollToTop();
      },
      scrollToTop() {
        this.$refs.newsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    },
  };
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    /* color: black; */
  }
  .fixed-sidebar {
    max-height: 100vh;
    overflow-y: auto;
    position: sticky;
    top: 0;
  }
  .sidebar-crypto-item {
    margin-bottom: 10px;
    padding: 10px;
    /* background-color: #f8f9fa; */
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .crypto-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .crypto-info {
    display: flex;
    flex-direction: column;
  }
  .crypto-name {
    font-size: 0.9rem;
    font-weight: bold;
  }
  .crypto-price,
  .crypto-market-cap,
  .crypto-change {
    font-size: 0.8rem;
    color: #6c757d;
  }
  .text-success {
    color: #28a745;
  }
  .text-danger {
    color: #dc3545;
  }
  .card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .news-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  .card-content-scroll {
    max-height: 100px;
    overflow-y: auto;
  }
  .card-title {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .card-text {
    font-size: 0.9rem;
    color: #6c757d;
  }
  @media (max-width: 767px) {
    .fixed-sidebar {
      max-height: auto;
      position: static;
    }
    .sidebar-content,
    .card-content-scroll {
      overflow-y: auto;
    }
  }
  </style>
  