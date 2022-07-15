import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { exerciseOptions, fetchData, YoutubeOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";

interface ISomeData {
  name: string; 
}

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState<ISomeData>({ name: "" });
  const [exerciseVideos, setExerciseVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      // Related Exercise
      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      // Video Recommedation
      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
        YoutubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);
    };
    fetchExerciseData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
    </Box>
  );
};

export default ExerciseDetail;
