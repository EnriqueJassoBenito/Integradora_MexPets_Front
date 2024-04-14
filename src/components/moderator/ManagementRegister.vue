<template>
    <div class="container-fluid">
        <b-row>
            <b-card class="my-3 p-3 shadow-sm rounded" style="max-width: 800px; margin: 0 auto; ">
                <h2 class="mb-4">Control de gestiones</h2>
                <div class="my-custom-table">
                    <b-table striped hover :items="items" :fields="fields">
                        <template v-slot:cell(actions)="data">
                                <b-button class="mx-2" variant="warning" @click="viewItem(data.item)" title="show">
                                    <b-icon icon="eye"></b-icon>
                                </b-button>
                                <b-button class="mx-2" variant="danger" @click="deleteItem(data.item)" title="delete">
                                    <b-icon icon="x"></b-icon>
                                </b-button>
                        </template>
                    </b-table>
                </div>
            </b-card>
        </b-row>
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
    text-align: center;
}

.action-button-table {
    

}

.container-fluid {
    padding: 20px;
}
</style>