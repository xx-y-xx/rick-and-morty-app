import { useEffect } from "react"
import axios from "axios"
import s from "./CharacterPage.module.css"
import { useState } from "react"
import { Link } from "react-router"

export const CharacterPage = () => {
  const [characters, setCharacters] = useState([])

  const [info, setInfo] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

    const [error, setError] = useState(null)

  const fetchData = (url) => {
    axios.get(url).then((res) => {
      setCharacters(res.data.results)
      setInfo(res.data.info)
      setError(null)
    })
       .catch((err) => {
      setError(err.response.data.error) 
    } )
  }
 
  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character")
  }, [])
 
  const nextPageHandler = () => {
    fetchData(info.next)
  }
 
  const previousPageHandler = () => {
    fetchData(info.prev)
  }

  const searchHandler = (event) => {
    const value = event.currentTarget.value
    axios.get(`https://rickandmortyapi.com/api/character?name=${value}`).then((res) => {
      setCharacters(res.data.results)
      setInfo(res.data.info)
      setError(null)
    })
    .catch((err) => {
      setError(err.response.data.error) 
    } )
  }

  return (

    <div className={"pageContainer"}>
      <h1 className={"pageTitle"}>CharacterPage</h1>
      <input type="search" className={s.search} onChange={searchHandler} placeholder="Search..." />
      {error && <div className="errorMessage">😱{error}😱</div>}
      {!error && characters.length && (
        <>
          {
            <div className={s.characters}>
              {characters.map((character) => {
                return (
                  <div key={character.id} className={s.character}>                    
                    <Link to={`/characters/${character.id}`} className={s.characterLink}>
                    {character.name}
                    </Link>                     
                    <img src={character.image} alt={`${character.name} avatar`} />
                  </div>
                )
              })}
            </div>
          }
          <div className={s.buttonContainer}>
            <button className="linkButton" disabled={info.prev === null} onClick={previousPageHandler}>
              Назад
            </button>
            <button className="linkButton" disabled={info.next === null} onClick={nextPageHandler}>
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  )
}