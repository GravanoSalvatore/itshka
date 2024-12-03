<template>
    <div >
    <!-- <br/>    <br/> -->
    <CookieConsent/>
        <AdvancedNewsSection />
        <Price/>
      <NewsSection />
      <br/>
      
      <News3 />
      <News2 />
      <Popular/>
      <News4 />
      <br/>
      <News5 />
      <News3a />
      <News6 />
    </div>
  </template>
  
  <script>
   import Popular from '~/components/Popular.vue'
  import NewsSection from '~/components/NewsSection.vue';
  import AdvancedNewsSection from '~/components/AdvancedNewsSection.vue';
  import News2 from '~/components/News2.vue';
  import News3 from '~/components/News3.vue';
  import News3a from '~/components/News3a.vue';
  import News4 from '~/components/News4.vue';
  import News5 from '~/components/News5.vue';
  import News6 from '~/components/News6.vue';
  import Price from '~/components/Price.vue';
  import CookieConsent from '~/components/CookieConsent.vue';
  export default {
    components: {
      Popular,
      NewsSection,
      AdvancedNewsSection,
      News2,
      News3,
      News3a,
      News4,
      News5,
      News6,
      Price,
      CookieConsent
    },
  };
  </script>
  
  