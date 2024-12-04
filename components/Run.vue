<template>
     
    <div class="marquee">
       
      <div style="color: cornflowerblue;" class="marquee-content fw-bold mt-1">
        <span v-for="(newsItem, index) in latestNews" :key="'1-' + index">
            <img
                style="width: 20px; height: 20px"
                :src="newsItem.source_info.img"
              /> {{ newsItem.title }} &nbsp;&nbsp;|&nbsp;&nbsp;
        </span>
        <!-- Дублируем для бесшовного эффекта -->
        <span v-for="(newsItem, index) in latestNews" :key="'2-' + index">
            <img
                style="width: 20px; height: 20px"
                :src="newsItem.source_info.img"
              />   {{ newsItem.title }} &nbsp;&nbsp;|&nbsp;&nbsp;
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        latestNews: [], // Массив для новостей
      };
    },
    async mounted() {
      await this.fetchBannerData();
    },
    methods: {
      async fetchBannerData() {
        try {
          const response = await fetch(
            "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT&excludeCategories=Sponsored"
          );
          const data = await response.json();
  
          // Проверяем, что данные корректны
          if (data.Data && Array.isArray(data.Data)) {
            this.latestNews = data.Data; // Сохраняем новости
          } else {
            console.error("Неверный формат данных", data);
          }
        } catch (error) {
          console.error("Ошибка при загрузке данных для новостей:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .marquee {
    margin-top: 50px;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
    position: relative; /* Убедимся, что дочерние элементы находятся внутри */
  }
  
  .marquee-content {
    display: inline-flex; /* Устанавливаем flex для горизонтального расположения */
    animation: marquee 700s linear infinite; /* Ускоренная анимация */
  }
  
  @keyframes marquee {
    from {
      transform: translateX(0); /* Начало анимации */
    }
    to {
      transform: translateX(-100%); /* Сдвиг на всю ширину контента */
    }
  }
  
  .pointer {
    cursor: pointer;
  }
  </style>
  