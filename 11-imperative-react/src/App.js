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
      value = {searchTerm}
      /* Using just isFocused as an attribute is equivalent to isFocused={true}.*/
      isFocused
      onInputChange = {handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      <List list={searchedStories} />
    </>
  );
};

// declarative approch
// const InputWithLabel = ( { 
//   id, children, value, onInputChange, type="text" }
// ) =>(
//   <>
//     <label htmlFor={id}>{children}</label>
//     &nbsp;
//     <input  
//       id={id}
//       type={type}
//       value={value}
//       autoFocus
//       onChange={onInputChange}
//     />
//   </>
// );
/* 
This works, but only if one of the reusable components is rendered once. For example, if the App component renders two InputWithLabel components, only the last rendered component receives the auto-focus on its render.
*/

// declarative approch but works
// const InputWithLabel = ( { id, children, value, onInputChange, type="text", isFocused }) =>{

//   return( 
//     <>
//         <label htmlFor={id}>{children}</label>
//         &nbsp;
//         <input
//           id={id}
//           type={type}
//           autoFocus={isFocused}
//           value={value}
//           onChange={onInputChange}
//         />
//     </>
//   )
// };

//
// Imperative Approch
const InputWithLabel = ( { id, children, value, onInputChange, type="text", isFocused }) =>{
  
  // 1
  const inputRef = React.useRef();

  // 3
  React.useEffect( () => {
    // console.log(isFocused); // true
    // console.log(inputRef.current); 
    //  <input id= "search" type="text" value="react" />
    if( isFocused && inputRef.current ){
      // 4
      inputRef.current.focus();
    }
  }, [isFocused]);

  return( 
    <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
        // 2
          ref={inputRef}  
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
        />
    </>
  )
};
/*  
1) React’s useRef hook is a persistent value which stays intact over the lifetime of a React component.
It comes with a property called current, which, in contrast to the ref object, can be changed.

2) ref is passed to the input field’s JSX-reserved ref attribute

3) React’s useEffect Hook perform the focus on the input field when the component renders or it's dependecies change.

4) ref ( inputRef ) is passed to input field's ref attribute, it's current property give access to the element. 
Execute its focus programatically as a side-effect, but only if isFocused is set and the current property is existent
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
