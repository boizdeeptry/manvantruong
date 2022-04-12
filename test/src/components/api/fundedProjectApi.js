import apiConfig from "./apiConfig";

export const callApi = (filter) => {
    return apiConfig.post("/filter", filter);
};