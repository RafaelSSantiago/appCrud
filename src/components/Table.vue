<template>
  <div class="table">

  <div class="card border-0">
        <div class="card-header">
              <nav class="navbar navbar-light bg-light ">
        <div class="container-fluid ">
        <p class="fs-5">Gerenciar Produtos</p>
          <form class="row ">
            
          <div class="col-auto ">
              <input type="text" class="form-control"  placeholder="Nome do Produto...">
          </div>
          <div class="col-auto ">
              <button type="submit" class="btn btn-success pesquisar btn-personalizado"><i class="fal fa-search"></i> Pesquisar</button>
        </div>
        </form>
        </div>
      </nav>
      </div>
  </div>

<table class="table" id="myTable">
  <thead class="table-light">

    <tr>
      <th scope="col"> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></th>
      <th >Codigo</th>
      <th >Nome</th>
      <th >Preço </th>
      <th >Categoria</th>
      <th >Status</th>
      <th :scope="col"></th>
    </tr>
  </thead>
  <tbody >
    <tr v-for="item in datasPaginados" :key="item.id">
      <th><input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..."></th>  
      <td scope="row" >{{item.codigo}}</td>
      <td>{{item.nome}}</td>
      <td>{{item.preco}}</td>
      <td>{{item.categoria}}</td>
      <th>{{item.status}}</th>
      <td>
        <div class="d-grid gap-2  d-md-block btn-group-sm ">
              <button class="btn btn-primary me-md-2 btn-success rounded-circle btn-personalizado" type="button"><i class="fal fa-pen"></i></button>
              <button class="btn btn-primary  btn-warning rounded-circle" type="button"><i class="far fa-trash-alt"></i></button>
        </div>
      </td>
    </tr>
    
  </tbody>
  <caption>
   <nav>
    <ul class="pagination justify-content-center">
 
        <li class="page-item" @click="getPreviewAll()">
        <a class="page-link pgn-style border-0" href="#" aria-label="Previous">
        <i class="far fa-chevron-double-left"></i>
        </a>
        </li>
        <li class="page-item" @click="getPreviewPage()">
        <a class="page-link pgn-style border-0" href="#" aria-label="Previous">
            <i class="far fa-chevron-left"></i>
        </a>
        </li>
        <li v-for="pagina in totalPaginas()" :key="pagina.id" @click="getDataPagina(pagina)" class="page-item">
          <a class="page-link pgn-style border-0" href="#">{{pagina}}</a>
        </li>
    
        <li class="page-item" @click="getNextPage(id)">
        <a  class="page-link pgn-style border-0" href="#" aria-label="Next">
            <i class="far fa-chevron-right"></i>
        </a>
        </li>
        <li class="page-item" @click="getNextAll()">
        <a class="page-link pgn-style border-0" href="#" aria-label="Next">
            <i class="far fa-chevron-double-right"></i>
        </a>
        </li>
       
  </ul>
</nav>
  </caption>
  </table>

    
  </div>
</template>

<script>
import api from '../services/api';
//import _sortBy from 'lodash/sortBy';

export default {
name: 'Table',
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
},

}
}
</script>

<style scoped>

.pesquisar{
    margin-left: -24px;
}

.table thead>tr>th{
    vertical-align: bottom;
    border-bottom: none; 
    color: #44484b;
    font-weight: 500;
}

.btn-personalizado{
    color: white;
    background-color:#6ab04c;
    border-color: #6ab04c;
}

.pgn-style{
   color: #44484b;
}
  
</style>