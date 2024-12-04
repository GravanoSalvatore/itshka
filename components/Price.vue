<template>
    <div class="containe ">
      <div class="marquee mb-2">
        <div class="marquee-content">
          <div class="crypto-items">
            <span v-for="crypto in topCryptos" :key="crypto.id" class="crypto-item mx-3">
              <img :src="crypto.image" alt="crypto logo" class="crypto-logo" />
              <div class="crypto-info">
                <div class="crypto-name fw-bold">
                  {{ crypto.name }}: {{ crypto.current_price.toFixed(2) }} USD
                </div>
                <div class="crypto-change" :class="{'text-success': crypto.price_change_percentage_24h >= 0, 'text-danger': crypto.price_change_percentage_24h < 0}">
                  <i :class="crypto.price_change_percentage_24h >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                  {{ crypto.price_change_percentage_24h.toFixed(2) }}%
                  <svg class="mini-chart" :class="{'green-chart': crypto.price_change_percentage_24h >= 0, 'red-chart': crypto.price_change_percentage_24h < 0}" viewBox="0 0 50 20" preserveAspectRatio="none">
                <polyline :points="generatePoints(crypto.price_change_percentage_24h)" />
              </svg>
                </div>
              </div>
              
            </span>
          </div>
          <div class="crypto-items">
            <span v-for="crypto in topCryptos" :key="crypto.id + '-duplicate'" class="crypto-item mx-3">
              <img :src="crypto.image" alt="crypto logo" class="crypto-logo" />
              <div class="crypto-info">
                <div class="crypto-name fw-bold">
                  {{ crypto.name }}: {{ crypto.current_price.toFixed(2) }} USD
                </div>
                <div class="crypto-change" :class="{'text-success': crypto.price_change_percentage_24h >= 0, 'text-danger': crypto.price_change_percentage_24h < 0}">
                  <i :class="crypto.price_change_percentage_24h >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                  {{ crypto.price_change_percentage_24h.toFixed(2) }}%
                  <svg class="mini-chart" :class="{'green-chart': crypto.price_change_percentage_24h >= 0, 'red-chart': crypto.price_change_percentage_24h < 0}" viewBox="0 0 50 20" preserveAspectRatio="none">
                <polyline :points="generatePoints(crypto.price_change_percentage_24h)" />
              </svg>
                </div>
              </div>
             
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        topCryptos: []
      };
    },
    mounted() {
      this.fetchCryptoData();
    },
    methods: {
      async fetchCryptoData() {
        try {
          const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets', {
              params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1
              }
            }
          );
          this.topCryptos = response.data;
        } catch (error) {
          console.error('Error fetching crypto data:', error);
        }
      },
      generatePoints(change) {
        // Генерация простого графика для примера
        const base = change >= 0 ? '5,20 15,10 25,15 35,5 45,10' : '5,10 15,15 25,10 35,20 45,15';
        return base;
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
    animation: marquee 360s linear infinite;
  }
  
  .crypto-items {
    display: flex;
  }
  
  .crypto-item {
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 11px;
  }
  
  .crypto-logo {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  
  .crypto-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;
  }
  
  .crypto-name {
    font-size: 10px;
  }
  
  .crypto-change {
    font-weight: bold;
    font-size: 10px;
    display: flex;
    align-items: center;
  }
  
  .text-success {
    color: #28a745;
  }
  
  .text-danger {
    color: #dc3545;
  }
  
  .mini-chart {
    width: 50px;
    height: 20px;
    margin-left: 10px;
  }
  
  .green-chart polyline {
    fill: none;
    stroke: #28a745;
    stroke-width: 2;
  }
  
  .red-chart polyline {
    fill: none;
    stroke: #dc3545;
    stroke-width: 2;
  }
  
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .crypto-item {
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 12px;
    border-right: 1px solid #ddd; /* Добавляет правый бордер */
  }
  
  .crypto-item:last-child {
    border-right: none; /* Убирает бордер у последнего элемента */
  }
  </style>