<script setup>
import { onMounted } from 'vue';
import { usePatientStore } from '@/stores/patient';

const patientStore = usePatientStore();

async function getPatients() {
  await patientStore.getPatients();
}

onMounted(async () => {
  await getPatients();
});
</script>

<template>
  <div class="product-list">
    <div v-if="patientStore.patients.length === 0">
      <h3 class="spam">Produtos não encontrados!</h3>
    </div>
    <div v-for="patient in patientStore.patients"
      :key="patient.id">
    </div>
    <div
      v-for="patient in patientStore.patients"
      :key="patient.id"
      class="produto-card"
    >
    <div class="product-card">
        <p>{{ patient.name }}</p><br>
        <p>{{ patient.cpf }}</p><br>
        <p>{{ patient.email }}</p>        
        <p>{{ patient.birth_date }}</p>        
      </div>
      </div>
    </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
}

.product-card {
  width: 225px;
  font-family: 'Belleza', sans-serif;
  display: flex;
  flex-direction: column;
  margin-top: 30px;

}

.product-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: top;
  gap: 0.5rem;
  padding-top: 20px;
  margin-bottom: 1rem;
  background-color: #eeeeee;
  height: 201px;
}

.product-img-wrapper img {
  width: 153px;
  height: 170px;
  object-fit: cover;
}

.product-title-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.product-title-price p {
  font-weight: bold;
  font-size: 16px;
  color: #010101;
}

</style>