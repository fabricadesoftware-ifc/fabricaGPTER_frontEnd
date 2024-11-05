import axios from 'axios';

export default class PatientService {
  async getPatients() {
    const response = await axios.get('/patients/');
    return response.data.results;
  }

  async getPatientById(patient_id) {
    const response = await axios.get(`/patients/?patient__id=${patient__id}`);
    return response.data.results;
  }
}