<template>
    <div :class="{ 'dark-mode': isDarkMode }" class="container mt-3" v-if="!loading">
      <div class="row justify-content-center">
       
        <div class="col-12 col-lg-6">
          <!-- Большая карточка -->
          <div style="border: none !important;" class="card mb-4 large-card position-relative mx-auto">
            <img
              v-if="largeNewsItem.urlToImage"
              :src="largeNewsItem.urlToImage"
              class="card-img large-card-img"
              alt="news image"
            />
            <div class="card-img-overlay d-flex align-items-center justify-content-center large-overlay">
              <h5 class="card-title text-white large-title text-center">
                <a :href="largeNewsItem.url" target="_blank" class="text-white">
                  {{ largeNewsItem.title }}
                </a>
                <p class="card-text ">
                    {{ formatDate(largeNewsItem.publishedAt) }}
                  </p>
              </h5>
              
              <!-- <p class="card-text text-white small-text">
                {{ formatDate(largeNewsItem.publishedAt) }}
              </p> -->
            </div>
          </div>
  
          <!-- Карточки под большой карточкой -->
          <h5 style="background-color: rgb(65, 116, 212);border-radius: 4px;" class=" text-white p-2 fw-bold">Выбор редакции</h5>  
        <div  
          v-for="(newsItem, index) in sideNews"  
          :key="newsItem.id"  
          class="car p-3 mb-3 side-card flex-row align-items-center mx-auto"  
        >  
          <div class="card-body">  
            <span style="font-size: 31px;color: cornflowerblue;" class="fw-bold">{{ index + 1 }}</span> 
            <p style="font-size: 11px;" class="card-text">  
              {{ formatDate(newsItem.publishedAt) }}  
            </p>  
            
             <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold fs-5">{{ newsItem.title }}</a>  
             <p style="color: cornflowerblue" class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">  
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>  
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>  
            </svg> {{ newsItem.author }}</p>  
          </div>  
          <img  
            v-if="newsItem.urlToImage"  
            :src="newsItem.urlToImage"  
            class="img-fluid side-card-img"  
            alt="news image"  
          />  
        </div>  
      </div>  

  
        <!-- Правая колонка с сеткой маленьких карточек -->
        <div class="col-12 col-lg-6">
          <div class="row">
            <div
              v-for="newsItem in smallNews"
              :key="newsItem.id"
              class="col-4 "
            >
              <div class="car h-100 small-card " style="">
                <img
                  v-if="newsItem.urlToImage"
                  :src="newsItem.urlToImage"
                  class="card-img-top small-card-img"
                  alt="news image"
                />
                <div class="card-body  p-3">
               <span style="font-size: 11px;">  {{ formatDate(newsItem.publishedAt) }}</span> 
                  <p  class="card-text ">
                    <a style="font-size: 14px;" :href="newsItem.url" target="_blank" class="mt-auto fw-bold ">{{ newsItem.title }}</a>
                  </p>
                 
                  <p style="color: cornflowerblue"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {{ newsItem.author }}
                 
                </p>
                 
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
        loading: true, 
        smallNews: [], // для маленьких карточек в левой колонке
        largeNewsItem: {}, // для большой карточки
        sideNews: [], // для карточек под большой карточкой
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
          
          // Заполняем массивы для отображения
          this.smallNews = data.items.slice(1, 16);
          this.largeNewsItem = data.items[0];
          this.sideNews = data.items.slice(16, 21);
          this.loading = false;
        } catch (error) {
          console.error("Ошибка при загрузке новостей:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  p{
    font-size: 11px;
  }
  .large-card .card-img-overlay {  
    
  background-color: rgba(0, 0, 0, 0.2); /* Регулируйте значение альфа-канала (0.5) для желаемой степени затемнения */  
}  
  
  
  /* .small-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    transform: scale(1.05);
  } */
  
  .small-card-img {
    height: 150px;
    object-fit: cover;
  }
  
  .small-title {
    font-size: 1rem;
    font-weight: bold;
  }
  
  .card-text {
    font-size: 0.9rem;
    /* color: #6c757d; */
  }
  
  /* Стили для большой карточки */
  .large-card {
    max-width: 600px;
    height: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .large-card-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  
  .large-overlay {
    /* background-color: rgba(0, 0, 0, 0.6); */
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
  
  .large-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
  }
  
  .small-text {
    font-size: 0.9rem;
    /* color: #f0f0f0; */
  }
  
  /* Стили для боковых карточек под большой карточкой */
  .side-card {
    max-width: 600px;
    height: 250px;
    display: flex;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .side-card-img {
    width: 40%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Адаптивные стили */
  @media (max-width: 992px) {
    .large-card,
    .side-card {
      width: 100%;
    }
  }
  :root {
  --link-color: #000000; /* Цвет ссылок в светлой теме */
  --text-color: #000000; /* Основной цвет текста в светлой теме */
  background-color: #ffffff;
}

.dark-mode {
  --link-color: #ffffff; /* Цвет ссылок в тёмной теме */
  --text-color: #ffffff; /* Основной цвет текста в тёмной теме */
  
}

body, .dark-mode {
  color: var(--text-color); /* Использование переменной для цвета текста */
}

/* Стили для ссылок */
a {
  color: var(--link-color); /* Цвет ссылок будет зависеть от темы */
  text-decoration: none;
}
  </style>
  