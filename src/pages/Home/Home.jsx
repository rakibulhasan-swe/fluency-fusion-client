import React from "react";
import DynamicTitle from "../../Components/DynamicTitle";
import Slider from "./Slider";
import Blog from "./Blog";
import PopularClass from "./PopularClass";
import PopularInstructor from "./PopularInstructor";

const Home = () => {
  return (
    <>
      <DynamicTitle title={"Home"} />
      <Slider />
      <PopularClass />
      <PopularInstructor />
      <Blog />
    </>
  );
};

export default Home;
