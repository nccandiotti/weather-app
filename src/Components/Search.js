import { useContext } from "react"
import { QueryContext } from "./QueryContext"

function Search() {
  const { query, setQuery, searchApi } = useContext(QueryContext)

  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={searchApi}
      />
    </div>
  )
}

export default Search
