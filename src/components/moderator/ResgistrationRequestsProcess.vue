<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <b-spinner class="spiner"></b-spinner>
        </div>
        <h2 class="text-wait mb-4">Procesada</h2>
        <b-row class="mt-5">
            <b-col cols="12" sm="6" md="4" lg="3" v-for="animal in animalPending" :key="animal.id" class="mb-4">
                <b-card :title="animal.namePet" :img-src="animal.images[0].imageUrl" :img-alt="animal.namePet" img-top
                    tag="article" footer="Card Footer" footer-bg-variant="warning" footer-border-variant="dark"
                    style="max-width: 20rem;">
                    <b-card-text>
                        <p><strong>Ubicación:</strong> {{ animal.location }}</p>
                        <p><strong>Tipo:</strong> {{ animal.typePet.type }}</p>
                        <p><strong>Raza:</strong> {{ animal.race.racePet }}</p>
                        <p><strong>Personalidad:</strong> {{ animal.personality.personalityPet }}</p>
                    </b-card-text>
                    <b-button @click="openModal(card)" variant="primary">Gestionar</b-button> <!--Este botón abre el-->
                </b-card>
            </b-col>
        </b-row>
        <hr>
        <!--<b-modal ref="myModalRef" hide-footer title="Detalles de la mascota">
            <b-row>
                <b-col cols="6">
                    <b-carousel controls indicators>
                        <b-carousel-slide v-for="(image, index) in modalData.images" :key="index" :img-src="image"
                            :alt="`Slide ${index + 1}`"></b-carousel-slide>
                    </b-carousel>
                </b-col>
                <b-col cols="6">
                    <p>Nombre: {{ modalData.nombre }}</p>
                    <p>Características:</p>
                    <ul>
                        <li>Tipo: {{ modalData.tipo }}</li>
                        <li>Localización: {{ modalData.localizacion }}</li>
                        <li>Raza: {{ modalData.raza }}</li>
                        <li>Personalidad: {{ modalData.personalidad }}</li>
                        <li>Sexo: {{ modalData.sexo }}</li>
                        <li>Peso: {{ modalData.peso }}</li>
                        <li>Tamaño: {{ modalData.tamano }}</li>
                        <li>Edad: {{ modalData.edad }}</li>
                        <li>Color: {{ modalData.color }}</li>
                        <li>Esterilizado: {{ modalData.esterilizado }}</li>
                    </ul>
                    <p>Descripción: {{ modalData.descripcion }}</p>

                    <b-button variant="success" @click="manageAnimal">Gestionar</b-button>
                    <b-button variant="danger" @click="closeModal">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-modal>-->
    </b-container>
</template>

<script>
import service from '../../service/AnimalService.js'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            isLoading: false,
            animalPending: []
        };
    },
    mounted() {
        this.pendingApprovals();
        this.approved();
    },
    methods: {
        async pendingApprovals() {
            try {
                this.isLoading = true;
                const pendingApprovalAnimals = await service.onGetPendingApprovalAnimals();
                this.animalPending = pendingApprovalAnimals;
                this.isLoading = false;
                //console.log('Animales pendientes de aprobación:', pendingApprovalAnimals);
            } catch (error) {
                console.error('Error al obtener animales pendientes de aprobación:', error);
                this.isLoading = false;
            }
        },
        async approved() {
            try {
                const approved = await service.onGetApprovedAnimals();
                console.log('Adopciones aprobadas:', approved);
            } catch (error) {
                console.error('Error al obtener adopciones aprobadas:', error);
            }
        },
        async approveOrRejectAdoption(id, status, comment) {
            try {
                const result = await service.onApproveOrRejectAnimal(id, status, comment);
                console.log('Resultado de la acción de aprobación/rechazo:', result);
            } catch (error) {
                console.error('Error al aprobar/rechazar adopción:', error);
            }
        },
        openModal(card) {
            this.modalData = {
                ...this.modalData,
                nombre: card.title,
            };
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
        }
    }
};
</script>

<style>
.text-wait {
    color: green;
}

.text-processed {
    color: rgb(80, 31, 31);
}

.loading-overlay {
    display: none;
    background: rgba(255, 255, 255, 0.7);
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

.spiner {
    color: #dd4a68;
}
</style>