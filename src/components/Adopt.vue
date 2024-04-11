<template>
    <div>
      <h1>Adopt</h1>
      <div class="row">
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