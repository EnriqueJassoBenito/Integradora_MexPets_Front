<template>
  <div>
    <h3>Login</h3>
    <input type="text" placeholder="Igresar correo">
    <input type="text" placeholder="Igresar contraseña">
    <b-nav-item :to="{ name: 'inicio' }">Inicio</b-nav-item>
    <b-button :to="{ name: 'inicio' }" variant="primary">Primary</b-button>
  </div>
</template>

<script>
export default {
onClick() {
}
}
</script>

<style>

</style>