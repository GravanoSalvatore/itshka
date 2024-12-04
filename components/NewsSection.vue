
<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Левая колонка для новостей -->
      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        <h5   v-if="!isLoading" style="background-color: cornflowerblue;border-radius: 4px;" class=" text-white p-2 fw-bold">Новости альткоинов</h5>  
       
        <!-- <h3 v-if="!isLoading" class="text-center my-2 fw-bold">АйТи Гид</h3> -->
        <div class="sidebar-content">
          <div
            v-for="newsItem in latestNews"
            :key="newsItem.id"
            class="sidebar-news-item"
          >
            <div class="sidebar-news-card">
              <img
                :src="newsItem.urlToImage"
                class="sidebar-news-img"
                alt="news image"
                @error="handleImageError"
              />
              <a :href="newsItem.url" target="_blank" class="mt-auto">
                <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
              </a>
              <p class="card-text">
                {{ formatDate(newsItem.publishedAt) }}
              </p>
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
            <div class="car p-3 h-100 news-card" style="max-height: 500px">
              <img
                :src="newsItem.urlToImage"
                class="card-img-top"
                alt=""
                style="height: 200px; object-fit: cover;"
                @error="handleImageError"
              />
              <div class="card-body d-flex flex-column">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  {{ newsItem.author }}
                </p>
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text">{{ formatDate(newsItem.publishedAt) }}</p>
                <div class="card-content-scroll">
                  <p class="card-text">
                    {{ newsItem.content || "Описание отсутствует" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Пагинация -->
        <div v-if="!isLoading" class="d-flex justify-content-center">
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
      latestNews: [],
      currentPage: 1,
      pageSize: 9,
      isLoading: true, // Изначально true, пока данные не загружены
      fallbackImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqh-XpWAkI5y-Tp8KoDkTDlmNZ0pwQK_epGw&s",
        "https://ipcisco.com/wp-content/uploads/2020/12/Internet-Access-Technologies-ipcisco-835x500.jpg",
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHUBsrWYrmSd1PJhHDI-Q9ku0-TWG0BgPfbw&s",
      ],
      fallbackIndex: 0,
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
    await this.fetchNews();
    await this.fetchLatestNews();
    this.isLoading = false; // Устанавливаем isLoading на false после загрузки данных
  },
  methods: {
    handleImageError(event) {
      // Устанавливаем следующее изображение по кругу
      this.fallbackIndex = (this.fallbackIndex + 1) % this.fallbackImages.length;
      event.target.src = this.fallbackImages[this.fallbackIndex];
    },
    async fetchNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.news = data.items;
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
    async fetchLatestNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=19&Page=1&PageSize=12"
        );
        const data = await response.json();
        this.latestNews = data.items;
      } catch (error) {
        console.error("Ошибка при загрузке последних новостей:", error);
      }
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
.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
  /* color: black; */
}
.sidebar-content{
  max-height: 100vh;
  overflow-y: auto;
}
.fixed-sidebar {
  max-height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}

.sidebar-news-item {
  margin-bottom: 10px;
  padding: 10px;
  /* background-color: #f8f9fa; */
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
  /* color: #6c757d; */
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
