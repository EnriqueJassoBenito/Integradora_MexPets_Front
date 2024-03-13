<template>
    <div class="login-container">
        <div class="login-form">
            <div class="card">
                <div class="card-body">
                    <div class="text-center mb-5">
                        <img src="../../assets/nnnn.png" alt="Logo" width="50" height="50" class="d-inline-block align-top">
                        <h2 class="card-title">Mi cuenta</h2>
                    </div>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo Electrónico:</label>
                            <input type="email" id="email" class="form-control" v-model="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña:</label>
                            <div class="input-group">
                                <input :type="showPassword ? 'text' : 'password'" id="password" class="form-control" v-model="password" required>
                                <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                                    <i :class="['bi', showPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-success w-100" style="background:#3D4284; border-color: #3D4284;">Iniciar Sesión</button>
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
    background-image: url('../../assets/adop.jpeg');
    background-size: cover;
    background-position: center;
    
}
.card{
    border-radius: 20px !important;
    background: rgba(255, 255, 255, 0.2)!important; 
    padding: 20px;
}

.login-form {
    width: 40%;
    margin: 20px auto;

}

.card-body {
    margin: 50px 0 50px; 
    
}
.form input {
    width: 60%;
    padding: 15px;
    margin: 10px 0;
    border-radius: 80px;
    border: 0;
}

</style>
