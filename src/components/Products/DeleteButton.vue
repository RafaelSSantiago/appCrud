<template>
    <div>
        <b-button
            class="btn btn-primary btn-warning btn-success rounded-circle"
            variant="primary"
            size="sm"
            v-b-modal="randomId"
        >
            <i class="far fa-trash-alt"></i>
        </b-button>

        <b-modal :id="randomId" title="Confirmação">
            <p id="delete-confirmation-message" class="my-4 text-center">
                <i style="font-size: 1.3em" class="fal fa-exclamation-triangle"></i>
                Você deseja realmente excluir <strong>{{ product.nome }}</strong>?
            </p>

            <template v-slot:modal-footer>
                <a @click="cancel">
                    <i class="far fa-times"></i>
                    Não
                </a>

                <a @click="deleteProduct(product.id)">
                    <i class="far fa-check"></i>
                    Sim
                </a>
            </template>
        </b-modal>
    </div>
</template>

<script>
import api from '../../services/api'
export default {
  name: "DeleteButton",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
      randomId () {
          return 'modal-' + Math.random();
      }
  },

  methods: {
    hideModal () {
        this.$root.$emit('bv::hide::modal', this.randomId, '#btnShow')
    },
    cancel () {
        this.hideModal();
    },
    async deleteProduct() {
        await api.delete(`produtos/${this.product.id}`)
        this.hideModal();
    },
  },
};
</script>

<style scoped lang="scss">
.modal-header { 
    border: 0px !important;
}

#delete-confirmation-message i {
    margin-right: 10px;
}

.modal-footer a {
    color: #61b3f4 !important;
}

.modal-footer a:nth-child(1) {
    margin-right: 20px;   
} 
</style>