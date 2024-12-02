<template>
  <div id="app">
    <!-- El header siempre visible -->
    <Header />
    
    <main>
      
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
  name: 'App',
};
</script>

<style src="../src/assets/styles.css"></style>
