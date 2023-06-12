import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCourse = () => {
  const { loader } = useContext(AuthContext);

  const { refetch, data: courses = [] } = useQuery({
    queryKey: ["courses"],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure(`/courses`);
      return res.data;
    },
  });

  return [courses, refetch];
};

export default useCourse;
