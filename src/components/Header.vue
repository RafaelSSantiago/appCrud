<template>
  <div id="header">

<div class="card ">
  <div class="card-header header-personalizado">
        <div class="d-grid gap-2 d-md-block" style="margin-top: 10px;">
          <b-button v-b-modal.modal-1 class="btn-personalizado2 me-md-2"><i class="far fa-plus"></i> Novo</b-button>
          <b-modal @ok=newProduct id="modal-1" title="Detalhes do Produto">
           <b-form>
              <b-form-group
              id="input-group-1"
              label="Nome"
              label-for="input-1"
            >
             <b-form-input
             id="input-1"
             type="text"
             v-model="nome"
             ></b-form-input>

              <b-row class="mt-3">
              <label for="textarea-default">Descrição</label>
              <b-col sm="23">
              </b-col>
              <b-col sm="12">
                <b-form-textarea
                  id="textarea-large"
                  size="lg"
                ></b-form-textarea>
              </b-col>
              </b-row>

              <label class="mt-3" for="textarea-default">Status</label>
              <b-form-select v-model="status" :options="options"></b-form-select>

               <label  class="mt-3" for="textarea-default">Categoria</label>
               <b-row cols="2">
    <b-col><b-form-radio v-model="categoria"  name="some-radios" value="Categoria_1">Categoria 1</b-form-radio></b-col>
    <b-col><b-form-radio v-model="categoria"  name="some-radios" value="Categoria_2">Categoria 2</b-form-radio></b-col>
    <b-col><b-form-radio v-model="categoria"  name="some-radios" value="Categoria_3">Categoria 3</b-form-radio></b-col>
    <b-col><b-form-radio v-model="categoria"  name="some-radios" value="categoria_4">Categoria 4</b-form-radio></b-col>
  </b-row>
                
              
                  <b-row class="mt-3" cols="2">
                  <b-col>Preço</b-col>
                  <b-col>Quantidade</b-col>
                  <b-col>
                    <b-form-input
                  id="inline-form-input-name"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="preco"
                ></b-form-input>
                  </b-col>
                  <b-col>
                      <b-form-input
                  id="inline-form-input-name"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  
                ></b-form-input>
                  </b-col>
                   </b-row>          
            </b-form-group>
           </b-form>
           </b-modal>
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
    categoria: null,
    status: null,
    options: [
          { value:'em_Estoque', text: 'Em Estoque' },
          { value: 'sem_EStoque', text: 'Sem Estoque' },
        
        ],
         selected: [],
  
  }
},

methods:{
  async newProduct(){
    await api.post('produtos',{
      nome: this.nome,
      preco:this.preco,
      codigo: 'dad8484',
      categoria: this.categoria,
      status: this.status
    });
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