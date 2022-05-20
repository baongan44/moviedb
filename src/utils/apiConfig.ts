const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "3d8cf5c466c3d24a1ef41ee79dc5e7f6",
  accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDhjZjVjNDY2YzNkMjRhMWVmNDFlZTc5ZGM1ZTdmNiIsInN1YiI6IjYxOGNiNjNiMjA5ZjE4MDA2Mzg1ZDdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2BmVQWtSMNTAbQoLMZNJVG9QqMlaI3zaxArafGBQ6Ww",
  originalImage: (imgPath: any) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: any) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  baseUrlV4: "https://api.themoviedb.org/4/",
};

export default apiConfig;
