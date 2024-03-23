<template>
  <div fluid >
  <div class="background-image-container" style="overflow:hidden;">
    <h1 class="title">MEXPETS</h1>
    <h2 class="slogan">"Transformando vidas, una pata a la vez."</h2>
    <button  class="btnAdoptar">Adoptar</button>
    <button class="btnDar">Dar en adopción</button>
    <footer class="footer">
      <div class="container">
        <span class="text-muted">Tu información de pie de página aquí</span>
      </div>
    </footer>
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
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
}
.fluid {
  margin-bottom: 60px;
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
    margin-left: 80px;
    font-size: 50px;
    color: white;
    font-weight: bold;
}
}
</style>