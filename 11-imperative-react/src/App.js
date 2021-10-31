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

  /* 
  Instead of using the label prop from before, we inserted the text “Search:” between the component’s element’s tags. In the InputWithLabel component, you have access to this information via React’s children prop. 
  */
  return (
    <>
      <h1>My Hacker Stories</h1>
     
      {/* new seach component */}
      <InputWithLabel
      id= "search"
      // label= "Search"
      value = {searchTerm}
      onInputChange = {handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      <List list={searchedStories} />
    </>
  );
};

/* 
Instead of using the label prop, use the children prop to render everything that has been passed down from above where you want it: 
*/
const InputWithLabel = ( { id, children, value, onInputChange, type="text" }) => {
  {console.log(children)}; // Search:
  return(
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input  
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
  )
};
// You can pass components via React children as well.

/* 
Now the React component’s elements behave similar to native HTML. 

Everything that’s passed between a component’s elements can be accessed as children in the component and be rendered somewhere. Sometimes when using a React component, you want to have more freedom from the outside what to render in the inside of a component: 
*/

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
