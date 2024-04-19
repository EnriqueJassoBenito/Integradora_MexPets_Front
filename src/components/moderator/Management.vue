<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <div class="custom-loader"></div>
        </div>
        <div class="section mt-3">
            <h2 class="section-title">Mis gestiones</h2>
        </div>
        <b-card class="my-3 p-3 shadow-sm rounded" style="max-width: 900px; margin: 0 auto;">
            <b-table striped hover :items="adopProcess" :fields="fields" class="my-custom-table table-responsive">
                <template v-slot:cell(approvalStatus)="{ item }">
                    {{ getStatusTranslation(item.approvalStatus) }}
                </template>
            </b-table>
        </b-card>

        <!--<b-modal ref="myModalRef" hide-footer title="Detalles de la adopción" header-bg-variant="warning">
            <b-row class="mb-3">
                <b-col cols="12">
                    <p><strong>Lugar donde será recibido:</strong></p>
                    <b-carousel controls indicators style="max-height: 300px; overflow: hidden;">
                        <b-carousel-slide v-for="(image, index) in modalData.animal.images" :key="index"
                            :img-src="image.imageUrl" :alt="`Slide ${index + 1}`" img-width="300px"
                            img-height="200px"></b-carousel-slide>
                    </b-carousel>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <p><strong>Nombre del adoptante:</strong> {{ modalData.adopter.name }} {{ modalData.adopter.lastname
                        }}</p>
                    <p><strong>Nombre de la mascota:</strong> {{ modalData.animal.namePet }}</p>
                    <p><strong>Fecha de adopción:</strong> {{ formatDate(modalData.creationDate) }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="d-flex justify-content-between mt-3">
                    <b-button variant="success" @click="manageAdoption">Aprobar</b-button>
                    <b-button variant="secondary" @click="closeModal">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-modal>-->

    </b-container>
</template>

<script>
import service from '../../service/AdoptionProcessedService'
import Swal from 'sweetalert2';
import processService from '../../service/AdoptionProcessedService.js'

export default {
    data() {
        return {
            isLoading: false,
            adopProcess: [],
            fields: [
                { key: 'adoption.adopter.nameUser', label: 'Usuario del adoptante' },
                { key: 'adoption.animal.typePet.type', label: 'Tipo de animal adoptado' },
                { key: 'approvalStatus', label: 'Estado de aprobación' }
            ],
            modalData: {
                adoption: '',
                moderator: '',
                approvalStatus: '',
                moderatorComment: '',
            },
            adoption: null,
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
        getStatusTranslation(status) {
            switch (status) {
                case 'APPROVED':
                    return 'Aprobado';
                case 'PENDING':
                    return 'Pendiente';
                default:
                    return 'Desconocido';
            }
        },

        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
            return formattedDate;
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