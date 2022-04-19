function DropDownMenu({ sortedArticles, setSortedArticles, orderBy, setOrderBy }) {

  const handleSearch = (e) => {
    setSortedArticles(e.target.value)
  }

  const handleSearchOrder = (e) => {
    setOrderBy(e.target.value)
  }

  return (
    <>
      <main className="grid grid-cols-6 text-center uppercase m-12 text-xl md:m-18">
        <label className="col-span-2 lg:col-span-1">Sort By:</label>
        <select className="col-span-3 lg:col-span-1" name="sort" id="sort_by" value={sortedArticles} onChange={handleSearch}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
          <div className="col-span-1 lg:col-span-1"></div>
        </select>

        <label className="col-span-2 lg:col-span-1">Order</label>
        <select className="col-span-3 lg:col-span-1" name="order" id="order_by" value={orderBy} onChange={handleSearchOrder}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
          <div className="col-span-1"></div>
        </select>
      </main>
    </>
  )
}

export default DropDownMenu;