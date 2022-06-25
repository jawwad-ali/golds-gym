import { useState } from "react";
import { Box } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";

const Home = () => {
  const [bodyPart, setBodyPart] = useState<string>("all");
  const [exercises, setExercises] = useState<string[]>([]);

  return (
    <Box> 
      <HeroBanner /> 
      <SearchExercises 
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises 
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box> 
  );
};

export default Home;