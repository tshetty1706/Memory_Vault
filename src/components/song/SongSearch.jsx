export default function SongSearch({search,setSearch,genre,setGenre, genres}){

    
    return(
        <div className="toolbar" >

        <input
          type="text"
          placeholder="Search Your Hobby..."
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
          {
            genres.map((ele) => (
              <option key={ele}>{ele}</option>
            ))
          }
        </select>

      </div>
    )
}