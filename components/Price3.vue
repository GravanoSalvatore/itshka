<template>
    <div class="containe">
      <!-- <div class="marquee   p-2">
        <div class="marquee-content">
          <span v-for="crypto in topCryptos" :key="crypto.id" class="crypto-item mx-3">
            {{ crypto.name }}: {{ crypto.current_price }} USD
          </span>
        </div>
      </div> -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        topCryptos: []  // Массив для хранения данных о криптовалютах
      };
    },
    mounted() {
      this.fetchCryptoData();  // Вызываем метод для получения данных при монтировании компонента
    },
    methods: {
      async fetchCryptoData() {
        try {
          const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets', {
              params: {
                vs_currency: 'usd',  // Валюта для отображения цен
                order: 'market_cap_desc',  // Сортировка по рыночной капитализации
                per_page:100,  // Количество криптовалют
                page: 1
              }
            }
          );
          this.topCryptos = response.data;  // Присваиваем данные переменной
        } catch (error) {
          console.error('Error fetching crypto data:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .marquee {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }
  
  .marquee-content {
    display: flex;
    animation: marquee 240s linear infinite;  /* Анимация для создания эффекта бегущей строки */
  }
  
  .crypto-item {
    color:black;
    display: inline-block;
    padding: 0 15px;
    font-size: 14px;  /* Размер шрифта */
  }
  
  /* Анимация движения */
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  
  /* Медиа-запросы для адаптации на маленьких экранах */
  @media (max-width: 768px) {
    .crypto-item {
      font-size: 14px;  /* Уменьшаем шрифт для маленьких экранов */
    }
    
    .marquee-content {
      animation: marquee 290s linear infinite;  /* Ускоряем анимацию для маленьких экранов */
    }
  }
  
  @media (max-width: 480px) {
    .crypto-item {
      font-size: 12px;  /* Еще меньше шрифт на мобильных */
    }
    
    .marquee-content {
      animation: marquee 355s linear infinite;  /* Еще быстрее на мобильных */
    }
  }
  </style>
  