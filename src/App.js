import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const handleSearch = async () => {
    if (!debouncedSearchTerm) return;
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${debouncedSearchTerm}&apikey=8a71654d`
      );
      const result = await res.json();
      console.log(result);
      if (result.Response === "True") {
        setMovies(result.Search);
      } else {
        setMovies([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm,]);
  return (
    <div className="min-h-screen px-5 flex flex-col items-center space-y-6 bg-gradient-to-tr from-black via-white to-gray-500">
      <h1 className="text-[3rem] font-bold">Movie Search App</h1>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search for a movie..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 outline-none border-2 border-gray-500 rounded-full p-2 pl-6"
      />
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 p-4 gap-7">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="bg-green-500 p-4 rounded-lg flex flex-col items-center">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="self-start text-white font-semibold">
                <h3><span className="text-red-700 font-bold">Title:</span> {movie.Title}</h3>
                <h3><span className="text-red-700 font-bold">Type:</span> {movie.Type}</h3>
                <p><span className="text-red-700 font-bold">Year:</span> {movie.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <h2>No movies found</h2>
        )}
      </div>
    </div>
  );
}
export default App;
