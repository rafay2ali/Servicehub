import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;
};

export const getDashboardAnalytics = async () => {
  const response = await api.get(
    "/admin/dashboard/analytics"
  );

  return response.data;
};