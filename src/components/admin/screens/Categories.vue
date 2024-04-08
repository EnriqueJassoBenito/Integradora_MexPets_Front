<template>
  <div class="centered-container">
    <h2>Administración de Categorías</h2>
    <div class="delete" @drop="dropToDelete" @dragover="dragOverHandler">
      Arrastra aquí para eliminar
    </div>
    <div class="categories-container">
      <div class="white-box">

        <div class="title-and-button">
          <h2>Tipo de mascota</h2>
          <b-button variant="success" @click="openModalType(null)" style="margin-left:10px; height:30%; "><b-icon icon="plus"></b-icon></b-button>
        </div>
        <div class="draggable-list">
          <div v-for="(type, index) in typePet" :key="index" class="draggable-item" draggable="true"
          @dragstart="dragStartHandler(index, 'tp', $event)">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ type.type }}</span>
            <span>
              <b-button variant="warning" size="sm" @click="openModalType(type)"><b-icon icon="pencil-square"></b-icon></b-button>
            </span>
         </div>
          </div>
        </div>

        <b-modal id="modal-type" v-model="showModalType" centered :title="modalTitle" modal-footer hide-footer>
          <form @submit.prevent="addOrUpdateType" style="display: flex; flex-direction: column;">
            <b-form-group label="Tipo de animal">
              <b-form-input v-model="updateDataType.type"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" style="margin-top:15px;" @click="addOrUpdateType">
              {{ !updateDataType.id ? 'Agregar' : 'Actualizar' }}
            </b-button>
          </form>
        </b-modal>
      </div>

      <div class="spacer"></div>

      <div class="white-box">
        <div class="title-and-button">
          <h2>Raza de mascota</h2>
          <b-button variant="success" @click="openModalRace(null)" style="margin-left:10px; height:30%;"><b-icon icon="plus"></b-icon></b-button>
        </div>
        <div class="draggable-list">
          <div v-for="(race, index) in race" :key="index" class="draggable-item" draggable="true"
            @dragstart="dragStartHandler(index, 'rm', $event)">
            <div class="d-flex justify-content-between align-items-center">
            <span>{{ race.racePet }}</span>
            <span>
            <b-button variant="warning" size="sm" @click="openModalRace(race)"><b-icon icon="pencil-square"></b-icon></b-button>
          </span>
          </div>
          </div>
        </div>
        <b-modal id="modal-raza-mascota" v-model="showModalRace" centered :title="modalTitle" modal-footer hide-footer>
          <form @submit.prevent="addOrUpdateRace" style="display: flex; flex-direction: column;">
            <b-form-group label="Nombre de la Raza">
              <b-form-input v-model="updateDataRace.racePet"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" style="margin-top:15px;">
              {{ !updateDataRace.id ? 'Agregar Raza' : 'Actualizar Raza' }}
            </b-button>
          </form>
        </b-modal>
      </div>
      <div class="spacer"></div>

      <div class="white-box">
        <div class="title-and-button">
          <h2>Personalidad</h2>
          <b-button variant="success" @click="openModalPersonality(null)"
            style="margin-left:10px; height:30%;"><b-icon icon="plus"></b-icon></b-button>
        </div>
        <div class="draggable-list">
          <div v-for="(personal, index) in personality" :key="index" class="draggable-item" draggable="true"
          @dragstart="dragStartHandler(index, 'pm', $event)">
           <div class="d-flex justify-content-between align-items-center">
             <span>{{ personal.personalityPet }}</span>
             <span>
             <b-button variant="warning" size="sm" @click="openModalPersonality(personal)">
            <b-icon icon="pencil-square"></b-icon>
           </b-button>
            </span>
          </div>
        </div>
        </div>
        <b-modal id="modal-personalidad-mascota" v-model="showModalPersonality" centered :title="modalTitle"
          modal-footer hide-footer>
          <form @submit.prevent="addOrUpdatePersonality" style="display: flex; flex-direction: column;">
            <b-form-group label="Nombre de la personalidad">
              <b-form-input v-model="updateDataPersonality.personalityPet"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" style="margin-top:15px;">
              {{ !updateDataPersonality.id ? 'Agregar Personalidad' : 'Actualizar Personalidad' }}
            </b-button>
          </form>
        </b-modal>

      </div>
    </div>
  </div>
</template>

<script>
import service from '../../../service/CategoryService';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      fields: [],
      camposTabla: [
        { key: 'type', label: 'Tipo' }
      ],
      draggedItem: null,
      draggedItemIndex: null,
      draggedItemType: null,
      race: [],
      personality: [],
      typePet: [],
      loading: false,
      showModalType: false,
      showModalRace: false,
      showModalPersonality: false,
      updateDataPersonality: {
        id: "",
        personalityPet: ""
      },
      updateDataRace: {
        id: "",
        racePet: "",
      },
      updateDataType: {
        id: "",
        type: ""
      },
      modalTitle: ""
    };
  },
  mounted() {
    this.consultPersonality();
    this.consultRace();
    this.consultType();
  },
  methods: {
    openModalType(type) {
      if (type === null) {
        this.updateDataType = { id: "", type: "" };
        this.modalTitle = "Agregar tipo";
      } else {
        this.updateDataType = { ...type };
        this.modalTitle = "Editar tipo";
      }
      this.showModalType = true;
      this.showModalRace = false;
      this.showModalPersonality = false;
    },

    openModalRace(race) {
      if (race === null) {
        this.updateDataRace = { id: "", racePet: "" };
        this.modalTitle = "Agregar Raza";
      } else {
        this.updateDataRace = { ...race };
        this.modalTitle = "Editar Raza";
      }
      this.showModalType = false;
      this.showModalRace = true;
      this.showModalPersonality = false;
    },
    openModalPersonality(personality) {
      if (personality === null) {
        this.updateDataPersonality = { id: "", personalityPet: "" };
        this.modalTitle = "Agregar Personalidad";
      } else {
        this.updateDataPersonality = { ...personality };
        this.modalTitle = "Editar Personalidad";
      }
      this.showModalType = false;
      this.showModalRace = false;
      this.showModalPersonality = true;
    },

    addOrUpdateType() {
      if (!this.updateDataType.id) {
        this.insertType();
      } else {
        this.updateType(this.updateDataType.id, this.updateDataType.type);
      }
    },
    async insertType() {
  try {
    const existingType = this.typePet.find(item => item.type === this.updateDataType.type);
    if (!existingType) {
      await service.onInsertTypePet(this.updateDataType.type);
      this.updateDataType.type = "";
      this.closeModal();
      this.consultType();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Tipo de animal agregado correctamente'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Este tipo de animal ya existe',
        showConfirmButton: false,
        timer: 1500
      });
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error");
  }
}
,
    async consultType() {
      try {
        this.loading = true;
        const result = await service.onGetAllType();
        this.typePet = result.map(item => ({
          id: item.id,
          type: item.type
        }));
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },
    async updateType(id, type) {
      try {
        await service.onUpdateType(id, type);
        this.closeModal();
        this.consultType();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Tipo de animal actualizado correctamente: ' + type
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },
    async deleteType(id) {
      try {
        await service.onDeleteType(id);
        this.consultType();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });

      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },

    async addOrUpdatePersonality() {
      if (!this.updateDataPersonality.id) {
        await this.insertPersonality();
      } else {
        await this.updatePersonality(this.updateDataPersonality.id, this.updateDataPersonality.personalityPet);
      }
      this.closeModal();
      this.consultPersonality();
    },
    async insertPersonality() {
      try {
        await service.onInsertPersonality(this.updateDataPersonality.personalityPet);
        this.closeModal();
        this.consultPersonality();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Personalidad agregada correctamente '
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },

    async consultPersonality() {
      try {
        this.loading = true;
        const result = await service.onGetAllPersonality();
        this.personality = result.map(item => ({
          id: item.id,
          personalityPet: item.personalityPet
        }));
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },
    async updatePersonality(id, personalityPet) {
      try {
        await service.onUpdatePersonality(id, personalityPet);
        this.closeModal();
        this.consultPersonality();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Personalidad actualizada correctamente '
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },
    async deletePersonality(id) {
      try {
        await service.onDeletePersonality(id);
        this.consultPersonality();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },

    async addOrUpdateRace() {
      if (!this.updateDataRace.id) {
        await this.insertRace();
      } else {
        await this.updateRace(this.updateDataRace.id, this.updateDataRace.racePet);
      }
      this.closeModal();
      this.consultRace();
    },
    async insertRace() {
  try {
    const existingRace = this.race.find(item => item.racePet === this.updateDataRace.racePet);
    if (!existingRace) {
      await service.onInsertRace(this.updateDataRace.racePet);
      this.closeModal();
      this.consultRace();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Raza agregada correctamente'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Esta raza ya existe',
        showConfirmButton: false,
        timer: 1500
      });
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error");
  }
}
,
    async consultRace() {
      try {
        this.loading = true;
        const result = await service.onGetAllRace();
        this.race = result.map(item => ({
          id: item.id,
          racePet: item.racePet
        }));
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      } finally {
        this.loading = false;
      }
    },
    async updateRace(id, racePet) {
      try {
        await service.onUpdateRace(id, racePet);
        this.closeModal();
        this.consultRace();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Raza actualizada correctamente '
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },
    async deleteRace(id) {
      try {
        await service.onDeleteRace(id);
        this.consultRace();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    },

    async confirmDelete() {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
      });
      return result.isConfirmed;
    },
    openModal(id) {
      if (id === null) {
        this.updateDataPersonality = {
          id: "",
          racePet: "",
        };
        this.modalTitle = "Insertar Raza";
      } else {
        const race = this.race.find(item => item.id === id);
        this.updateDataPersonality = {
          id: race.id,
          racePet: race.racePet,
        };
        this.modalTitle = "Editar Raza";
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModalType = false;
      this.showModalRace = false;
      this.showModalPersonality = false;
    },

    dragStartHandler(index, type, event) {
      event.dataTransfer.setData("text/plain", index.toString());
      event.dataTransfer.setData("type", type);
    },
    dragOverHandler(event) {
      event.preventDefault();
    },

    async dropToDelete(event) {
      event.preventDefault();
      const index = parseInt(event.dataTransfer.getData("text/plain"));
      const draggedItemType = event.dataTransfer.getData("type");
      if (draggedItemType === 'tp') {
        const typeId = this.typePet[index].id;
        const confirmed = await this.confirmDelete();
        if (confirmed) {
          await this.deleteType(typeId);
        }
      } else if (draggedItemType === 'rm') {
        const raceId = this.race[index].id;
        const confirmed = await this.confirmDelete();
        if (confirmed) {
          await this.deleteRace(raceId);
        }
      } else if (draggedItemType === 'pm') {
        const personalityId = this.personality[index].id;
        const confirmed = await this.confirmDelete();
        if (confirmed) {
          await this.deletePersonality(personalityId);
        }
      }
    },
  }
};
</script>
<style>
.white-box {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.spacer {
  width: 20px;
}

.categories-container {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: rgb(249, 249, 249);
}

.draggable-list {
  list-style-type: none;
  padding: 0;
}

.draggable-item {
  cursor: move;
  padding: 8px 12px;
  margin: 4px 0;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.draggable-item:hover {
  background-color: #e9e9e9;
}

.delete {
  margin-top: 20px;
  padding: 10px;
  border: 2px dashed rgb(158, 19, 19);
  text-align: center;
}

.title-and-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 9999;
  margin-top: 50px;
}
</style>