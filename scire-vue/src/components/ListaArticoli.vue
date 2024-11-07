<template>
  <div>
    <h1>Articoli Scire</h1>
    <div v-if="articoli" class="masonry-grid">
      <!-- Usa <router-link> per navigare alla pagina dei dettagli -->
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
        ...node.node,
        id: node.node.id // Assicurati che l'ID sia presente
      }));
    } catch (error) {
      console.error("Errore nel recupero dei dati JSON:", error);
    }
  }
};
</script>

<style scoped>
/* Stile per la griglia */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
}

.articolo {
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.articolo:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
