<template>
    <b-container>
        <b-button @click="openModal(null)" variant="primary">Crear nueva raza</b-button>
        <b-table :items="race" :fields="fields">
            <template v-slot:cell(actions)="{ item }">
                <b-button @click="openModal(item.id)" variant="primary">Editar</b-button>
                <b-button @click="deleteRace(item.id)" variant="danger">Eliminar</b-button>
            </template>
        </b-table>

        <b-modal v-model="showModal" :title="modalTitle" hide-footer>
            <form @submit.prevent="submitForm">
                <b-form-group label="Raza">
                    <b-form-input v-model="updateData.racePet"></b-form-input>
                </b-form-group>
            </form>
            <b-button @click="submitForm" variant="primary">Guardar</b-button>
            <b-button @click="closeModal" variant="secondary">Cancelar</b-button>
        </b-modal>
    </b-container>
</template>

<script>
import service from "../../service/CategoryService.js";
import Swal from 'sweetalert2';


export default {
    data() {
        return {
            race: [],
            loading: false,
            showModal: false,
            updateData: {
                id: "",
                racePet: "",
            },
            modalTitle: "",
        };
    },
    mounted() {
        this.consultRace();
    },
    methods: {
        async submitForm() {
            try {
                if (this.updateData.id) {
                    await this.updateRace(this.updateData.id, this.updateData.racePet);
                } else {
                    await this.insertRace();
                }
                this.closeModal();
                this.consultRace();
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async insertRace() {
            try {
                await service.onInsertRace(this.updateData.racePet);
                this.closeModal();
                this.consultRace();
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Raza agregadad correctamente'
                });
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async consultRace() {
            try {
                this.loading = true;
                const result = await service.onGetAllRace();
                this.race = result.map(item => ({ 
                    id: item.id, 
                    racePet: item.racePet 
                }));
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            } finally {
                this.loading = false;
            }
        },
        async updateRace(id, racePet) {
            try {
                await service.onUpdateRace(id, racePet);
                this.closeModal();
                this.consultRace();
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Raza actualizada correctamente '
                });
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async deleteRace(id) {
            try {
                await service.onDeleteRace(id);
                this.consultRace();
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
                this.deleteRace(id);
            }
        },
        openModal(id) {
            if (id === null) {
                this.updateData = {
                    id: "",
                    racePet: "",
                };
                this.modalTitle = "Insertar Raza"; 
            } else {
                const race = this.race.find(item => item.id === id);
                this.updateData = {
                    id: race.id,
                    racePet: race.racePet,
                };
                this.modalTitle = "Editar Raza";
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
                { key: 'racePet', label: 'Raza' },
                { key: 'actions', label: '' }
            ];
        }
    }
}
</script>
