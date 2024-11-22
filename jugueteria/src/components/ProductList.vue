<template>
  <div>
    <h1>Lista de Productos</h1>
    <table>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <router-link :to="'/product/' + product.id">
              <img :src="'http://127.0.0.1:3000/images/' + product.image" alt="">
            </router-link>
          </td>
          <td>
            <router-link :to="'/product/' + product.id">{{ product.name }}</router-link>
          </td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.company }}</td>
          <td>{{ product.size }}</td>
          <td>
            <router-link :to="'/productEdit/' + product.id">
              <button>Editar</button>
            </router-link>
            <button @click="showModal(product)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
    <button @click="nextPage" :disabled="!hasMore">Siguiente</button>

    <!-- Modal de confirmación -->
    <ConfirmModal
      :visible="isModalVisible"
      @confirm="deleteProduct"
      @cancel="hideModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ConfirmModal from './DeleteConfirmation.vue';

export default {
  components: { ConfirmModal },
  data() {
    return {
      products: [],
      currentPage: 1,
      hasMore: true,
      isModalVisible: false,
      productToDelete: null,
    };
  },
  mounted() {
    axios
      .get('http://127.0.0.1:3000/toys')
      .then((response) => {
        this.products = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    showModal(product) {
      this.productToDelete = product;
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
      this.productToDelete = null;
    },
    deleteProduct() {
      axios
        .delete(`http://127.0.0.1:3000/toys/${this.productToDelete.id}`)
        .then(() => {
          this.products = this.products.filter(
            (p) => p.id !== this.productToDelete.id
          );
          this.hideModal();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    prevPage() {
      this.currentPage -= 1;
    },
    nextPage() {
      this.currentPage += 1;
    },
  },
};
</script>

