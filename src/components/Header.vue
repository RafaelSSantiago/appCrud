<template>
  <div id="header">
    <div class="card">
      <div class="card-header header-personalizado">
        <div class="d-grid gap-2 d-md-block" style="margin-top: 10px">
          <b-button
            v-b-modal.product-form-create
            class="btn-personalizado2 me-md-2"
          >
            <i class="far fa-plus"></i> Novo
          </b-button>
          
          <ProductFormCreation reference="product-form-create" />
          <DeleteAllButton :products="selectedProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteAllButton from './Products/DeleteAllButton.vue';
import ProductFormCreation from './Products/Form.vue';

export default {
  name: "Header",
  
  components: {
    DeleteAllButton,
    ProductFormCreation,
  },

  props: {
    selectedProducts: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  
  data() {
    return {
      selected: [],
    };
  },
};
</script>

<style scoped>
.btn-personalizado {
  color: white;
  background-color: #ff7675;
  border-color: #ff7675;
}
.btn-personalizado2 {
  color: white;
  background-color: #6ab04c;
  border-color: #6ab04c;
}
.header-personalizado {
  height: 80px;
  background-color:#f8f9fa;
  border: 1px solid ;
  border-color: #f8f9fa;
}
</style>