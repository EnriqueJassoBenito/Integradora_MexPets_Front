<template>
    <div class="login-container">
        <!-- Primera mitad con formulario de inicio de sesión -->
        <div class="login-form">
            <div class="card">
                <div class="card-body">
                    <div class="text-center mb-5">
                        <h2 class="card-title">¡Bienvenido de nuevo!</h2>
                        <p class="card-text">Utiliza tu cuenta para iniciar sesión </p>
                    </div>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo Electrónico:</label>
                            <input type="email" id="email" class="form-control" v-model="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña:</label>
                            <div class="input-group">
                                <input type="password" id="password" class="form-control" v-model="password" :type="showPassword ? 'text' : 'password'" required>
                                <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                                    <!-- Ojo icono -->
                                    <i :class="['bi', showPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-success w-100">Iniciar Sesión</button>
                        </div>
                    </form>
                    <div class="text-center">
                        <router-link to='changePassword'>¿Olvidaste tu contraseña?</router-link>
                        <hr>
                        <router-link to="/register">¿No tienes cuenta? Crear cuenta</router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Segunda mitad con imagen universal -->
        <div class="image-container">
            <img src="../../assets/LoginImage.jpg" alt="login" class="img-fluid"
                style="object-fit: cover; width: 80%; height: 80%;">
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
.card{
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
    object-fit: contain; /* Esto asegurará que la imagen se adapte al contenedor sin distorsionarse */
}

</style>
