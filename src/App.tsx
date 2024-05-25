import { Route,Routes } from "react-router-dom"
import Home from "./-root/pages/Home"
import About from "./-root/pages/About"
import TVSeries from "./-root/pages/TVSeries"
import Movie from "./-root/pages/Movie"
import RootLayout from "./-root/RootLayout"

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

            </Route>
        </Routes>
    </main>
  )
}

export default App