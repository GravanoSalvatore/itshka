
<template>
  <div class="container personalities ">
    <div class="row" v-if="!selectedPerson">
      <div
        v-for="(person, index) in visiblePersonalities"
        :key="index"
        class="col-lg-4 col-md-6 col-12 mb-4"
      >
        <div class="personality-card text-center" @click="selectPerson(index)">
          <img
            v-if="person.image"
            :src="person.image"
            class="img-fluid personality-img"
            alt="person image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ person.firstName }} {{ person.lastName }}</h5>
          </div>
        </div>
      </div>
      <div class="col-12 text-center">
        <span v-if="visiblePersonalitiesCount < newsStore.personalities.length" @click="loadMorePersonalities" class="pointer">Показать ещё</span> 
        <span v-if="visiblePersonalitiesCount > 6" @click="hidePersonalities" class="pointer ml-2">| Скрыть</span>
        <br/><br/><br/>
      </div>
    </div>
    
    
    <div v-if="selectedPerson" class="selected-personality ">
      <div class="row">
        <!-- Левая колонка с новостями -->
        <div class="col-md-3 news-sidebar"  style="">
          <div v-for="(newsItem, index) in latestNews" :key="index" class="sidebar-news-item"  >
            <a :href="newsItem.url" target="_blank">
              <h6 class="news-title ">{{ newsItem.title }}</h6>
              <p class="news-date">{{ formatDate(newsItem.publishedAt) }}</p>
            </a>
          </div>
        </div>

        <!-- Основной контент выбранной персоны -->
        <div class="col-md-9 personality-content">
          <span @click="clearSelection" class="back-link">
            <!-- <i class="fa-solid fa-backward"></i>  -->
            Свернуть
          </span>
          <div class="personality-container">
            <img :src="selectedPerson.image" class="img-fluid personality-image rounded-4" alt="person image" />
            <div class="personality-text">
              <h2 class="fw-bold">{{ selectedPerson.firstName }} {{ selectedPerson.lastName }}</h2>
              <p>{{ selectedPerson.bio }}</p>
            </div>
          </div>
          <div class="news-slider" v-if="currentSlideArticles.length">
  <button @click="previousSlide" class="slider-button">←</button>
  <div class="news-cards">
    <div v-for="slide in currentSlideArticles" :key="slide.title" class="news-card">
      <img :src="slide.urlToImage" class="img-fluid rounded-4" alt="news image" />
     
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
    visiblePersonalities() {
      return this.newsStore.personalities.slice(0, this.visiblePersonalitiesCount);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustSidebarHeight);
  },
  data() {
    return {
      sliderIndex: 0,
      slideSize: 2,
      latestNews2: [],
      currentSlideArticles: [],
      visiblePersonalitiesCount: 6,

selectedPerson: null,
      latestNews: [],
    };
  },
  async mounted() {
    await this.fetchSliderNews();
    window.addEventListener('resize', this.adjustSidebarHeight);
    await this.fetchLatestNews();
  },
  methods: {
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
    updateCardWidth() {
    const slider = this.$el.querySelector('.news-slider');
    if (slider) {
      const cardWidth = slider.clientWidth / this.slideSize;
      this.$el.querySelectorAll('.news-card').forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
      });
    }
  },
    loadMorePersonalities() {
      this.visiblePersonalitiesCount += 6;
    },
    hidePersonalities() {
      this.visiblePersonalitiesCount = 6; // Скрывает все кроме первых 6
    },
    scrollToTop() {
  console.log("Scrolling to top...");
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
,
    async fetchLatestNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.latestNews = data.items;
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
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
    selectPerson(index) {
      this.selectedPerson = this.newsStore.personalities[index];
      this.scrollToTop() ;
      
    },
    clearSelection() {
      this.selectedPerson = null;
    },
  },
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
  background-color:transparent;
  color:var(--text-color);
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

.news-card {
  flex: 1 0 calc(100% / 3); /* 3 элемента на слайд */
  box-sizing: border-box;
  padding: 10px;
  /* background-color: #091520; */
  border-radius: 10px;
  text-align: center;
}
.sidebar-news-item {
  margin-bottom: 15px;
}
.pointer{
  cursor: pointer;
}
a{
  text-decoration:none;
  color:var(--text-color)
}
.personalities {
  margin-top: 20px;
}
.personality-card {
  padding: 20px;
  cursor: pointer;
}
.personality-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}
.personality-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 10px;
}
.selected-personality .row {
  display: flex;
}
.news-sidebar {
  max-height: 170vh;
  overflow-y: auto;
 
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
.personality-content {
  padding: 20px;
}
.personality-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.personality-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.personality-text {
  width: 100%;
  max-width: 800px;
}
.back-link {
  cursor: pointer;
  font-weight: bold;
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

@media (max-width: 768px) {
  .selected-personality .row {
    flex-direction: column-reverse;
  }
  .news-sidebar {
    max-height: auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .personality-container {
    align-items: center;
  }
  .personality-image {
    max-width: 100%;
  }
  .personality-text {
    text-align: center;
  }
}
</style>
