import React, { useState } from "react";
import Navbar from "../Components/Navbar";

import EmtpyTasks from "../Components/EmtpyTasks";
import Tasks from "../Components/Tasks";

const Home = () => {
  return (
    <div>
      {/* <EmtpyTasks /> */}
      <Tasks />
    </div>
  );
};

export default Home;
