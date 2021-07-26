<template>
    <div>
        <b-button
            class="btn me-md-2 btn-success rounded-circle"
            size="sm"
            @click="click"
        >
            <i class="fal fa-pen"></i>
        </b-button>
    </div>
</template>

<script>
export default {
    name: 'EditButton',

    props: {
        product: {
            type: Object,
            required: true,
        }
    },

    methods: {
        click () {
            this.$emit('click', this.product);  
        },
    }
}
</script>

<style scoped>
    button {
        background-color: #689f38;
    }
</style>