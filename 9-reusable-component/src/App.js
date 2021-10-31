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
    <>
      <h1>My Hacker Stories</h1>
      <Search 
        search={searchTerm}
        onSearch={handleSearch} 
      />
      {/* new seach component */}
      <InputWithLabel
        id= "search"
        label= "Search"
        value = {searchTerm}
        onInputChange = {handleSearch}
      />
      <hr />
      <List list={searchedStories} />
    </>
  );
};

const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">
      Search:
    </label>
    <input id="search" type="text" 
      value={search}
      onChange={onSearch} 
    />
  </>
);

// const InputWithLabel = ( { id, label, value, onInputChange }) => (
//   <>
//     <label htmlFor={id}>{label}</label>
//     &nbsp;
//     <input  
//       id={id}
//       type="text"
//       value={value}
//       onChange={onInputChange}
//     />
//   </>
// );
/* It’s not fully reusable yet. If we want an input
field for data like a number (number) or phone number
(tel), the type attribute of the input field needs to be accessible from the outside too:
*/
const InputWithLabel = ( { id, label, value, onInputChange, type="text" }) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input  
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);
// so now the default seach is text but if something else is send like number it will be overwritten

const List = ({ list }) =>                       
  list.map(( { objectID, ...item } ) => (
  <Item 
      key = {objectID} 
      {...item}
  />
  ));

const Item = ({ title, url, author, num_comments, points }) => (
  <>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </>
)

export default App;
