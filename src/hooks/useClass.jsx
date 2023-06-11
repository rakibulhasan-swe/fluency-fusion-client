import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useClass = () => {
  const { loader } = useContext(AuthContext);
  // const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: allClass = [] } = useQuery({
    queryKey: ["classes"],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure(`/classes`);
      return res.data;
    },
  });

  return [allClass, refetch];
};

export default useClass;
