import { useState } from "react";

export default function useSearchHook() {
  const [query, setQuery] = useState("");
  const HandleSearchChange = (e) => {
    setQuery(e.target.value);
  };
  const clearSearchChange = (e) => {
    setQuery("");
  };
  return {
    query,
    HandleSearchChange,
    clearSearchChange,
  };
}
