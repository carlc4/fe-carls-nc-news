function DropDownMenu({setSortedArticles, setOrderBy})  {

  const handleSearch = (e) => {
    setSortedArticles(e.target.value)
  }

  const handleSearchOrder = (e) => {
    setOrderBy(e.target.value)
  }

  return (
    <>
    <div className="uppercase m-12 text-xl md:m-18"> 
      <label className="p-5">Sort By:</label>
      <select name="sort" id="sort_by" onChange={handleSearch}>
      <option value="created_at">Date</option>
      <option value="comment_count">Comments</option>
      <option value="votes">Votes</option>
    </select> 
    <label className="p-5">Order</label>
      <select name="order" id="order_by" onChange={handleSearchOrder}>
      <option value="desc">Descending</option>
      <option value="asc">Ascending</option>
    </select> 
    </div>
    </>
  )
}

export default DropDownMenu;