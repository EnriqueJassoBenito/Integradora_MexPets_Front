import axios from "axios";

let lc = "localhost:8080";
const url_api_adoption = `http://${lc}/api/adoption/`;

const onGetAllAdoption = async () => {
  try {
    const response = await axios.get(`${url_api_adoption}`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const onGetAdoptionById = async (id) => {
  try {
    const response = await axios.get(`${url_api_adoption}/${id}`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


const getPendingAdoptions = async () => {
  try {
    const response = await axios.get(`${url_api_adoption}pending`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const getApprovedAdoptions = async () => {
  try {
    const response = await axios.get(`${url_api_adoption}managed`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const insertAdoption = async (adoptionDto, imageFiles) => {
  try {
    console.log("Datos adopcion:", adoptionDto)
    const formData = new FormData();

    Object.keys(adoptionDto).forEach(key => {
      formData.append(key, adoptionDto[key]);
    });

    imageFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });
    console.log("Contenido de formData:");
        for (const entry of formData.entries()) {
            console.log(entry[0] + ': ' + entry[1]);
        }
    const response = await axios.post(`${url_api_adoption}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Respuesta del servidor:", response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const updateAdoption = async (id, adoptionData, imageFiles) => {
  try {
    const formData = new FormData();
    formData.append('adoptionDto', JSON.stringify(adoptionData));
    if (imageFiles) {
      imageFiles.forEach((file) => {
        formData.append('imageFiles', file);
      });
    }

    const response = await axios.put(`${url_api_adoption}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const cancelAdoption = async (id) => {
  try {
    const response = await axios.delete(`${url_api_adoption}/${id}`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export default {
  onGetAllAdoption,
  onGetAdoptionById,
  getPendingAdoptions,
  getApprovedAdoptions,
  insertAdoption,
  updateAdoption,
  cancelAdoption
};
