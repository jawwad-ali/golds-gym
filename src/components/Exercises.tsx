import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

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

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;  

  const indexOfLastExercise = currentPage * exercisesPerPage;

  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e: any, value: any) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  // Select Exercise by BodyPart
  useEffect(() => {
    const fetchExerciseByCategory = async () => {
      let exerciseData = [] 

      if(bodyPart === "all"){
        exerciseData = await fetchData("https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions)
      }
      else {
        exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
        exerciseOptions) 
      }
      setExercises(exerciseData)
    } 
    fetchExerciseByCategory()
  },[bodyPart])

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
        {currentExercises.map((ex: any, index: any) => (
          <ExerciseCard key={index} exercise={ex} />
        ))}
      </Stack> 

      {/* Pagination */} 
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;