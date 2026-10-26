import { useCallback, useEffect, useState } from "react";
import { SiteData } from "@/types/documents";

/**
 * Загрузка каталога. Инвариант №1 из AGENTS.md: documents.json — внешний файл,
 * редактируемый на хостинге без пересборки, поэтому никаких статических импортов —
 * только fetch в рантайме с cache: "no-cache".
 */
export function useDocuments() {
  const [data, setData] = useState<SiteData | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    setData(null);
    setError(false);
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    // При первой загрузке используется preload-ресурс, при повторной попытке — bust-параметр
    const dataUrl = reloadKey > 0 ? `/data/documents.json?t=${Date.now()}` : "/data/documents.json";
    fetch(dataUrl, { cache: "no-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: SiteData) => {
        if (!cancelled) {
          if (!Array.isArray(json?.categories) || !json?.site?.links) {
            throw new Error("Некорректный формат данных");
          }
          setData(json);
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки documents.json:", err);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return { data, error, retry };
}
