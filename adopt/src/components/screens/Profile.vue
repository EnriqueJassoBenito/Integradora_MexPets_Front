<template>
    <b-container fluid>
        <!-- Fila principal con dos columnas -->
        <b-row>
            <!-- Columna para la imagen de fondo -->
            <b-col class="background-image" :style="{ height: backgroundImageHeight }">
                <!-- Contenido del fondo aquí -->
            </b-col>

            <!-- Columna para el perfil y la información personal -->
            <b-col>
                <!-- Perfil con imagen circular -->
                <b-avatar class="profile-image" :src="imageUrl" alt="Profile Image"></b-avatar>

                <!-- Información personal -->
                <b-form @submit.prevent="guardarInformacion">
                    <h2>Información Personal</h2>

                    <!-- Campos para editar información personal -->
                    <b-form-group label="Nombre" label-for="nombre">
                        <b-form-input v-model="nombre" id="nombre" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Edad" label-for="edad">
                        <b-form-input v-model="edad" type="number" id="edad" required></b-form-input>
                    </b-form-group>

                    <!-- Agrega más campos según sea necesario -->

                    <!-- Botón para guardar cambios -->
                    <b-button type="submit" variant="primary">Guardar</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            // Puedes inicializar estos datos con valores predeterminados o cargarlos dinámicamente
            imageUrl: 'ruta_de_la_imagen.jpg',
            nombre: '',
            edad: 0,
            // Agrega más datos según sea necesario
            backgroundImageHeight: '200px', // Ajusta según tus preferencias
        };
    },
    methods: {
        guardarInformacion() {
            // Lógica para guardar la información personal
            // Puedes enviar los datos a un servidor, almacenarlos en localStorage, etc.
            console.log('Información guardada:', this.nombre, this.edad);
        },
    },
};
</script>

<style scoped>
.background-image {
    /* Establece la imagen de fondo con un height no tan grande */
    background-image: url('ruta_de_la_imagen_de_fondo.jpg');
    background-size: cover;
    background-position: center;
}

.profile-image {
    width: 100px;
    /* Ajusta según tus preferencias */
    height: 100px;
    /* Ajusta según tus preferencias */
}

/* Agrega más estilos según sea necesario */
</style>