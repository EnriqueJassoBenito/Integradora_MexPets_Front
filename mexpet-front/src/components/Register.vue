<template>
    <b-container fluid>
        <Navbar></Navbar>
        <b-row>
            <div class="gridCard">
                <b-card bg-variant="light">
                    <div class="contentCenter">
                        <h4>¡Crea una nueva cuenta!</h4>
                        <p class="my-2">Los datos marcados con (<span class="obligationText">*</span>) son obligatorios.
                        </p>
                    </div>
                    <div>
                        <b-form @submit="onSubmit">
                            <div>
                                <b-row>
                                    <b-form-group>
                                        <h6 class="mt-4">Nombre <span class="obligationText">*</span></h6>
                                        <b-form-input id="inputName" class="inputName" v-model="name" type="text"
                                            placeholder="Nombre genérico" required>
                                        </b-form-input>
                                    </b-form-group>
                                </b-row>
                                <b-row>
                                    <b-col cols="6">
                                        <b-form-group>
                                            <h6 class="mt-4">Apellido Paterno <span class="obligationText">*</span></h6>
                                            <b-form-input id="inputLastName1" v-model="lastName1" type="text"
                                                placeholder="Apellido P Genérico" required>
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="6">
                                        <div>
                                            <b-form-group>
                                                <h6 class="mt-4">Apellido Materno <span class="obligationText">*</span>
                                                </h6>
                                                <b-form-input id="inputLastName2" v-model="lastName2" type="text"
                                                    placeholder="Apellido M Genérico" required>
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="6">
                                        <b-form-group>
                                            <h6 class="mt-4">Teléfono <span class="obligationText">*</span></h6>
                                            <b-form-input id="inputPhone" v-model="phone" type="text"
                                                placeholder="7771234567" required>
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="6">
                                        <div>
                                            <b-form-group>
                                                <h6 class="mt-4">Estado <span class="obligationText">*</span></h6>
                                                <b-form-select v-model="selected" :options="options"></b-form-select>
                                            </b-form-group>
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-form>
                    </div>
                    <div class="contentCenter">
                        <b-button class="my-4 btnLogin" href="#" variant="success" @click="onSubmit">Iniciar
                            Sesión</b-button>
                    </div>
                    <div class="contentCenter">
                        <b-link href="#foo">¿Olvidaste tu contraseña?</b-link>
                    </div>
                    <div class="slider-container">
                        <div class="lineL my-4"></div>
                        <div class="my-4">o</div>
                        <div class="lineR my-4"></div>
                    </div>
                    <div class="contentCenter">
                        <p>¿No tienes cuenta? <b-link :to="{ name: 'register' }">Crear una cuenta</b-link></p>
                    </div>
                    <div>
                        <b-alert show variant="danger" v-if="error">{{ error_msg }}</b-alert>
                    </div>
                </b-card>
            </div>
        </b-row>
    </b-container>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            selected: null,
            options: [
                { value: null, text: 'Selecciona un Estado' },
                { value: '1', text: 'Aguascalientes' },
                { value: '2', text: 'Baja California' },
                { value: '3', text: 'Baja California Sur' },
                { value: '4', text: 'Campeche' },
                { value: '5', text: 'Chiapas' },
                { value: '6', text: 'Chihuahua' },
                { value: '7', text: 'Coahuila de Zaragoza' },
                { value: '8', text: 'Colima' },
                { value: '9', text: 'Ciudad de México' },
                { value: '10', text: 'Durango' },
                { value: '11', text: 'Guanajuato' },
                { value: '12', text: 'Guerrero' },
                { value: '13', text: 'Hidalgo' },
                { value: '14', text: 'Jalisco' },
                { value: '15', text: 'Estado de Mexico' },
                { value: '16', text: 'Michoacan' },
                { value: '17', text: 'Morelos' },
                { value: '18', text: 'Nayarit' },
                { value: '19', text: 'Nuevo Leon' },
                { value: '20', text: 'Oaxaca' },
                { value: '21', text: 'Puebla' },
                { value: '22', text: 'Queretaro' },
                { value: '23', text: 'Quintana Roo' },
                { value: '24', text: 'San Luis Potosi' },
                { value: '25', text: 'Sinaloa' },
                { value: '26', text: 'Sonora' },
                { value: '27', text: 'Tabasco' },
                { value: '28', text: 'Tamaulipas' },
                { value: '29', text: 'Tlaxcala' },
                { value: '30', text: 'Veracruz' },
                { value: '31', text: 'Yucatan' },
                { value: '32', text: 'Zacatecas' },
            ]
        }
    }

}
</script>

<style>
@media (min-width: 1024px) {
    .gridCard {
        width: 30%;
        /* Ancho específico para dispositivos grandes */
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

.obligationText {
    color: #FF0000;
    font-weight: bold;
}
</style>