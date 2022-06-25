import React from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
// import Loader from './Loader';

interface ExerciseData {
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
}

interface Exercise {
  setExercises: React.Dispatch<React.SetStateAction<string[]>>;
  exercises: ExerciseData[] | string[];
  bodyPart: string;
}

const Exercises = ({ setExercises, bodyPart, exercises }: Exercise) => {
  console.log(exercises);
  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
      >
        {exercises.map((ex: any, index: any) => (
          <ExerciseCard key={index} exercise={ex}  />
        ))}
      </Stack>
    </Box>
  );
};

export default Exercises;
// 1.21.44
