<template>
  <div class="page-container">
  <div class="background-image-container" style="overflow:hidden;">
    <h1 class="title">MEXPETS</h1>
    <h2 class="slogan">"Transformando vidas, una pata a la vez."</h2>
    <button  class="btnAdoptar">Adoptar</button>
    <button class="btnDar">Dar en adopción</button>

  </div>
  <div class="yellow-space">
    <div class="row" >
      <div class="col" style="margin-top:40px; margin-left: 25px">
        <img src="../assets/finalPage.webp" width="70%" style="margin-bottom: 30px;">
        <h6>En 2022 registró la cifra más alta de delitos de maltrato animal de los últimos cuatro años</h6>
        <h6>En México, más del 70% de los perros se encuentra en una situación de calle, mientras que para el caso de los gatos es más del 60%.</h6>
     
      </div>
      <div class="col" style="margin-top:20px; ;">
        <h5>Misión:</h5>
        <h6>Nos esforzamos por promover la adopción responsable, educar a la comunidad sobre el bienestar animal y trabajar incansablemente para reducir el número de animales sin hogar. Creemos en el poder transformador del amor y la compasión, y estamos comprometidos a cambiar vidas, una pata a la vez.</h6>
        <img src="../assets/perro.webp" width="70%" style="margin-bottom: 30px;">
        <h1>Se parte del cambio</h1>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
}
</script>

<style>

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
  background-color: #f1dd00;
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