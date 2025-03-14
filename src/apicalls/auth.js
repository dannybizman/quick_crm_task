import axios from "axios";

export const loginAPI = async (userData) => {
  try {
    console.log("Making API call with:", userData);
    const response = await axios.post("https://dummyjson.com/auth/login", userData, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};
