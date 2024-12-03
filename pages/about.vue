
<template>
  <div  :class="{ 'dark-mode': isDarkMode }" class="container articles ">
    <br />
    <div style="" class="row" v-if="!selectedArticle">
      <div
        v-for="(article, index) in visibleArticles"
        :key="index"
        class="col-lg-3 col-md-6 col-12 mb-4"
      >
        <div
          style=""
          class="car article-card text-center"
          @click="selectArticle(index)"
        >
          <img
            :src="article.image"
            class="img-fluid article-img rounded-4"
            alt="article image"
          />
          <div class="text ">
            <h5 class="card-title fw-bold">{{ article.title }}</h5>
          </div>
        </div>
      </div>
      <div class="col-12 text-center">
        <span
          v-if="visibleArticlesCount < newsStore.articles.length"
          @click="loadMoreArticles"
          class="pointer"
          >Показать ещё
        </span>
        <span
          v-if="visibleArticlesCount > 8"
          @click="hideArticles"
          class="pointer ml-2"
          >| Скрыть</span
        >
        <br />
        <br />
        <br />
      </div>
    </div>

    <div v-if="selectedArticle" class="selected-article">
      <div class="row">
        <!-- Левая колонка с новостями -->
        <div class="col-md-3 news-sidebar" style="">
          <div
            v-for="(newsItem, index) in latestNews"
            :key="index"
            class="sidebar-news-item"
          >
            <a :href="newsItem.url" target="_blank">
              <h6 class="news-title ">{{ newsItem.title }}</h6>
             
            </a>
            <p class="news-date ">
                {{ formatDate(newsItem.publishedAt) }}
              </p>
          </div>
        </div>

        <!-- Основной контент выбранной статьи -->
        <div class="col-md-9 article-content">
          <span @click="clearSelection" class="back-link">
            Свернуть
          </span>
          <div class="article-container">
            <img
              :src="selectedArticle.image"
              class="img-fluid article-image rounded-4"
              alt="article image"
            />
            <div class="article-text ">
              <h2 class="fw-bold">{{ selectedArticle.title }}</h2>
              <p>{{ selectedArticle.content }}</p>
              <p>{{ selectedArticle.content2 }}</p>
              <p>{{ selectedArticle.content3 }}</p>
              <p>{{ selectedArticle.content4 }}</p>
              <p>{{ selectedArticle.content5 }}</p>
              <p>{{ selectedArticle.content6 }}</p>
            </div>
          </div>
          
          <div class="news-slider" v-if="currentSlideArticles.length">
  <button @click="previousSlide" class="slider-button">←</button>
  <div class="news-cards">
    <div v-for="slide in currentSlideArticles" :key="slide.title" class="news-card">
      <img :src="slide.urlToImage" class="img-fluid rounded-4" alt="news image" />
      <h5 class="fw-bold">{{ slide.title }}</h5>
      <a :href="slide.url" target="_blank">
              <h6 class="news-title ">{{ slide.title }}</h6>
              <p class="news-date ">
                {{ formatDate(slide.publishedAt) }}
              </p>
            </a>
    </div>
  </div>
  <button @click="nextSlide" class="slider-button">→</button>
</div>
        </div>
      
      
      </div>
    </div>

   

  </div>
</template>
<script>
import { useNewsStore } from './stores/newsStore';

export default {
  setup() {
    const newsStore = useNewsStore();

    

    return {
      newsStore,
    };
  },
  computed: {
    visibleArticles() {
      return this.newsStore.articles.slice(0, this.visibleArticlesCount);
    },
  },
  data() {
    return {
      sliderIndex: 0,
      slideSize: 2,
   
visibleArticlesCount: 8,
      selectedArticle: null,
      latestNews: [],
      latestNews2: [],
      currentSlideArticles: [],
    };
  },
  beforeDestroy() {
  window.removeEventListener('resize', this.updateCardWidth);
  window.removeEventListener('resize', this.adjustSidebarHeight);
},
async mounted() {
  this.updateCardWidth();
  try {
    await this.fetchLatestNews();
    await this.fetchSliderNews();
  } catch (error) {
    console.error("Ошибка при инициализации данных:", error);
  }
  window.addEventListener('resize', this.adjustSidebarHeight);
},

  
  // async mounted() {
  //   this.updateCardWidth();
  //   await this.fetchLatestNews();
  //   await this.fetchSliderNews();
  //   window.addEventListener('resize', this.adjustSidebarHeight);
  // },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustSidebarHeight);
  },
  methods: {
  //   updateCardWidth() {
  //   const slider = this.$el.querySelector('.news-slider');
  //   if (slider) {
  //     const cardWidth = slider.clientWidth / this.slideSize;
  //     this.$el.querySelectorAll('.news-card').forEach(card => {
  //       card.style.flex = `0 0 ${cardWidth}px`;
  //     });
  //   }
  // },
  updateCardWidth() {
  this.$nextTick(() => {
    const slider = this.$el.querySelector('.news-slider');
    if (slider) {
      const cardWidth = slider.clientWidth / this.slideSize;
      this.$el.querySelectorAll('.news-card').forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
      });
    }
  });
}
,
    loadMoreArticles() {
      this.visibleArticlesCount += 8;
    },
    hideArticles() {
      if (this.visibleArticlesCount > 8) {
        this.visibleArticlesCount -= 8;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    async fetchLatestNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=23"
        );
        const data = await response.json();
        this.latestNews = data.items;
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
    async fetchSliderNews() {
  try {
    const response = await fetch(
      "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
    );
    const data = await response.json();
    this.latestNews2 = data.items || []; // Убедитесь, что массив определен
    this.updateCurrentSlideArticles();
  } catch (error) {
    console.error("Ошибка при загрузке слайдера:", error);
  }
},
updateCurrentSlideArticles() {
  if (this.latestNews2.length > 0) {
    const startIndex = this.sliderIndex * this.slideSize;
    this.currentSlideArticles = this.latestNews2.slice(
      startIndex,
      startIndex + this.slideSize
    );
  } else {
    this.currentSlideArticles = [];
  }
}
,
updateCurrent(startIndex) {
    const container = this.$el.querySelector('.news-cards');
    const slider = this.$el.querySelector('.news-slider');

    if (container && slider) {
      const sliderWidth = slider.clientWidth; // ширина видимого контейнера
      const cardWidth = sliderWidth / 3; // динамически рассчитываем ширину одной новости (3 новости на экран)

      container.style.transform = `translateX(-${startIndex * cardWidth}px)`;
      container.style.transition = 'transform 0.5s ease-in-out'; // добавляем плавность
    }
  },
    // async fetchSliderNews() {
    //   try {
    //     const response = await fetch(
    //       "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=6"
    //     );
    //     const data = await response.json();
    //     this.latestNews2 = data.items;
    //     this.updateCurrentSlideArticles();
    //     console.error("Ошибка при загрузке новостей:", error);
    //   } catch (error) {
    //     console.error("Ошибка при загрузке слайдера:", error);
    //   }
    // },
    // updateCurrentSlideArticles() {
    // if (this.latestNews2.length > 0) {
    //   const startIndex = this.sliderIndex * this.slideSize;
    //   this.currentSlideArticles = this.latestNews2.slice(
    //     startIndex,
    //     startIndex + this.slideSize
    //   );
    // } else {
    //   this.currentSlideArticles = [];
    // }},
    nextSlide() {
    if (
      this.latestNews2 &&
      (this.sliderIndex + 1) * this.slideSize < this.latestNews2.length
    ) {
      this.sliderIndex++;
      this.updateCurrentSlideArticles();
    }
  },
  previousSlide() {
    if (this.sliderIndex > 0) {
      this.sliderIndex--;
      this.updateCurrentSlideArticles();
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
    selectArticle(index) {
      this.selectedArticle = this.newsStore.articles[index];
      this.scrollToTop();
    },
    // adjustSidebarHeight() {
    //   const articleContent = this.$el.querySelector('.article-content');
    //   const sidebar = this.$el.querySelector('.news-sidebar');
    //   if (articleContent && sidebar) {
    //     sidebar.style.maxHeight = `${articleContent.clientHeight}px`;
    //   }
    // },
    clearSelection() {
      this.selectedArticle = null;
    }
  }
};
</script>

<style scoped>
.news-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  overflow: hidden;
}

.slider-button {
  color: var(--text-color);
 background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

.news-cards {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
}

/* .news-card {
  flex: 1 0 calc(100% / 3); 
  box-sizing: border-box;
  padding: 10px;
  background-color: #091520;
  border-radius: 10px;
  text-align: center;
} */
.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
}
.bg-white {
  background-color: #fff;
}
.fixed {
  position: fixed;
}
.articles {
  /* background-color: #091520; */
 
}
.article-card {
  cursor: pointer;
}
.article-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.selected-article .row {
  display: flex;
  /* align-items: stretch; */
}

.news-sidebar {
  /* overflow-y: auto; */
 
  padding: 10px;
  border-right: 1px solid #ddd;
}
.sidebar-news-item {
  margin-bottom: 15px;
}
.news-title {
  font-size: 1rem;
  font-weight: bold;
  
}
.news-date {
  font-size: 0.8rem;
  
}

.article-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.article-text {
 
  width: 100%;
  max-width: 800px;
}
.back-link {
  cursor: pointer;
  font-weight: bold;
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .selected-article .row {
    flex-direction: column-reverse; /* Сначала основной контент статьи, затем новости */
  }
  .news-sidebar {
    max-height: auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .article-container {
    align-items: center;
  }
  .article-image {
    max-width: 100%;
  }
  .article-text {
    text-align: center;
  }
}
@media (max-width: 768px) {
  .news-card {
    flex: 1 0 100%; /* Показать по одному элементу на слайд на маленьких экранах */
  }

  .article-img {
    height: auto; /* Автоматическая высота для изображений на мобильных устройствах */
  }

  .article-container {
    padding: 15px;
  }

  .article-text {
    padding: 15px;
  }

  .news-slider {
    flex-direction: column; /* Слайдер на маленьких экранах выстраивается вертикально */
  }

  .slider-button {
    margin: 10px 0;
    font-size: 18px; /* Уменьшаем размер кнопок для мобильных устройств */
  }
}

</style>
