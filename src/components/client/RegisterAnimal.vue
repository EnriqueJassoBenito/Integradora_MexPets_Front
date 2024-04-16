<template>
    <b-container fluid class="d-flex justify-content-center mt-4">
        <b-card title="Registro de Animales" style="width: 100%; max-width: 600px;">
            <b-form @submit="onSubmit">
                <b-row>
                    <b-col md="6">
                        <b-form-group label="Nombre de la mascota" label-for="namePet"
                            invalid-feedback="El nombre debe contener al menos 4 letras y no debe contener caracteres especiales"
                            :state="namePetState">
                            <b-form-input id="namePet" v-model="namePet" required @input="validateNamePet" />
                        </b-form-group>
                        <b-form-group label="Localización" label-for="location"
                            invalid-feedback="Por favor, selecciona un estado existente en la lista desplegable."
                            :state="locationState">
                            <b-form-select id="location" v-model="location" :options="locations" required />
                        </b-form-group>
                        <b-form-group label="Tipo de mascota" label-for="typePet"
                            invalid-feedback="Por favor, selecciona un tipo de mascota existente en la lista desplegable."
                            :state="typePetState">
                            <b-form-select id="typePet" v-model="typePet" :options="typePets" required />
                        </b-form-group>
                        <b-form-group label="Raza" label-for="race"
                            invalid-feedback="Por favor, selecciona una raza existente en la lista desplegable."
                            :state="raceState">
                            <b-form-select id="race" v-model="race" :options="races" required />
                        </b-form-group>
                        <b-form-group label="Personalidad" label-for="personality"
                            invalid-feedback="Por favor, selecciona una personalidad existente en la lista desplegable."
                            :state="personalityState">
                            <b-form-select id="personality" v-model="personality" :options="personalities" required />
                        </b-form-group>
                        <b-form-group label="Sexo" label-for="sex"
                            invalid-feedback="Por favor, selecciona un sexo existente en la lista desplegable."
                            :state="sexState">
                            <b-form-select id="sex" v-model="sex" :options="sexOptions" required />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Tamaño" label-for="size"
                            invalid-feedback="Por favor, selecciona un tamaño existente en la lista desplegable."
                            :state="sizeState">
                            <b-form-select id="size" v-model="size" :options="sizes" required />
                        </b-form-group>
                        <b-form-group label="Peso" label-for="weight"
                            invalid-feedback="El peso del animal debe ser mayor o igual a 0.5 y menor o igual a 70 kg."
                            :state="weightState">
                            <b-form-input id="weight" type="number" v-model="weight" min="0.5" max="70" required />
                        </b-form-group>
                        <b-form-group label="Edad" label-for="age"
                            invalid-feedback="La edad debe ser mayor o igual a 1 y menor o igual a 30."
                            :state="ageState">
                            <b-form-input id="age" type="number" v-model="age" min="1" max="30" required />
                        </b-form-group>
                        <b-form-group label="Color" label-for="color"
                            invalid-feedback="El color no debe contener caracteres especiales." :state="colorState">
                            <b-form-input id="color" v-model="color" required />
                        </b-form-group>
                        <b-form-group label="Esterilizado" label-for="sterilized"
                            invalid-feedback="Debes seleccionar si está esterilizado o no." :state="sterilizedState">
                            <b-form-checkbox id="sterilized" v-model="sterilized" switch>
                                Sí
                            </b-form-checkbox>
                        </b-form-group>
                        <b-form-group label="Descripción" label-for="description"
                            invalid-feedback="La descripción debe contar con un mínimo de 50 palabras y un máximo de 250."
                            :state="descriptionState">
                            <b-form-textarea id="description" v-model="description" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <b-form-group label="Imágenes" label-for="imageFiles"
                            invalid-feedback="Debe insertar un mínimo de 3 imágenes y un máximo de 5, y los archivos no deberán ser mayores a 10 MB."
                            :state="imageFilesState">
                            <b-form-file id="imageFiles" v-model="imageFiles" multiple accept="image/*"
                                @change="validateImageFiles" required :class="{ 'is-invalid': !imageFilesState }" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col md="6" class="text-center">
                        <b-button type="submit" variant="success" @click="onSubmit">
                            Registrar
                        </b-button>
                    </b-col>
                    <b-col md="6" class="text-center">
                        <b-button type="reset" variant="danger">
                            Eliminar
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
    </b-container>
</template>
<script>
import services from '../../service/CategoryService';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    data() {
        return {
            locations: [
                { value: '', text: 'Seleccionar' },
                { value: 'aguascalientes', text: 'Aguascalientes' },
                { value: 'baja_california', text: 'Baja California' },
                { value: 'baja_california_sur', text: 'Baja California Sur' },
                { value: 'campeche', text: 'Campeche' },
                { value: 'coahuila', text: 'Coahuila' },
                { value: 'colima', text: 'Colima' },
                { value: 'chiapas', text: 'Chiapas' },
                { value: 'chihuahua', text: 'Chihuahua' },
                { value: 'cdmx', text: 'Ciudad de México' },
                { value: 'durango', text: 'Durango' },
                { value: 'guanajuato', text: 'Guanajuato' },
                { value: 'guerrero', text: 'Guerrero' },
                { value: 'hidalgo', text: 'Hidalgo' },
                { value: 'jalisco', text: 'Jalisco' },
                { value: 'mexico', text: 'Estado de México' },
                { value: 'michoacan', text: 'Michoacán' },
                { value: 'morelos', text: 'Morelos' },
                { value: 'nayarit', text: 'Nayarit' },
                { value: 'nuevo_leon', text: 'Nuevo León' },
                { value: 'oaxaca', text: 'Oaxaca' },
                { value: 'puebla', text: 'Puebla' },
                { value: 'queretaro', text: 'Querétaro' },
                { value: 'quintana_roo', text: 'Quintana Roo' },
                { value: 'san_luis_potosi', text: 'San Luis Potosí' },
                { value: 'sinaloa', text: 'Sinaloa' },
                { value: 'sonora', text: 'Sonora' },
                { value: 'tabasco', text: 'Tabasco' },
                { value: 'tamaulipas', text: 'Tamaulipas' },
                { value: 'tlaxcala', text: 'Tlaxcala' },
                { value: 'veracruz', text: 'Veracruz' },
                { value: 'yucatan', text: 'Yucatán' },
                { value: 'zacatecas', text: 'Zacatecas' },
            ],
            namePet: '',
            location: '',
            typePet: '',
            race: '',
            personality: '',
            sex: '',
            size: '',
            weight: '',
            age: '',
            color: '',
            sterilized: false,
            description: '',
            imageFiles: [],
            sexOptions: [
                { value: '', text: 'Seleccionar' },
                { value: 'macho', text: 'Macho' },
                { value: 'hembra', text: 'Hembra' },
            ],
            sizes: [
                { value: '', text: 'Seleccionar' },
                { value: 'chico', text: 'Chico' },
                { value: 'mediano', text: 'Mediano' },
                { value: 'grande', text: 'Grande' },
            ],
            namePetState: null,
            locationState: null,
            typePetState: null,
            raceState: null,
            personalityState: null,
            sexState: null,
            sizeState: null,
            weightState: null,
            ageState: null,
            colorState: null,
            sterilizedState: null,
            descriptionState: null,
            imageFilesState: null,
            typePets: [],
            typePetState: null,
            races: [],
            personalities: [],
        };
    },
    created() {
        this.onGetAllType();
        this.onGetAllRace();
        this.onGetAllPersonality();

    },
    methods: {
        async onGetAllType() {
            try {
                const types = await services.onGetAllTypeRegister();
                this.typePets = types;
            } catch (error) {
                console.error("Error al obtener tipos:", error);
            }
        },
        async onGetAllRace() {
            try {
                const race = await services.onGetAllRaceRegister();
                this.races = race;
            } catch (error) {
                console.error("Error al obtener tipos:", error);
            }
        },
        async onGetAllPersonality() {
            try {
                const personality = await services.onGetAllPersonalityRegister();
                this.personalities = personality;
            } catch (error) {
                console.error("Error al obtener tipos:", error);
            }
        },
        async onSubmit() {
            try {
                const formData = new FormData();

                formData.append('namePet', this.namePet);
                formData.append('location', this.location);
                formData.append('typePet', this.typePet);
                formData.append('race', this.race);
                formData.append('personality', this.personality);
                formData.append('sex', this.sex);
                formData.append('size', this.size);
                formData.append('weight', this.weight);
                formData.append('age', this.age);
                formData.append('color', this.color);
                formData.append('sterilized', this.sterilized);
                formData.append('description', this.description);

                for (let i = 0; i < this.imageFiles.length; i++) {
                    formData.append('imageFiles', this.imageFiles[i]);
                }

                const response = await axios.post('URL_DEL_ENDPOINT', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    this.showModal = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El formulario se envió correctamente.'
                    });

                    this.clearForm();
                } else {
                    throw new Error('El servidor respondió con un código de estado incorrecto.');
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo más tarde.'
                });
            }
        },
        validateNamePet() {
            const regex = /^[a-zA-Z\s]+$/;
            const isValid = regex.test(this.namePet) && this.namePet.length >= 4;
            this.namePetState = isValid;
        },
        validateLocation() {
            const isValid = this.location !== '';
            this.locationState = isValid;
        },
        validateTypePet() {
            const isValid = this.typePet !== '';
            this.typePetState = isValid;
        },
        validateRace() {
            const isValid = this.race !== '';
            this.raceState = isValid;
        },
        validatePersonality() {
            const isValid = this.personalities !== '';
            this.personalityState = isValid;
        },
        validateSex() {
            const isValid = this.sex !== '';
            this.sexState = isValid;
        },
        validateSize() {
            const isValid = this.size !== '';
            this.sizeState = isValid;
        },
        validateWeight() {
            const isValid = this.weight >= 0.5 && this.weight <= 70;
            this.weightState = isValid;
        },
        validateAge() {
            const isValid = this.age >= 1 && this.age <= 30;
            this.ageState = isValid;
        },

        validateColor() {
            const regex = /^[a-zA-Z\s]+$/;
            const isValid = regex.test(this.color);
            this.colorState = isValid;
        },
        validateSterilized() {
            const isValid = typeof this.sterilized === 'boolean';
            this.sterilizedState = isValid;
        },
        validateDescription() {
            const wordCount = this.description.split(' ').length;
            const isValid = wordCount >= 50 && wordCount <= 250;
            this.descriptionState = isValid;
        },
        validateImageFiles() {
            const fileCount = this.imageFiles.length;
            const fileSizesValid = this.imageFiles.every(file => file.size <= 10 * 1024 * 1024);
            this.imageFilesState = fileSizesValid;
        }
        ,
    }

};
</script>

<style scoped></style>