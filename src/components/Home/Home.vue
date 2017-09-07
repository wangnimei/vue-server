<template>
  <div class="home">
    <h1>{{msg}}</h1>
    <div class="image"></div>
    <router-link :to="{ name: 'other', params: {} }">go other page</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  my_method() {
    console.log('hello')
  },
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
    console.log(this)
  }
}
</script>
