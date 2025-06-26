import { HomePage } from "./pages/HomePage/HomePage.jsx"
import { CharacterPage } from "./pages/CharacterPage/CharacterPage.jsx"
import { EpisodePage } from "./pages/EpisodePage/EpisodePage.jsx"
import { LocationPage } from "./pages/LocationPage/LocationPage.jsx"
import { Heder } from "./common/components/Heder/Heder.jsx"
import { Route, Routes } from "react-router"
import { Character } from "./pages/CharacterPage/Character/Character.jsx"


function App() {
  return (
    <div>
      <Heder />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharacterPage />} />
        <Route path="/characters /:id" element={<Character />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/episodes" element={<EpisodePage />} />
      </Routes>
    </div>
  );
}

export default App;
