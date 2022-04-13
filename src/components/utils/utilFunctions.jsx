// delete this file? lots of functins etc not known



export default function handleUpVote(e) {
    e.preventDefault();
    if (voteUp === false && voteDown === false) {
        setVoteUp(true)
        setVoteDown(false)
        handleClick(1)
    } else if (voteUp === true && voteDown === false) {
        return <p>Already voted up!</p>
    } else if (voteUp === false && voteDown === true) {
        setVoteUp(true)
        setVoteDown(false)
        handleClick(2)
    }
}

export default function handleDownVote(e) {
    e.preventDefault();
    if (voteUp === false && voteDown === false) {
        setVoteDown(true)
        setVoteUp(false)
        handleClick(-1)
    } else if (voteUp === false && voteDown === true) {
        return <p>Already voted down!</p>
    } else if (voteUp === true && voteDown === false) {
        setVoteDown(true)
        setVoteUp(false)
        handleClick(-2)
    }
}