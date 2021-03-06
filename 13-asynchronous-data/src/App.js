import React from 'react';
import './App.css';

// initial list
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

/* function will returns a promise – data, once it resolves. The resolved object holds the previous list of stories */
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

const App = () => {

  const [ searchTerm, setSearchTerm ] = useSemiPersistentState('search', 'React');
  
  //  use an empty array for the initial state
  const [ stories, setStories ] = React.useState([]);

  React.useEffect( () => {
    getAsyncStories().then( result => {
      setStories( result.data.stories );
    });
  }, []);

  /* Once you start the application again, you should
  see a delayed rendering of the list. The initial
  state for the stories is an empty array. After 
  the App component rendered, the side-effect hook
  runs once to fetch the asynchronous data. After 
  resolving the promise and setting the data in 
  the component’s state, the component renders 
  again and displays the list of asynchronously 
  loaded stories. */

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
      <List 
        list={searchedStories} 
        onRemoveItem={handleRemoveStory}
      />
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
