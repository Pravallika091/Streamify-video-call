import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
import { useLocation } from "react-router-dom";

const useAuthUser = () => {
  const location = useLocation();

  const authUserQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    enabled: location.pathname !== "/login", // Don’t fetch auth user if already on login page
  });

  return {
    isLoading: authUserQuery.isLoading,
    authUser: authUserQuery.data?.user,
  };
};

export default useAuthUser;
