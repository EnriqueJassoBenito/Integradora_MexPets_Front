<template>
    <div class="centered-container">
      <h2>Administración de Categorías</h2>
      <div class="eliminar" @drop="dropToDelete" @dragover.prevent="dragOverHandler">
      Arrastra aquí para eliminar
    </div>
      <div class="categories-container">
        <div class="cuadro-blanco">
          <div class="title-and-button">
    <h2>Tipo de mascota</h2>
    <b-button variant="success" v-b-modal.my-modal style="margin-left:10px; height:30%; ">+</b-button>
  </div>  
          <div class="draggable-list">
      <div v-for="(tipo, index) in tipoMascotas" :key="index" class="draggable-item" draggable="true" @dragstart="dragStartHandler(index)">
        {{ tipo.type }}
      </div>
    </div>
    <b-modal id="my-modal" v-model="modalVisible" centered title="Agregar Tipo de Mascota" modal-footer hide-footer>
      <form @submit.prevent="agregarTipoMascota" style="display: flex; flex-direction: column;">
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
    <div v-for="(raza, index) in raceMascotas" :key="index" class="draggable-item" draggable="true" @dragstart="dragStartHandler(raza)">
      {{ raza.racePet }}
    </div>
  </div>
  <b-modal id="modal-raza-mascota" v-model="modalRazaMascotaVisible" centered title="Agregar Raza de Mascota" modal-footer hide-footer>
    <form @submit.prevent="agregarRaza" style="display: flex; flex-direction: column;">
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
    <div v-for="(personalidad, index) in personalidadMascotas" :key="index" class="draggable-item" draggable="true" @dragstart="dragStartHandler(personalidad)">
      {{ personalidad.personalityPet }}
    </div>
  </div>
  <b-modal id="modal-personalidad-mascota" v-model="modalPersonalidadMascotaVisible" centered title="Agregar Personalidad de Mascota" modal-footer hide-footer>
    <form @submit.prevent="agregarPersonalidad" style="display: flex; flex-direction: column;">
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
      draggedItemType: null
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
        this.modalTipoMascotaVisible = true;
      } else if (tipo === 'raza-mascota') {
        this.modalRazaMascotaVisible = true;
      } else if (tipo === 'personalidad-mascota') {
        this.modalPersonalidadMascotaVisible = true;
      }    },
    closeModal() {
      this.modalTipoMascotaVisible = false;
      this.modalRazaMascotaVisible = false;
      this.modalPersonalidadMascotaVisible = false;
    },
    agregarTipoMascota() {
  axios.post('http://localhost:8080/api/type-pet/', { type: this.nuevoTipo })
    .then(response => {
      if (response.data.error) {
        alert(response.data.message);
        console.error(response.data.message);
      } else {
        this.tipoMascotas.push(response.data.data);
        this.closeModal();
      }
    })
    .catch(error => {
      console.error('Error al agregar el nuevo tipo:', error);
    });
  },
  agregarPersonalidad() {
  axios.post('http://localhost:8080/api/personality/', { personalityPet: this.nuevaPersonalidad })
    .then(response => {
      if (response.data.error) {
        alert(response.data.message);
        console.error(response.data.message);
      } else {
        this.personalidadMascotas.push(response.data.data);
        this.closeModal();
      }
    })
    .catch(error => {
      console.error('Error al agregar el nuevo personalidad:', error);
    });
  },
  agregarRaza() {
  if (!this.nuevaRaza) {
    alert('Por favor ingresa el nombre de la raza.');
    return;
  }
  axios.post('http://localhost:8080/api/race/', { racePet: this.nuevaRaza })
    .then(response => {
      if (response.data.error) {
        alert(response.data.message);
        console.error(response.data.message);
      } else {
        this.raceMascotas.push(response.data.data);
        this.closeModal();
      }
    })
    .catch(error => {
      console.error('Error al agregar la nueva raza:', error);
    });
},
dragStartHandler(index, type, event) {
  event.dataTransfer.setData("text/plain", index);
  this.draggedItemIndex = index;
  this.draggedItemType = type;
},
dropToDelete() {
  let index = -1;
  if (this.draggedItemType === 'tipoMascotas') {
    index = this.draggedItemIndex;
    if (index > -1) {
      this.tipoMascotas.splice(index, 1);
      return;
    }
  } else if (this.draggedItemType === 'raceMascotas') {
    index = this.draggedItemIndex;
    if (index > -1) {
      this.raceMascotas.splice(index, 1);
      return;
    }
  } else if (this.draggedItemType === 'personalidadMascotas') {
    index = this.draggedItemIndex;
    if (index > -1) {
      this.personalidadMascotas.splice(index, 1);
      return;
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
  </style>
  