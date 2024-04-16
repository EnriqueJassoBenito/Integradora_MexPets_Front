<template>
    <b-container fluid>
        <div class="loading-overlay" :class="{ 'is-active': isLoading }">
            <div class="custom-loader"></div>
        </div>
        <b-row align-h="center" align-v="center">
            <div class="gridCard">
                <b-card bg-variant="light">
                    <div class="contentCenter">
                        <img src="../../assets/logomexx.png" id="iconLogin" class="iconLogo my-2" width="20%">
                    </div>
                    <div class="contentCenter">
                        <h4>Recuperar contraseña</h4>
                    </div>
                    <div>
                        <b-form @submit.prevent="onSubmit">
                            <b-form-group label-for="password"
                                invalid-feedback="La contraseña no cumple los requisitos">
                                <b-input-group>
                                    <b-form-input placeholder="Ingresa tu contraseña nueva" id="password"
                                        v-model="password" :type="showPasswordPassword ? 'text' : 'password'"
                                        required />
                                    <b-input-group-append>
                                        <b-button @click="togglePasswordPassword" variant="outline-secondary">
                                            <b-icon :icon="showPasswordPassword ? 'eye-slash' : 'eye'"
                                                aria-hidden="true"></b-icon>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label-for="confirmPassword" invalid-feedback="">
                                <b-input-group>
                                    <b-form-input placeholder="Confirma tu contraseña nueva" id="confirmPassword"
                                        v-model="confirmPassword" :type="showPasswordConfirm ? 'text' : 'password'"
                                        required />
                                    <b-input-group-append>
                                        <b-button @click="togglePasswordConfirm" variant="outline-secondary">
                                            <b-icon :icon="showPasswordConfirm ? 'eye-slash' : 'eye'"
                                                aria-hidden="true"></b-icon>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>


                        </b-form>
                    </div>
                    <div class="contentCenter">
                        <b-button class="my-4 btnLogin" href="#" variant="success" @click="onSubmit">Enviar</b-button>
                    </div>
                </b-card>
            </div>
        </b-row>
    </b-container>
</template>

<script>
import Swal from 'sweetalert2';
import service from '../../service/AuthService';

export default {
    data() {
        return {
            token: '',
            isLoading: false,
            password: '',
            confirmPassword: '',
            showPassword: false,
        };
    },
    computed: {
        isPasswordStrongEnough() {
            const regexUpperCase = /[A-Z]/;
            const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
            return (
                this.password.length >= 8 &&
                regexUpperCase.test(this.password) &&
                regexSpecialChar.test(this.password)
            );
        },
    },
    created() {
        const valuesOfUrl = window.location.href.split("/");
        let token = valuesOfUrl[valuesOfUrl.length - 1];
        if (token.includes("token")) {
            this.token = token.split("=")[1];
            console.log('Token obtenido:', this.token);
        } else {
            console.error("Token no encontrado en la URL");
        }
    },
    methods: {
        async onSubmit() {
            if (!this.isPasswordStrongEnough) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña débil',
                    text: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.',
                    confirmButtonColor: '#6A4000',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }

            if (this.password !== this.confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Las contraseñas no coinciden.',
                    confirmButtonColor: '#6A4000',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }

            try {
                this.isLoading = true;
                const response = await service.changePasswordConfirm(this.token, this.password, this.confirmPassword);
                console.log('Respuesta del servidor:', response);
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña cambiada exitosamente',
                    text: 'Ahora puedes iniciar sesión con tu nueva contraseña.',
                    confirmButtonColor: '#6A4000',
                    confirmButtonText: 'Aceptar'
                });
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.error('Error al confirmar cambio de contraseña:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cambiar contraseña',
                    text: 'Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.',
                    confirmButtonColor: '#6A4000',
                    confirmButtonText: 'Aceptar'
                });
            } finally {
                this.isLoading = false;
            }
        },
        togglePasswordPassword() {
            this.showPasswordPassword = !this.showPasswordPassword;
        },
        togglePasswordConfirm() {
            this.showPasswordConfirm = !this.showPasswordConfirm;
        },
    },
};
</script>

<style scoped>
.gridCard {
    width: 100%;
    max-width: 400px;
    /* Limit the width for larger screens */
    margin: auto;
    padding: 20px;
}

.contentCenter {
    text-align: center;
}

.btnLogin {
    width: 100%;
}

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
    animation: spin 2s infinite linear;
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

@keyframes spin {
    100% {
        transform: rotate(1turn);
    }
}
</style>