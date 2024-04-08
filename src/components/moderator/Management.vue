<template>
    <div class="container-fluid">
        <b-card class="my-3 p-3 shadow-sm rounded" style="max-width: 800px; margin: 0 auto; ">
            <h2 class="mb-4">Control de gestiones</h2>
            <b-table striped hover :items="items" :fields="fields" class="my-custom-table">
                <template v-slot:cell(actions)="data">
                    <b-button variant="warning" @click="viewItem(data.item)" title="Ver">
                        <b-icon icon="eye"></b-icon>
                    </b-button>
                    <b-button variant="danger" @click="deleteItem(data.item)" title="Eliminar">
                        <b-icon icon="x"></b-icon>
                    </b-button>
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fields: ['id', 'nombre', 'descripcion', 'fecha', 'actions'],
            items: [
                { id: 1, nombre: 'Usuario 1', descripcion: 'Descripción 1', fecha: '2024-04-07' },
                { id: 2, nombre: 'Usuario 2', descripcion: 'Descripción 2', fecha: '2024-04-08' },
                { id: 3, nombre: 'Usuario 3', descripcion: 'Descripción 3', fecha: '2024-04-09' },
            ],
        };
    },
    methods: {
        viewItem(item) {
            console.log('Ver:', item);
        },
        deleteItem(item) {
            console.log('Eliminar:', item);
        },
    },
};
</script>

<style scoped>
.my-custom-table {
    width: 100%;
}

.container-fluid {
    padding: 20px;
}
</style>