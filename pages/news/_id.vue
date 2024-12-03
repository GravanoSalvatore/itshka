<template>
    <div class="container my-5">
      <div v-if="newsItem" class="card">
        <img v-if="newsItem.urlToImage" :src="newsItem.urlToImage" class="card-img-top" alt="news image" />
        <div class="card-body">
          <h1 class="card-title">{{ newsItem.title }}</h1>
          <p class="card-text text-muted">{{ formatDate(newsItem.publishedAt) }}</p>
          <p class="card-text">{{ newsItem.content || 'Контент отсутствует' }}</p>
        </div>
      </div>
      <div v-else>
        <p>Новость не найдена.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({ params }) {
      try {
        const response = await fetch(
          `https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100`
        );
        const data = await response.json();
        const newsItem = data.items.find(item => item.id === parseInt(params.id));
        return { newsItem: newsItem || null };
      } catch (error) {
        console.error("Ошибка при загрузке новости:", error);
        return { newsItem: null };
      }
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        return isNaN(date) ? "Дата недоступна" : date.toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  .card-title {
    font-size: 2rem;
    font-weight: bold;
  }
  .card-text {
    font-size: 1.1rem;
  }
  </style>
  