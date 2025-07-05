import axios from "axios"
import { useEffect, useState } from "react"
import s from './LocationPage.module.css'



export const LocationPage = () => {
  const [locations, setLocation] = useState([])
  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/location').then((res) => {
      setLocation(res.data.results)
    })
  }, [])
  return (
    <div className={"pageContainer"}>
      <h1 className={"pageTitle"}>LocationPage</h1>
      {/* <div>{location.length && location[0].name}</div> */}
      {/* <div>{Array.isArray(location) && location.length > 0 && location[0].name}</div> */}
      {locations.length && (
        <>
          {
            <>
            
              {locations.map((location) => {
                return (
                  <div key={location.id} className={s.locationItem}>
                    <div className={s.locationName}>
                      Название локации :<span className={s.bold}> {location.name}</span>
                    </div>
                    <div className={s.locationType}>
                      Тип локации : <span className={s.bold}>{location.type}</span>
                    </div>
                    <div className={s.locationDimension}>
                      Измерение: <span className={location.dimension === "unknown" ? s.unknown : s.bold}>
                        {location.dimension}
                      </span>
                    </div>
                    <div className={s.locationCount}>
                      Количество персонажей: <span className={s.bold}>{location.residents.length}</span>
                    </div>
                  </div>
                )
              }
              )}
            </>
          }
        </>
      )}
    </div>
  )
}