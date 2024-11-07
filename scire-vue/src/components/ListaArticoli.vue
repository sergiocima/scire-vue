<template>
  <div>
    <h1>Articoli</h1>
    <div v-if="articoli" class="masonry-grid">
      <div v-for="(articolo, index) in articoli" :key="index" class="articolo">
        <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
        <h2>{{ articolo.title }}</h2>
        <!-- Usa "articolo['di ']" per accedere alla chiave con spazio -->
        <p v-if="articolo['di ']" class="autore">Autore: {{ articolo['di '] }}</p>
        <p class="data">Data: {{ articolo.created }}</p>
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
      console.log("Stato risposta:", response.status); // Logga lo status
      const data = await response.json();
      console.log("Dati ricevuti:", data); // Logga i dati ricevuti
      this.articoli = data.nodes.map(node => node.node);
    } catch (error) {
      console.error("Errore nel recupero dei dati JSON:", error);
    }
  }
};
</script>

<style scoped>
/* CSS aggiornato per la griglia */
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.articolo:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.articolo img {
  width: 100%;
  height: auto;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.articolo h2 {
  font-size: 1.2rem;
  color: #333;
  margin: 10px 15px 5px;
}

.articolo p {
  font-size: 0.9rem;
  color: #666;
  margin: 5px 15px;
}

.articolo p.autore {
  color: #007acc;
}

.articolo p.data {
  color: #ff6347;
  font-size: 0.8rem;
}
</style>
