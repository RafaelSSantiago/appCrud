<template>
  <b-modal
    @close="onClose"
    :id="reference"
    v-model="isOpen"
    title="Detalhes do Produto"
  >
    <b-form>
      <b-form-group id="input-name-group">
        <label class="mt-3" for="textarea-default">Nome</label>
        <b-form-input
          aria-describedby="input-name-feedback"
          v-model="formData.nome"
          :state="validateState('nome')"
          type="text"
        >
        </b-form-input>
        <b-form-invalid-feedback id="input-name-feedback"
          >Este é um campo obrigatório.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group>
        <b-row class="mt-3">
          <label for="textarea-default">Descrição</label>
          <b-col sm="23"> </b-col>
          <b-col sm="12">
            <b-form-textarea id="textarea-large" size="lg"></b-form-textarea>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group id="input-status-group">
        <label class="mt-3" for="textarea-default">Status</label>
        <b-form-select
          aria-describedby="input-status-feedback"
          v-model="formData.status"
          :options="statusOptions"
          :state="validateState('status')"
        ></b-form-select>
        <b-form-invalid-feedback id="input-status-feedback"
          >Este é um campo obrigatório.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group>
        <label class="mt-3" for="textarea-default">Categoria</label>
        <b-row cols="2">
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
      </b-form-group>

      <b-row>
        <b-col>
          <b-row>
            <b-col>Preço</b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group id="input-preco-group">
                <b-form-input
                  aria-describedby="input-preco-feedback"
                  :state="validateState('preco')"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="formData.preco"
                ></b-form-input>
                <b-form-invalid-feedback id="input-name-feedback"
                  >Este é um campo obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>Quantidade</b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-input class="mb-2 mr-sm-2 mb-sm-0"></b-form-input>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-form>

    <template v-slot:modal-footer>
      <a @click="cancel">
        <i class="far fa-times"></i>
        Cancelar
      </a>

      <a @click="save">
        <i class="far fa-check"></i>
        Salvar
      </a>
    </template>
  </b-modal>
</template>

<script>
import api from "../../services/api";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProductForm",
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
    },
  },
  data() {
    return {
      isOpen: false,
      formData: {
        nome: "",
        categoria: null,
        preco: "",
        status: null,
      },
      statusOptions: [
        { value: "EMEstoque", text: "Em Estoque" },
        { value: "SEMEStoque", text: "Sem Estoque" },
      ],
    };
  },
  validations: {
    formData: {
      nome: { required },
      status: { required },
      preco: { required },
    },
  },

  methods: {
    save() {
      this.$v.formData.$touch();
      if (this.$v.formData.$anyError) {
        return;
      }

      if (this.product.id) {
        this.edit(this.formData);
        this.hideModal();
        return;
      }
      this.create(this.formData);
      this.hideModal();
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", this.reference, "#btnShow");
      this.$emit("hide");
    },
    cancel() {
      this.hideModal();
      this.isOpen = false;
    },
    onClose() {
      this.$emit("hide");
    },
    async edit(product) {
      await api.put(`produtos/${product.id}`, {
        nome: product.nome,
        preco: product.preco,
        codigo: product.codigo,
        categoria: product.categoria,
        status: product.status,
      });
      console.info("Editando produto: ", product, product.id);
    },

    async create(product) {
      await api.post("produtos", {
        nome: product.nome,
        preco: product.preco,
        codigo: Math.random().toString(36).substring(7),
        categoria: product.categoria,
        status: product.status,
      });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.formData[name];
      return $dirty ? !$error : null;
    },
  },
  created() {
    this.isOpen = this.opened;
  },
  watch: {
    opened(newValue) {
      this.isOpen = newValue;
    },
    product(newValue) {
      this.formData = newValue;
    },
  },
};
</script>

<style lang="scss">
.modal-header {
  border-bottom: none !important;
}
.modal-footer {
  border-top: none !important;
}
.modal-header {
  border: 0px !important;
}

#delete-confirmation-message i {
  margin-right: 10px;
}

.modal-footer a {
  color: #61b3f4 !important;
  cursor: pointer;
}

.modal-footer a:nth-child(1) {
  margin-right: 20px;
}
</style>