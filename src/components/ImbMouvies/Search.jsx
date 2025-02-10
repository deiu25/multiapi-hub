const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='search'>
        <div>
            <img src="/search.svg" alt="Search Icon" />

            <input 
                type="text"
                placeholder="Search for a Movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search