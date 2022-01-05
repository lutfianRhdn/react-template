import { useState, useEffect } from "react";

const prefix = "OLSHOP-";

export default function useLocalStorage(key, initialValue) {
  const prefixKey = prefix + key;
  const [value, setValue] = useState(function () {
    const jsonValue = localStorage.getItem(prefixKey);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(value));
  }, [prefixKey, value]);
  return [value, setValue];
}
