<template>
  <b-container fluid class="d-flex justify-content-center mt-4">
    <div class="loading-overlay is-active" v-if="isLoading">
      <div class="custom-loader"></div>
    </div>
    <div title="Registro de Animales" style="width: 100%; max-width: 900px">
      <h1>Dar en adopción</h1>
      <b-form>
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
              <b-form-select id="typePet" v-model="typePet" :options="typePets.map((type) => ({ value: type.id, text: type.name }))
                " required />
            </b-form-group>
            <b-form-group label="Raza" label-for="race"
              invalid-feedback="Por favor, selecciona una raza existente en la lista desplegable." :state="raceState">
              <b-form-select id="race" v-model="race" :options="races.map((race) => ({ value: race.id, text: race.name }))
                " required />
            </b-form-group>
            <b-form-group label="Personalidad" label-for="personality"
              invalid-feedback="Por favor, selecciona una personalidad existente en la lista desplegable."
              :state="personalityState">
              <b-form-select id="personality" v-model="personality" :options="personalities.map((personality) => ({
                value: personality.id,
                text: personality.name,
              }))
                " required />
            </b-form-group>
            <b-form-group label="Sexo" label-for="sex"
              invalid-feedback="Por favor, selecciona un sexo existente en la lista desplegable." :state="sexState"
              required>
              <b-form-select id="sex" v-model="sex" :options="sexOptions" required />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Tamaño" label-for="size"
              invalid-feedback="Por favor, selecciona un tamaño existente en la lista desplegable." :state="sizeState">
              <b-form-select id="size" v-model="size" :options="sizes" required />
            </b-form-group>
            <b-form-group label="Peso" label-for="weight"
              invalid-feedback="El peso del animal debe ser mayor o igual a 0.5 y menor o igual a 70 kg."
              :state="weightState">
              <b-form-input id="weight" type="number" v-model="weight" min="0.5" max="70" required />
            </b-form-group>
            <b-form-group label="Edad" label-for="age"
              invalid-feedback="La edad debe ser mayor o igual a 1 y menor o igual a 30." :state="ageState">
              <b-form-input id="age" type="number" v-model="age" min="1" max="30" required @input="validateAge" />
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
              <b-form-file id="imageFiles" v-model="imageFiles" multiple accept="image/*" @change="validateImageFiles"
                required :class="{ 'is-invalid': !imageFilesState }" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col md="6" class="text-center">
            <b-button type="submit" variant="success" @click="onSubmit">
              Registrar
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-container>
</template>
<script>
import services from "../../service/CategoryService";
import petService from "../../service/AnimalService";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      petService: petService,
      isLoading: false,
      locations: [
        { value: "", text: "Seleccionar" },
        { value: "aguascalientes", text: "Aguascalientes" },
        { value: "baja_california", text: "Baja California" },
        { value: "baja_california_sur", text: "Baja California Sur" },
        { value: "campeche", text: "Campeche" },
        { value: "coahuila", text: "Coahuila" },
        { value: "colima", text: "Colima" },
        { value: "chiapas", text: "Chiapas" },
        { value: "chihuahua", text: "Chihuahua" },
        { value: "cdmx", text: "Ciudad de México" },
        { value: "durango", text: "Durango" },
        { value: "guanajuato", text: "Guanajuato" },
        { value: "guerrero", text: "Guerrero" },
        { value: "hidalgo", text: "Hidalgo" },
        { value: "jalisco", text: "Jalisco" },
        { value: "mexico", text: "Estado de México" },
        { value: "michoacan", text: "Michoacán" },
        { value: "morelos", text: "Morelos" },
        { value: "nayarit", text: "Nayarit" },
        { value: "nuevo_leon", text: "Nuevo León" },
        { value: "oaxaca", text: "Oaxaca" },
        { value: "puebla", text: "Puebla" },
        { value: "queretaro", text: "Querétaro" },
        { value: "quintana_roo", text: "Quintana Roo" },
        { value: "san_luis_potosi", text: "San Luis Potosí" },
        { value: "sinaloa", text: "Sinaloa" },
        { value: "sonora", text: "Sonora" },
        { value: "tabasco", text: "Tabasco" },
        { value: "tamaulipas", text: "Tamaulipas" },
        { value: "tlaxcala", text: "Tlaxcala" },
        { value: "veracruz", text: "Veracruz" },
        { value: "yucatan", text: "Yucatán" },
        { value: "zacatecas", text: "Zacatecas" },
      ],
      namePet: "",
      location: "",
      typePet: "",
      race: "",
      personality: "",
      sex: "",
      size: "",
      weight: '',
      age: '',
      color: "",
      sterilized: false,
      description: "",
      imageFiles: [],
      sexOptions: [
        { value: "", text: "Seleccionar" },
        { value: "macho", text: "Macho" },
        { value: "hembra", text: "Hembra" },
      ],
      sizes: [
        { value: "", text: "Seleccionar" },
        { value: "chico", text: "Chico" },
        { value: "mediano", text: "Mediano" },
        { value: "grande", text: "Grande" },
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
    this.loadData();
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
    async loadData() {
      try {
        await this.onGetAllType();
        await this.onGetAllRace();
        await this.onGetAllPersonality();
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    },
    async onSubmit() {
      const userId = localStorage.getItem("authUser");
      if (!userId) {
        Swal.fire({
          icon: "warning",
          title: "Inicia Sesión o Regístrate",
          text: "Debes iniciar sesión o crear una cuenta para registrar animales.",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ir a Iniciar Sesión',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.$router.push({ name: 'login' });
          }
        });
        return;
      }

      const currentUserData = JSON.parse(userId);
      console.log("Usuario actual ID: " + currentUserData.user.id);

      if (currentUserData.user.rol.nrol !== "CLIENTE") {
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "Solo los usuarios con rol de cliente pueden registrar animales.",
        });
        return;
      }
      if (!this.namePet || !this.location || !this.typePet || !this.race || !this.personality || !this.sex || !this.size || !this.weight || !this.age || !this.color || !this.description) {
        Swal.fire({
          icon: "warning",
          title: "Campos Vacíos",
          text: "Por favor completa todos los campos para registrar la mascota.",
        });
        return;
      }
      try {
        this.isLoading = true;
        console.log("id: " + this.typePet);
        const animalDto = {
          namePet: this.namePet,
          location: this.location,
          typePet: this.typePet,
          race: this.race,
          personality: this.personality,
          sex: this.sex,
          size: this.size,
          weight: this.weight,
          age: this.age,
          color: this.color,
          sterilized: this.sterilized,
          description: this.description,
          approvalStatus: "PENDING",
          moderatorComment: "",
          register: null,
        };
        console.log(this.age);
        if (userId) {
          const currentUserData = JSON.parse(userId);
          animalDto.register = currentUserData.user.id;
          console.log("id: " + currentUserData.user.id);
        }

        console.log("id: " + animalDto.register);
        const response = await this.petService.onInsertAnimal(
          animalDto,
          this.imageFiles
        );
        this.namePet = "";
        this.location = "";
        this.typePet = "";
        this.race = "";
        this.personality = "";
        this.sex = "";
        this.size = "";
        this.weight = "";
        this.age = "";
        this.color = "";
        this.sterilized = false;
        this.description = "";
        this.imageFiles = [];
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Mascota agregada correctamente: ",
        });
      } catch (error) {
        console.error("Error al registrar mascota:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al registrar mascota: ",
        });
      } finally {
        this.isLoading = false;
      }
    },
    validateNamePet() {
      const regex = /^[a-zA-Z\s]+$/;
      const isValid = regex.test(this.namePet) && this.namePet.length >= 4;
      this.namePetState = isValid;
    },
    validateLocation() {
      const isValid = this.location !== "";
      this.locationState = isValid;
    },
    validateTypePet() {
      const isValid = this.typePet !== "";
      this.typePetState = isValid;
    },
    validateRace() {
      const isValid = this.race !== "";
      this.raceState = isValid;
    },
    validatePersonality() {
      const isValid = this.personalities !== "";
      this.personalityState = isValid;
    },
    validateSex() {
      const isValid = this.sex !== null;
      this.sexState = isValid;
    },
    validateSize() {
      const isValid = this.size !== "";
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
      const isValid = typeof this.sterilized === "boolean";
      this.sterilizedState = isValid;
    },
    validateDescription() {
      const wordCount = this.description.split(" ").length;
      const isValid = wordCount >= 50 && wordCount <= 250;
      this.descriptionState = isValid;
    },
    validateImageFiles() {
      const fileCount = this.imageFiles.length;
      const fileSizesValid = this.imageFiles.every(
        (file) => file.size <= 10 * 1024 * 1024
      );
      const fileTypesValid = this.imageFiles.every(
        (file) => file.type.startsWith('image/')
      );
      this.imageFilesState = fileCount >= 3 && fileCount <= 5 && fileSizesValid && fileTypesValid;
    },
  },
};
</script>

<style scoped>
.loading-overlay {
  display: none;
  background: rgba(255, 255, 255, 0.708);
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
  color: #f0bb00;
  background: radial-gradient(farthest-side,
      currentColor calc(100% - 6px),
      #0000 calc(100% - 5px) 0);
  -webkit-mask: radial-gradient(farthest-side,
      #0000 calc(100% - 13px),
      #000 calc(100% - 12px));
  border-radius: 50%;
  animation: s9 2s infinite linear;
}

.custom-loader::before,
.custom-loader::after {
  content: "";
  grid-area: 1/1;
  background: linear-gradient(currentColor 0 0) center,
    linear-gradient(currentColor 0 0) center;
  background-size: 100% 10px, 10px 100%;
  background-repeat: no-repeat;
}

.custom-loader::after {
  transform: rotate(45deg);
}

@keyframes s9 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
