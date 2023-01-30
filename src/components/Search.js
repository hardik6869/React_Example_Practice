import axios from "axios";
import { useEffect, useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  // https://example.com/api/items?q=${searchTerm}
  useEffect(() => {
    let timerId;
    const fetchData = async () => {
      const response = await axios.get(
        `https://dummyjson.com/products?q=${searchTerm}`
      );
      setResults(response.data.products);
    };
    if (searchTerm.length > 0) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fetchData();
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [searchTerm]);
  useEffect(() => {
    setSuggestions(
      results.filter((result) =>
        result.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, results]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <ul>
        {suggestions.map((result, index) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            key={index}
            onClick={() => {
              alert(result.title);
            }}
          >
            {result.title}
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Search;
