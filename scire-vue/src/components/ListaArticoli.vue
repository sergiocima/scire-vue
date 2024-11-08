<template>
  <div>
    <h1>Articoli Scire</h1>
    <div v-if="articoli" class="masonry-grid">
      <router-link
        v-for="(articolo, index) in articoli"
        :key="index"
        :to="`/articolo/${articolo.id}`"
        class="articolo"
      >
        <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
        <h2>{{ articolo.title }}</h2>
        <p v-if="articolo['di ']" class="autore">di {{ articolo['di '] }}</p>
        <p class="data">{{ articolo.created }}</p>
      </router-link>
    </div>
    <div v-else>
      <p>Caricamento in corso...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaArticoli',
  data() {
    return {
      articoli: null
    };
  },
  async created() {
    try {
      const response = await fetch('/api/getJson');
      const data = await response.json();
      this.articoli = data.nodes.map(node => ({
        ...node.node
      }));
    } catch (error) {
      console.error("Errore nel recupero dei dati JSON:", error);
    }
  }
};
</script>
