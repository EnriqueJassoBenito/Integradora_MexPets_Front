<template>
  <div fluid>
    <div class="row">
      <b-navbar class="navbar" toggleable="md" type="dark" variant="info">
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
export default {
  data() {
    return {
      selectedOption: null,
      animals: [
        {
          id: 1,
          image: "https://placekitten.com/300/200", // Reemplaza con las URL reales de las imágenes
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
          image: "https://placekitten.com/300/200", // Reemplaza con las URL reales de las imágenes
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
          image: "https://placekitten.com/300/200", // Reemplaza con las URL reales de las imágenes
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
          image: "https://placekitten.com/300/200", // Reemplaza con las URL reales de las imágenes
          name: "Mittens",
          city: "Ciudad1",
          breed: "Gato",
          size: "Pequeño",
          age: "2 años",
          gender: "Macho",
          personality: "Juguetón",
        },
        {
          id: 5,
          image: "https://placekitten.com/300/200", // Reemplaza con las URL reales de las imágenes
          name: "Mittens",
          city: "Ciudad1",
          breed: "Gato",
          size: "Pequeño",
          age: "2 años",
          gender: "Macho",
          personality: "Juguetón",
        },
        {
          id: 1,
          image: "https://placekitten.com/300/200", // Reemplaza con las URL reales de las imágenes
          name: "Mittens",
          city: "Ciudad1",
          breed: "Gato",
          size: "Pequeño",
          age: "2 años",
          gender: "Macho",
          personality: "Juguetón",
        },
      ],
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    adoptAnimal(animalId) {
      // Lógica para adoptar el animal con el ID especificado
      console.log("Adoptar animal con ID:", animalId);
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #72B2E1;
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
