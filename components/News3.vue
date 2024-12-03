  
<!-- <template>
  <div class="banner">

  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style scoped>
.banner {
  background-image: url("https://img.youtube.com/vi/IPwZPdD_5Nc/maxresdefault.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.5);

  /* Анимация появления */
  opacity: 0;
  animation: fadeIn 1s ease-in-out 2s forwards; /* Появление через 2 секунды */
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.banner-content {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
}

.banner-title {
  font-size: 2rem;
  margin: 0;
}

.banner-subtitle {
  font-size: 1.2rem;
  margin: 10px 0 0;
}
</style> -->
<template>
  <div
    class="banner"
    v-if="bannerData"
    :style="{ backgroundImage: `url(${bannerData.urlToImage})` }"
  >
    <div class="banner-content">
      <h1 class="banner-title">{{ bannerData.title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      bannerData: null,
    };
  },
  async mounted() {
    await this.fetchBannerData();
  },
  methods: {
    async fetchBannerData() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=30"
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          this.bannerData = data.items[29];
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных баннера:", error);
      }
    },
  },
};
</script>

<style scoped>
.banner {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: fadeIn 1s ease-in-out 2s forwards;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Затемнение */
  z-index: 1;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  border-radius: 10px;
}

.banner-title {
  font-size: 2rem;
  margin: 0;
}
</style>
