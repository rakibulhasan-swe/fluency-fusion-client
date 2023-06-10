import React, { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import Cards from "../../Components/Cards";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    fetch("blogs.json")
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container py-5">
      <SectionTitle
        heading={"Our Blog"}
        subHeading={"Latest Blog & Articles"}
      />
      <div className="row g-4 pt-5 d-flex justify-content-center align-items-center">
        {blog.map((singleBlog) => (
          <Cards key={singleBlog.id} singleBlog={singleBlog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
