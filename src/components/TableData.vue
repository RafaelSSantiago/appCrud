<template>
<div class="overflow-auto">

<b-card bg-variant="light"  class="text-center">
     <div class="text-uppercase text-bold">id selected: {{selected}}</div>
 <b-form inline >
    <h5 align="left">Gerenciar produtos</h5>
    <label class="sr-only" for="inline-form-input-username"></label>
    <b-input-group id="input-p" class="mb-2 mr-sm-0 mb-sm-0">
      <b-form-input id="inline-form-input-username" placeholder="Nome do Produto..."></b-form-input>
    </b-input-group>
    <b-button variant="primary">Pesquisar</b-button>
  </b-form>
  

</b-card>

    <b-table  :per-page="perPage" 
    :current-page="currentPage" 
    class="table-light"
     :items="products" 
    :fields="fields"
     >
       
       <template  v-slot:head(sel)>
           <b-form-checkbox
           :value="products.id"
           v-model="selected"
             @change="select"
           >
          
        </b-form-checkbox>
       </template>

       <template  v-slot:cell(sel)>
         <b-form-checkbox
         @change="select"
        >
         </b-form-checkbox>
       </template>

      <template v-slot:cell(actions)="products">
        <b-button id="btn-personalizado" class="btn btn-primary me-md-2 btn-success rounded-circle "  size="sm"  @click="editar(products.id)"><i class="fal fa-pen"></i></b-button>
        <b-button class="btn btn-primary btn-warning btn-success rounded-circle" variant="primary" size="sm"  @click="excluir(products.id)"><i class="far fa-trash-alt"></i></b-button>
    </template>
         
     </b-table>

       <div>
        Selected: <strong>{{ selected }}</strong><br>
        
      </div>

    <b-button-group align="center">

     <b-pagination
     class="me-md-5"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
       align="center"
       first-text="First"
       prev-text="Prev"
       next-text="Next"
       last-text="Last"
    >
    <template #first-text><span class="text-success"><i class="far fa-chevron-double-left"></i></span></template>
      <template #prev-text><span class="text-danger"><i class="far fa-chevron-left"></i></span></template>
      <template #next-text><span class="text-warning"><i class="far fa-chevron-right"></i></span></template>
      <template #last-text><span class="text-info"> <i class="far fa-chevron-double-right"></i></span></template>
    </b-pagination>
    <p :text="length">{{this.length}}</p>
    
    </b-button-group>
   
     </div>
         
         
 
</template>

<script>
import api from '../services/api';

export default {
name: 'TableData',
data(){
    return{
        length:`Mostrando 1 de ${this.perPage} até 11 Produtos` ,
        perPage: 5,
        currentPage: 1,
        fields: [
            { key: 'sel', 
               label: '',
             },
            {
                key: 'codigo',
                label: 'Codigo',
                sortable: true
            },
            {
                key: 'nome',
                label: 'Nome',
                 sortable: true
            },
            {
                key: 'preco',
                label: 'Preço',
                 sortable: true
            },
            {
                key: 'categoria',
                label: 'Categoria',
                 sortable: true
            },
            {
                key:'status',
                label: 'Status',
                sortable: true
            },   
            {
                key: 'actions',
                label: '   ',
            },
         
        ],
         products: [],
         selected: [],
         selectAll: false,
        allProductsSelected: false,

      

        
    }
},
async mounted(){
    const response = await api.get(`produtos?page=$*&size=*`);
    this.products = response.data.content
         

},
computed: {
     rows() {
        return this.products.length
      }
  },
  methods: {
    toggleAll () {
      this.allProductsSelected = !this.allProductsSelected;
     this.selected = this.products.forEach(product => product.checked = this.allProductsSelected);
   },
   select(){
       this.selected = [];
			if (!this.selectAll) {
				for (let i in this.products) {
					this.selected.push(this.products[i].id);
				}
			}
   } 
  },

 
}

</script>

<style lang="scss">
.table.b-table > thead > tr > [aria-sort=none], .table.b-table > tfoot > tr > [aria-sort=none] {
    background-image: url("data:image/svg+xml,%3csvg xmlns=<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24") !important;
}
#btn-personalizado{
    color: white;
    background-color:#6ab04c;
    border-color: #6ab04c;
}

#input-p{
    margin-left: 60%;
}


</style>