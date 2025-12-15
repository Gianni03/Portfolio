import { getProjects } from "../../../api/projects.supabase";
import { useEffect, useState} from 'react'


export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  return {projects, loading  };
}

