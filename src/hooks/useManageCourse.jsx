import { useQuery } from "@tanstack/react-query";

const useManageCourse = () => {
  const {
    data: courses = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/courses");
      return res.json();
    },
  });

  return [courses, loading, refetch];
};

export default useManageCourse;
