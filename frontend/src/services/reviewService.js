import api from "./api";

export const createReview = async (reviewData) => {
  const response = await api.post(
    "/reviews",
    reviewData
  );

  return response.data;
};


export const getProviderReviews = async (
  providerId
) => {
  const response = await api.get(
    `/reviews/provider/${providerId}`
  );

  return response.data;
};

export const getMyReviews = async () => {
  const response = await api.get(
    "/reviews/my-reviews"
  );

  return response.data;
};


export const updateReview = async (
  reviewId,
  reviewData
) => {
  const response = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );

  return response.data;
};

export const deleteReview = async (
  reviewId
) => {
  const response = await api.delete(
    `/reviews/${reviewId}`
  );

  return response.data;
};