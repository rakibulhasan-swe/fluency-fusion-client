import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCourse = () => {
  const { loader } = useContext(AuthContext);

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["courses"],
    enabled: !loader,
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/courses");
      return res.json();
    },
  });

  return [courses, refetch];
};

export default useCourse;
