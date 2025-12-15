import { getStudies } from "../../../api/studies.supabase";
import { useEffect, useState} from 'react'


export default function useProjects() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStudies().then(data => {
      setStudies(data)
      setLoading(false)
    })
  }, [])

  return {studies, loading  };
}

