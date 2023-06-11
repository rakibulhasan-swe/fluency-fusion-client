import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCourse = () => {
  const { user, loader } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["courses", user?.email],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure(`/coursesByEmail?email=${user?.email}`);
      return res.data;
    },
  });

  return [courses, refetch];
};

export default useCourse;
