<template>
  <div class="card-container">
    <b-card v-for="animal in animals" :key="animal.id" :title="animal.name" :img-src="animal.image" img-alt="Animal Image"
      class="mb-3 custom-card">
      <p class="card-text">{{ animal.description }}</p>
      <b-button @click="adoptAnimal(animal.id)" variant="success">Adoptar</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animals: [
        {
          id: 1,
          name: 'Perro',
          image: 'https://example.com/dog.jpg',
          description: 'Un perro juguetón y amigable en busca de un hogar.',
        },
        {
          id: 2,
          name: 'Gato',
          image: 'https://example.com/cat.jpg',
          description: 'Un gato tranquilo y cariñoso esperando ser adoptado.',
        },
        {
          id: 3,
          name: 'Perro',
          image: 'https://example.com/cat.jpg',
          description: 'Perro amable',
        },
        // Agrega más animales según sea necesario
      ],
    };
  },
  methods: {
    adoptAnimal(animalId) {
      // Lógica para manejar la adopción del animal (puede ser una llamada a la API, etc.)
      alert(`¡Has adoptado al animal con ID ${animalId}!`);
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row-reverse;
  /* Dirección de derecha a izquierda */
  justify-content: space-between;
  /* Espaciado entre las tarjetas */
  padding: 15px;
  /* Espaciado alrededor del contenedor */
}

.custom-card {
  max-width: 300px;
  width: 100%;
  /* Hace que cada tarjeta ocupe todo el ancho disponible */
}</style>
