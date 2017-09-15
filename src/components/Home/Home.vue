<template>
  <div class="home">
    <h1>{{item.user_name}}</h1>
    <div class="image"></div>
    <router-link :to="{ name: 'other', params: {} }">go other page</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  asyncData({ store }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem')
  },
  data() {
    return {

    }
  },
  computed: {
    item() {
      return this.$store.state.item
    }
  }
}
</script>
