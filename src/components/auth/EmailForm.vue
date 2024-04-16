<template>
    <b-container fluid>
        <div class="loading-overlay is-active" v-if="isLoading">
            <div class="custom-loader"></div>
        </div>
        <b-row class="justify-content-center align-items-center h-100">
            <b-col cols="12" sm="10" md="8" lg="6">
                <div class="gridCard">
                    <b-card bg-variant="light">
                        <div class="contentCenter">
                            <img src="../../assets/logomexx.png" id="iconLogin" class="iconLogo my-2" width="20%">
                        </div>
                        <div class="contentCenter">
                            <h4>Reestablece tu contraseña</h4>
                            <p class="my-2">Ingresa tu correo electrónico</p>
                        </div>
                        <div>
                            <b-form @submit="onSubmit">
                                <b-form-group label-for="email" invalid-feedback="">
                                    <b-form-input placeholder="perritos@mexpet.com" id="email" v-model="email"
                                        required />
                                </b-form-group>
                            </b-form>
                        </div>
                        <div class="contentCenter">
                            <b-button class="my-4 btnLogin" href="#" variant="success"
                                @click="onSubmit">Reestablecer</b-button>
                        </div>
                    </b-card>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Swal from 'sweetalert2';
import service from '../../service/AuthService'
export default {
    data() {
        return {
            isLoading: false,
            email: '',
            emailState: null
        };
    },
    methods: {
        isEmailValid() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.email);
        },
        async onSubmit() {
            try {
                this.isLoading = true;

                if (!this.isEmailValid()) {
                    this.emailState = false;
                    this.isLoading = false;
                    return;
                }

                const response = await service.changePassword(this.email);
                Swal.fire({
                    icon: 'success',
                    text: response.message,
                    confirmButtonColor: '#6A4000',
                    confirmButtonText: 'Aceptar'
                });
                console.log('Respuesta del servidor:', response);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error en procesar la solicitud',
                    confirmButtonColor: '#0066C5',
                    confirmButtonText: 'Aceptar'
                });
                console.error('Error al enviar el correo para cambiar la contraseña:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }
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

@media (min-width: 576px) {
    .btnLogin {
        width: 75%;
    }
}

@media (min-width: 768px) {
    .gridCard {
        width: 80%;
        max-width: 400px;
    }
}

@media (min-width: 992px) {
    .gridCard {
        width: 70%;
    }
}
</style>
