<template>
    <div style="background-color: #091520;" v-if="showConsent" class="cookie-consent fixed-bottom  p-3 shadow-lg">
      <div  class="d-flex justify-content-between align-items-center text-white">
        <div>
          <h5>Уведомление о файлы «cookie»</h5>
          <p>Сайт cryptoItshka использует файлы «cookie» с целью персонализации сервисов и повышения удобства пользования сайтом.</p>
        <p>Если вы не хотите, чтобы ваши пользовательские данные обрабатывались, пожалуйста, ограничьте их использование в своём браузере.</p>
        </div>
        <div class="">
          <button class="btn btn-primary me-2" @click="acceptCookies">Принять</button><br/>
          <button class="btn btn-outline-secondary mt-2" @click="toggleDetails">Узнать больше</button>
        </div>
      </div>
  
      <div v-if="showDetails" class="mt-2 text-white p-1">
        <h6>Детальная политика файлы «cookie»</h6>
        <p>Наш сайт использует как основные, так и дополнительные куки для обеспечения оптимального пользовательского опыта.</p>
        <ul>
          <li>Основные куки необходимы для базовой функциональности.</li>
          <li>Аналитические куки помогают нам понять поведение пользователей.</li>
          <li>Рекламные куки позволяют показывать целевые объявления.</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CookieConsent',
    data() {
      return {
        showConsent: false,
        showDetails: false,
      };
    },
    mounted() {
      this.checkCookieConsent();
    },
    methods: {
      checkCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          this.showConsent = true;
        }
      },
      acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        this.showConsent = false;
      },
      toggleDetails() {
        this.showDetails = !this.showDetails;
      },
    },
  };
  </script>
  
  <style scoped>
  .cookie-consent {
    z-index: 1050; /* Above most other elements */
  }
  p  {
    font-size: 12px;
  }
  li  {
    font-size: 12px;
  }
  </style>
  