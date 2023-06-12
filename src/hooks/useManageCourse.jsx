import { useQuery } from "@tanstack/react-query";

const useManageCourse = () => {
  const {
    data: courses = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_URL}/courses`);
      return res.json();
    },
  });

  return [courses, loading, refetch];
};

export default useManageCourse;
