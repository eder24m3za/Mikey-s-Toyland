<template>
    <div v-if="product">
      <h1>Detalles del Producto</h1>
      <p>
        <strong>Nombre:</strong> {{ product.name }}<br />
        <strong>Precio:</strong> {{ product.price }}<br />
        <strong>Descripción:</strong> {{ product.description }}<br />
        <strong>Empresa:</strong> {{ product.company }}<br />
        <strong>Tamaño:</strong> {{ product.size }}
      </p>
      <button @click="$router.push('/')">Volver</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'], // Recibe el parámetro `id` desde la URL.
    data() {
      return {
        product: null,
      };
    },
    mounted() {
      axios
        .get(`http://127.0.0.1:3000/toys/${this.id}`) // Cambia la URL si es necesario.
        .then((response) => {
          this.product = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
  </script>
  
  
    
    <style scoped>
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      margin: 20px;
      color: white;
      height: 200px;
      width: 400px;
      background-color: #132d46;
      border-radius: 30px;
      left: 50px;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;    
    }
    button {
      padding: 10px 20px;
      background-color: #01c38d;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
  </style>