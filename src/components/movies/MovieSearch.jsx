export default function MovieSearch({search,setSearch,genre,setGenre}){

    return(
        <div className="toolbar" >

        <input
          type="text"
          placeholder="Search Movies..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          value={genre}
          onChange={(e) =>
            setGenre(
              e.target.value
            )
          }
        >
          <option>All</option>
          <option>Sci-Fi</option>
          <option>Action</option>
          <option>Drama</option>
          <option>Comedy</option>
          <option>Animation</option>
          <option>Rom-Com</option>
          <option>Horror</option>
          <option>Fantasy</option>
          <option>Documentary</option>
        </select>

      </div>
    )
}