import axios from "axios";

type TGenerationData = {
  repo_url: string;
  repo_name: string;
  tehnical: boolean;
  authToken: string;
};

type TGenerationStatusData = {
  jobId: string;
  authToken: string;
};

class GenerationFlow {
  async generateRepositoryAnalysis(data: TGenerationData) {
    const response = await axios.post(
      "http://localhost:8000/api/generate",
      {
        repo_url: data.repo_url,
        repo_name: data.repo_name,
        tehnical: data.tehnical,
      },
      {
        headers: {
          Authorization: `Bearer ${data.authToken}`,
          Accept: "application/json",
        },
      }
    );

    return response.data;
  }

  async generateStatus(data: TGenerationStatusData) {
    const response = await axios.get(
      `http://localhost:8000/api/generate/status/${data.jobId}`,
      {
        headers: {
          Authorization: `Bearer ${data.authToken}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  }
}

const GenerationFlowEntity = new GenerationFlow();

export default GenerationFlowEntity as GenerationFlow;
