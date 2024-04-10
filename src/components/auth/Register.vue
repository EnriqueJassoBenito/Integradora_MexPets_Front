<template>
    <b-container fluid>
        <b-row>
            <div class="content">
                <div class="contentCard">
                    <b-breadcrumb :items="items"></b-breadcrumb>
                    <b-card bg-variant="light">
                        <div class="contentCenter">
                            <h4>¡Crea una nueva cuenta!</h4>
                            <p class="my-2">Los datos marcados con (<span class="obligationText">*</span>) son
                                obligatorios.</p>
                        </div>
                        <div>
                            <b-form @submit.prevent="onSubmit">
                                <div>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <h6 class="mt-4">Nombre <span class="obligationText">*</span></h6>
                                                <b-form-input v-model="name" type="text" placeholder="Nombre(s)"
                                                    required></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <h6 class="mt-4">Apellido Paterno <span class="obligationText">*</span>
                                                </h6>
                                                <b-form-input v-model="lastName" type="text"
                                                    placeholder="Apellido Paterno" required></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <h6 class="mt-4">Teléfono <span class="obligationText">*</span></h6>
                                                <b-form-input v-model="phone" type="tel" placeholder="7771234567"
                                                    required></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <h6 class="mt-4">Estado <span class="obligationText">*</span></h6>
                                                <b-form-select v-model="selected" :options="options"
                                                    required></b-form-select>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <h6 class="mt-4">Nombre de usuario <span class="obligationText">*</span>
                                                </h6>
                                                <b-form-input v-model="userName" type="text"
                                                    placeholder="Nombre de usuario" required></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <h6 class="mt-4">Contraseña <span class="obligationText">*</span></h6>
                                                <b-form-input v-model="password" type="password"
                                                    placeholder="***********" required></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <h6 class="mt-4">Confirmar contraseña <span
                                                        class="obligationText">*</span></h6>
                                                <b-form-input v-model="confirmPassword" type="password"
                                                    placeholder="***********" required></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </div>
                            </b-form>
                        </div>
                        <div class="contentCenter">
                            <b-button class="mt-4 btnLogin" href="#" variant="success"
                                @click="onSubmit">Registrarse</b-button>
                        </div>
                        <div class="slider-container">
                            <div class="lineL my-4"></div>
                            <div class="my-4">o</div>
                            <div class="lineR my-4"></div>
                        </div>
                        <div class="contentCenter">
                            <p>¿Ya tienes una cuenta? <b-link :to="{ name: 'login' }">Iniciar Sesión</b-link></p>
                        </div>
                        <div>
                            <b-alert show variant="danger" v-if="error">{{ error_msg }}</b-alert>
                        </div>
                    </b-card>
                </div>
            </div>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            error: false,
            error_msg: '',
            name: "",
            lastName: "",
            phone: "",
            selected: null,
            userName: "",
            password: "",
            confirmPassword: "",
            options: [
                { value: null, text: 'Selecciona un Estado' },
                // Agrega aquí las opciones de estado según tus necesidades
            ],
            items: [
                { text: 'Home', href: '', to: 'landing' },
                { text: 'Registrarse', href: '#', to: 'register' }
            ]
        }
    },
    methods: {
        onSubmit() {
            if (!this.validateForm()) {
                // Mostrar mensaje de error o hacer algo si la validación no pasa
                this.error = true;
                this.error_msg = '¡Debes completar todos los campos correctamente!';
                return;
            }

            // Lógica para enviar datos al servidor o hacer algo con los datos
            const formData = {
                name: this.name,
                lastName: this.lastName,
                phone: this.phone,
                selected: this.selected,
                userName: this.userName,
                password: this.password,
                confirmPassword: this.confirmPassword
            };
            console.log('Datos a enviar:', formData);

            // Aquí puedes agregar la lógica para enviar los datos al servidor usando axios u otro método
        },
        validateForm() {
            return (
                this.name.trim() !== "" &&
                this.lastName.trim() !== "" &&
                this.phone.trim() !== "" &&
                this.selected !== null &&
                this.userName.trim() !== "" &&
                this.password.trim() !== "" &&
                this.confirmPassword.trim() !== "" &&
                this.password === this.confirmPassword
            );
        }
    }
};
</script>

<style>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-top: 5%;

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

.obligationText {
    color: #FF0000;
    font-weight: bold;
}
</style>