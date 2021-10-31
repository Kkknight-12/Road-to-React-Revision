import React from 'react';
import './App.css';

function App() {
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

  const [searchTerm, setSearchTerm ] = React.useState("React");

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

const Search = props => (
  <div>
    {/* now the props has a prop and a callback */}
    {console.log("SearchComponent props", props)}

    <label htmlFor="search">Search: </label>
    {/* input field has a value attribute */}
    {/* Now the input field starts with the correct initial value, using the searchTerm from the React state. Also, when we change the searchTerm, we force the input field to use the value from React’s state (via props). Before, the input field managed its own internal state natively with just HTML. */}
    <input id="search" type="text" 
      value={props.search}
      onChange={props.onSearch} />
  </div>
);

// List Component
const List = props =>
  props.list.map(item => (
    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  ));


export default App;

/* 
A React application and its components start with an initial state, which may be passed down as props to other components. It’s rendered for the first time as a UI. Once a side-effect occurs, like user input or data loading from a remote API, the change is captured in React’s state. Once state has been changed, all the components affected by the modified state or the implicitly modified props are re-rendered (the component functions runs again). 

Component lifecycle -> At first, all components are instantiated from the top to the bottom of the component hierarchy. This includes all hooks (e.g. useState) that are instantiated with their initial values (e.g. initial state). From there, the UI awaits side-effects like user interactions. Once state is changed (e.g. current state changed via state updater function from useState), all components affected by modified state/props render again.

Every run through a component’s function takes the recent value (e.g. current state) from the hooks and doesn’t reinitialize them again (e.g. initial state). This might seem odd, as one could assume the useState hooks function re-initializes again with its initial value, but it doesn’t. Hooks initialize only once when the component renders for the first time, after which React tracks them internally with their most recent values.

*/