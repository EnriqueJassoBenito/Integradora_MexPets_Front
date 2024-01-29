<template>
    <div class="login-container">
        <!-- Primera mitad con formulario de inicio de sesión -->
        <div class="login-form">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">¡Bienvenido de nuevo!</h4>
                    <p class="card-text">Ingresa tus credenciales para acceder a tu cuenta.</p>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" v-model="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña:</label>
                            <input type="password" class="form-control" v-model="password" required>
                        </div>
                        <button type="submit" class="btn btn-success">Iniciar Sesión</button>
                    </form>
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
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            // Aquí puedes implementar la lógica de inicio de sesión
            console.log('Iniciando sesión con:', this.email, this.password);
            // También puedes redirigir a otra página después del inicio de sesión
        }
    }
};
</script>
  
<style>
.login-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
}

.login-form {
    width: 45%;
    margin: auto;
    /* Centra el contenido horizontalmente */
}

.image-container {
    width: 45%;
}

/* Estilos adicionales según tus preferencias */
.card {
    /* Agrega estilos de la tarjeta según tus preferencias */
    /* Puedes personalizar estos estilos según el diseño que desees */
}

.form-control {
    /* Agrega estilos de los campos del formulario según tus preferencias */
}

/* Puedes personalizar más estilos según tus necesidades */
</style>
  