const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "3d8cf5c466c3d24a1ef41ee79dc5e7f6",
  originalImage: (imgPath: any) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: any) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
