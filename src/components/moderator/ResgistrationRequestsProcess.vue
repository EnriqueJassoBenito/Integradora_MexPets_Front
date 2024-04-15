<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <div class="custom-loader"></div>
        </div>
        <div class="section">
            <h2 class="section-title">En proceso</h2>
        </div>
        <hr>
        <b-row class="mt-2">
            <b-col cols="12" sm="6" md="4" lg="3" v-for="animal in animalApproval" :key="animal.id" class="mb-4">
                <b-card :title="animal.namePet" :img-src="animal.images[0].imageUrl" :img-alt="animal.namePet" img-top
                    tag="article" :footer="'Estado: ' + getStatusTranslation(animal.approvalStatus)"
                    footer-bg-variant="success" footer-border-variant="dark" style="max-width: 15rem;">
                    <b-card-text>
                        <p><strong>Ubicación:</strong> {{ animal.location }}</p>
                        <p><strong>Tipo:</strong> {{ animal.typePet.type }}</p>
                        <p><strong>Raza:</strong> {{ animal.race.racePet }}</p>
                        <p><strong>Sexo:</strong> {{ animal.sex }}</p>
                    </b-card-text>
                    <b-button @click="openModal(animal)" variant="primary" class="float-right mb-2 mr-2">
                        <b-icon icon="eye" aria-hidden="true"></b-icon>
                    </b-button>
                </b-card>
            </b-col>
        </b-row>

        <b-modal ref="myModalRef" hide-footer title="Detalles de la mascota" header-bg-variant="success">
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

                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col cols="12" class="d-flex justify-content-end">
                    <b-button variant="secondary" @click="closeModal">Cerrar</b-button>
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
            animalApproval: [],
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
        this.getApproval();
    },
    methods: {
        async getApproval() {
            try {
                this.isLoading = true;
                const approvedAnimals = await service.onGetApprovedAnimals();
                setTimeout(() => {
                    this.animalApproval = approvedAnimals;
                    this.isLoading = false;
                }, 2000);
            } catch (error) {
                console.error('Error al obtener animales pendientes de aprobación:', error);
                this.isLoading = false;
            }
        },
        openModal(animal) {
            this.modalData = { ...animal };
            this.$refs.myModalRef.show();
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
.b-card {
    margin-bottom: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.b-card-img-top {
    object-fit: cover;
    height: 100px;
}

.loading-overlay {
    display: none;
    background: rgba(255, 255, 255, 0.708);
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

.characteristics {
    margin-top: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
}
</style>