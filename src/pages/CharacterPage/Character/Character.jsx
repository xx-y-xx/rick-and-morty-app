import { useParams } from "react-router"
 
export const Character = () => {
  const { id } = useParams()
 
  return (
    <div className="pageContainer">
      <h1>Character id: {id}</h1>
    </div>
  )
}