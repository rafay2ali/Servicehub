import api from "./api";

export const createBooking = async (bookingData) => {
  const response = await api.post(
    "/bookings",
    bookingData
  );

  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get(
    "/bookings/my-bookings"
  );

  return response.data;
};

export const getProviderBookings = async () => {
  const response = await api.get(
    "/bookings/provider"
  );

  return response.data;
};

export const acceptBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/accept`
  );

  return response.data;
};

export const startBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/start`
  );

  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/reject`
  );

  return response.data;
};

export const completeBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/complete`
  );

  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/cancel`
  );

  return response.data;
};


