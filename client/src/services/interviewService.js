import api from "./api";

export const createInterview =
  async (data) => {

    const response =
      await api.post(
        "/interviews/create",
        data
      );

    return response.data;
};

export const getInterview =
  async (id) => {

    const response =
      await api.get(
        `/interviews/${id}`
      );

    return response.data;
};