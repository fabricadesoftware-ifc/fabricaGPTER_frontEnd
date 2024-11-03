import axios from 'axios';

export default class PatientService {
  async getPatients() {
    const response = await axios.get('/patients/');
    return response.data.results;
  }

  async getPatientByCategory(category_id) {
    const response = await axios.get(`/patients/?category__id=${category_id}`);
    return response.data.results;
  }
}