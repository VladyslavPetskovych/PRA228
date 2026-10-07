import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

/**
 * Дані квартири для сторінки деталей.
 * Показуємо одразу те, що вже є у сторі (зі списку або вбудоване в HTML),
 * а свіжі дані з API підтягуємо у фоні — без порожнього екрана «Завантаження…».
 */
export default function useRoom(id) {
  const fromList = useSelector((s) =>
    s.apartments.items.find((a) => String(a.idWoodoo ?? a.id) === String(id))
  );
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setRoom(null);
    setError(null);
    setLoading(true);
    axios
      .get(`https://primerestapartments.com/api/rooms/${id}`)
      .then((res) => !cancelled && setRoom(res.data))
      .catch((err) => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  const notFound = error?.response?.status === 404;
  return {
    room: notFound ? null : room || fromList || null,
    loading: loading && !fromList,
    error: notFound || (!room && !fromList) ? error : null,
  };
}
