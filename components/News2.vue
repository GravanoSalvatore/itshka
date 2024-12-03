
<!-- <template>
  <div class="container my-5">
    <div class="row gx-3 gy-4">

      <div class="col-12 col-lg-8">
        <div class="card featured-card text-white">
          <img v-if="largeNewsItem.urlToImage" :src="largeNewsItem.urlToImage" class="card-img" alt="news image" />
          <div class="card-img-overlay d-flex flex-column justify-content-end p-4 overlay-dark">
            <NuxtLink :to="`/news/${largeNewsItem.id}`" class="text-decoration-none text-white">
              <h2 class="card-title display-5 fw-bold">{{ largeNewsItem.title }}</h2>
            </NuxtLink>
            <p class="card-text small-text">{{ formatDate(largeNewsItem.publishedAt) }}</p>
          </div>
        </div>
      </div>

    
      <div class="col-12 col-lg-4 d-flex flex-column gap-4">
        <div v-for="newsItem in sideNews" :key="newsItem.id" class="card side-card shadow-sm">
          <img v-if="newsItem.urlToImage" :src="newsItem.urlToImage" class="card-img-top" alt="news image" />
          <div class="card-body">
            <NuxtLink :to="`/news/${newsItem.id}`" class="text-decoration-none text-dark">
              <h5 class="card-title">{{ newsItem.title }}</h5>
            </NuxtLink>
            <p class="card-text text-muted">{{ formatDate(newsItem.publishedAt) }}</p>
          </div>
        </div>
      </div>

    
      <div class="col-12">
        <div class="row row-cols-2 row-cols-md-3 g-3">
          <div v-for="newsItem in smallNews" :key="newsItem.id" class="col">
            <div class="card small-card shadow-sm">
              <div
                v-if="newsItem.urlToImage"
                :style="{ backgroundImage: `url(${newsItem.urlToImage})` }"
                class="small-card-img overlay-dark d-flex flex-column justify-content-end"
              >
                <NuxtLink :to="`/news/${newsItem.id}`" class="text-decoration-none text-white p-2">
                  <h6 class="card-title small-title">{{ newsItem.title }}</h6>
                </NuxtLink>
                <p class="card-text text-white small-text px-2">{{ formatDate(newsItem.publishedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smallNews: [],
      largeNewsItem: {},
      sideNews: [],
    };
  },
  async mounted() {
    await this.fetchNews();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    async fetchNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.largeNewsItem = data.items[0];
        this.sideNews = data.items.slice(1, 3);
        this.smallNews = data.items.slice(3, 9);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Основные стили */
.container {
  max-width: 1200px;
}

/* Стиль для крупной карточки */
.featured-card {
  height: 100%;
  max-height: 700px;
  overflow: hidden;
  border-radius: 15px;
}
.featured-card .card-img {
  object-fit: cover;
  height: 100%;
  filter: brightness(70%);
}

/* Вертикальные карточки для sideNews */
.side-card {
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
}
.side-card .card-img-top {
  height: 60%;
  object-fit: cover;
}
.side-card .card-title {
  font-size: 1.1rem;
  font-weight: bold;
}

/* Маленькие карточки для smallNews */
.small-card {
  height: 100%;
  border-radius: 8px;
}
.small-card-img {
  background-size: cover;
  background-position: center;
  height: 100%;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}
.small-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 0.5rem;
}
.small-text {
  font-size: 0.8rem;
  color: #f8f9fa;
}

/* Тень и переходы для карточек */
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.02);
}
</style> -->
<template>
  <div class="container my-3">
    <div class="row gx-3 gy-4">
      <!-- Левая крупная карточка -->
      <div class="col-12 col-lg-8">
        <div class="card  featured-card text-white">
          <img v-if="largeNewsItem.urlToImage" :src="largeNewsItem.urlToImage" class="card-img" alt="news image" />
          <div class="card-img-overlay d-flex flex-column justify-content-end p-4 overlay-dark">
            <NuxtLink :to="`/news/${largeNewsItem.id}`" class="text-decoration-none text-white">
              <h2 class="card-title display-5 fw-bold">{{ largeNewsItem.title }}</h2>
            </NuxtLink>
            <p class="card-text small-text">{{ formatDate(largeNewsItem.publishedAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Правая колонка с сеткой карточек для sideNews -->
      <div class="col-12 col-lg-4 d-flex flex-column gap-4">
        <div v-for="newsItem in sideNews" :key="newsItem.id" class="car  side-card shadow-sm">
          <img v-if="newsItem.urlToImage" :src="newsItem.urlToImage" class="card-img-top" alt="news image" />
          <div class="card-body p-3">
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {{ newsItem.author }}</p>
            <a :href="newsItem.url" target="_blank" class="mt-auto">
              <h5 class="card-title">{{ newsItem.title }}</h5>
          </a>
            <p class="card-text text-muted">{{ formatDate(newsItem.publishedAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Сетка из мелких карточек smallNews внизу -->
      <div class="col-12">
        <div class="row row-cols-2 row-cols-md-3 g-3">
          <div v-for="newsItem in smallNews" :key="newsItem.id" class="col">
            <div class="car  small-card shadow-sm">
              <div
                v-if="newsItem.urlToImage"
                :style="{ backgroundImage: `url(${newsItem.urlToImage})` }"
                class="small-card-img overlay-dark d-flex flex-column justify-content-end"
              >
              
                <NuxtLink :to="`/news/${newsItem.id}`" class="text-decoration-none text-white p-2">
                  <h6 class="card-title small-title">{{ newsItem.title }}</h6>
                </NuxtLink>
                <p class="card-text text-white small-text px-2">{{ formatDate(newsItem.publishedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smallNews: [],
      largeNewsItem: {},
      sideNews: [],
    };
  },
  async mounted() {
    await this.fetchNews();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    async fetchNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.largeNewsItem = data.items[0];
        this.sideNews = data.items.slice(1, 3);
        this.smallNews = data.items.slice(3, 9);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
  },
};
</script>

<style scoped>
a{
  text-decoration: none;
  /* color: #000; */
}
/* Основные стили */
.container {
  max-width: 1200px;
}

/* Стиль для крупной карточки */
.featured-card {
  height: 100%;
  max-height: 700px;
  overflow: hidden;
  border-radius: 15px;
}
.featured-card .card-img {
  object-fit: cover;
  height: 100%;
  filter: brightness(70%);
}

/* Вертикальные карточки для sideNews */
.side-card {
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
}
.side-card .card-img-top {
  height: 60%;
  object-fit: cover;
}
.side-card .card-title {
  font-size: 1.1rem;
  font-weight: bold;
}

/* Маленькие карточки для smallNews */
.small-card {
  height: 100%;
  border-radius: 8px;
}
.small-card-img {
  background-size: cover;
  background-position: center;
  height: 100%;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  position: relative;
}
.small-card-img::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7); /* Более тёмное затемнение */
  border-radius: 8px;
  z-index: 1;
}
.small-card-img a, .small-card-img h6 {
  color: #ffffff !important; /* Принудительно белый цвет */
  z-index: 2; /* Поверх затемнения */
}
.small-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffffff !important;
  margin-top: 0.5rem;
  z-index: 2;
}
.small-text {
  font-size: 0.8rem;
  color: #ffffff !important;
  z-index: 2;
}

/* Тень и переходы для карточек */
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.02);
}
</style>
