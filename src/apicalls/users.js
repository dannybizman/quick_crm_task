import axios from "axios";

export const fetchUserData = async (accessToken) => {
  try {
    const response = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
      },
    });

    console.log("User Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};


export const getAllUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    return data.users; // Return only the users array
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array in case of an error
  }
};
 