<template>
    <div>
      <button @click="$emit('changePage', currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }}</span>
      <button @click="$emit('changePage', currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['currentPage', 'totalPages'],
  };
  </script>
  