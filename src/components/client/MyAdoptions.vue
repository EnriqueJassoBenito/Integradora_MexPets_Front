<template>
  <b-container fluid>
    <div class="loading-overlay is-active" v-if="isLoading">
      <div class="custom-loader"></div>
    </div>
    <b-row class="mt-2">
      <b-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="animal in animalApproval"
        :key="animal.id"
        class="mb-4"
      >
        <b-card
          :title="animal.namePet"
          tag="article"
          :footer="'Estado: ' + getStatusTranslation(animal.approvalStatus)"
          footer-bg-variant="warning"
          footer-border-variant="dark"
        >
          <b-row>
            <b-col cols="5">
              <img
                :src="animal.images[0].imageUrl"
                :alt="animal.namePet"
                class="img-fluid"
                style="max-height: 150px"
              />
            </b-col>
            <b-col cols="7">
              <b-card-text>
                <p><strong>Ubicación:</strong> {{ animal.location }}</p>
                <p><strong>Tipo:</strong> {{ animal.typePet.type }}</p>
                <p><strong>Raza:</strong> {{ animal.race.racePet }}</p>
                <p><strong>Sexo:</strong> {{ animal.sex }}</p>
              </b-card-text>
              <b-button
                @click="openModal(animal)"
                variant="primary"
                class="float-right mb-2 mr-2"
              >
                <b-icon icon="eye" aria-hidden="true"></b-icon>
              </b-button>
              <b-button
                @click="openImageUploadModal()"
                variant="success"
                class="float-right mb-2 mr-2"
              >
                <b-icon
                  icon="circle-fill"
                  animation="throb"
                  font-scale="1"
                ></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-modal
      ref="myModalRef"
      hide-footer
      title="Detalles de la mascota"
      header-bg-variant="success"
    >
      <b-row class="mb-3">
        <b-col cols="12">
          <b-carousel
            controls
            indicators
            style="max-height: 300px; overflow: hidden"
          >
            <b-carousel-slide
              v-for="(image, index) in modalData.images"
              :key="index"
              :img-src="image.imageUrl"
              :alt="`Slide ${index + 1}`"
              img-width="300px"
              img-height="200px"
            ></b-carousel-slide>
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

    <b-modal
      ref="imageUploadModal"
      hide-footer
      title="Cargar Imágenes y Descripción"
    >
      <b-form @submit.stop="submitForm">
        <b-form-group label="Descripción">
          <b-form-textarea
            v-model="description"
            rows="3"
            placeholder="Descripción de la mascota"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          label="Imágenes"
          label-for="imageFiles"
          invalid-feedback="Debe insertar un mínimo de 1 imagen y un máximo de 5, y los archivos no deberán ser mayores a 10 MB."
          :state="imageFilesState"
        >
          <b-form-file
            id="imageFiles"
            v-model="imageFiles"
            multiple
            accept="image/*"
            @change="validateImageFiles"
            required
            :class="{ 'is-invalid': !imageFilesState }"
          />
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled="!imageFilesState"
          >Guardar</b-button
        >
        <b-button variant="secondary" @click="closeImageUploadModal"
          >Cancelar</b-button
        >
      </b-form>
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
        sterilized: "",
        description: "",
        images: [],
        approvalStatus: "",
        moderatorComment: "",
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
      race: [],
      typePets: [],
      personalities: [],
    };
  },
  mounted() {
    this.onGetAllAni();
  },
  methods: {
    async onGetAllAni() {
      try {
        const userId = localStorage.getItem("authUser");
        if (userId) {
          const currentUserData = JSON.parse(userId);
          const response = await service.onGetAllAnimals();
          console.log("Animales obtenidos:", response);

          if (!response.error) {
            const userRegisterId = currentUserData.user.id;
            console.log("ID de usuario que inició sesión:", userRegisterId);

            this.animalApproval = response.filter((animal) => {
              if (userRegisterId && animal.register.id) {
                console.log("ID de registro del animal:", animal.register.id);
                return animal;
              }
            });
          } else {
            console.error("Error al obtener los datos:", response.message);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error al obtener los datos: " + response.message,
            });
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener los datos: " + error.message,
        });
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
        console.log("id: " + currentUserData.user.id);
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
    openImageUploadModal() {
      this.description = "";
      this.imageFiles = [];
      this.imageFilesState = null;
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
      this.selectedAnimalId = animal.id;
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
  background: radial-gradient(
    farthest-side,
    currentColor calc(100% - 6px),
    #0000 calc(100% - 5px) 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 13px),
    #000 calc(100% - 12px)
  );
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