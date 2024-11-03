import { ref } from 'vue';
import { defineStore } from 'pinia';
import PatientService from '@/services/patient';

const patientService = new PatientService();

export const usePatientStore = defineStore('patient', () => {
  const patients = ref([]);

  async function getPatients() {
    patients.value = await patientService.getPatients();
  }

  async function getPatientsByCategory(category_id) {
    patients.value = await patientService.getPatientByCategory(category_id);
  }

  return { patients, getPatients, getPatientsByCategory };
});