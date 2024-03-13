<template>
    <div class="login-container">
        <div class="login-form">
            <div class="text-center mb-5">
                <h2 class="card-title">Registro</h2>
                <p class="card-text">Crea una nueva cuenta para iniciar sesión</p>
            </div>
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre(s):</label>
                    <input type="text" id="email" class="form-control" v-model="email" required>
                </div>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <label for="apellido-paterno" class="form-label">Apellido Paterno:</label>
                            <input type="text" id="apellido-paterno" class="form-control" v-model="apellidoPaterno" required>
                        </div>
                        <div class="col-md-6">
                            <label for="apellido-materno" class="form-label">Apellido Materno:</label>
                            <input type="text" id="apellido-materno" class="form-control" v-model="apellidoMaterno" required>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <label for="telefono" class="form-label">Teléfono:</label>
                            <input type="tel" id="telefono" class="form-control" v-model="telefono" required>
                        </div>
                        <div class="col-md-6">
                            <label for="estado" class="form-label">Estado:</label>
                            <input type="text" id="estado" class="form-control" v-model="estado" required>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="nameUser" class="form-label">Nombre de Usuario:</label>
                    <input type="text" id="nameUser" class="form-control" v-model="nameUser" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico:</label>
                    <input type="text" id="email" class="form-control" v-model="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña: </label>
                    <input type="password" id="password" class="form-control" v-model="password" required>
                </div>
                <div class="mb-3">
                    <label for="newPassword" class="form-label">Confirmar contraseña: </label>
                    <input type="password" id="newPassword" class="form-control" v-model="newPassword" required>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-success w-100">Crear cuenta</button>
                </div>
            </form>
            <div class="text-center">
                <hr>
                <router-link to="/login">¿Ya tienes cuenta? Iniciar sesión</router-link>
            </div>
        </div>

    </div>
</template>

<script>
import { eye, eyeOff } from 'feather-icons';
export default {
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
        };
    },
    methods: {
        login() {
            console.log('Iniciando sesión con:', this.email, this.password);
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style>
.login-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
}

.card {
    border-radius: 25px !important;
}

.login-form {
    width: 40%;
    margin: 20px auto;
}

.card-body {
    margin: 50px 0 70px;
}

.image-container {
    width: 45%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Esto asegurará que la imagen se adapte al contenedor sin distorsionarse */
}
</style>
