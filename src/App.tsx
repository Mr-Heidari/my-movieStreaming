import { Route,Routes } from "react-router-dom"
import Home from "./-root/pages/Home"
import About from "./-root/pages/About"
import TVSeries from "./-root/pages/TVSeries"
import Movie from "./-root/pages/Movie"
import RootLayout from "./-root/RootLayout"
import MovieDetails from "./-root/pages/MovieDetails"
import SeriesDetaile from "./-root/pages/SeriesDetails"
import MovieList from "./-root/pages/MovieList"
import SeriesList from "./-root/pages/SeriesList"

const App = () => {
  return (
    <main>
        <Routes>
            <Route element={<RootLayout/>}>

                {/** private routes  */}
                <Route index element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/tvseries" element={<TVSeries/>}/>
                <Route path="/movies" element={<Movie/>}/>
                <Route path="/movie/:id" element={<MovieDetails/>}/>
                <Route path="/tv/:id" element={<SeriesDetaile/>}/>
                <Route path="/movie/:genre/:id" element={<MovieList/>}/>
                <Route path="/tv/:genre/:id" element={<SeriesList/>}/>

            </Route>
        </Routes>
    </main>
  )
}

export default App