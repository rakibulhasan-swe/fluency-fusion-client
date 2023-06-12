import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCourse = () => {
  const { user, loader } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: courses = [] } = useQuery({
    queryKey: ["courses"],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure(`/coursesByEmail?email=${user?.email}`);
      return res.data;
    },
  });

  return [courses, refetch];
};

export default useCourse;
