<template>
  <div v-if="articolo">
    <h1>{{ articolo.title }}</h1>
    <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
    <p>di {{ articolo['di '] }}</p>
    <p>{{ articolo.created }}</p>
  </div>
  <div v-else>
    <p>Caricamento in corso...</p>
  </div>
</template>

<script>
export default {
  props: ['Nid'],
  data() {
    return {
      articolo: null
    };
  },
  async created() {
    try {
      const response = await fetch(`${this.Nid}?_format=json`);
      this.articolo = await response.json();
    } catch (error) {
      console.error("Errore nel caricamento dei dati JSON:", error);
    }
  }
};
</script>
