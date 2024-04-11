<template>
    <b-container>
        <div style="max-height: 400px; overflow-y: auto;">
            <b-table striped hover :items="items"></b-table>
        </div>
    </b-container>
</template>

<script>
import service  from '../../service/Logs';
export default {
    data() {
        return {
            items: []
        }
    },
    methods: {
        async getData() {
            try {
                this.items = await service.onGetLogs();
            } catch (error) {
                console.error(error);
                alert("Ocurrió un error al obtener la bitácora, verifica tu conexión a internet.");
            }
        },
        async reloadTable() {
            await this.getData();
        }
    },
    async mounted() {
        await this.getData();
    }
}
</script>
<style scoped></style>