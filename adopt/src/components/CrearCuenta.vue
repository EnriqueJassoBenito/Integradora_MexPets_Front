<template>
    <div class="my-5">
<h1 class="text-center">Crear cuenta</h1>
  <b-card bg-variant="light" style="max-width: 50rem;" class="mx-auto">
    <b-form-group
      label-cols-lg="3"
      label="Ingresa información"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
      
    >
      <b-form-group
        label="Nombre:"
        label-for="name"
        label-cols-sm="3"
        label-align-sm="right"
        required
      >
        <b-form-input id="name"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Correo:"
        label-for="email"
        label-cols-sm="3"
        label-align-sm="right"
        required
      >
        <b-form-input id="email"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Telefono:"
        label-for="phone"
        label-cols-sm="3"
        label-align-sm="right"
        required
      >
        <b-form-input id="phone"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Ciudad:"
        label-for="nested-city"
        label-cols-sm="3"
        label-align-sm="right"
        required
      >
        <b-form-input id="nested-city"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Estado:"
        label-for="nested-state"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-state"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Pais:"
        label-for="nested-country"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-country"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form-group>
  </b-card>




  
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>