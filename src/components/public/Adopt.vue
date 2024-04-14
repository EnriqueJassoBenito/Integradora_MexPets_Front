<template>
    <div>
      <div class="d-flex justify-content-center" >
      <div class="card" style="margin-top:20px; max-width: 1000px;">
  <div class="row no-gutters">
    <div class="col-md-2">
      <img src="../assets/logomexx.png" class="card-img" style="width:100%">
    </div>
    <div class="col-md-3 p-0 d-flex justify-content-start" style="color:#FFDE59">
    <p class="card-text" style="font-size: 1.5rem; font-weight: bold;">Encuentra al nuevo integrante de la familia</p>
  </div>
    <div class="col-md-7">
        <div id="form-select" style="margin:15px;">
  <div class="row">
    <div class="col-md-4">
      <select class="form-select"></select>
    </div>
    <div class="col-md-4">
      <select class="form-select"></select>
    </div>
    <div class="col-md-4">
      <select class="form-select"></select>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-md-4">
      <select class="form-select"></select>
    </div>
    <div class="col-md-4">
      <select class="form-select"></select>
    </div>
    <div class="col-md-4 d-flex align-items-center justify-content-between">
      <button class="btn btn-primary">Buscar</button>
      <button class="btn btn-secondary">Eliminar</button>
    </div>
  </div>
</div>

    </div> 
  </div>
</div>
</div>
      <div class="row" style="margin-top:25px">
        <div class="col-md-3" v-for="index in 12" :key="index">
          <b-card
            title="Card Title"
            img-src="https://www.santevet.es/uploads/images/es_ES/razas/gatocomuneuropeo.jpeg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 18rem;"
            class="mb-4"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
  
            <b-button href="#" variant="primary">Adoptar</b-button>
          </b-card>
        </div>
      </div>
    </div>
  </template>
  
<style>
</style>