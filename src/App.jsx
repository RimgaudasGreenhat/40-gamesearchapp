import { useState } from "react";
import Search from "./components/Search.jsx";
import { useEffect } from "react";
import useFetch from "./hooks/useFetch.js";
import { fetchGames } from "./api.js";
import GameCard from "./components/GameCard.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Spinner from "./components/Spinner.jsx";

export default function App()
{
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, fetchData, error, reset } = useFetch(() =>
    fetchGames({ query: searchQuery })
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await fetchData();
        return;
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (data) console.log(data)
  }, [data]);

  return(
    <main className="w-full p-2 flex flex-col items-center">
      <div className="flex items-center">
        <h1 className="text-gradient text-4xl font-bold">Game Database</h1>
        <img src="./logo.png" className="w-25 h-25" />
      </div>
      <div className="w-full max-w-4xl">
          <Search
          query = {searchQuery}
          onChange= {(e) => setSearchQuery(e.target.value)}
          />
          <div className="w-full">
            {!loading? (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2
              lg:grid-cols-3">
                {data.results.map(
                (game) => 
                  game.added > 30 && (
                    <GameCard
                    key={game.slug}
                    name={game.name}
                    coverLink={game.background_image}
                    playtime={game.playtime}
                    genres={game.genres}
                    onClick={() => {
                      console.log("test"); 
                    }}
                    />
                  )
                )}
              </div>
              {data?.results.length === 0 && (
              <ErrorMessage message={"No games were found sadge :("} />
            )}
            </>  
            ) : (
             <div className="flex justify-center">
              <Spinner />
             </div> 
            )}
            {error && <ErrorMessage message={"Network Error Occured!"} />}
          
        </div>
    </div> 
    </main>
  );
}


//pratest nuo 1:25:18 :)