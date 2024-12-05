<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="container-fluid ">
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center spinner-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else class="row">
      <!-- Левая колонка для новостей -->
      <h2 class="text-center fw-bold">ДАО</h2>
      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        <div class="sidebar-content">
          <div v-for="newsItem in latestNews" :key="newsItem.id" class="sidebar-news-item">
            <div class="sidebar-news-card">
              <img
                v-if="newsItem.urlToImage"
                :src="newsItem.urlToImage"
                class="sidebar-news-img"
                alt="news image"
              />
              <a :href="newsItem.url" target="_blank" class="mt-auto">
                <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
                <p class="card-text ">
                  {{ formatDate(newsItem.publishedAt) }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Основная колонка с карточками новостей -->
      <div class="col-12 col-md-9" ref="newsContainer">
        <div class="row">
          <div
            v-for="newsItem in paginatedNews"
            :key="newsItem.id"
            class="col-12 col-md-12 col-lg-4 mb-4"
          >
            <div class="car p-3 h-100 news-card" style="max-height: 500px;">
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
                <p class="card-text ">
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
        <div class="d-flex justify-content-center my-2">
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
      isLoading: true,
      news: [],
      latestNews: [],
      currentPage: 1,
      pageSize: 15,
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
    try {
      await Promise.all([
        this.fetchNews(),
        this.fetchLatestNews()
      ]);
      this.isLoading = false;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      this.isLoading = false;
    }
  },
  methods: {
    async fetchNews() {
      const response = await fetch(
        "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100"
      );
      const data = await response.json();
      this.news = data.items;
    },
    async fetchLatestNews() {
      const response = await fetch(
        "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=19&Page=1&PageSize=42"
      );
      const data = await response.json();
      this.latestNews = data.items;
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
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    scrollToTop() {
      const newsContainer = this.$refs.newsContainer;
      if (newsContainer) {
        newsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #01263f;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
  color:var(--text-color);
}

.fixed-sidebar {
  max-height: 120vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}

.sidebar-news-item {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.sidebar-news-img {
  width: 100%;
  height: auto;
}

.sidebar-news-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 5px;
}

.news-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
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