<template>
  <div class="overflow-auto">
    <div class="table-header text-center">
      <div class="row">
        <b-col cols="9">
          <p style="font-size: 20px" align="left">Gerenciar Produto</p>
        </b-col>
        <b-col cols="3">
          <b-form inline>
            <label class="sr-only" for="inline-form-input-username"></label>
            <b-input-group class="mb-2 mr-sm-0 mb-sm-0 text-align-end">
              <b-form-input
                v-model="nomeSearch"
                id="inline-form-input-username"
                placeholder="Nome do produto..."
              ></b-form-input>
              <b-button
                @click="searchNome(nomeSearch)"
                style="background-color: #689f38"
              >
                <i class="fal fa-search"></i>
                Pesquisar
              </b-button>
            </b-input-group>
          </b-form>
        </b-col>
      </div>
    </div>

    <ProductFormEdit
      reference="product-form-edit"
      :product="productEditing"
      :opened="isProductFormEditOpened"
      @hide="isProductFormEditOpened = false"
    />

    <b-table
      :items="products"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      ref="table"
    >
      <template v-slot:head(selection)>
        <input
          class="selection"
          type="checkbox"
          v-model="allProductsSelected"
        />
      </template>

      <template #cell(selection)="data">
        <input
          class="selection"
          type="checkbox"
          :checked="isSelectedProduct(data.item.codigo)"
          @change="toggleProductSelection(data.item.codigo)"
        />
      </template>

      <template v-slot:cell(actions)="data">
        <div class="product-actions">
          <EditButton :product="data.item" @click="onEdit" />
          <DeleteButton :product="data.item" />
        </div>
      </template>

      <template #cell(preco)="data"> ${{ data.value }} </template>
    </b-table>
    <div class="fitPagination">
      <b-pagination
        :container-class="'pagination'"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      >
        <template #first-text
          ><span><i class="far fa-chevron-double-left"></i></span
        ></template>
        <template #prev-text
          ><span><i class="far fa-chevron-left"></i></span
        ></template>
        <template #next-text
          ><span><i class="far fa-chevron-right"></i></span
        ></template>
        <template #last-text
          ><span> <i class="far fa-chevron-double-right"></i></span
        ></template>
      </b-pagination>
      <p class="mt-md-1" style="color: #929ba2">{{ showInfoStatus() }}</p>
      <b-form-select
        style="width: 6%; margin-left: 20px"
        class="sp"
        v-model="perPage"
        :options="pageOptions"
      ></b-form-select>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import DeleteButton from "./DeleteButton.vue";
import EditButton from "./EditButton.vue";
import ProductFormEdit from "./Form.vue";

export default {
  name: "Table",

  components: {
    DeleteButton,
    EditButton,
    ProductFormEdit,
  },

  data() {
    return {
      length: `Mostrando 1 de ${this.perPage} até 11 Produtos`,
      perPage: 5,
      currentPage: 1,
      nomeSearch: "",
      rowsPage: null,
      fields: [
        {
          key: "selection",
          label: "",
        },
        {
          key: "codigo",
          label: "Codigo",
          sortable: true,
        },
        {
          key: "nome",
          label: "Nome",
          sortable: true,
        },
        {
          key: "preco",
          label: "Preço",
          sortable: true,
        },
        {
          key: "categoria",
          label: "Categoria",
          sortable: true,
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          isRowHeader: true,
        },
        {
          key: "actions",
          label: "   ",
        },
      ],
      products: [],
      productEditing: {},
      allProductsSelected: false,
      isProductFormEditOpened: false,
      pageOptions: [
        5,
        10,
        20,
        {
          value: Number.MAX_SAFE_INTEGER,
          text: "Mostrar todos",
        },
      ],
    };
  },

  computed: {
    rows() {
      return this.products.length;
    },
  },

  methods: {
    onEdit(product) {
      this.productEditing = product;
      this.isProductFormEditOpened = true;
    },
    toggleProductSelection(code) {
      const index = this.products.findIndex(
        (product) => product.codigo === code
      );
      this.products[index].checked = !this.products[index].checked;

      this.emitOnProductSelectionEvent();
    },
    isSelectedProduct(code) {
      return this.products.find((product) => product.codigo === code).checked;
    },
    async fetchProducts() {
      const response = await api.get("produtos");
      console.info("infos", response);
      this.products = this.mapIncomingProducts(response.data);
    },
    mapIncomingProducts(products) {
      return products.map((product) => {
        product.checked = false;
        return product;
      });
    },
    emitOnProductSelectionEvent() {
      this.$emit(
        "on-product-selection",
        this.products.filter((product) => product.checked)
      );
    },
    showInfoStatus() {
      return `Mostrando 1 de ${this.perPage} até ${this.products.length} `;
    },

    async searchNome(nome) {
      if (nome === "") {
        const returnProducts = await api.get(`produtos`);
        this.products = returnProducts.data;
        return;
      }
      const returnSearch = await api.get(`produtos/nome/${nome}`);
      this.products = returnSearch.data;
    },
  },

  async mounted() {
    this.fetchProducts();
  },

  watch: {
    allProductsSelected(newValue) {
      this.products.forEach((product) => {
        product.checked = newValue;
      });

      this.emitOnProductSelectionEvent();
    },
  },
};
</script>

<style lang="scss">
.table-header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-top: 2px solid #eceff1;
  border-bottom: 2px solid #eceff1;
}

thead > tr > th {
  border: 10px !important;
  background-color: #f8f9fa !important;
  font-weight: 500;
}

.pagination li {
  float: right !important;
  border: none;
}
.pagination .page-item .page-link {
  border: none;
}

.pagination .page-link {
  color: #929ba2 !important;
}

.pagination .page-item.active .page-link {
  color: #000;
  background-color: #e3f2fd;
  border-radius: 5px;
}

.product-actions {
  display: flex;
}

.pagination {
  margin-left: 350px;
}
.fitPagination {
  width: 100%;
  display: flex;
  float: left;
  border-bottom: 1px solid;
  border-color: #e9edf1;
  margin-top: -8px;
}

input[type="checkbox"].selection {
  /* Double-sized Checkboxes */
  -ms-transform: scale(1.2); /* IE */
  -moz-transform: scale(1.2); /* FF */
  -webkit-transform: scale(1.2); /* Safari and Chrome */
  -o-transform: scale(1.2); /* Opera */
  transform: scale(1.2);

  &:hover {
    transform: scale(1.4);
  }
}
</style>