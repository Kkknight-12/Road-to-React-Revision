import React from 'react';
import './App.css';

//custom Hook
// two requrimememnt to be met to be custome hook
// 1 - name must start with "use"
// 2 - must return an array
const useSemiPersistentState = ( key, initialState ) => {
  // console.log('key: ', key,'initialState: ', initialState )
  // key: search initialState: React
  const [ value, setValue ] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect( () => {
    localStorage.setItem( key, value);
    // will output what ever we write in search bar
    // console.log(value);
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

  // useSemiPersistentState return an array which will be destructred here
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
      {/* sending in props-> searchTerm and callback onSearch */}
      <Search 
        search={searchTerm}
        onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => {

  return(
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" 
      value={search}
      onChange={onSearch} />
  </div>
  )
};

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
