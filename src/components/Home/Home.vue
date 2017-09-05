<template>
  <div class="home">
    <h1>{{msg}}</h1>
    <div class="image"></div>
    <router-link :to="{ name: 'other', params: {} }">go other page</router-link>
  </div>
</template>

<script>
import './scss/home.scss';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'This is home page'
    }
  },
  methods: {
    change() {
      console.log('hello')
      this.msg = 'change the message';
    }
  },
  mounted() {
    console.log('hello');
  }
}
</script>
