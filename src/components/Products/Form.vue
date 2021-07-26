<template>
  <b-modal
    @ok="save"
    @hide="hide"

    :id="reference"
    v-model="isOpen"
    title="Detalhes do Produto"
  >
    <b-form>
      <b-form-group id="input-group-1" label="Nome" label-for="input-1">
        <b-form-input aria-describedby="input-1-live-feedback" :state="validateState('name')" type="text" v-model="formData.nome"></b-form-input>
         <b-form-invalid-feedback
          id="input-1-live-feedback"
        >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
        <b-row class="mt-3">
          <label for="textarea-default">Descrição</label>
          <b-col sm="23"> </b-col>
          <b-col sm="12">
            <b-form-textarea id="textarea-large" size="lg"></b-form-textarea>
          </b-col>
        </b-row>

        <label class="mt-3" for="textarea-default">Status</label>
        <b-form-select :state="validation" v-model="formData.status" :options="statusOptions"></b-form-select>

        <label class="mt-3" for="textarea-default">Categoria</label>
        <b-row cols="2" >
          <b-col
            ><b-form-radio
              v-model="formData.categoria"
              name="some-radios"
              value="Categoria_1"
              >Categoria 1</b-form-radio
            ></b-col
          >
          <b-col
            ><b-form-radio
              v-model="formData.categoria"
              name="some-radios"
              value="Categoria_2"
              >Categoria 2</b-form-radio
            ></b-col
          >
          <b-col
            ><b-form-radio
              v-model="formData.categoria"
              name="some-radios"
              value="Categoria_3"
              >Categoria 3</b-form-radio
            ></b-col
          >
          <b-col
            ><b-form-radio
              v-model="formData.categoria"
              name="some-radios"
              value="categoria_4"
              >Categoria 4</b-form-radio
            ></b-col
          >
        </b-row>

        <b-row class="mt-3" cols="2">
          <b-col>Preço</b-col>
          <b-col>Quantidade</b-col>
          <b-col>
            <b-form-input
              id="inline-form-input-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="formData.preco"
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
</template>

<script>
import api  from '../../services/api'
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
    name: 'ProductForm',

    props: {
        opened: {
            type: Boolean,
            default: false,
        },
        product: {
            type: Object,
            default: () => ({}),
        },
        reference: {
            type: String,
            require: true,
        }
    },
   mixins: [validationMixin],
    data () {
        return {
            isOpen: false,
            formData: {
                nome: '',      
                categoria: null,
                preco: '',     
                status: null,
            },
            statusOptions: [
                { value: "em_Estoque", text: "Em Estoque" },
                { value: "sem_EStoque", text: "Sem Estoque" },
            ],
        }
    },

   validations: {
    name: {
      required,
      minLength: minLength(3)
    }
   },
      

    methods: {
        hide () {
            this.$emit('hide');
        },
        save () {
            if (this.product.id) {
                  this.edit(this.formData);
                return;
            }
               this.create(this.formData);
            
            
            
        },

        async edit (product) {
            await api.put(`produtos/${product.id}`, {
             nome: product.nome,
             preco: product.preco,
             codigo: product.codigo,
             categoria: product.categoria,
             status: product.status,
            });
            console.info('Editando produto: ', product, product.id);
        }, 

        async create (product) {
             await api.post("produtos", {
             nome: product.nome,
             preco: product.preco,
             codigo: Math.random().toString(36).substring(7),
             categoria: product.categoria,
             status: product.status,
            });
        },
    },

    created () {
        this.isOpen = this.opened;
    },

    watch: {
        opened (newValue) {
            this.isOpen = newValue;
        },
        product (newValue) {
            this.formData = newValue;
        }
    }
}
</script>

<style lang="scss">
  .modal-header { 
    border-bottom: none !important;
}
  .modal-footer{
   border-top: none !important;
  }
</style>