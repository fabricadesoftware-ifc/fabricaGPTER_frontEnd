<script setup>
import { onMounted, reactive, ref } from 'vue';

import ModalAddPatient from '@/components/ModalAddPatient.vue';
import { usePatientStore } from '@/stores/patient';
import { useUploaderStore } from '@/stores/uploader';

const patientStore = usePatientStore();
const uploaderStore = useUploaderStore();


const showModal = ref(false);

const file = ref(null);
const previewImage = ref('');

const patient = reactive({
  title: '',
  description: '',
  patient: '',
  image_attachment_key: '',
  price: '',
  stock: '',
});

// const uploadImage = (e) => {
//   file.value = e.target.files[0];
//   previewImage.value = URL.createObjectURL(e.target.files[0]);
// };

async function save() {
  patient.image_attachment_key = await uploaderStore.uploadImage(file.value);
  await patientStore.createProduct(patient);
  Object.assign(patient, {
    name: '',
    cpf: '',
    email: '',
  });
}

onMounted(async () => {
  await patientStore.getPatients();
});
</script>
<template>
  <p>oi</p>
  <h1>Adicionar Pacientes</h1>
  <form class="form" @submit.prevent="save">
    <div class="row-form">
      <label for="title">Nome</label>
      <input type="text" id="title" v-model="patient.title" />
    </div>
    <div class="row-form">
      <label for="description">CPF</label>
      <textarea id="description" v-model="patient.description"></textarea>
    </div>
    <div class="row-form">
      <label for="patient">Data de Nascimento</label>
      <div class="row ">
        <select id="patient" v-model="patient.patient">
          <option
            v-for="patient in patientStore.id"
            :key="patient.id"
            :value="patient.id"
          >
            {{ patient.name }}
          </option>
        </select>

      </div>
    </div>

    <button class="btn-send" type="submit">Adicionar</button>
  </form>
  

  <modal-add-patient v-if="showModal" @close="showModal = !showModal" />
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  margin-left: 2rem;
}

.row-form {
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  max-width: 400px;
}

.form button.btn-send {
  background-color: #0a2668;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
  width: 200px;
}

.form button.btn-icon {
  background-color: #0a2668;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
}

.previewImage {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #0a2668;
  padding: 0.1rem;
}
</style>
