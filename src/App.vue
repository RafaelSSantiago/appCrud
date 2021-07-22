<template>
  <div id="app">
    <div class="container marginBycss shadow p-3 mb-5 bg-body rounded">
        <Header class="margin-personalizado"/>   
       <Table />
  </div>
  </div>
   
</template>

<script>
import Table from './components/Table.vue'
import Header from './components/Header.vue';


export default {
  name: 'App',
  components:{
    Table,
    Header,
  
  },
  data(){
    return{

    }
  }
}
</script >

<style scoped>
  .marginBycss{
    margin-top: 10%;
  }
  .margin-personalizado{
    margin-bottom: 3%;
  }
</style>
