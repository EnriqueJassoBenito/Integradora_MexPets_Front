<template>
  <div class="page-container" fluid style="margin: 0; padding: 0;">
    <b-navbar class="navbar" toggleable="md" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">
            <img src="../assets/logomexx.png" alt="Logo" width="50" height="50" class="d-inline-block align-top">
            MexPets
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
                <b-nav-item :to="{ name: 'nosotros' }" @click="selectOption('nosotros')"
                    :class="{ 'active': selectedOption === 'nosotros' }">Nosotros</b-nav-item>
                <b-nav-item :to="{ name: 'animals' }" @click="selectOption('animals')"
                    :class="{ 'active': selectedOption === 'animals' }">Mascotas</b-nav-item>
                <b-nav-item :to="{ name: 'tips' }" @click="selectOption('tips')"
                    :class="{ 'active': selectedOption === 'tips' }">Tips</b-nav-item>
                <b-nav-item :to="{ name: 'adoption' }" @click="selectOption('adoption')"
                    :class="{ 'active': selectedOption === 'adoption' }">Adopción</b-nav-item>
                <b-nav-item :to="{ name: 'login' }" @click="selectOption('login')"
                    :class="{ 'active': selectedOption === 'login' }">Mi cuenta</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  <div class="background-image-container" style="overflow:hidden;">
    <h1 class="title">MEXPETS</h1>
    <h2 class="slogan">"Transformando vidas, una pata a la vez."</h2>
    <button  class="btnAdoptar">Adoptar</button>
    <button class="btnDar">Dar en adopción</button>

  </div>
  <div class="yellow-space"></div>

</div>
</template>

<script>
export default {
}
</script>

<style>
.page-container {
  width: 100%;
  overflow-x: hidden;
}
.background-image-container {
  background-image: url('../assets/fond.jpeg');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.btnAdoptar{
    position: absolute;
    top: 60%;
    left: 10%;
    color: rgb(0, 0, 0);
    background-color:  rgba(255, 248, 57, 0.899);
    border: 0cap;
    border-radius: 20px;
    height: 50px;
    width: 150px;
}
.btnDar{
    position: absolute;
  top: 60%;
  left: 25%;
  color: rgb(0, 0, 0);
    background-color:  rgba(255, 248, 57, 0.899);
    border: 0cap;
    border-radius: 20px;
    height: 50px;
    width: 150px;
}
.title{
    margin-top: 150px;
    margin-left: 80px;
    font-size: 100px;
    color: white;
    font-weight: bold;
}
.slogan{
margin-top: 50px;
margin-left: 80px;
color: rgb(51, 35, 12);
}
.yellow-space {
  background-color: rgb(1, 173, 44);
  height: 200px;
}
.navbar {
    background-color: #392915;
    padding-top: 10px;
    width: 100%;
}

.navbar-nav .nav-item.active {
    background-color: #F0BB00;
    border-radius: 10px 10px 0px 0px;
}
#btn_adopt{
    align-items: right;
    margin-left: 1000px;
    margin-bottom: 10px;
}
#btn_dar{
    align-items: left;
}
@media (max-width: 768px) {
  .btnAdoptar {
    top: 50%;
    left: 5%;
  }

  .btnDar {
    top: 50%;
    left: 60%;
  }
  .title{
    top: 50%;    
    left: 3%;
    font-size: 50px;
    color: white;
    font-weight: bold;
}
}
</style>