import { createApp } from './app';

const { app, router } = createApp();

router.onReady(() => {
  // 必须和App.vue的根元素id相同，否则无法在客户端混合服务器端已经渲染完的静态标记
  app.$mount('#app');
});