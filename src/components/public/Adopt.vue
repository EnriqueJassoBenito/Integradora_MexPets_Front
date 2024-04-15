<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="card" style="margin-top:20px; max-width: 1000px;">
        <div class="row no-gutters">
          <div class="col-md-2">
            <img src="../../assets/logomexx.png" class="card-img" style="width:100%">
          </div>
          <div class="col-md-3 p-0 d-flex justify-content-start align-items-center" style="color:#FFDE59">
            <p class="card-text" style="font-size: 1.5rem; font-weight: bold;">Encuentra al nuevo integrante de la familia</p>
          </div>
          <div class="col-md-7">
            <div id="form-select" style="margin:15px;">
              <div class="row">
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select">
                    <b-form-select-option :value="null">Tipo</b-form-select-option>
                  </select>
                </div>
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select">
                    <b-form-select-option :value="null">Raza</b-form-select-option>
                  </select>
                </div>
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select">
                    <b-form-select-option :value="null">Personalidad</b-form-select-option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select">
                    <b-form-select-option :value="null">Sexo</b-form-select-option>
                  </select>
                </div>
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select">
                    <b-form-select-option :value="null">Edad</b-form-select-option>
                  </select>
                </div>
                <div class="col-md-4">
                  <select class="form-select form-select-lg custom-select">
                    <b-form-select-option :value="null">Color</b-form-select-option>
                  </select>
                </div>
                <div class="col-md-4 d-flex align-items-center justify-content-between" style="margin-top:15px;">
                  <button class="btn btn-primary" style="margin-right: 15px;">Buscar</button>
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
          title="Título de la Tarjeta"
          img-src="https://www.santevet.es/uploads/images/es_ES/razas/gatocomuneuropeo.jpeg"
          img-alt="Imagen"
          img-top
          tag="article"
          style="max-width: 18rem;"
          class="mb-4"
        >
          <b-card-text>
            Algunos ejemplos rápidos de texto para construir en el título de la tarjeta y conformar la mayor parte del contenido de la tarjeta.
          </b-card-text>
          <b-button href="#" variant="primary" class="mt-auto">Adoptar</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<style>

</style>
