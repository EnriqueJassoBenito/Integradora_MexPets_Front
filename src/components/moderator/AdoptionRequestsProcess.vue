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
                    <img :src="item.adoption.animal.images[0].imageUrl" :alt="item.adoption.animal.images"
                        style="max-width: 100px;">
                </template>
                <template v-slot:cell(actions)="{ item }">
                    <b-button @click="openModal(item)" variant="primary">
                        <b-icon icon="eye"></b-icon>
                    </b-button>
                </template>
            </b-table>
        </b-card>

        <b-modal ref="myModalRef" hide-footer title="Comentario del Moderador" header-bg-variant="warning">
                <b-row class="mb-3">
                    <b-col cols="12">
                        <p><strong>Lugar donde será recibido:</strong></p>
                        <b-carousel controls indicators style="max-height: 300px; overflow: hidden;">
                            <b-carousel-slide v-for="(image, index) in modalData.adoption.images" :key="index"
                                :img-src="image.imageUrl" :alt="`Slide ${index + 1}`" img-width="300px"
                                img-height="200px"></b-carousel-slide>
                        </b-carousel>
                    </b-col>
                </b-row>
                <div><strong>Descripción del adoptante:</strong> {{ modalData.adoption.description }}</div>

                <div class="mt-4">
                    <b-form-textarea id="textarea" v-model="modalData.moderatorComment"
                        placeholder="Retroalimentación..." rows="3" max-rows="6"></b-form-textarea>
                </div>
                <b-row>
                    <b-col cols="12" class="d-flex justify-content-between mt-3">
                        <b-button variant="success" @click="approveAnimal">Aprobar</b-button>
                        <b-button variant="danger" @click="rejectAnimal">Rechazar</b-button>
                        <b-button variant="secondary" @click="closeModal">Cancelar</b-button>
                    </b-col>
                </b-row>
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
                { key: 'image', label: 'Foto del animal' },
                { key: 'adoption.adopter.nameUser', label: 'Usuario del adoptante' },
                { key: 'adoption.animal.typePet.type', label: 'Tipo de animal adoptado' },
                { key: 'approvalStatus', label: 'Estado de aprobación' },
                { key: 'actions', label: 'Acciones' }
            ],
            modalData: {
                id:'',
                adoption: '',
                moderator: '',
                approvalStatus: '',
                moderatorComment: '',
            },
            images: []
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
        async approveOrRejectAdoption(id, approvalStatus, moderatorComment) {
            try {
                const result = await service.onUpdateApprovalStatus(id, approvalStatus, moderatorComment);
                if (approvalStatus === 'PENDING') {
                    Swal.fire('Rechazado', 'Enviando retroalimentación', 'info');
                } else if (approvalStatus === 'APPROVED') {
                    Swal.fire('En hora buena', 'Solicitud aprobada', 'success');
                }
                console.log(result)
                this.processAdoptionByUser();
            } catch (error) {
                console.error('Error al aprobar/rechazar adopción:', error);
            } finally {
                this.isLoading = false;
                this.closeModal();
            }
        }
        ,
        async approveAnimal() {
            const confirmAction = await this.showConfirmation();
            if (confirmAction) {
                this.approveOrRejectAdoption(this.modalData.id, 'APPROVED', this.modalData.moderatorComment);
                this.closeModal();
            }
        },
        async rejectAnimal() {
            const confirmAction = await this.showConfirmation();
            if (confirmAction) {
                this.approveOrRejectAdoption(this.modalData.id, 'PENDING', this.modalData.moderatorComment);
                this.closeModal();
            }
        },
        async showConfirmation() {
            return new Promise((resolve) => {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Esta acción no se puede deshacer.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#81B622',
                    cancelButtonColor: '#DC3545',
                    confirmButtonText: 'Sí, estoy seguro',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    resolve(result.isConfirmed);
                });
            });
        },
        getStatusTranslation(status) {
            switch (status) {
                case 'PENDING':
                    return 'Pendiente';
                case 'APPROVED':
                    return 'Aprobado';
                case 'REJECT':
                    return 'Rechazado';
                default:
                    return 'Desconocido';
            }
        },
        openModal(item) {
            this.modalData = { ...item };
            console.log(this.modalData);
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