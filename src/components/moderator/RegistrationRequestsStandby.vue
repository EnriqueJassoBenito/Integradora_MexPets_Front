<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <div class="custom-loader"></div>
        </div>
        <div class="section mt-3">
            <h2 class="section-title">En espera</h2>
        </div>
        <hr>
        <b-row class="mt-2">
            <b-col cols="12" sm="6" md="4" lg="3" v-for="animal in animalPending" :key="animal.id" class="mb-4">
                <b-card :title="animal.namePet" tag="article"
                    :footer="'Estado: ' + getStatusTranslation(animal.approvalStatus)" footer-bg-variant="warning"
                    footer-border-variant="dark">
                    <b-row>
                        <b-col cols="5">
                            <img :src="animal.images[0].imageUrl" :alt="animal.namePet" class="img-fluid"
                                style="max-height: 150px;">
                        </b-col>
                        <b-col cols="7">
                            <b-card-text>
                                <p><strong>Ubicación:</strong> {{ animal.location }}</p>
                                <p><strong>Tipo:</strong> {{ animal.typePet.type }}</p>
                                <p><strong>Raza:</strong> {{ animal.race.racePet }}</p>
                                <p><strong>Sexo:</strong> {{ animal.sex }}</p>
                            </b-card-text>
                            <b-button @click="openModal(animal)" variant="primary" class="float-right mb-2 mr-2">
                                <b-icon icon="eye" aria-hidden="true"></b-icon>
                            </b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>

        <b-modal ref="myModalRef" hide-footer title="Detalles de la mascota" header-bg-variant="warning">
            <b-row class="mb-3">
                <b-col cols="12">
                    <b-carousel controls indicators style="max-height: 300px; overflow: hidden;">
                        <b-carousel-slide v-for="(image, index) in modalData.images" :key="index"
                            :img-src="image.imageUrl" :alt="`Slide ${index + 1}`" img-width="300px"
                            img-height="200px"></b-carousel-slide>
                    </b-carousel>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <p><strong>Nombre:</strong> {{ modalData.namePet }}</p>
                    <p><strong>Características:</strong></p>
                    <div class="characteristics mb-2">
                        <b-row>
                            <b-col cols="6">
                                <div><strong>Localización:</strong> {{ modalData.location }}</div>
                                <div><strong>Tipo:</strong> {{ modalData.typePet.type }}</div>
                                <div><strong>Raza:</strong> {{ modalData.race.racePet }}</div>
                                <div><strong>Personalidad:</strong> {{ modalData.personality.personalityPet }}</div>
                                <div><strong>Sexo:</strong> {{ modalData.sex }}</div>
                            </b-col>
                            <b-col cols="6">

                                <div><strong>Tamaño:</strong> {{ modalData.size }}</div>
                                <div><strong>Peso:</strong> {{ modalData.weight }}</div>
                                <div><strong>Edad:</strong> {{ modalData.age }}</div>
                                <div><strong>Color:</strong> {{ modalData.color }}</div>
                                <div><strong>Esterilizado:</strong> {{ modalData.sterilized ? 'Sí' : 'No' }}</div>
                            </b-col>
                        </b-row>
                    </div>
                    <div><strong>Descripción:</strong> {{ modalData.description }}</div>
                    <hr>
                    <div class="mt-4">
                        <b-form-textarea id="textarea" v-model="modalData.moderatorComment"
                            placeholder="Retroalimentación..." rows="3" max-rows="6"></b-form-textarea>
                    </div>
                </b-col>
            </b-row>
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
import service from '../../service/AnimalService.js'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            isLoading: false,
            animalPending: [],
            modalData: {
                id: '',
                namePet: '',
                location: '',
                typePet: '',
                race: '',
                personality: '',
                sex: '',
                size: '',
                weight: '',
                age: '',
                color: '',
                sterilized: '',
                description: '',
                images: [],
                approvalStatus: '',
                moderatorComment: '',
            },
            animal: null,
        }
    },
    mounted() {
        this.pendingApprovals();
    },
    methods: {
        async pendingApprovals() {
            try {
                this.isLoading = true;
                const pendingApprovalAnimals = await service.onGetPendingApprovalAnimals();
                setTimeout(() => {
                    this.animalPending = pendingApprovalAnimals;
                    this.isLoading = false;
                }, 1000);
            } catch (error) {
                this.isLoading = false;
            }
        },
        async approveOrRejectAdoption(id, status, comment) {
            try {
                const result = await service.onApproveOrRejectAnimal(id, status, comment);
                if (status === 'PENDING') {
                    Swal.fire('Rechazado', 'Enviando retroalimentación', 'info');
                } else if (status === 'APPROVED') {
                    Swal.fire('En hora buena', 'Solicitud aprobada', 'success');
                }
                this.pendingApprovals();
            } catch (error) {
                console.error('Error al aprobar/rechazar adopción:', error);
            } finally {
                this.isLoading = false;
                this.closeModal();
            }
        },
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
                this.isLoading = true;
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
        openModal(animal) {
            this.modalData = { ...animal };
            this.$refs.myModalRef.show();
        },
        manageAnimal() {
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
                case 'PENDING':
                    return 'Pendiente';
                case 'APPROVED':
                    return 'Aprobado';
                case 'REJECT':
                    return 'Rechazado';
                default:
                    return 'Desconocido';
            }
        }
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
</style>