<template>
  <div id="teste">
    <sorted-table :values="datas">
      <thead>
        <tr>
          <th scope="col" style="text-align: left; width: 10rem;">
            <sort-link name="id">ID</sort-link>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
            <sort-link name="name">Name</sort-link>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
            <sort-link name="hits">preço</sort-link>
          </th>
        </tr>
      </thead>
      <template #body="sort">
        <tbody>
          <tr v-for="data in sort.datas" :key="data.id">
            <td>{{ data.codigo}}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.preco }}</td>
          </tr>
        </tbody>
      </template>
    </sorted-table>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  name: "Teste",
    data(){
    return{
      datas: [],
      elementosPorPagina: 5,
      datasPaginados: [],
      paginaAtual: 1,
    }
  },
async mounted(){
  const response = await api.get("produtos?page=*&size=*");
    this.datas = response.data.content
    this.datasPaginados = response.data.content
    this.getDataPagina(1)
},
methods:{
 totalPaginas(){
   return Math.ceil(this.datas.length / this.elementosPorPagina)
 },
 getDataPagina(noPagina){
   this.paginaAtual = noPagina;
   this.datasPaginados = []
   let init = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
   let fim = (noPagina * this.elementosPorPagina);
    this.datasPaginados = this.datas.slice(init,fim)
 },
 getPreviewPage(){
   if(this.paginaAtual > 1){
     this.paginaAtual --;
   }
   this.getDataPagina(this.paginaAtual);

 },
 getPreviewAll(){
   if(this.paginaAtual > 1){
     this.paginaAtual = 1
   }
   this.getDataPagina(this.paginaAtual);
 },
 getNextPage(){
   if(this.paginaAtual < this.totalPaginas()){
     this.paginaAtual ++;
   }
   this.getDataPagina(this.paginaAtual);
 },
getNextAll(){
  if(this.paginaAtual < this.totalPaginas()){
    this.paginaAtual = this.totalPaginas()
  }
  this.getDataPagina(this.paginaAtual);
}
}
}
</script>