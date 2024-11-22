<template>
  <div v-if="product">
    <form  @submit.prevent="submitForm">
      <div>
        <label>Nombre:</label>
        <input v-model="product.name" required />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" v-model="product.price" required />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="file" @change="onFileChange" accept="image/*" required />
      </div>
        <div>
          <label>Descripción:</label>
          <input type="text" v-model="product.description" required />
        </div>
        <div>
        <label>Empresa:</label>
          <input type="text" v-model="product.company" required />
        </div>
        <div>
        <label>Tamaño:</label>
          <input type="text" v-model="product.size" required />
        </div>
      <button type="submit">Guardar</button>
    </form>
  </div>
    <div v-else>
    <p>Cargando...</p>
  </div>
  </template>
  
  <script>
import axios from 'axios';
  export default {
    props: ['id'],
    data() {
      return {
        name :'',
        price: '',
        image: '',
        description: '',
        company: '',
        size: '',
        product: null,
      };
    },
    mounted() {
      axios
        .get(`http://127.0.0.1:3000/toys/${this.id}`)
        .then((response) => {
          this.product = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        this.image = file;
      },

      async submitForm () {
        const formdata = new FormData();
        formdata.append('name', this.product.name);
        formdata.append('price', this.product.price);
        formdata.append('image', this.image);
        formdata.append('description', this.product.description);
        formdata.append('company', this.product.company);
        formdata.append('size', this.product.size);
        try {
            const respuesta = await axios.put(`http://127.0.0.1:3000/toys/${this.id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            window.location.href = '/'; // Redirige a la raíz
        } catch (error) {
            if (error.response) {
            // Manejo de errores con respuesta del servidor
            console.log(`Error con estado ${error.response.status}:`, error.response.data);
            } else {
            // Otros errores (como problemas de red)
            console.log('Error de red o desconocido:', error.message);
            }
        }
      },
    },
  };
  </script>

  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    margin: 20px;
    color: white;
    height: 500px;
    width: 400px;
    background-color: #132d46;
    border-radius: 30px;
    left: 50px;
  }
  label {
    font-size: 18px;
    font-weight: bold;
  }
  input {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  button {
    padding: 10px 20px;
    background-color: #01c38d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #01a275;
  }
  button:active {
    background-color: #00875a;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  button:disabled:hover {
    background-color: #ccc;
  }
  button:disabled:active {
    background-color: #ccc;
  }
  
</style>
  