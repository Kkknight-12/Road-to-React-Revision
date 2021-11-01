import React from 'react';
import './App.css';

const initialStories = [
    {
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

const getAsyncStories = () => {
  return new Promise( ( resolve => {
    // fetching these stories asynchronously
    setTimeout( () => {
      resolve( { data: { stories: initialStories } })
    }, 2000);
  }))
}

const useSemiPersistentState = ( key, initialState ) => {
  const [ value, setValue ] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect( () => {
    localStorage.setItem( key, value);
  }, [ key, value ] );

  return [ value, setValue ];
};

// Asynchronous data in React leaves us with 
// conditional states: with data and without data.
const App = () => {

  const [ searchTerm, setSearchTerm ] = useSemiPersistentState('search', 'React');

  const [ stories, setStories ] = React.useState([]);

  const [ isLoading, setIsLoading ] = React.useState(false);

  /* Asynchronous data comes with error handling,
  too. It doesn’t happen in our simulated
  environment, but there could be errors if we
  start fetching data from another third-party 
  API. Introduce another state for error handling 
  and solve it in the promise’s catch() block when
  resolving the promise: */
  const [ isError, setIsError ] = React.useState(false);
  
  React.useEffect( () => {
    setIsLoading(true);

    getAsyncStories()
      .then( result => {
        setStories( result.data.stories );
        setIsLoading(false);
      })
      .catch( () => setIsError(true));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  
  const searchedStories = stories.filter( (story)=> {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  } )
  
  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  };
  
  return (
    <>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
      id= "search"
      value = {searchTerm}
      isFocused
      onInputChange = {handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      {/* Next, give the user feedback in case 
      something went wrong with another conditional 
      rendering. This time, it’s either rendering 
      something or nothing. So instead of having a 
      ternary operator where one side returns null, 
      use the logical && operator as shorthand: */}
      { isError && <p>Something went wrong ...</p>}

      { isLoading ? ( <p>Loading ...</p> )
        : (
          <List 
            list={searchedStories} 
            onRemoveItem={handleRemoveStory}
          />
        )
      }
    </>
  );
};

const InputWithLabel = ( { id, children, value, onInputChange, type="text", isFocused }) =>{
  
  const inputRef = React.useRef();

  React.useEffect( () => {
    if( isFocused && inputRef.current ){
      inputRef.current.focus();
    }
  }, [isFocused]);

  return( 
    <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
          ref={inputRef}  
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
        />
    </>
  )
};


const List = ({ list, onRemoveItem }) =>                       
  list.map(( item ) => (
  <Item 
      key = { item.objectID } 
      item = { item }
      onRemoveItem = { onRemoveItem }
  />
  ));

const Item = ( {item, onRemoveItem }) => (
  <>
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button
        type="button"
        onClick={ () => onRemoveItem(item) }
      >
        Dismiss
      </button>
    </span> 
  </div>
  </>
);

export default App;
