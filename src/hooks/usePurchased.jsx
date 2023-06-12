import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePurchased = () => {
  const { user, loader } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: purchased = [], refetch } = useQuery({
    queryKey: ["purchased", user?.email],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure(`/purchased?email=${user?.email}`);
      return res.data;
    },
  });

  return [purchased, refetch];
};

export default usePurchased;
