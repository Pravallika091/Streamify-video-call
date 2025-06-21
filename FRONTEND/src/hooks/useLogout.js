import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.clear();
      localStorage.clear();  // if you store tokens
      navigate("/login", { replace: true });
    },
  });

  return { logoutMutation: mutate, isPending, error };
};

export default useLogout;
