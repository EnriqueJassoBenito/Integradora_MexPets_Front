<template>
    <b-container>
        <b-row class="mt-5">
            <h2 class="text-wait mb-4">En espera</h2>
            <b-col cols="12" sm="6" md="4" lg="3" v-for="(card, index) in cardsEnEspera" :key="index" class="mb-4">
                <b-card :title="card.title" :img-src="card.imgSrc" :img-alt="card.imgAlt" img-top tag="article"
                    footer="Card Footer" footer-bg-variant="warning" footer-border-variant="dark"
                    style="max-width: 20rem;">
                    <b-card-text>Header and footers variants.</b-card-text>
                    <b-button @click="openModal(card)" variant="primary">Gestionar</b-button> <!--Este botón abre el-->
                </b-card>
            </b-col>
        </b-row>

        <hr>

        <b-row class="mt-5">
            <h2 class="text-processed mb-4">En proceso</h2>
            <b-col cols="12" sm="6" md="4" lg="3" v-for="(card, index) in cardsEnProceso" :key="index" class="mb-4">
                <b-card :title="card.title" :img-src="card.imgSrc" :img-alt="card.imgAlt" img-top tag="article"
                    style="max-width: 20rem;">
                    <b-card-text>{{ card.content }}</b-card-text>
                </b-card>
            </b-col>
        </b-row>

        <b-modal ref="myModalRef" hide-footer title="Detalles de la mascota">
            <b-row>
                <!-- Carrusel a la izquierda -->
                <b-col cols="6">
                    <b-carousel controls indicators>
                        <b-carousel-slide v-for="(image, index) in modalData.images" :key="index" :img-src="image"
                            :alt="`Slide ${index + 1}`"></b-carousel-slide>
                    </b-carousel>
                </b-col>

                <!-- Detalles a la derecha -->
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
        </b-modal>

    </b-container>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            cardsEnEspera: [
                {
                    title: 'Card 1',
                    imgSrc: 'https://picsum.photos/600/300/?image=25',
                    imgAlt: 'Image 1',
                    content: 'Some quick example text for card 1.'
                },
                {
                    title: 'Card 2',
                    imgSrc: 'https://picsum.photos/600/300/?image=26',
                    imgAlt: 'Image 2',
                    content: 'Some quick example text for card 2.'
                },
                {
                    title: 'Card 1',
                    imgSrc: 'https://picsum.photos/600/300/?image=25',
                    imgAlt: 'Image 1',
                    content: 'Some quick example text for card 1.'
                },
                {
                    title: 'Card 2',
                    imgSrc: 'https://picsum.photos/600/300/?image=26',
                    imgAlt: 'Image 2',
                    content: 'Some quick example text for card 2.'
                },
                {
                    title: 'Card 1',
                    imgSrc: 'https://picsum.photos/600/300/?image=25',
                    imgAlt: 'Image 1',
                    content: 'Some quick example text for card 1.'
                },
                {
                    title: 'Card 2',
                    imgSrc: 'https://picsum.photos/600/300/?image=26',
                    imgAlt: 'Image 2',
                    content: 'Some quick example text for card 2.'
                },
                // Add more cards as needed
            ],
            cardsEnProceso: [
                {
                    title: 'Card 3',
                    imgSrc: 'https://picsum.photos/600/300/?image=27',
                    imgAlt: 'Image 3',
                    content: 'Some quick example text for card 3.'
                },
                {
                    title: 'Card 4',
                    imgSrc: 'https://picsum.photos/600/300/?image=28',
                    imgAlt: 'Image 4',
                    content: 'Some quick example text for card 4.'
                },
                {
                    title: 'Card 3',
                    imgSrc: 'https://picsum.photos/600/300/?image=27',
                    imgAlt: 'Image 3',
                    content: 'Some quick example text for card 3.'
                },
                {
                    title: 'Card 4',
                    imgSrc: 'https://picsum.photos/600/300/?image=28',
                    imgAlt: 'Image 4',
                    content: 'Some quick example text for card 4.'
                },
                {
                    title: 'Card 3',
                    imgSrc: 'https://picsum.photos/600/300/?image=27',
                    imgAlt: 'Image 3',
                    content: 'Some quick example text for card 3.'
                },
                {
                    title: 'Card 4',
                    imgSrc: 'https://picsum.photos/600/300/?image=28',
                    imgAlt: 'Image 4',
                    content: 'Some quick example text for card 4.'
                },
            ],
            modalData: {
                images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], // Ejemplo de imágenes estáticas
                nombre: 'Nombre de la mascota',
                tipo: 'Tipo de mascota',
                localizacion: 'Localización',
                raza: 'Raza',
                personalidad: 'Personalidad',
                sexo: 'Sexo',
                peso: 'Peso',
                tamano: 'Tamaño',
                edad: 'Edad',
                color: 'Color',
                esterilizado: 'Esterilizado',
                descripcion: 'Descripción del animal con comentarios de gestión o cancelación.'
            }
        };
    },
    methods: {
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
            Swal.fire('¡Gestionado!', 'La mascota ha sido gestionada correctamente.', 'success');
            
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
</style>