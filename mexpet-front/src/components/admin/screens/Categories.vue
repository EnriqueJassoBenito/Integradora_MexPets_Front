<template>
    <div class="centered-container">  
      <b-alert variant="success" v-model="showSuccessAlert" :auto-hide-delay="2000" class="right">
    Personalidad de mascota agregada correctamente
  </b-alert>
  <b-alert variant="success" v-model="showSuccessAlert2" :auto-hide-delay="2000" class="right">
    Raza de mascota agregada correctamente
  </b-alert>
  <b-alert variant="success" v-model="showAlert" :auto-hide-delay="2000" class="right">
    Tipo de mascota agregado correctamente
  </b-alert>
      <h2>Administración de Categorías</h2>
      <div class="eliminar" 
     @drop="dropToDelete" 
     @dragover="dragOverHandler">
     Arrastra aquí para eliminar
</div>
      <div class="categories-container">
        <div class="cuadro-blanco">
          <div class="title-and-button">
    <h2>Tipo de mascota</h2>
    <b-button variant="success" v-b-modal.my-modal style="margin-left:10px; height:30%; ">+</b-button>
  </div>  
          <div class="draggable-list">
            <div v-for="(tipo, index) in tipoMascotas" :key="index" class="draggable-item" draggable="true" @dragstart="dragStartHandler(index, 'tipoMascotas', $event)">
            {{ tipo.type }}
          </div>
    </div>
    <b-modal id="my-modal" v-model="modalVisible" centered title="Agregar Tipo de Mascota" modal-footer hide-footer>
      <form @submit.prevent="addTypePets" style="display: flex; flex-direction: column;">
        <label for="nuevoTipo">Ingresa tipo:</label>
        <input type="text" id="nuevoTipo" v-model="nuevoTipo" required>
        <b-button type="submit" variant="primary" style="margin-top:15px;">Agregar Tipo</b-button>
      </form>
    </b-modal>

</div>
        <div class="spacer"></div>
        <div class="cuadro-blanco">
          <div class="title-and-button">
          <h2>Raza de mascota</h2>
          <b-button variant="success" v-b-modal.modal-raza-mascota style="margin-left:10px; height:30%;">+</b-button>
          </div>
          <div class="draggable-list">
    <div v-for="(raza, index) in raceMascotas" :key="index" class="draggable-item" draggable="true" @dragstart="dragStartHandler(index,'raceMascotas',$event)">
      {{ raza.racePet }}
    </div>
  </div>
  <b-modal id="modal-raza-mascota" v-model="modalRazaMascotaVisible" centered title="Agregar Raza de Mascota" modal-footer hide-footer>
    <form @submit.prevent="addRace" style="display: flex; flex-direction: column;">
      <label for="nombreRaza">Nombre de la Raza:</label>
      <input type="text" id="nombreRaza" v-model="nuevaRaza" required>
      <b-button type="submit" variant="primary" style="margin-top:15px;">Agregar Raza</b-button>
    </form>
  </b-modal>

        </div>
        <div class="spacer"></div>


        <div class="cuadro-blanco">
          <div class="title-and-button">
          <h2>Personalidad</h2>
          <b-button variant="success" v-b-modal.modal-personalidad-mascota style="margin-left:10px; height:30%;">+</b-button>
          </div>
          <div class="draggable-list">
    <div v-for="(personalidad, index) in personalidadMascotas" :key="index" class="draggable-item" draggable="true" @dragstart="dragStartHandler(index,'personalidadMascotas',$event)">
      {{ personalidad.personalityPet }}
    </div>
  </div>
  <b-modal id="modal-personalidad-mascota" v-model="modalPersonalidadMascotaVisible" centered title="Agregar Personalidad de Mascota" modal-footer hide-footer>
    <form @submit.prevent="addPersonalityPets" style="display: flex; flex-direction: column;">
      <label for="nuevaPersonalidad">Nombre de la Personalidad:</label>
      <input type="text" id="nuevaPersonalidad" v-model="nuevaPersonalidad" required>
      <b-button type="submit" variant="primary" style="margin-top:15px;">Agregar Personalidad</b-button>
    </form>
  </b-modal>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        fields: [],
        tipoMascotas: [],
        raceMascotas:[],
        personalidadMascotas:[],
        camposTabla: [
          { key: 'type', label: 'Tipo' }
        ],
        modalVisible: false,
        modalRazaMascotaVisible: false,
        modalPersonalidadMascotaVisible: false,
        nuevoTipo: '',
        nuevaRaza: '',
        nuevaPersonalidad: '',
        draggedItem: null,
        draggedItemIndex: null,
      draggedItemType: null,
      showSuccessAlert: false,
      showAlert: false,
      showSuccessAlert2: false,
      };
    },
    mounted() {
      this.fetchData();
      this.fetchDataRaze();
    this.fetchDataPersonality();
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:8080/api/type-pet/')
          .then(response => {
            this.tipoMascotas = response.data.data;
          })
          .catch(error => {
            console.error('Error al obtener los datos de tipo mascotas:', error);
          });
        },
    fetchDataRaze() {
      axios.get('http://localhost:8080/api/race/')
        .then(response => {
          this.raceMascotas = response.data.data;
        })
        .catch(error => {
          console.error('Error al obtener los datos de razas de mascotas:', error);
        });
    },
    fetchDataPersonality() {
      axios.get('http://localhost:8080/api/personality/')
        .then(response => {
          this.personalidadMascotas = response.data.data;
        })
        .catch(error => {
          console.error('Error al obtener los datos de personalidad de mascotas:', error);
        });
    },
    openModal() {
      if (tipo === 'tipo-mascota') {
        this.modalVisible = true;
        this.nuevoTipo= '';
      } else if (tipo === 'raza-mascota') {
        this.modalRazaMascotaVisible = true;
        this.nuevaRaza= '';
      } else if (tipo === 'personalidad-mascota') {
        this.modalPersonalidadMascotaVisible = true;
        this.nuevaPersonalidad= '';
      }    
    },
    closeModal() {
      this.modalVisible = false;
      this.modalRazaMascotaVisible = false;
      this.modalPersonalidadMascotaVisible = false;
    },
    addTypePets() {
      axios.post('http://localhost:8080/api/type-pet/', { type: this.nuevoTipo })
        .then(response => {
          if (response.data.error) {
            alert(response.data.message);
            console.error(response.data.message);
          } else {
            this.tipoMascotas.push(response.data.data);
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
            this.closeModal();
          }
        })
        .catch(error => {
          console.error('Error al agregar el nuevo tipo:', error);
        });
    },
    addPersonalityPets() {
      axios.post('http://localhost:8080/api/personality/', { personalityPet: this.nuevaPersonalidad })
        .then(response => {
          if (response.data.error) {
            alert(response.data.message);
            console.error(response.data.message);
          } else {
            this.personalidadMascotas.push(response.data.data);
            this.showSuccessAlert = true; 
            setTimeout(() => {
              this.showSuccessAlert = false;
            }, 3000);
            this.closeModal();
          }
        })
        .catch(error => {
          console.error('Error al agregar el nuevo personalidad:', error);
        });
    },
    addRace() {
      if (!this.nuevaRaza) {
        alert('Por favor ingresa el nombre de la raza.');
        return;
      }

      axios.post('http://localhost:8080/api/race/', { racePet: this.nuevaRaza })
        .then(response => {
          if (response.data.error) {
            alert(response.data.message);
            console.error(response.data.message);
            this.showErrorAlert = true;
          } else {
            this.raceMascotas.push(response.data.data);
            this.showSuccessAlert2 = true;

            setTimeout(() => {
              this.showSuccessAlert2 = false;
            }, 2000);

            this.closeModal();
          }
        })
        .catch(error => {
          console.error('Error al agregar la nueva raza:', error);
          this.showErrorAlert = true;
        });
    },
dragStartHandler(index, type, event) {
  event.dataTransfer.setData("text/plain", index.toString());
  event.dataTransfer.setData("type", type);
},
dragOverHandler(event) {
    event.preventDefault();
  },
  dropToDelete(event) {
  event.preventDefault();
  
  const index = parseInt(event.dataTransfer.getData("text/plain"));

  const draggedItemType = event.dataTransfer.getData("type");
  if (draggedItemType === 'tipoMascotas') {
    const typeId = this.tipoMascotas[index].id;
    if (window.confirm("¿Estás seguro de que deseas eliminar este tipo de mascota?")) {
      axios.delete(`http://localhost:8080/api/type-pet/${typeId}`)
        .then(response => {
          if (response.data.success) {
            this.tipoMascotas.splice(index, 1);
          } else {
            console.error(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error al eliminar el tipo de mascota:', error);
        });
    }
  } else if (draggedItemType === 'raceMascotas') {
    const raceId = this.raceMascotas[index].id;
    if (window.confirm("¿Estás seguro de que deseas eliminar esta raza de mascota?")) {
      axios.delete(`http://localhost:8080/api/race/${raceId}`)
        .then(response => {
          if (response.data.success) {
            this.raceMascotas.splice(index, 1);
          } else {
            console.error(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error al eliminar la raza de mascota:', error);
        });
    }
  } else if (draggedItemType === 'personalidadMascotas') {
    const personalityId = this.personalidadMascotas[index].id;
    if (window.confirm("¿Estás seguro de que deseas eliminar esta personalidad de mascota?")) {
      axios.delete(`http://localhost:8080/api/personality/${personalityId}`)
        .then(response => {
          if (response.data.success) {
            this.personalidadMascotas.splice(index, 1);
          } else {
            console.error(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error al eliminar la personalidad de mascota:', error);
        });
    }
  }
}





  }
};
</script>
  <style>
  .cuadro-blanco {
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
.eliminar {
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
  