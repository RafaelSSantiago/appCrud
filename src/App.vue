<template>
  <div id="app">
    <div class="container marginBycss shadow p-3 mb-5 bg-body rounded">
      <Header class="margin-custom" :selected-products="selectedProducts" />
      <ProductsTable @on-product-selection="selectedProducts = $event" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ProductsTable from "./components/Products/Table.vue";

export default {
  name: "App",
  components: {
    Header,
    ProductsTable,
  },
  data() {
    return {
      selectedProducts: [],
    };
  },
};
</script >

<style scoped>
.marginBycss {
  margin-top: 5%;
}
.margin-custom {
  margin-bottom: 2%;
}
</style>
