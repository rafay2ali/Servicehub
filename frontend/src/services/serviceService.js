
import api from "./api";

export const getAllServices = async (params = {}) => {
  const response = await api.get("/services", {
    params,
  });

  return response.data;
};

export const getServiceById = async (serviceId) => {
  const response = await api.get(
    `/services/${serviceId}`
  );

  return response.data;
};

export const createService = async (serviceData) => {
  const formData = new FormData();

  formData.append(
    "title",
    serviceData.title
  );

  formData.append(
    "description",
    serviceData.description
  );

  formData.append(
    "category",
    serviceData.category
  );

  formData.append(
    "price",
    serviceData.price
  );

  formData.append(
    "location",
    serviceData.location
  );


  if (serviceData.image) {
    formData.append(
      "image",
      serviceData.image
    );
  }


  const response = await api.post(
    "/services",
    formData
  );

  return response.data;
};

export const updateService = async (
  serviceId,
  serviceData
) => {

  const response = await api.put(
    `/services/${serviceId}`,
    serviceData
  );

  return response.data;
};

export const deleteService = async (
  serviceId
) => {

  const response = await api.delete(
    `/services/${serviceId}`
  );

  return response.data;
};