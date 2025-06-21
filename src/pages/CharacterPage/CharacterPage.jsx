import { useEffect } from "react"
import axios from "axios"
import s from "./CharacterPage.module.css"
import { useState } from "react"

export const CharacterPage = () => {
  const [characters, setCharacters] = useState([])

  const [info, setInfo] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

    const [error, setError] = useState(null)

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      console.log(res.data)
      setCharacters(res.data.results)
      setInfo(res.data.info)
    })    
    
  }, [])

  const nextPageHandler = () => {
    axios.get(info.next).then((res) => {
      setCharacters(res.data.results)
      setInfo(res.data.info)
    })    
  }

  const previousPageHandler = () => {
    axios.get(info.prev).then((res) => {
      setCharacters(res.data.results)
      setInfo(res.data.info)
    })   
    
  }
  const searchHandler = (event) => {
    const value = event.currentTarget.value
    axios.get(`https://rickandmortyapi.com/api/character?name=${value}`).then((res) => {
      setCharacters(res.data.results)
      setInfo(res.data.info)
    })
    .catch((err) => {
      setError(err.response.data.error) 
    } )
  }

  return (

    <div className={"pageContainer"}>
      <h1 className={"pageTitle"}>CharacterPage</h1>
      <input type="search" className={s.search} onChange={searchHandler} placeholder="Search..." />
      {error && <div className="errorMessage">😱{error}😱</div>}A
      {!error && characters.length && (
        <>
          {
            <div className={s.characters}>
              {characters.map((character) => {
                return (
                  <div key={character.id} className={s.character}>
                    <div className={s.characterLink}>{character.name}</div>
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