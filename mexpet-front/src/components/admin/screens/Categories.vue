<template>
    <div class="centered-container">
      <h2>Administración de Categorías</h2>
      <div class="eliminar" @drop="dropToDelete" @dragover.prevent="dragOverHandler">
      Arrastra aquí para eliminar
    </div>
      <div class="categories-container">
        <div class="cuadro-blanco">
          <h2>Tipo de mascota</h2>
          
          <b-button variant="success" v-b-modal.my-modal >Agregar</b-button>
          <b-table striped hover :items="tipoMascotas" :fields="fields" style="width: 300px; margin-top: 20px;">
            <template slot="type" slot-scope="data" >
              <div class="draggable-item" draggable="true" @dragstart="dragStartHandler(data.data.item)">
                            {{ data.data.item }}
                        </div> 
            </template>
    </b-table>
    
    <b-modal id="my-modal" v-model="modalVisible" centered title="Agregar Tipo de Mascota" modal-footer hide-footer>
      <form @submit.prevent="agregarRaza" style="display: flex; flex-direction: column;">
        <label for="nuevoTipo">Ingresa tipo:</label>
      <input type="text" id="nombreRaza" v-model="nuevaRaza" required>
      <b-button type="submit" variant="primary" style="margin-top:15px;">Agregar Tipo</b-button>
    </form>
    </b-modal>
</div>
        <div class="spacer"></div>
        <div class="cuadro-blanco">
          <h2>Raza de mascota</h2>
          <b-button variant="success" v-b-modal.modal-raza-mascota >Agregar</b-button>
          <b-table striped hover :items="raceMascotas" :fields="fields" style="width: 300px; margin-top: 20px;">
            <template slot="type" slot-scope="data">
              <div 
        class="draggable-item" 
        draggable="true" 
        @dragstart="dragStartHandler(data.item)"
      >
        {{ data.value }}
      </div>
      </template>
          </b-table>
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
          <h2>Personalidad</h2>
          <b-button variant="success" v-b-modal.modal-personalidad-mascota >Agregar</b-button>
          <b-table striped hover :items="personalidadMascotas" :fields="fields" style="width: 300px; margin-top: 20px;">
            <template slot="type" slot-scope="data">
              <div 
        class="draggable-item" 
        draggable="true" 
        @dragstart="dragStartHandler(data.item)"
      >
        {{ data.value }}
      </div>
      </template>
          </b-table>
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
        draggedItem: null
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
dragStartHandler(item) {
  console.log(item);
    this.draggedItem = item;
    console.log(item);
},
dragOverHandler(event) {
    event.preventDefault();
},
dropToDelete() {
    let index = -1;
    index = this.tipoMascotas.indexOf(this.draggedItem);
    if (index > -1) {
        this.tipoMascotas.splice(index, 1);
        return;
    }
    index = this.raceMascotas.indexOf(this.draggedItem);
    if (index > -1) {
        this.raceMascotas.splice(index, 1);
        return;
    }
    index = this.personalidadMascotas.indexOf(this.draggedItem);
    if (index > -1) {
        this.personalidadMascotas.splice(index, 1);
        return; 
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
    margin-top: 20px;
  }
  
  .centered-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: rgb(249, 249, 249);
    margin-top: 30px;
  }

    .draggable-item {
  cursor: move;
}
.eliminar {
  margin-top: 20px;
  padding: 10px;
  border: 2px dashed rgb(130, 130, 130);
  text-align: center;
}
  </style>
  