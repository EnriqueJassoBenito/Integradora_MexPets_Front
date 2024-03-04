<template>
    <div class="main-container">
        <div class="row">
            <div class="registration-container">
                <div class="row mb-3">
                    <h1>Registro del animal</h1>
                    <p>
                        Para asegurar el bienestar del animalito y cumplir con los estándares de adopción responsables,
                        es fundamental cumplir con ciertos requisitos como la estirilización y desparasitación.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-group class="mb-3" label="Nombre de la Mascota" label-for="petName">
                            <b-form-input id="petName" v-model="pet.name"></b-form-input>
                        </b-form-group>

                        <b-form-group class="mb-3" label="Tipo de Mascota">
                            <b-form-select v-model="pet.type" :options="petTypes"></b-form-select>
                        </b-form-group>

                        <b-form-group class="mb-3" label="Localización" label-for="location">
                            <b-form-input id="location" v-model="pet.location"></b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <div class="row mb-3">
                                <div  class="col-md-6">
                                    <label for="petBreed" class="form-label">Raza:</label>
                                    <b-form-select id="petBreed" v-model="pet.breed" :options="breeds"></b-form-select>
                                </div>
                                <div class="col-md-6">
                                    <label for="petSize" class="form-label">Tamaño:</label>
                                    <b-form-select id="petSize" v-model="pet.size" :options="sizes"></b-form-select>
                                </div>
                            </div>
                        </b-form-group>

                        <b-form-group class="mb-3" label="Edad">
                            <b-form-input type="number" v-model="pet.age"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Sexo">
                            <b-form-radio-group v-model="pet.gender">
                                <b-form-radio value="Female">Hembra</b-form-radio>
                                <b-form-radio value="Male">Macho</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                    </div>

                    <!-- Segunda mitad del formulario -->
                    <div class="col-md-6">
                        <b-form-group class="mb-3" label="Breve Descripción" label-for="description">
                            <b-form-textarea id="description" v-model="pet.description"></b-form-textarea>
                        </b-form-group>

                        <b-form-group class="mb-3" label="Color">
                            <b-form-select v-model="pet.color" :options="colors"></b-form-select>
                        </b-form-group>

                        <b-form-group class="mb-4" label="Esterilización">
                            <b-form-radio-group v-model="pet.spayed">
                                <b-form-radio value="Yes">Sí</b-form-radio>
                                <b-form-radio value="No">No</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>

                        <b-form-group class="mb-3" label="Subir Imágenes" label-for="imageUpload">
                            <b-form-file
                                id="imageUpload"
                                v-model="pet.images"
                                accept="image/*"
                                placeholder="Seleccione una imagen"
                                drop-placeholder="Coloque la imagen aquí"
                            ></b-form-file>
                        </b-form-group>
                        
                        <b-button @click="submitForm" variant="primary">Aceptar</b-button>
                    </div>
                </div>


            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pet: {
                name: '',
                type: '',
                location: '',
                breed: '',
                size: '',
                age: 0,
                gender: '',
                description: '',
                color: '',
                spayed: '',
                images: [] // Aquí puedes almacenar las imágenes seleccionadas
            },
            petTypes: ['Dog', 'Cat', 'Other'],
            breeds: ['Breed 1', 'Breed 2', 'Breed 3'],
            sizes: ['Small', 'Medium', 'Large'],
            colors: ['White', 'Black', 'Brown']
        };
    },
    methods: {
        submitForm() {
            // Aquí puedes manejar la lógica para enviar el formulario
            console.log('Formulario enviado:', this.pet);
        }
    }
};
</script>

<style scoped>
.main-container {
    text-align: center;
}

.registration-container {
    align-items: center;
    margin: 50px auto;
    max-width: 800px;
    /* Ajusta el ancho máximo según tus necesidades */
    text-align: left;
}

.registration-header {
    max-width: 800px;
    margin: 0 auto;
}
</style>