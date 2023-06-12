import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useEnrolled = () => {
  const { user, loader } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: enrolled = [] } = useQuery({
    queryKey: ["enrolled", user?.email],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure(`/enrolled?email=${user?.email}`);
      return res.data;
    },
  });

  return [enrolled, refetch];
};

export default useEnrolled;
