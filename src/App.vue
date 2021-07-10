<template>
  <div id="app">
   
   <header>
    <h1>Dashboard</h1>
   </header>

  <article v-for="infos in info" :key="infos.id">
    <strong>{{infos.id}}</strong> <br />
    <strong>{{infos.deals}}</strong> <br />
    <strong>{{infos.seller.name}}</strong><br />
    <strong>{{infos}}</strong>
  </article>

  </div>
</template>

<script>
import api from './services/api';

export default {
  name: 'App',
  data(){
    return{
      info:[]
    }
  },
  async created(){
    const response = await api.get('?api=posts');
    this.info = response.data.content
  }
  
}
</script>

<style>

</style>
