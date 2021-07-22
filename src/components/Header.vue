<template>
  <div id="header">

<div class="card ">
  <div class="card-header header-personalizado">
        <div class="d-grid gap-2 d-md-block" style="margin-top: 10px;">
            <button @click="newProduct()" class="btn  btn-personalizado2 me-md-2" type="button"><i class="far fa-plus"> Novo</i></button>
            <button class="btn  btn-personalizado" type="button"><i class="far fa-trash-alt"> Excluir</i></button>
        </div>
  </div>

</div>


  </div>
</template>

<script>
import api from '../services/api';

export default {
name: 'Header',
data(){
  return{
    nome: '',
    preco: '',
    codigo: '',
    categoria: ['EMESTOQUE', 'SEMESTOQUE'],
    status: ['Categora_1', 'Categora_2', 'Categora_3', 'Categora_5']
  }
},
methods:{
  async newProduct(){
  await api.post("produtos",{
    nome: this.nome,
    preco: this.preco,
    codigo: this.codigo,
    categoria: this.categoria.indexOf(),
    status: this.status.indexOf()
   })
  }
}
}
</script>

<style scoped>
.btn-personalizado {
    color: white;
    background-color:#ff7675;
    border-color:#ff7675;
}
.btn-personalizado2 {
    color: white;
    background-color:#6ab04c;
    border-color: #6ab04c;
}
.header-personalizado{
    height: 90px;
  
}
</style>