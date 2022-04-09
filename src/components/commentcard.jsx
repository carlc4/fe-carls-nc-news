function CommentCard({comment}) {
  
  return (
    <>
    <article className="my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
      <h5> {comment.body} </h5>
      <h4 className="pb-2 text-sm text-slate-500 hover:text-slate-800 sm:text-md cursor-pointer">by {comment.author}</h4>
      <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Posted on {comment.created_at}</h4>
      <p className="mr-2 text-right">Votes: {comment.votes}</p>
    </article>
    </>
  );
}

export default CommentCard;