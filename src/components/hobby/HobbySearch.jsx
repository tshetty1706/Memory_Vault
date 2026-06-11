export default function HobbySearch({search,setSearch,category,setCategory, categories}){

    
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
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          {
            categories.map((ele) => (
              <option key={ele}>{ele}</option>
            ))
          }
        </select>

      </div>
    )
}