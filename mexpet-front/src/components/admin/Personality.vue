<template>
    <b-container>
        <b-button @click="openModal(null)" variant="primary">Agregar</b-button>
        <b-table :items="personality" :fields="fields">
            <template v-slot:cell(actions)="{ item }">
                <b-button @click="openModal(item.id)" variant="primary">Editar</b-button>
                <b-button @click="deletePersonality(item.id)" variant="danger">Eliminar</b-button>
            </template>
        </b-table>

        <b-modal v-model="showModal" :title="modalTitle" hide-footer>
            <form @submit.prevent="submitForm">
                <b-form-group label="Personalidad">
                    <b-form-input v-model="updateData.personalityPet"></b-form-input>
                </b-form-group>
            </form>
            <b-button @click="submitForm" variant="primary">Guardar</b-button>
            <b-button @click="closeModal" variant="secondary">Cancelar</b-button>
        </b-modal>
    </b-container>
</template>

<script>
import service from "../../service/CategoryService.js"
import Swal from 'sweetalert2';
export default{
    data(){
        return{
            personality: [],
            loading: false,
            showModal:false,
            updateData: {
                id: "",
                personalityPet: ""
            },
            modalTitle: "",
        };
    },
    mounted(){
        this.consultPersonality();
    },
    methods: {
        async submitForm(){
            try {
                if (this.updateData.id) {
                    await this.updatePersonality(this.updateData.id,this.updateData.personalityPet)
                }else{
                    await this.insertPersonality()
                }
                this.closeModal();
                this.consultPersonality();
            } catch (error) {
                console.error("Error", error);
                alert("Error")
            }
        },
        async insertPersonality(){
            try {
                await service.onInsertPersonality(this.updateData.personalityPet);
                this.closeModal();
                this.consultPersonality();
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Personalidad agregada correctamente ' 
                });
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async consultPersonality(){
            try {
                this.loading = true;
                const result = await service.onGetAllPersonality();
                this.personality = result.map(item => ({
                    id: item.id,
                    personalityPet: item.personalityPet
                }));
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async updatePersonality(id, personalityPet) {
            try {
                await service.onUpdatePersonality(id, personalityPet);
                this.closeModal();
                this.consultPersonality();
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Personalidad actualizada correctamente '
                });
            } catch (error) {
                console.error("Error:", error);
                alert("Error");
            }
        },
        async deletePersonality(id) {
            try {
                await service.onDeletePersonality(id);
                this.consultPersonality();
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
                this.deletePersonality(id);
            }
        },
        openModal(id) {
            if (id === null) {
                this.updateData = {
                    id: "",
                    personalityPet: "",
                };
                this.modalTitle = "Insertar personalidad"; 
            } else {
                const personality = this.personality.find(item => item.id === id);
                this.updateData = {
                    id: personality.id,
                    personalityPet: personality.personalityPet,
                };
                this.modalTitle = "Editar personalidad"; 
            }
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    },
    computed: {
        fields(){
            return [
                { key: 'id', label: 'ID' },
                { key: 'personalityPet', label: 'Personalidad' },
                { key: 'actions', label: '' }
            ]
        }
    }
}
</script>