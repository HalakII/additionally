import configuration from "../configuration";

const apiBasePath = `${configuration.apiUrl}/3`;

async function get<TBody>(relativeUrl: string): Promise<TBody> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${configuration.apiToken}`,
    },
  };
  const response = await fetch(`${apiBasePath}${relativeUrl}`, options);
  const json: TBody = await response.json();
  return json;
}

export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path?: string | null;
}
interface PageResponse<TResults> {
  page: number;
  results: TResults[];
}
interface Configuration {
  images: {
    base_url: string;
  };
}

interface ITmbdClient {
  getConfiguration: () => Promise<Configuration>;
  getNowPlaying: () => Promise<MovieDetails[]>;
}

export const client: ITmbdClient = {
  getConfiguration: async () => {
    const response = await get<Configuration>("/configuration");
    return response;
  },
  getNowPlaying: async () => {
    const response = await get<PageResponse<MovieDetails>>(
      "/movie/now_playing"
    );
    return response.results;
  },
};
