<template>
    <b-container>
        <b-button @click="openModal(null)" variant="primary">Agregar</b-button>
        <b-table :items="typePet" :fields="fields">
            <template v-slot:cell(actions)="{ item }">
                <b-button @click="openModal(item.id)" variant="primary">Editar</b-button>
                <b-button @click="confirmDelete(item.id)" variant="danger">Eliminar</b-button>
            </template>
        </b-table>

        <b-modal v-model="showModal" :title="modalTitle" hide-footer>
            <form @submit.prevent="submitForm">
                <b-form-group label="Tipo de animal">
                    <b-form-input v-model="updateData.type"></b-form-input>
                </b-form-group>
                <b-button class="mt-3" type="submit" variant="primary">Guardar</b-button>
                <b-button class="mt-3" type="button" @click="closeModal" variant="secondary">Cancelar</b-button>
            </form>
        </b-modal>
        
    </b-container>
</template>

<script>
import service from "../../service/CategoryService.js"
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            typePet: [],
            loading: false,
            showModal: false,
            updateData: {
                id: "",
                type: ""
            },
            modalTitle: "",
        };
    },
    mounted() {
        this.consultType();
    },
    methods: {
        async submitForm() {
            try {
                if (this.updateData.id) {
                    await this.updateType(this.updateData.id, this.updateData.type)
                } else {
                    await this.insertType()
                }
                this.closeModal();
                this.consultType();
            } catch (error) {
                console.error("Error", error);
                alert("Error")
            }
        },
        async insertType() {
            try {
                await service.onInsertTypePet(this.updateData.type);
                this.closeModal();
                this.consultType();
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Tipo de animal agregado correctamente '
                });
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async consultType() {
            try {
                this.loading = true;
                const result = await service.onGetAllType();
                this.typePet = result.map(item => ({
                    id: item.id,
                    type: item.type
                }));
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async updateType(id, type) {
            try {
                await service.onUpdateType(id, type);
                this.closeModal();
                this.consultType();
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Tipo de animal actualizado correctamente: ' + type
                });
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async deleteType(id) {
            try {
                await service.onDeleteType(id);
                this.consultType();
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async confirmDelete(id) {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                this.deleteType(id);
            }
        },
        openModal(id) {
            if (id === null) {
                this.updateData = {
                    id: "",
                    type: "",
                };
                this.modalTitle = "Insertar tipo de animal";
            } else {
                const typePet = this.typePet.find(item => item.id === id);
                this.updateData = {
                    id: typePet.id,
                    type: typePet.type,
                };
                this.modalTitle = "Editar tipo de animal";
            }
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    },
    computed: {
        fields() {
            return [
                { key: 'id', label: 'ID' },
                { key: 'type', label: 'Tipo de animal' },
                { key: 'actions', label: '' }
            ]
        }
    }
}
</script>