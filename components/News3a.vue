<template>
    <div class="news-section my-5">
      <!-- Баннер -->
      <div v-if="bannerItem" ref="banner" class="banner-container text-center py-4 mb-5">
        <div ref="bannerContent" class="banner-content">
          <!-- Маленькие изображения по бокам -->
          <!-- <img src="../public/ape.png" alt="left decorative" class="small-image left" /> -->
          <!-- <img src="../public/www.png" alt="right decorative" class="small-image right" />
   -->
          <!-- Основное изображение баннера -->
          <img src="../public/4vcoin.png" alt="banner image z" class="banner-image" />
          <p ref="slogan" class="slogan fw-bold" style="font-size: 16px;">Получи свои FVX!</p>
        </div>
      </div>
  
      <!-- Карточки -->
      <div class="container">
        <div class="row g-4">
          <div v-for="newsItem in newsItems" :key="newsItem.id" class="col-12 col-md-6 col-lg-4 news-card">
            <div class="car p-3 h-100 ">
              <img v-if="newsItem.urlToImage" :src="newsItem.urlToImage" class="card-img-top" alt="news image" />
              <div class="card-body d-flex flex-column">
                <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {{ newsItem.author }}</p>
                <NuxtLink :to="`/news/${newsItem.id}`" class="text-decoration-none ">
                  <h5 class="card-title fw-bold">{{ newsItem.title }}</h5>
                </NuxtLink>
                <p class="card-text ">{{ formatDate(newsItem.publishedAt) }}</p>
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
        newsItems: [],
        bannerItem: null,
      };
    },
    async mounted() {
      await this.fetchNews();
      this.setupScrollAnimation();
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
            "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=19&Tags=53&Page=2&PageSize=100"
          );
          const data = await response.json();
          this.bannerItem = data.items[0] || null;
          this.newsItems = data.items.slice(1, 10);
        } catch (error) {
          console.error("Ошибка при загрузке новостей:", error);
        }
      },
      setupScrollAnimation() {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.showBanner();
              } else {
                this.resetAnimation();
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(this.$refs.banner);
      },
      showBanner() {
        const bannerContent = this.$refs.bannerContent;
        const slogan = this.$refs.slogan;
  
        if (bannerContent) bannerContent.classList.add("fade-in");
        if (slogan) {
          slogan.classList.remove("slide-in");
          setTimeout(() => {
            slogan.classList.add("slide-in");
          }, 1000);
        }
      },
      resetAnimation() {
        const bannerContent = this.$refs.bannerContent;
        const slogan = this.$refs.slogan;
  
        if (bannerContent) bannerContent.classList.remove("fade-in");
        if (slogan) slogan.classList.remove("slide-in");
      },
    },
  };
  </script>
  
  <style scoped>
  .z{
    z-index: 1000;
  }
  /* Основные стили */
  .container {
    max-width: 1200px;
  }
  
  /* Стили для баннера */
  .banner-container {
    height: 250px;
    background-color: #01263f;
    padding: 30px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.8), /* верхняя тень */
    inset 0 10px 30px rgba(31, 153, 234, 0.8); /* нижняя тень */
  }
  
  /* Тени и плавное появление баннера */
  .banner-content {
    /* background-color: #091520; */
    border-radius: 8px;
    opacity: 0;
    transition: opacity 2s ease-in-out;
   
    /* box-shadow: inset 0 10px 30px rgba(31, 153, 234, 0.8); */
    position: relative;
  }
  .banner-content.fade-in {
    opacity: 1;
  }
  
  .banner-image {
    width: 50%;
  }
  
  /* Маленькие изображения по бокам */
  .small-image {
    position: absolute;
    width: 80px;
    height: auto;
    top: 80%;
    transform: translateY(-50%);
    opacity: 0.8;
  }
  .small-image.left {
    left: -30px;
  }
  .small-image.right {
    right: 10px;
  }
  
  /* Анимация для слогана */
  .slogan {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #ffffff;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1.5s ease, transform 1.5s ease;
  }
  .slogan.slide-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Стили для карточек */
  .news-card {
    transition: transform 0.3s ease;
  }
  .news-card:hover {
    transform: scale(1.02);
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  