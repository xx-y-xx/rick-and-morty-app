import axios from "axios"
import { useEffect, useState } from "react"
import s from './EpisodePage.module.css'

export const EpisodePage = () => {
  const [episodes, setEpisode] = useState([])
  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/episode').then((res) => {
      setEpisode(res.data.results)
    })
  }, [])

  return (
<div className={s.pageContainer}>
      <h1 className="pageTitle">EpisodePage</h1>
      <div className={s.episodeList}>
        {episodes.map((episode) => (
          <div key={episode.id} className={s.episodeCard}>
            <div className={s.episodeHeader}>
              <span className={s.episodeCode}>{episode.episode}</span>
              <span className={s.episodeName}>{episode.name}</span>
            </div>
            <div className={s.airDate}>
              Дата выхода: <span className={s.bold}>{episode.air_date}</span>
            </div>
            <div className={s.characterListTitle}>
              Список персонажей, которые были замечены в эпизоде: <span className={s.bold} > {episode.characters.length}</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}