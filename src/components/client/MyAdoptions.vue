<template>
  <b-container fluid>
    <div class="loading-overlay is-active" v-if="isLoading">
      <div class="custom-loader"></div>
    </div>
    <b-row class="mt-2">
      <b-col cols="12" sm="6" md="4" lg="3" v-for="animal in animalApproval" :key="animal.id" class="mb-4">
        <b-card :title="animal.namePet" tag="article" :footer="getStatusFooter(animal.approvalStatus)"
          :footer-bg-variant="getFooterColor(animal.approvalStatus)" footer-border-variant="dark">
          <b-row>
            <b-col cols="5">
              <img :src="animal.images[0].imageUrl" :alt="animal.namePet" class="img-fluid" style="max-height: 150px" />
            </b-col>
            <b-col cols="7">
              <b-card-text>
                <p><strong>Ubicación:</strong> {{ animal.location }}</p>
                <p><strong>Tipo:</strong> {{ animal.typePet.type }}</p>
                <p><strong>Raza:</strong> {{ animal.race.racePet }}</p>
                <p><strong>Sexo:</strong> {{ animal.sex }}</p>
              </b-card-text>
              <b-button @click="openModal(animal)" variant="primary" class="float-right mb-2 mr-2">
                <b-icon icon="chat" aria-hidden="true"></b-icon>
              </b-button>
              <b-button @click="openImageUploadModal(animal)" variant="warning" class="float-right mb-2 mr-2"
              v-if="animal.approvalStatus !== 'APPROVED'">
                <b-icon icon="arrow-counterclockwise" animation="spin-reverse" font-scale="1"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-modal ref="myModalRef" hide-footer title="Detalles de la mascota" header-bg-variant="success">
      <b-row class="mb-3">
        <b-col cols="12">
          <b-carousel controls indicators style="max-height: 300px; overflow: hidden">
            <b-carousel-slide v-for="(image, index) in modalData.images" :key="index" :img-src="image.imageUrl"
              :alt="`Slide ${index + 1}`" img-width="300px" img-height="200px"></b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <p><strong>Nombre:</strong> {{ modalData.namePet }}</p>
          <p><strong>Características:</strong></p>
          <div class="characteristics mb-2">
            <b-row>
              <b-col cols="6">
                <div>
                  <strong>Localización:</strong> {{ modalData.location }}
                </div>
                <div><strong>Tipo:</strong> {{ modalData.typePet.type }}</div>
                <div><strong>Raza:</strong> {{ modalData.race.racePet }}</div>
                <div>
                  <strong>Personalidad:</strong>
                  {{ modalData.personality.personalityPet }}
                </div>
                <div><strong>Sexo:</strong> {{ modalData.sex }}</div>
              </b-col>
              <b-col cols="6">
                <div><strong>Tamaño:</strong> {{ modalData.size }}</div>
                <div><strong>Peso:</strong> {{ modalData.weight }}</div>
                <div><strong>Edad:</strong> {{ modalData.age }}</div>
                <div><strong>Color:</strong> {{ modalData.color }}</div>
                <div>
                  <strong>Esterilizado:</strong>
                  {{ modalData.sterilized ? "Sí" : "No" }}
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="mt-4">
            <p><strong>Retroalimentación del moderador:</strong></p>
            <b-form-textarea id="textarea" v-model="modalData.moderatorComment" placeholder="Retroalimentación..."
              rows="3" max-rows="6" readonly></b-form-textarea>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="12" class="d-flex justify-content-end">
          <b-button variant="secondary" @click="closeModal">Cerrar</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal ref="imageUploadModal" hide-footer title="Editar registro">
      <b-form class="mb-4">
        <b-form-group label="Nombre de la mascota:" label-for="namePetInput">
          <b-form-input id="namePetInput" v-model="modalData.namePet" required></b-form-input>
        </b-form-group>
        <b-form-group label="Localización:" label-for="location">
          <b-form-select id="location" v-model="modalData.location" :options="locations" required />
        </b-form-group>
        <b-row>
          <b-col md="6">
            <b-form-group label="Tipo de mascota:" label-for="typePet">
              <b-form-select id="typePet" v-model="modalData.typePet" :options="typePets.map((type) => ({ value: type.id, text: type.name }))
                " required /> </b-form-group>
            <b-form-group label="Raza:" label-for="race">
              <b-form-select id="race" v-model="modalData.race" :options="races.map((race) => ({ value: race.id, text: race.name }))
                " required /> </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Personalidad:" label-for="personality">
              <b-form-select id="personality" v-model="modalData.personality" :options="personalities.map((personality) => ({
                value: personality.id,
                text: personality.name
              }))" required />
            </b-form-group>
            <b-form-group label="Sexo:" label-for="sex">
              <b-form-select id="sex" v-model="modalData.sex" :options="sexOptions" required /> </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group label="Tamaño:" label-for="size">
              <b-form-select id="size" v-model="modalData.size" :options="sizes" required /> </b-form-group>
            <b-form-group label="Peso:" label-for="weight">
              <b-form-input id="weightInput" min="0.5" max="70" v-model="modalData.weight" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Edad:" label-for="age">
              <b-form-input type="number" id="ageInput" min="1" max="30" v-model="modalData.age"
                required></b-form-input>
            </b-form-group>
            <b-form-group label="Color:" label-for="color">
              <b-form-input id="colorInput" v-model="modalData.color" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Esterilizado:" label-for="sterilized">
          <b-form-checkbox id="sterilized" v-model="modalData.sterilized" switch>
            Sí</b-form-checkbox>
        </b-form-group>
        <b-form-group label="Descripción:" label-for="description">
          <b-form-textarea id="description" v-model="modalData.description" required /> </b-form-group>
        <b-form-file id="imageFiles" v-model="imageFiles" multiple accept="image/*" @change="validateImageFiles"
          required :class="{ 'is-invalid': !imageFilesState }" />
      </b-form>
      <b-button type="submit" variant="primary" @click="onUpdateAnimal">Guardar</b-button>
      <b-button variant="secondary" @click="closeImageUploadModal">Cancelar</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import service from "../../service/AnimalService.js";
import adopService from "../../service/Adoption.js";
import servicesPet from "../../service/CategoryService";
import Swal from "sweetalert2";
const userId = sessionStorage.getItem("userId");

export default {
  data() {
    return {
      isLoading: false,
      animalApproval: [],
      modalData: {
        id: "",
        namePet: "",
        location: "",
        typePet: "",
        race: "",
        personality: "",
        sex: "",
        size: "",
        weight: "",
        age: "",
        color: "",
        sterilized: false,
        description: "",
        images: [],
        approvalStatus: "",
        moderatorComment: "",
        register: ""
      },
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
      animal: null,
      description: "",
      imageFiles: [],
      imageFilesState: null,
      animal: "",
      adopter: "",
      description: "",
      creationDate: "",
      status: "",
      selectedAnimalId: "",
      typePets: [],
      races: [],
      personalities: [],
    };
  },
  mounted() {
    this.onGetAllAni();
    this.onGetAllType();
    this.onGetAllRace();
    this.onGetAllPersonality();
  },
  methods: {
    async onGetAllAni() {
      try {
        const userIdData = localStorage.getItem("authUser");
        if (userIdData) {
          const currentUserData = JSON.parse(userIdData);
          const userId = currentUserData.user.id; // ID de usuario que inició sesión
          const animals = await service.onGetAnimalsByUser(userId); // Obtener animales por usuario
          console.log("Animales obtenidos:", animals);
          this.animalApproval = animals;
        } else {
          console.error("No se encontró información de usuario en localStorage");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró información de usuario en localStorage",
          });
        }
        this.sterilized = false;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        Swal.fire({
          icon: "info",
          title: "Sin registros",
        });
      }
    },
    async onUpdateAnimal() {
      try {
        
        const animalId = this.modalData.id;
        const animalDto = {
          id: animalId,
          namePet: this.modalData.namePet,
          location: this.modalData.location,
          typePet: this.modalData.typePet,
          race: this.modalData.race,
          personality: this.modalData.personality,
          sex: this.modalData.sex,
          size: this.modalData.size,
          weight: this.modalData.weight,
          age: this.modalData.age,
          color: this.modalData.color,
          sterilized: this.modalData.sterilized,
          description: this.modalData.description,
          images: this.modalData.images.map(image => ({ url: image.url, name: image.name })),
          approvalStatus: this.modalData.approvalStatus,
          moderatorComment: this.modalData.moderatorComment,
          register: this.modalData.register.id,
        };
        const response = await service.onUpdateAnimal(animalId, animalDto, this.imageFiles);
        console.log("Animal actualizado:", response);
        this.$refs.imageUploadModal.hide();
      } catch (error) {
        console.error("Error al actualizar el animal:", error);
      }
    },
    async onGetAllType() {
      try {
        const types = await servicesPet.onGetAllTypeRegister();
        this.typePets = types;
      } catch (error) {
        console.error("Error al obtener tipos:", error);
      }
    },
    async onGetAllRace() {
      try {
        const race = await servicesPet.onGetAllRaceRegister();
        this.races = race;
      } catch (error) {
        console.error("Error al obtener tipos:", error);
      }
    },
    async onGetAllPersonality() {
      try {
        const personality = await servicesPet.onGetAllPersonalityRegister();
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
    openImageUploadModal(animal) {
      this.imageFiles = [];
      this.imageFilesState = null;
      this.modalData = { ...animal };
      this.$refs.imageUploadModal.show();
    },
    closeImageUploadModal() {
      this.$refs.imageUploadModal.hide();
      this.description = "";
      this.imageFiles = [];
      this.imageFilesState = null;
    },
    openModal(animal) {
      this.modalData = { ...animal };
      this.$refs.myModalRef.show();
    },
    closeModal() {
      this.$refs.myModalRef.hide();
    },
    getStatusTranslation(status) {
      switch (status) {
        case "PENDING":
          return "Pendiente";
        case "APPROVED":
          return "Aprobado";
        case "REJECT":
          return "Rechazado";
        default:
          return "Desconocido";
      }
    },
    getStatusFooter(approvalStatus) {
      return 'Estado: ' + this.getStatusTranslation(approvalStatus);
    },
    getFooterColor(approvalStatus) {
      switch (approvalStatus) {
        case "PENDING":
          return "warning"; // Amarillo
        case "APPROVED":
          return "success"; // Verde
        default:
          return "light"; // Otros colores o ninguno
      }
    },
    validateImageFiles() {
      const fileCount = this.imageFiles.length;
      const fileSizesValid = this.imageFiles.every(
        (file) => file.size <= 10 * 1024 * 1024
      );
      const fileTypesValid = this.imageFiles.every((file) =>
        file.type.startsWith("image/")
      );
      this.imageFilesState =
        fileCount >= 1 && fileCount <= 5 && fileSizesValid && fileTypesValid;
    },
  },
};
</script>

<style>
.b-card {
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.b-card-img-top {
  object-fit: cover;
  height: 100px;
}

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

.section {
  text-align: center;
  margin-bottom: 20px;
}

.section-title {
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.characteristics {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
</style>