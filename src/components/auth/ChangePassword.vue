<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <div class="custom-loader"></div>
        </div>
        <b-row>
            <div class="gridCard">
                <b-card bg-variant="light">
                    <div class="contentCenter">
                        <img src="../../assets/logomexx.png" id="iconLogin" class="iconLogo my-2" width="20%">
                    </div>
                    <div class="contentCenter">
                        <h4>Recuperar contrasena</h4>
                    </div>
                    <div>
                        <b-form @submit.prevent="onSubmit">
                            <b-form-group label-for="password"
                                invalid-feedback="La contraseña no cumple los requisitos">
                                <b-form-input placeholder="Ingresa tu contraseña nueva" id="password" v-model="password"
                                    required />
                            </b-form-group>
                            <b-form-group label-for="passwordConfirm" invalid-feedback="">
                                <b-form-input placeholder="Confirma tu contraseña nueva" id="confirmPassword"
                                    v-model="confirmPassword" required />
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
                    text: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un caracter especial.',
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
    },
};
</script>


<style>
@media (min-width: 1024px) {
    .gridCard {
        width: 30%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.contentCenter {
    text-align: center;
}

.btnLogin {
    width: 50%
}

.slider-container {
    display: flex;
    align-items: center;
}

.lineL {
    height: 1px;
    background-color: #000000;
    flex-grow: 1;
    margin-left: 10%;
    margin-right: 2%;
}

.lineR {
    height: 1px;
    background-color: #000000;
    flex-grow: 1;
    margin-right: 10%;
    margin-left: 2%;

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
</style>
