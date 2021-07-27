<template>
  <button class="btn btn-personalizado" type="button" @click="deleteProducts()">
    <i class="far fa-trash-alt"> Excluir</i>
  </button>
</template>

<script>
import api from "../../services/api";
export default {
  name: "DeleteAllButton",
  props: {
    products: {
      type: Array,
      default: () => ({}),
    },
  },

  methods: {
    async deleteProducts() {
      if (confirm("Tem certeza de que deseja excluir estes produtos?")) {
        console.info("Excluindo produtos: ", this.products);
      }
      // do request to server delete products
      let arrayIds = [];
      for (let i = 0; i < this.products.length; i++) {
        arrayIds.push(this.products[i].id);
      }
      console.info("ids:", arrayIds);
      await api.delete(`produtos/ids/${arrayIds}`);
    },
  },
};
</script>