<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5">
        <b-table :items="animalData" :fields="fields" striped hover></b-table>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        { key: 'species', label: 'Especie' },
        { key: 'age', label: 'Edad' }
        // Agrega más campos según tus necesidades
      ],
      animalData: [
        { id: 1, name: 'León', species: 'Felino', age: 5 },
        { id: 2, name: 'Elefante', species: 'Mamífero', age: 10 },
        // Agrega más datos de animales según tus necesidades
      ]
    };
  }
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
