<template>
    <b-container fluid class="d-flex justify-content-center mt-4">
      <b-card title="Registro de Animales" style="width: 100%; max-width: 600px;">
        <b-form @submit.prevent="handleSubmit">
          <b-row>
            <b-col md="6">
              <!-- Campo Nombre -->
              <b-form-group
                label="Nombre"
                label-for="nombre"
                class="mb-3"
                invalid-feedback="El nombre es obligatorio."
                :state="formState.nombre"
              >
                <b-form-input
                  id="nombre"
                  v-model="formData.nombre"
                  required
                  @blur="validateField('nombre')"
                ></b-form-input>
              </b-form-group>
  
              <!-- Campo Tipo de Mascota -->
              <b-form-group
                label="Tipo de Mascota"
                label-for="tipo"
                class="mb-3"
                invalid-feedback="Este campo es obligatorio."
                :state="formState.tipo"
              >
                <b-form-input
                  id="tipo"
                  v-model="formData.tipo"
                  required
                  @blur="validateField('tipo')"
                ></b-form-input>
              </b-form-group>
  
              <!-- Campo Raza -->
              <b-form-group
                label="Raza"
                label-for="raza"
                class="mb-3"
                invalid-feedback="Este campo es obligatorio."
                :state="formState.raza"
              >
                <b-form-input
                  id="raza"
                  v-model="formData.raza"
                  required
                  @blur="validateField('raza')"
                ></b-form-input>
              </b-form-group>
  
              <!-- Campo Edad -->
              <b-form-group
                label="Edad"
                label-for="edad"
                class="mb-3"
                invalid-feedback="Por favor, selecciona la edad."
                :state="formState.edad"
              >
                <b-form-select
                  id="edad"
                  v-model="formData.edad"
                  :options="edades"
                  required
                  @change="validateField('edad')"
                ></b-form-select>
              </b-form-group>
  
              <!-- Campo Sexo -->
              <b-form-group
                label="Sexo"
                label-for="sexo"
                class="mb-3"
                invalid-feedback="Por favor, selecciona el sexo."
                :state="formState.sexo"
              >
                <b-form-select
                  id="sexo"
                  v-model="formData.sexo"
                  :options="sexos"
                  required
                  @change="validateField('sexo')"
                ></b-form-select>
              </b-form-group>
  
              <!-- Campo Color -->
              <b-form-group
                label="Color"
                label-for="color"
                class="mb-3"
                invalid-feedback="El color es obligatorio."
                :state="formState.color"
              >
                <b-form-input
                  id="color"
                  v-model="formData.color"
                  required
                  @blur="validateField('color')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            
            <b-col md="6">
              <!-- Campo Tamaño -->
              <b-form-group
                label="Tamaño"
                label-for="tamano"
                class="mb-3"
                invalid-feedback="Por favor, selecciona el tamaño."
                :state="formState.tamano"
              >
                <b-form-select
                  id="tamano"
                  v-model="formData.tamano"
                  :options="tamanos"
                  required
                  @change="validateField('tamano')"
                ></b-form-select>
              </b-form-group>
  
              <!-- Campo Personalidad -->
              <b-form-group
                label="Personalidad"
                label-for="personalidad"
                class="mb-3"
                invalid-feedback="La personalidad es obligatoria."
                :state="formState.personalidad"
              >
                <b-form-input
                  id="personalidad"
                  v-model="formData.personalidad"
                  required
                  @blur="validateField('personalidad')"
                ></b-form-input>
              </b-form-group>
  
              <!-- Campo Sociable -->
              <b-form-group
                label="Sociable"
                label-for="sociable"
                class="mb-3"
                invalid-feedback="Debes seleccionar si es sociable o no."
                :state="formData.sociable !== null"
              >
                <b-form-checkbox
                  id="sociable"
                  v-model="formData.sociable"
                  switch
                >
                  Sí
                </b-form-checkbox>
              </b-form-group>
  
              <!-- Campo Esterilizado -->
              <b-form-group
                label="Esterilizado"
                label-for="esterilizado"
                class="mb-3"
                invalid-feedback="Debes seleccionar si está esterilizado o no."
                :state="formData.esterilizado !== null"
              >
                <b-form-checkbox
                  id="esterilizado"
                  v-model="formData.esterilizado"
                  switch
                >
                  Sí
                </b-form-checkbox>
              </b-form-group>
  
              <!-- Campo Localización -->
              <b-form-group
                label="Localización"
                label-for="localizacion"
                class="mb-3"
                invalid-feedback="Por favor, selecciona la localización."
                :state="formState.localizacion"
              >
                <b-form-select
                  id="localizacion"
                  v-model="formData.localizacion"
                  :options="localizaciones"
                  required
                  @change="validateField('localizacion')"
                ></b-form-select>
              </b-form-group>
  
              <!-- Campo Imágenes -->
              <b-form-group
                label="Imágenes"
                label-for="imagenes"
                class="mb-3"
                invalid-feedback="Solo puedes subir hasta 5 imágenes con un total de 15 MB."
                :state="imagesState"
              >
                <b-form-file
                  id="imagenes"
                  v-model="formData.imagenes"
                  multiple
                  accept="image/*"
                  @change="validateImages"
                  required
                ></b-form-file>
              </b-form-group>
            </b-col>
          </b-row>
  
          <b-row class="mt-3">
            <b-col class="text-center">
              <b-button type="submit" variant="primary" :disabled="!formValid">
                Enviar
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          nombre: '',
          tipo: '',
          raza: '',
          edad: '',
          sexo: '',
          color: '',
          tamaño: '',
          personalidad: '',
          sociable: false,
          esterilizado: false,
          localización: '',
          imagenes: null,
        },
        sexos: [
          { value: '', text: 'Seleccionar' },
          { value: 'macho', text: 'Macho' },
          { value: 'hembra', text: 'Hembra' },
        ],
        edades: [
          { value: '', text: 'Seleccionar' },
          { value: 'cachorro', text: 'Cachorro' },
          { value: 'adulto', text: 'Adulto' },
          { value: 'adulto_mayor', text: 'Adulto mayor' },
        ],
        tamanos: [
          { value: '', text: 'Seleccionar' },
          { value: 'chico', text: 'Chico' },
          { value: 'mediano', text: 'Mediano' },
          { value: 'grande', text: 'Grande' },
        ],
        localizaciones: [
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
        formState: {
          nombre: null,
          tipo: null,
          raza: null,
          edad: null,
          sexo: null,
          color: null,
          tamaño: null,
          personalidad: null,
          localizacion: null,
        },
        imagesState: null,
        formValid: false,
      };
    },
    methods: {
      handleSubmit() {
        // Lógica de manejo de envío de formulario
        console.log(this.formData);
      },
      validateField(field) {
        this.formState[field] = this.formData[field] ? true : false;
        this.validateForm();
      },
      validateImages() {
        const files = this.formData.imagenes;
        if (!files || files.length === 0) {
          this.imagesState = false;
          return;
        }
  
        let totalSize = 0;
        for (const file of files) {
          totalSize += file.size;
        }
  
        // Convertir bytes a MB
        const totalSizeMB = totalSize / (1024 * 1024);
  
        // Validar condiciones de imágenes
        this.imagesState = files.length <= 5 && totalSizeMB <= 15;
  
        this.validateForm();
      },
      validateForm() {
        this.formValid = this.imagesState && Object.values(this.formState).every((state) => state);
      },
    },
  };
  </script>
  