import React from 'react';
import './App.css';

const useSemiPersistentState = ( key, initialState ) => {

  const [ value, setValue ] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect( () => {
    localStorage.setItem( key, value);
  }, [ key, value ] );

  return [ value, setValue ];
};

const App = () => {
  const stories = [{
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [ searchTerm, setSearchTerm ] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter( (story)=> {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  } )

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search 
        search={searchTerm}
        onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

// const Search = ({ search, onSearch }) => {

//   return(
//   <div>
//     <label htmlFor="search">Search: </label>
//     <input id="search" type="text" 
//       value={search}
//       onChange={onSearch} />
//   </div>
//   )
// };

// To render multiple top-level elements 
// side-by-side, we have to wrap them into an array 
// instead.
{/* Each child in a list should have a unique "key" */}
// const Search = ({ search, onSearch }) => [
//     <label key="1" htmlFor="search">
//       Search:{' '}
//     </label>,
//     <input key="2" id="search" type="text" 
//       value={search}
//       onChange={onSearch} />,
//   ];

// another way to have mutiple top level elements in JSX is to use fragment.
const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">
      Search:
    </label>
    <input id="search" type="text" 
      value={search}
      onChange={onSearch} />
  </>
);


const List = ({ list }) =>                       
  list.map( ({ objectID, ...item}) => (
  <Item 
      key = {objectID} 
      {...item}
  />
  ));

const Item = ({ title, url, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
)

export default App;
