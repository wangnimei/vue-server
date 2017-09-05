<template>
  <div class="other">
    <h1>This is other page</h1>
    <router-link :to="{ name: 'home', params: {} }">go home page</router-link>
  </div>
</template>

<script>
export default {
  name: 'other'
}
</script>

