<template>
  <div>
    <h1>Articoli Scire</h1>

    <div v-if="articoli" class="masonry-grid">
      <div 
        v-for="(articolo, index) in articoli" 
        :key="index" 
        @click="vaiADettaglio(articolo.id)" 
        class="articolo">
        <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
        <h2>{{ articolo.title }}</h2>
        <p v-if="articolo['di ']" class="autore">di {{ articolo['di '] }}</p>
        <p class="data">{{ articolo.created }}</p>
      </div>
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
        id: node.node.id // Assicurati di avere l’ID del nodo
      }));
    } catch (error) {
      console.error("Errore nel recupero dei dati JSON:", error);
    }
  },
  methods: {
    vaiADettaglio(id) {
      this.$router.push(`/articolo/${id}`);
    }
  }
};
</script>

<style scoped>
/* Stili per la griglia */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
  cursor: pointer;
}

.articolo {
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.articolo:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
