import React from "react";
import DynamicTitle from "../../Components/DynamicTitle";
import Slider from "./Slider";
import Blog from "./Blog";

const Home = () => {
  return (
    <>
      <DynamicTitle title={"Home"} />
      <Slider />
      <Blog />
    </>
  );
};

export default Home;
