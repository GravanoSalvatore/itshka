<template>
    <div class="tradingview-widget-container">
      <div :id="containerId"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TradingViewChart",
    props: {
      width: {
        type: Number,
        default: 800,
      },
      height: {
        type: Number,
        default: 600,
      },
      symbol: {
        type: String,
        default: "BINANCE:BTCUSDT",
      },
      interval: {
        type: String,
        default: "D",
      },
      timezone: {
        type: String,
        default: "Etc/UTC",
      },
      theme: {
        type: String,
        default: "dark",
      },
      style: {
        type: String,
        default: "1",
      },
      locale: {
        type: String,
        default: "en",
      },
      toolbarBg: {
        type: String,
        default: "#f1f3f6",
      },
      enablePublishing: {
        type: Boolean,
        default: false,
      },
      allowSymbolChange: {
        type: Boolean,
        default: true,
      },
      containerId: {
        type: String,
        default: "tradingview_btc_chart",
      },
    },
    mounted() {
      // Ensure the TradingView script is loaded before using it
      if (typeof TradingView === "undefined") {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.onload = () => this.initializeChart();
        document.head.appendChild(script);
      } else {
        this.initializeChart();
      }
    },
    methods: {
      initializeChart() {
        new TradingView.widget({
          width: this.width,
          height: this.height,
          symbol: this.symbol,
          interval: this.interval,
          timezone: this.timezone,
          theme: this.theme,
          style: this.style,
          locale: this.locale,
          toolbar_bg: this.toolbarBg,
          enable_publishing: this.enablePublishing,
          allow_symbol_change: this.allowSymbolChange,
          container_id: this.containerId,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .tradingview-widget-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  