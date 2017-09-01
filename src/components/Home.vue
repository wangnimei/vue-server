<template>
  <div class="home">
    <h1>{{msg}}</h1>
    <button type="button" name="button" @click="change">change</button>
    <router-link :to="{ name: 'other', params: {} }">go other page</router-link>
  </div>
</template>

<script>
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
  created() {
    console.log('hello');
  }
}
</script>
