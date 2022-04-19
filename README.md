# Welcome to NC News - Front End!

Welcome to the NC News Front End by Carl Crozier.

This project was built using **React  V18** around the Northcoders News Database, utilising a Back End RESTful API I built previously.

The database contains information on users, articles, comments and topics.

You can find a live version of this website at: https://peppy-conkies-a26284.netlify.app/
The github repo can be found at: https://github.com/carlc4/fe-carls-nc-news

The back-end API live version can be found at: https://carls-nc-news.herokuapp.com/api
And the back-end github is here: https://github.com/carlc4/carls_nc_news












# Requirements/Getting Started

You will need Node v16.13.2 at minimum to run this app locally.


# Functionality


The front end app utilises a previously built API which you can find here:
Live Version -
Github Repo -

This is a showcase app built using React and involves many dynamic and interactive elements which showcase React's ability to re-render page elements upon change. The main functions of the app are:
>Posting new Articles
>Commenting on Articles
>Filtering results by topic
>Sorting results by votes/comments/date in ascending and descending order
>Registering new users
>Voting on articles and comments
>Deleting your own comments
>Deleting your own Articles
>Pagination
>Basic user authentication
>Login/Logout
>Viewing all user posted Articles and comments and a running total
>Error handing
>Optimistic rendering of elements

The app was built with a focus on UX - conditional rendering was used to limit the ability to interact with the app unless a user is registered and logged in. Error messages are specific and informative and link back to the relevant sections of the website the user came from or was intending to reach. 


# Tech


The app was built using React v18, React Router and Axios to handle API requests. It also utilises Tailwind CSS for styling.



# Error Handling

I spent an extensive amount of time developing different area's of error handing for the app, to enable to user to understand the error in a user friendly and easy to understand way, and so they wouldn't lose inputted information in the event of an error occurring. Errors include:

 - 404 Page not found
 - Topic not found
 - Article not found
 - Server errors
 - Authentication errors ie user already exists, fields not completed
 - Restrict ability to vote on own articles and comments

# Tailwind CSS

   
This app was built using Tailwind CSS utility framework https://tailwindcss.com/

# And finally..

   
I hope you enjoy this repo, feedback is very much welcome and appreciated, you can contact me via github.
