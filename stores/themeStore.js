import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false);

  function loadTheme() {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      isDarkMode.value = JSON.parse(savedTheme);
      console.log('Загруженная тема из localStorage:', isDarkMode.value);
    } else {
      console.log('Тема не найдена в localStorage, устанавливаем по умолчанию:', isDarkMode.value);
    }
  }

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode.value));
    console.log('Новая тема после переключения:', isDarkMode.value);
  }

  return {
    isDarkMode,
    loadTheme,
    toggleTheme,
  };
});