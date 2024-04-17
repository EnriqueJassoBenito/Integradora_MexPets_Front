<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <div class="custom-loader"></div>
        </div>
        <div class="section mt-3">
            <h2 class="section-title">En espera</h2>
        </div>
        <hr>
        <b-card class="my-3 p-3 shadow-sm rounded" style="max-width: 900px; margin: 0 auto;">
            <b-table striped hover :items="adoptionPending" :fields="fields" class="my-custom-table table-responsive">
                <template v-slot:cell(image)="{ item }">
                    <img :src="item.animal.images[0].imageUrl" :alt="item.animal.animalPet" style="max-width: 100px;">
                </template>
                <template v-slot:cell(animal)="{ item }">
                    {{ item.animal.namePet }}
                </template>
                <template v-slot:cell(adopter)="{ item }">
                    {{ item.adopter.name }} {{ item.adopter.lastname }}
                </template>
                <template v-slot:cell(date)="{ item }">
                    {{ formatDate(item.creationDate) }}
                </template>
                <template v-slot:cell(status)="{ item }">
                    {{ getStatusTranslation(item.status) }}
                </template>
                <template v-slot:cell(actions)="{ item }">
                    <b-button @click="openModal(item)" variant="primary">
                        <b-icon icon="eye"></b-icon>
                    </b-button>
                </template>
            </b-table>
        </b-card>

        <b-modal ref="myModalRef" hide-footer title="Detalles de la adopción" header-bg-variant="warning">
            <b-row class="mb-3">
                <b-col cols="12">
                    <p><strong>Lugar donde será recibido:</strong></p>
                    <b-carousel controls indicators style="max-height: 300px; overflow: hidden;">
                        <b-carousel-slide v-for="(image, index) in modalData.images" :key="index"
                            :img-src="image.imageUrl" :alt="`Slide ${index + 1}`" img-width="300px"
                            img-height="200px"></b-carousel-slide>
                    </b-carousel>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <p><strong>Nombre de la mascota:</strong> {{ modalData.animal.namePet }}</p>
                    <p><strong>Fecha de adopción:</strong> {{ formatDate(modalData.creationDate) }}</p>
                    <div class="mb-2"><strong>Descripción del adoptante:</strong> {{ modalData.description }}</div>
                    <div>
                        <b-form-textarea v-model="modalData.moderatorComment" placeholder="Comentario...">
                    </b-form-textarea>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="d-flex justify-content-between mt-3">
                    <b-button variant="success" @click="approveAdoption">Aprobar</b-button>
                    <b-button variant="danger" @click="rejectAdoption">Rechazar</b-button>
                    <b-button variant="secondary" @click="closeModal">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-modal>

    </b-container>
</template>

<script>
import service from '../../service/Adoption.js'
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            isLoading: false,
            adoptionPending: [],
            fields: [
                { key: 'image', label: '#' },
                { key: 'animal', label: 'Nombre del animal' },
                { key: 'adopter', label: 'Nombre del adoptante' },
                { key: 'date', label: 'Fecha' },
                { key: 'status', label: 'Estado' },
                { key: 'actions', label: 'Acciones' }
            ],
            modalData: {
                animal: '',
                adopter: '',
                description: '',
                creationDate: '',
                images: [],
                status: null,
                moderatorComment: '',
            },
            adoption: null,
        }
    },
    mounted() {
        this.pendingApprovals();
    },
    methods: {
        async pendingApprovals() {
            try {
                this.isLoading = true;
                const pendingAdoption = await service.getPendingAdoptions();
                setTimeout(() => {
                    this.adoptionPending = pendingAdoption;
                    this.isLoading = false;
                }, 1000);
            } catch (error) {
                console.error('Error al obtener adopciones pendientes de aprobación:', error);
                this.isLoading = false;
            }
        },
        async approveOrRejectAdoption(id, approvalStatus, moderatorComment) {
            try {
                const result = await service.onApproveOrRejectAdoption(id, approvalStatus, moderatorComment);
                this.pendingApprovals();
                this.isLoading = true;
            } catch (error) {
                console.error('Error al aprobar/rechazar adopción:', error);
            } finally {
                this.isLoading = false;
                this.closeModal();
            }
        },
        async approveAdoption() {
            const confirmAction = await this.showConfirmation();
            if (confirmAction) {
                this.isLoading = true;
                this.approveOrRejectAdoption(this.modalData.id, 'APPROVED', this.modalData.moderatorComment);
            }
        },
        async rejectAdoption() {
            const confirmAction = await this.showConfirmation();
            if (confirmAction) {
                this.isLoading = true;
                this.approveOrRejectAdoption(this.modalData.id, 'REJECTED', this.modalData.moderatorComment);
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
        openModal(adoption) {
            this.modalData = { ...adoption };
            this.$refs.myModalRef.show();
        },
        manageAdoption() {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción gestionará la mascota.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#81B622',
                cancelButtonColor: '#DC3545',
                confirmButtonText: 'Sí, gestionar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.handleSuccess();
                    this.closeModal();
                }
            });
        },
        handleSuccess() {
            Swal.fire({
                title: '¡Gestionado!',
                text: 'La mascota ha sido gestionada correctamente.',
                icon: 'success',
                confirmButtonColor: '#0066C5',
                confirmButtonText: 'Aceptar'
            });
        },
        closeModal() {
            this.$refs.myModalRef.hide();
        },
        getStatusTranslation(status) {
            switch (status) {
                case false:
                    return 'Pendiente';
                case true:
                    return 'Aprobado';
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
    max-width: 100%; /* Cambia el valor según lo necesites */
}

@media (max-width: 767px) {
    .my-custom-table {
        overflow-x: auto;
    }
}
</style>