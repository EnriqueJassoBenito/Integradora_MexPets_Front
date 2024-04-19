<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <div class="custom-loader"></div>
        </div>
        <div class="section mt-3">
            <h2 class="section-title">Aprobar o rechazar la solicitud</h2>
        </div>
        <hr>
        <b-card class="my-3 p-3 shadow-sm rounded" style="max-width: 900px; margin: 0 auto;">
            <b-table striped hover :items="adopProcess" :fields="fields" class="my-custom-table table-responsive">
                <template v-slot:cell(image)="{ item }">
                    <img :src="item.adoption.images[0].imageUrl" :alt="item.adoption.images" style="max-width: 100px;">
                </template>
                <template v-slot:cell(actions)="{ item }">
                    <b-button @click="openModal(item.adoption.id)" variant="primary">
                        <b-icon icon="eye"></b-icon>
                    </b-button>
                </template>
            </b-table>
        </b-card>

        <b-modal ref="myModalRef" hide-footer title="Comentario del Moderador" header-bg-variant="warning">
            <b-form @submit.prevent="confirmAction">
                <b-form-group label="Comentario del Moderador" label-for="moderatorComment">
                    <b-form-textarea id="moderatorComment" v-model="modalData.moderatorComment"></b-form-textarea>
                </b-form-group>
                <b-form-group label="Estado de aprobación" label-for="approvalStatus">
                    <b-form-select v-model="modalData.approvalStatus" :options="approvalOptions"></b-form-select>
                </b-form-group>
                <b-button type="submit" variant="primary">Confirmar</b-button>
                <b-button variant="secondary" @click="closeModal">Cancelar</b-button>
            </b-form>
        </b-modal>
    </b-container>
</template>

<script>
import service from '../../service/AdoptionProcessedService'
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            isLoading: false,
            adopProcess: [],
            fields: [
                { key: 'image', label: 'Foto de la vivienda' },
                { key: 'adoption.adopter.nameUser', label: 'Usuario del adoptante' },
                { key: 'adoption.animal.typePet.type', label: 'Tipo de animal adoptado' },
                { key: 'approvalStatus', label: 'Estado de aprobación' },
                { key: 'actions', label: 'Acciones' } // Asegúrate de tener esta columna
            ],
            modalData: {
                adoptionId: '',
                approvalStatus: '',
                moderatorComment: '',
            },
            approvalOptions: [ // Opciones para el estado de aprobación
                { value: 'PENDING', text: 'Pendiente' },
                { value: 'APPROVED', text: 'Aprobado' },
            ],
        }
    },
    mounted() {
        this.processAdoptionByUser();
    },
    methods: {
        async processAdoptionByUser() {
            try {
                this.isLoading = true;
                const userId = localStorage.getItem("authUser");
                if (!userId) {
                    throw new Error('No se pudo obtener el ID del moderador desde el almacenamiento local.');
                }
                const currentUserData = JSON.parse(userId);
                const moderatorId = currentUserData.user.id;
                const pendingAdoption = await service.onGetProcessedAdoptionsByUser(moderatorId);
                setTimeout(() => {
                    this.adopProcess = pendingAdoption;
                    this.isLoading = false;
                }, 1000);
            } catch (error) {
                console.error('Error al obtener adopciones pendientes de aprobación:', error);
                this.isLoading = false;
            }
        },
        async confirmAction() {
            this.$refs.myModalRef.hide();
            const { adoptionId, approvalStatus, moderatorComment } = this.modalData;
            try {
                await service.onUpdateApprovalStatus(adoptionId, approvalStatus, moderatorComment);
            } catch (error) {
                console.error('Error al actualizar estado y comentario del moderador:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al actualizar la información.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        }
        ,
        openModal(adoptionId) {
            this.modalData.adoptionId = adoptionId;
            this.$refs.myModalRef.show();
        },
        closeModal() {
            this.$refs.myModalRef.hide();
        },
    }
}
</script>


<style>
.loading-overlay {
    display: none;
    background: rgba(255, 255, 255, 0.776);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9998;
    align-items: center;
    justify-content: center;
}

.loading-overlay.is-active {
    display: flex;
}

.custom-loader {
    width: 50px;
    height: 50px;
    display: grid;
    color: #F0BB00;
    background: radial-gradient(farthest-side, currentColor calc(100% - 6px), #0000 calc(100% - 5px) 0);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 13px), #000 calc(100% - 12px));
    border-radius: 50%;
    animation: s9 2s infinite linear;
}

.custom-loader::before,
.custom-loader::after {
    content: "";
    grid-area: 1/1;
    background:
        linear-gradient(currentColor 0 0) center,
        linear-gradient(currentColor 0 0) center;
    background-size: 100% 10px, 10px 100%;
    background-repeat: no-repeat;
}

.custom-loader::after {
    transform: rotate(45deg);
}

@keyframes s9 {
    100% {
        transform: rotate(1turn)
    }
}

.section {
    text-align: center;
    margin-bottom: 20px;
}

.section-title {
    color: #333;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.my-custom-table {
    text-align: left;
    margin: 0 auto;
    max-width: 100%;
    /* Cambia el valor según lo necesites */
}

@media (max-width: 767px) {
    .my-custom-table {
        overflow-x: auto;
    }
}
</style>