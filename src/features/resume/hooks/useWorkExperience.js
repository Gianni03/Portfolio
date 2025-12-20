import { useEffect, useState } from "react";
import { getWorkExperience } from "../../../api/workExperience.supabase";

export default function useWorkExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getWorkExperience();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { items, loading, refetch: fetchData };
}
