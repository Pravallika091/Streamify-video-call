import { axiosInstance } from "./axios";

// AUTH
export const signup = async (signupData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
  } catch (err) {
    console.error("Signup failed:", err);
    throw err;
  }
};

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (err) {
    console.error("Error in getAuthUser:", err);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
  } catch (err) {
    console.error("Onboarding failed:", err);
    throw err;
  }
};

// FRIENDS
export const getUserFriends = async () => {
  try {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
  } catch (err) {
    console.error("Get friends failed:", err);
    throw err;
  }
};

export const getRecommendedUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (err) {
    console.error("Get recommended users failed:", err);
    throw err;
  }
};

export const getOutgoingFriendReqs = async () => {
  try {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data;
  } catch (err) {
    console.error("Get outgoing friend requests failed:", err);
    throw err;
  }
};

export const sendFriendRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Send friend request failed:", err);
    throw err;
  }
};

export const getFriendRequests = async () => {
  try {
    const response = await axiosInstance.get("/users/friend-requests");
    return response.data;
  } catch (err) {
    console.error("Get friend requests failed:", err);
    throw err;
  }
};

export const acceptFriendRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data;
  } catch (err) {
    console.error("Accept friend request failed:", err);
    throw err;
  }
};

// CHAT
export const getStreamToken = async () => {
  try {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
  } catch (err) {
    console.error("Get stream token failed:", err);
    throw err;
  }
};
