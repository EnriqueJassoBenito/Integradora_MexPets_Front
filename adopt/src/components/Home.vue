<template>
  <div fluid>
    <div>
      <vue-flux
   :options="fluxOptions"
   :images="fluxImages"
   :transitions="fluxTransitions"
   ref="slider" style="height:400px">
      <flux-pagination ></flux-pagination>
</vue-flux>
</div>
    <div class="row">
      <b-navbar class="navbar" toggleable="md" type="dark" >
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mx-auto">
            <b-nav-item-dropdown text="Personalidad" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Tamaño" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Raza" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Color" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Especie" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Edad" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Sexo" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div>
      <b-card v-for="animal in animals" :key="animal.id" :img-src="animal.image" img-alt="Animal Image" img-top
        tag="article" class="mb-2">
        <b-card-text>
          <h5 class="card-title text-center">{{ animal.name }}</h5>
          <div class="row">
            <div class="col-6">
              <p>Ciudad: </p>
              <p>Raza: </p>
              <p>Tamaño: </p>
              <p>Edad:</p>
              <p>Sexo:</p>
              <p>Personalidad:</p>
            </div>
            <div class="col-6">
              <p>{{ animal.city }}</p>
              <p>{{ animal.breed }}</p>
              <p>{{ animal.size }}</p>
              <p>{{ animal.age }}</p>
              <p>{{ animal.gender }}</p>
              <p>{{ animal.personality }}</p>
            </div>
          </div>
          
        </b-card-text>
        <div class="text-center">
          <b-button variant="success" @click="adoptAnimal(animal.id)">
            Adoptar
          </b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { VueFlux, FluxPagination, Transitions } from 'vue-flux';

export default {
  components: {
      VueFlux,
      FluxPagination
   },
  data() {
    return {
      selectedOption: null,
      animals: [
        {
          id: 1,
          image: "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/15665/production/_107435678_perro1.jpg", 
          name: "Mittens",
          city: "Ciudad1",
          breed: "Gato",
          size: "Pequeño",
          age: "2 años",
          gender: "Macho",
          personality: "Juguetón",
        },
        {
          id: 2,
          image: "https://purina.com.mx/sites/default/files/styles/webp/public/2022-10/purina-10-datos-curiosos-sobre-los-gatos.png.webp?itok=D7RZ4o6C", // Reemplaza con las URL reales de las imágenes
          name: "Mittens",
          city: "Ciudad1",
          breed: "Perro",
          size: "Pequeño",
          age: "2 años",
          gender: "Macho",
          personality: "Juguetón",
        },
        {
          id: 3,
          image: "https://www.santevet.es/uploads/images/es_ES/razas/gato_callejero_seguro_santevet.jpeg", // Reemplaza con las URL reales de las imágenes
          name: "Mittens",
          city: "Ciudad1",
          breed: "Gato",
          size: "Pequeño",
          age: "2 años",
          gender: "Macho",
          personality: "Juguetón",
        },
        {
          id: 4,
          image: "https://www.ngenespanol.com/wp-content/uploads/2023/12/descubren-que-los-humanos-influimos-en-el-color-de-ojos-de-los-perros-770x431.jpg", // Reemplaza con las URL reales de las imágenes
          name: "Mittens",
          city: "Ciudad1",
          breed: "Gato",
          size: "Pequeño",
          age: "2 años",
          gender: "Macho",
          personality: "Juguetón",
        },
      ],
      fluxOptions: {
         autoplay: true
      },
      fluxImages: [ 'https://static.fundacion-affinity.org/cdn/farfuture/wfzHUAPksUOWePuvajegv_W_DwdxDophyz5qyiV1EiY/mtime:1528830294/sites/default/files/la-adopcion-una-nueva-oportunidad-a-las-mascotas-abandonadas.jpg', 'https://s1.elespanol.com/2023/01/16/curiosidades/mascotas/734186624_230172285_1006x260.jpg', 'https://www.myhappypet.es/sites/spmhp/files/perros_y_gatos.jpg' ],
      fluxTransitions: {
         transitionSwipe: Transitions.transitionSwipe,
      }
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    adoptAnimal(animalId) {
      console.log("Adoptar animal con ID:", animalId);
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #6A4000;
  padding-top: 10px;
}

.navbar-nav .nav-item.active {
  background-color: #639B87;
  border-radius: 10px 10px 0px 0px;
}

.card {
  display: inline-block;
  width: auto;
  max-width: 18rem; 
  margin: 10px;
}
</style>
