
function ArticleCard({article}) {
  return (
    <div className="m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
      <h3 className="font-bold uppercase sm:text-xl">{article.title}</h3>
      <h4 className="text-sm text-slate-500 hover:text-slate-800 sm:text-md cursor-pointer">{article.author}</h4>
      <p className="p-2 sm:text-xl">{article.body}</p>
      <h4 className="p-1 font-bold uppercase text-center border-2 border-red-300 sm:text-xl">{article.topic}</h4>
      <h5>
        <form action="">
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Comments</button>
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Comment</button>
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Vote</button>
        </form>
      </h5>
    </div>
  );
}

export default ArticleCard;