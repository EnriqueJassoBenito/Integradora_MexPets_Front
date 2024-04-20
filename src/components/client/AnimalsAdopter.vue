<template>
  <div class="adopt">
    <div class="loading-overlay is-active" v-if="isLoading">
      <div class="custom-loader"></div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="card" style="margin-top: 20px; max-width: 1000px">
        <div class="row no-gutters">
          <div class="col-md-2">
            <img src="../../assets/logomexx.png" class="card-img" style="width: 100%" />
          </div>
          <div class="col-md-3 p-0 d-flex justify-content-start align-items-center" style="color: #ffde59">
            <p class="card-text" style="font-size: 1.5rem; font-weight: bold">
              Encuentra al nuevo integrante de la familia
            </p>
          </div>
          <div class="col-md-7">
            <div id="form-select" style="margin: 15px">
              <div class="row">
                <div class="col-md-4">
                  <b-form-select id="race" v-model="serchBRace"
                    :options="races.map((race) => ({ value: race.id, text: race.name }))" required />
                </div>
                <div class="col-md-4">
                  <b-form-select id="personality" v-model="serchBPersonality" :options="personalities.map((personality) => ({
                    value: personality.id,
                    text: personality.name,
                  }))" required />
                </div>

                <div class="col-md-4">
                  <b-form-select id="typePet" v-model="serchBType" :options="typePets.map((type) => ({
                    value: type.id,
                    text: type.name,
                  }))" required />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select" v-model="serchBSexo">
                    <option :value="null">Sexo</option>
                    <option v-for="gender in genders" :key="gender.id" :value="gender.id">
                      {{ gender.name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select" v-model="serchBEdad">
                    <option :value="null">Edad</option>
                    <option v-for="age in ages" :key="age.id" :value="age.id">
                      {{ age.range }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select" v-model="serchBColor">
                    <option :value="null">Color</option>
                    <option v-for="color in colors" :key="color.id" :value="color.id">
                      {{ color.name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4 d-flex align-items-center justify-content-between" style="margin-top: 15px">
                  <div class="col-md-4 d-flex align-items-center justify-content-between" style="margin-top: 15px">
                    <button class="btn btn-primary" style="margin-right: 15px" @click="buscar()">
                      Buscar
                    </button>
                    <button class="btn btn-secondary" @click="limpiarFiltros">
                      Limpiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-row class="mt-2">
      <b-col cols="12" sm="6" md="4" lg="3" v-for="animal in animalApproval" :key="animal.id" class="mb-4">
        <b-card :title="animal.namePet" tag="article" :footer="getStatusFooter(animal.approvalStatus)"
          :footer-bg-variant="getFooterColor(animal.approvalStatus)" footer-border-variant="dark">
          <b-row>
            <b-col cols="5">
              <img :src="animal.images[0].imageUrl" :alt="animal.namePet" class="img-fluid" style="max-height: 150px;">
            </b-col>
            <b-col cols="7">
              <b-card-text>
                <p><strong>Ubicación:</strong> {{ animal.location }}</p>
                <p><strong>Tipo:</strong> {{ animal.typePet.type }}</p>
                <p><strong>Raza:</strong> {{ animal.race.racePet }}</p>
                <p><strong>Sexo:</strong> {{ animal.sex }}</p>
              </b-card-text>
              <b-button @click="openModal(animal)" variant="primary" class="float-right mb-2 mr-2">
                <b-icon icon="eye" aria-hidden="true"></b-icon>
              </b-button>
              <b-button @click="openImageUploadModal()" variant="success" class="float-right mb-2 mr-2"
                :disabled="disableAdoptionButton">
                <b-icon icon="circle-fill" animation="throb" font-scale="1"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-modal ref="myModalRef" hide-footer title="Detalles de la mascota" header-bg-variant="primary">
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
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="12" class="d-flex justify-content-end">
          <b-button variant="secondary" @click="closeModal">Cerrar</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal ref="imageUploadModal" hide-footer title="Registro de adopción" header-bg-variant="success">
      <b-form @submit.stop="submitForm">
        <b-form-group label="Descripción">
          <b-form-textarea v-model="description" rows="3" placeholder="Descripción de la mascota"></b-form-textarea>
        </b-form-group>

        <b-form-group label="Imágenes" label-for="imageFiles"
          invalid-feedback="Debe insertar un mínimo de 1 imagen y un máximo de 5, y los archivos no deberán ser mayores a 10 MB."
          :state="imageFilesState">
          <b-form-file id="imageFiles" v-model="imageFiles" multiple accept="image/*" @change="validateImageFiles"
            required :class="{ 'is-invalid': !imageFilesState }" />
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled="!imageFilesState">Guardar</b-button>
        <b-button variant="secondary" @click="closeImageUploadModal">Cancelar</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import service from "../../service/AnimalService.js";
import adopService from "../../service/Adoption.js";
import Swal from "sweetalert2";
import servicesPet from "../../service/CategoryService";

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
        sterilized: "",
        description: "",
        images: [],
        approvalStatus: "",
        moderatorComment: "",
        register: "",
      },
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
      serchBType: null,
      serchBRace: null,
      serchBPersonality: null,
      typePets: [],
      typePetState: null,
      races: [],
      personalities: [],
      isLoading: false,
      userId: null,
      resultadosMostrados: [],
      genders: [
        { id: 1, name: "Macho" },
        { id: 2, name: "Hembra" },
      ],
      ages: [
        { id: 1, range: "Cachorro" },
        { id: 2, range: "Joven" },
        { id: 3, range: "Adulto" },
        { id: 4, range: "Mayor" },
      ],
      colors: [
        { id: 1, name: "Negro" },
        { id: 2, name: "Blanco" },
        { id: 3, name: "Marrón" },
        { id: 4, name: "Gris" },
        { id: 5, name: "Rojo" },
        { id: 6, name: "Amarillo" },
      ],
      serchBRace: null,
      serchBPersonality: null,
      serchBType: null,
      serchBSexo: null,
      serchBEdad: null,
      serchBColor: null,
    };
  },
  mounted() {
    this.getApproval();
    const authUserData = JSON.parse(localStorage.getItem("authUser"));
    if (authUserData && authUserData.user && authUserData.user.id) {
      this.userId = authUserData.user.id;
    } else {
      console.error("No se pudo recuperar el ID del usuario.");
    }
  },
  created() {
    this.onGetAllType();
    this.onGetAllRace();
    this.onGetAllPersonality();
  },
  computed: {
    disableAdoptionButton() {
      const authUserData = JSON.parse(localStorage.getItem("authUser"));
      const userId = authUserData?.user?.id;
      return this.modalData.register.id === userId;
    },
  },

  methods: {
    logValues(animalRegister, userId) {
      console.log("Clic en el modal")
      console.log("ID del cliente que adoptó el animal:", animalRegister);
      console.log("ID del usuario que inició sesión:", userId);
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
    async getApproval() {
      try {
        this.isLoading = true;
        const approvedAnimals = await service.onGetApprovedAnimals();
        setTimeout(() => {
          this.animalApproval = approvedAnimals;
          this.isLoading = false;
        }, 2000);
      } catch (error) {
        this.isLoading = false;
      }
    },

    async submitForm() {
      const minDescriptionLength = 10;
      const maxDescriptionLength = 500;
      if (
        this.description.trim() === "" ||
        this.description.length < minDescriptionLength ||
        this.description.length > maxDescriptionLength
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `La descripción debe tener entre ${minDescriptionLength} y ${maxDescriptionLength} caracteres.`,
        });
        return;
      }
      const selectedAnimal = this.animalApproval.find(
        (animal) => animal.id === this.selectedAnimalId
      );

      if (!selectedAnimal) {
        console.error("Animal seleccionado no encontrado en la lista.");
        return;
      }
      const userId = localStorage.getItem("authUser");
      const adoptionDto = {
        animal: selectedAnimal.id,
        adopter: sessionStorage.getItem("userId"),
        description: this.description,
        creationDate: new Date().toISOString().replace(/\.\d{3}Z$/, ""),
        imageFiles: this.imageFiles,
        status: false,
      };
      if (userId) {
        const currentUserData = JSON.parse(userId);
        adoptionDto.adopter = currentUserData.user.id;
      }
      try {
        const insertedAdoption = await adopService.insertAdoption(
          adoptionDto,
          this.imageFiles
        );
        Swal.fire({
          icon: "success",
          text: "Solicitud de adopción registrada correctamente",
        });
        this.closeImageUploadModal();
      } catch (error) {
        console.error("Error al insertar adopción:", error);
      }
    },
    buscar() {
      let resultadosFiltrados = this.animalApproval.slice();
      if (this.serchBRace) {
        resultadosFiltrados = resultadosFiltrados.filter(animal => animal.race.id === this.serchBRace);
      }

      if (this.serchBPersonality) {
        resultadosFiltrados = resultadosFiltrados.filter(animal => animal.personality.id === this.serchBPersonality);
      }

      if (this.serchBType) {
        resultadosFiltrados = resultadosFiltrados.filter(animal => animal.typePet.id === this.serchBType);
      }

      if (this.serchBEdad) {
        resultadosFiltrados = resultadosFiltrados.filter(animal => animal.age.id === this.serchBEdad);
      }

      if (this.serchBColor) {
        resultadosFiltrados = resultadosFiltrados.filter(animal => animal.color.id === this.serchBColor);
      }

      this.resultadosMostrados = resultadosFiltrados;
    },
    closeImageUploadModal() {
      this.$refs.imageUploadModal.hide();
      this.description = "";
      this.imageFiles = [];
      this.imageFilesState = null;
    },
    openModal(animalData) {
      this.modalData = { ...animalData };
      this.$refs.myModalRef.show();
    },
    async openImageUploadModal() {
      try {
        this.description = "";
        this.imageFiles = [];
        this.imageFilesState = null;
        this.$refs.imageUploadModal.show();
      } catch (error) {
        console.error("Error al intentar abrir el modal:", error);
      }
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
    limpiarFiltros() {
      this.serchBRace = null;
      this.serchBPersonality = null;
      this.serchBType = null;
      this.serchBSexo = null;
      this.serchBEdad = null;
      this.serchBColor = null;
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
.adopt {
  background-color: rgb(248, 248, 248);
}

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

.card-img-top {
  height: 200px;
  width: 318px;
  object-fit: cover;
  object-position: center top;
}
</style>