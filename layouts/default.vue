<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <div v-if="loading" class="preloader">
      <div class="spinner"></div>
    </div>
    <header>
      <nav
        :style="{ backgroundColor: isDarkMode ? '#01263f' : '#ffffff' }"
        class="navbar navbar-expand-lg fixed-top"
      >
        <div class="container">
          <NuxtLink to="/" class="navbar-brand">
            <div
              style="
                /* font-size: 18px; */
                /* background-color: #091520; */
                /* padding: 5px 10px; */
                /* border-radius: 5px; */
                /* color: aliceblue; */
              "
            >
              <!-- <img style="width: 35px;" src="https://cdn3d.iconscout.com/3d/premium/thumb/blockchain-node-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bitcoin-logo-crypto-network-pack-science-technology-icons-7874339.png?f=webp"> -->
              <img class="brand" style="" src="../public/crypto.png" /></div
          ></NuxtLink>

          <button
            style="
              font-size: 11px;
              box-shadow: none !important;
              border: none !important;
            "
            class="navbar-toggler"
            type="button"
            @click="toggleSidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i style="color: cornflowerblue" class="bi bi-list fs-4"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <!-- <li class="nav-item">
                <NuxtLink to="/" class="nav-link" aria-current="page">Главная</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/about" class="nav-link">О нас</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/contact" class="nav-link">Контакты</NuxtLink>
              </li> -->
              <li class="nav-item">
                <span class="nav-link" style="font-size: 12px">
                  <span style="color: cornflowerblue">BTC:</span>
                  <span style="color: var(--text-color)" class="">
                    ${{ btcPrice }}
                    <span :class="btcChangeClass" class="ms-1">
                      <i class="bi" :class="btcArrow"></i>
                    </span>
                  </span>
                  <span style="color: var(--text-color)">|</span>
                  <span style="color: cornflowerblue"> ETH:</span>
                  <span style="color: var(--text-color)" class="">
                    ${{ ethPrice }}
                    <span :class="ethChangeClass" class="ms-1">
                      <i class="bi" :class="ethArrow"></i>
                    </span>
                  </span>
                </span>
              </li>
              <!-- <price/> -->
            </ul>

            <form
              class="d-flex search-form d-none d-lg-flex"
              @submit.prevent="search"
            >
              <input
                style="color: var(--text-color)"
                v-model="searchQuery"
                type="text"
                class="form-control me-2"
                placeholder="Поиск..."
                aria-label="Search"
              />
              <button style="" class="btn" type="submit">
                <i
                  style="font-size: 10px"
                  :class="{ 'dark-mode': isDarkMode }"
                  class="bi bi-search"
                ></i>
              </button>
            </form>
          </div>
          <button
            :class="{ 'dark-mode': isDarkMode }"
            @click="toggleThemeWithLog"
            class="theme-toggle-btn mx-auto"
          >
            <i
              :class="isDarkMode ? 'bi bi-lightbulb' : 'bi bi-lightbulb-fill'"
            ></i>
          </button>
        </div>
      </nav>

      <aside
        :style="{ backgroundColor: isDarkMode ? '#01263f' : '#ffffff' }"
        :class="[
          'sidebar',
          { open: isSidebarOpen },
          { 'dark-mode': isDarkMode },
        ]"
      >
        <button class="btn-close text-reset" @click="toggleSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
            />
          </svg>
        </button>

        <NuxtLink to="/" class="navbar-brand">
          <div
            style="
              /* font-size: 18px; */
              /* background-color: #091520; */
              /* padding: 5px 10px; */
              /* border-radius: 5px; */
              /* color: aliceblue; */
            "
          >
            <!-- <img style="width: 35px;" src="https://cdn3d.iconscout.com/3d/premium/thumb/blockchain-node-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bitcoin-logo-crypto-network-pack-science-technology-icons-7874339.png?f=webp"> -->
            <img style="width: 190px" src="../public/crypto.png" /></div
        ></NuxtLink>

        <div class="sidebar-crypto-search d-lg-none mb-4">
          <div class="p-3">
            <span class="nav-link">
              <span style="color: cornflowerblue">BTC:</span>
              <span class="">
                ${{ btcPrice }}
                <span :class="btcChangeClass" class="ms-1">
                  <i class="bi" :class="btcArrow"></i>
                </span>
              </span>
              <br />
              <span style="color: cornflowerblue">ETH:</span>
              <span class="">
                ${{ ethPrice }}
                <span :class="ethChangeClass" class="ms-1">
                  <i class="bi" :class="ethArrow"></i>
                </span>
              </span>
            </span>
          </div>
          <form class="d-flex search-form" @submit.prevent="search">
            <input
              style="color: var(--text-color)"
              v-model="searchQuery"
              type="text"
              class="form-control me-2"
              placeholder="Поиск..."
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>

        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <NuxtLink to="/" class="sidebar-link" @click="toggleSidebar"
              >Новости</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/about" class="sidebar-link" @click="toggleSidebar"
              >Статьи</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/sec" class="sidebar-link" @click="toggleSidebar"
              >SEC</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/ai" class="sidebar-link" @click="toggleSidebar"
              >Искусственный интеллект</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/dao" class="sidebar-link" @click="toggleSidebar"
              >DAO</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/contact" class="sidebar-link" @click="toggleSidebar"
              >Криптоличности</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/crypto" class="sidebar-link" @click="toggleSidebar"
              >Bitcoin & Ethereum</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/altcoins" class="sidebar-link" @click="toggleSidebar"
              >Альткоины</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/defi" class="sidebar-link" @click="toggleSidebar"
              >Defi & NFT</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/privacy" class="sidebar-link" @click="toggleSidebar"
              >Политика приватности</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/terms" class="sidebar-link" @click="toggleSidebar"
              >Условия использования</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/aboutUs" class="sidebar-link" @click="toggleSidebar"
              >О нас</NuxtLink
            >
          </li>
          <!-- <li class="sidebar-item">
            <NuxtLink to="/contact" class="sidebar-link" @click="toggleSidebar">Контакты</NuxtLink>
          </li> -->
        </ul>
        <div class="footer-social-icons text-center mt-4">
          <a href="https://facebook.com" target="_blank" class="social-icon">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" class="social-icon">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" class="social-icon">
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://t.me/yourchannel"
            target="_blank"
            class="social-icon"
          >
            <i class="fab fa-telegram-plane"></i>
          </a>
        </div>
        <div class="footer-bottom text-center py-3 px-3">
          &copy; 2024 КриптоАйТишка. Все права защищены.
        </div>
      </aside>

      <div class="container">
        <div
          :class="{ 'dark-mode': isDarkMode }"
          v-if="searchResults.length"
          class="search-results"
          style=""
        >
          <div
            :class="{ 'dark-mode': isDarkMode }"
            style="margin-top: 70px"
            class="d-flex justify-content-between align-items-center"
          >
            <button
              :class="{ 'dark-mode': isDarkMode }"
              class="btn"
              @click="clearSearch"
            >
              Свернуть
            </button>
          </div>
          <div :class="{ 'dark-mode': isDarkMode }" class="row">
            <div
              :class="{ 'dark-mode': isDarkMode }"
              v-for="result in searchResults"
              :key="result.id"
              class="col-12 mb-3"
            >
              <div
                :class="{ 'dark-mode': isDarkMode }"
                class="card search-result-card d-flex flex-row align-items-center"
              >
                <img
                  v-if="result.urlToImage"
                  :src="result.urlToImage"
                  class="img-fluid search-result-img"
                  alt="news image"
                />
                <div class="card-body">
                  <a :href="result.url" target="_blank" class="">
                    <h5 class="card-title">{{ result.title }}</h5>
                  </a>
                  <p class="card-text">{{ formatDate(result.publishedAt) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <run style="" class="" />

      <!-- <popular/> -->
      <NuxtPage />
      <button
        v-show="showScrollTopButton"
        class="scroll-top-button"
        @click="scrollToTop"
      >
        ↑
      </button>
      <br />
      <br />
      <br />

      <footer         :style="{ backgroundColor: isDarkMode ? '#01263f' : '#ffffff' }" class="footer">
        <div class="container">
          <div class="row text-center text-md-start">
            <div class="col-12 col-md-4 mb-4">
              <h5 class="fw-bold">О КриптоАйТишке</h5>
              <p>
                Получайте свежие новости о криптовалютах, аналитические статьи и
                многое другое. Подписывайтесь, чтобы не пропустить важное!
              </p>
            </div>

            <div class="col-12 col-md-4 mb-4">
              <h5 class="fw-bold">Быстрые ссылки</h5>
              <ul class="list-unstyled">
                <li><NuxtLink to="/" class="footer-link">Главная</NuxtLink></li>
                <li>
                  <NuxtLink to="/about" class="footer-link">О нас</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contact" class="footer-link"
                    >Контакты</NuxtLink
                  >
                </li>
              </ul>
            </div>

            <div class="col-12 col-md-4 mb-4">
              <h5 class="fw-bold">Подписка на новости</h5>
              <form @submit.prevent="subscribeNewsletter">
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Ваш Email"
                />
                <button class="btn btn-primary mt-2 w-100">Подписаться</button>
              </form>
            </div>
          </div>

          <!-- Социальные иконки -->
          <div class="footer-social-icons text-center mt-4">
            <a href="https://facebook.com" target="_blank" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" class="social-icon">
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              class="social-icon"
            >
              <i class="fab fa-telegram-plane"></i>
            </a>
          </div>

          <div class="footer-bottom text-center py-3">
            &copy; 2024 КриптоАйТишка. Все права защищены.
          </div>
        </div>
      </footer>
    </header>
  </div>
</template>
  
  <script>
import { useThemeStore } from "../stores/themeStore.js";
import price from "../components/Price3.vue";
import run from "../components/Run.vue";
import popular from "../components/Popular.vue";
export default {
  setup() {
    const themeStore = useThemeStore();
    const isDarkMode = computed(() => themeStore.isDarkMode); // Создаём реактивную переменную

    onMounted(() => {
      console.log("Mounted: Initializing theme...");
      themeStore.loadTheme();
      console.log("isDarkMode после загрузки:", themeStore.isDarkMode);

      // setTimeout(() => {
      //   loading.value = false;
      //   console.log('Loading complete:', loading.value);
      // }, 500);
    });
    watch(isDarkMode, (newVal) => {
      console.log("Тема обновлена:", newVal ? "Dark mode" : "Light mode");
    });

    function toggleThemeWithLog() {
      console.log("Toggle theme clicked");
      themeStore.toggleTheme(); // Меняем тему в хранилище
      console.log("New isDarkMode value after toggle:", isDarkMode.value);
    }

    return {
      // loading,
      toggleThemeWithLog,
      isDarkMode,
    };
  },
  components: { price, run, popular },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      loading: true,
      showScrollTopButton: false,
      email: "",
      btcPrice: null,
      ethPrice: null,
      prevBtcPrice: null,
      prevEthPrice: null,
      btcArrow: "",
      ethArrow: "",
      btcChangeClass: "",
      ethChangeClass: "",
      isSidebarOpen: false,
      searchQuery: "",
      searchResults: [],
    };
  },
  async mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
    await this.fetchCryptoPrices();
    setInterval(this.fetchCryptoPrices, 60000);
    setTimeout(() => {
      this.loading = false;
    }, 500);
    await this.fetchCryptoPrices();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScrollTopButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    subscribeNewsletter() {
      if (this.email) {
        alert(`Спасибо за подписку, ${this.email}!`);
        this.email = "";
      } else {
        alert("Введите корректный email.");
      }
    },
    // async fetchCryptoPrices() {
    //   try {
    //     const response = await fetch(
    //       'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    //     );
    //     const data = await response.json();
    //     this.btcPrice = data.bitcoin.usd.toFixed(2);
    //     this.ethPrice = data.ethereum.usd.toFixed(2);
    //   } catch (error) {
    //     console.error('Ошибка при получении курсов криптовалют:', error);
    //   }
    // },
    async fetchCryptoPrices() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        this.updatePrice("btc", data.bitcoin.usd);
        this.updatePrice("eth", data.ethereum.usd);
      } catch (error) {
        console.error("Ошибка при получении курсов криптовалют:", error);
      }
    },
    updatePrice(type, newPrice) {
      if (type === "btc") {
        this.prevBtcPrice = this.btcPrice;
        this.btcPrice = newPrice.toFixed(2);
        this.setChangeIndicator("btc");
      } else if (type === "eth") {
        this.prevEthPrice = this.ethPrice;
        this.ethPrice = newPrice.toFixed(2);
        this.setChangeIndicator("eth");
      }
    },
    setChangeIndicator(type) {
      if (type === "btc" && this.prevBtcPrice !== null) {
        this.btcArrow =
          this.btcPrice > this.prevBtcPrice ? "bi-arrow-up" : "bi-arrow-down";
        this.btcChangeClass =
          this.btcPrice > this.prevBtcPrice ? "text-success" : "text-danger";
      }
      if (type === "eth" && this.prevEthPrice !== null) {
        this.ethArrow =
          this.ethPrice > this.prevEthPrice ? "bi-arrow-up" : "bi-arrow-down";
        this.ethChangeClass =
          this.ethPrice > this.prevEthPrice ? "text-success" : "text-danger";
      }
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async search() {
      if (!this.searchQuery) return;

      try {
        const response = await fetch(
          `https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100`
        );
        const data = await response.json();
        this.searchResults = data.items.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } catch (error) {
        console.error("Ошибка при поиске новостей:", error);
      }
    },
    clearSearch() {
      this.searchQuery = "";
      this.searchResults = [];
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
  
  <style scoped>
.dark-mode {
  background-color: #091520; /* или другой цвет для темной темы */
  color: white; /* для текста */
}
:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

.dark-mode {
  --background-color: #01263f;
  --text-color: white;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.navbar {
  height: 55px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.brand {
  width: 220px;
}
@media screen and (max-width: 325px) {
  .brand {
    width: 180px;
  }
}
.theme-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.text-success {
  color: green;
}
.text-danger {
  color: red;
}
.footer-social-icons {
  margin-top: 20px;
}

.social-icon {
  /* color: #ffffff; */
  font-size: 24px;
  margin: 0 10px;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #3d96ef;
}

a {
  text-decoration: none;
  color: var(--text-color);
}
.navbar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.navbar-brand {
  color: #3d96ef;
  font-weight: bold;
}
.nav-link {
  transition: color 0.3s;
}
.nav-link:hover {
  color: #ff7f50;
}

/* Стили для поля поиска */
.search-form {
  display: flex;
  align-items: center;
  gap: 8px;
}
.search-form input {
  max-width: 200px;
}
::placeholder {
  color: var(--text-color);
  /* color: cornflowerblue; */
}
input,
.btn-close {
  border: none !important;
  box-shadow: none !important;
}
input {
  color: var(--text-color);
  background: none !important;
}
/* Стили для карточек результатов поиска */
.search-result-card {
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.search-result-img {
  width: 120px;
  height: 100%;
  object-fit: cover;
  margin-right: 1rem;
}
.search-result-card .card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}
.search-result-card .card-text {
  font-size: 0.9rem;
  /* color: #6c757d; */
}

/* Стили для бокового меню */
/* .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: white;
    padding-top: 60px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1050;
  } */
.sidebar {
  /* background-color: var(--background-color); */
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 320px;
  /* background-color: white; */
  padding-top: 60px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1050;
  overflow-y: auto; /* Добавлено для вертикальной прокрутки */
  max-height: 100vh; /* Ограничение высоты меню */
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-crypto-search {
  padding: 1rem;
  border-bottom: 1px solid #495057;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  /* margin: 1rem 0; */
}

.sidebar-link {
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #082035;
  color: #f5f7f9;
}

.btn-close {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #000;
}
.scroll-top-button {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  font-size: 16px;
  /* background-color: #007bff;
  color: white; */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
}
.scroll-top-button:hover {
  opacity: 1;
}

/* Футер */
.footer {
  /* background-color: #091520;
  color: #ffffff; */
  padding: 30px 0;
}
.footer h5 {
  color: #3d96ef;
}
.footer-link {
  /* color: #ffffff; */
  transition: color 0.3s;
}
.footer-link:hover {
  color: #ff7f50;
}
.footer-bottom {
  /* background-color: #07121b; */
  font-size: 0.9rem;
  color: #6c757d;
  padding: 15px 0;
}
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #091520;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.spinner {
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 8px solid #ffffff;
  width: 60px;
  height: 60px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.navbar-toggler {
  display: inline-block !important;
}
</style>
   
   