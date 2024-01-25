<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <b-table :items="categories" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button @click="deleteCategory(data.item.id)" variant="danger">Eliminar</b-button>
      </template>
    </b-table>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { id: 1, name: 'Gatos', description: 'Categoría de gatos en adopción' },
        { id: 2, name: 'Perros', description: 'Categoría de perros en adopción' },
        // Agrega más categorías según sea necesario
      ],
      fields: ['id', 'name', 'description', 'actions']
    };
  },
  methods: {
    deleteCategory(categoryId) {
      // Lógica para eliminar la categoría, por ejemplo, emitir un evento o hacer una solicitud HTTP
      console.log(`Eliminar categoría con ID: ${categoryId}`);
    }
  }
};
</script>

<style>
/* Puedes agregar estilos personalizados aquí */
</style>
