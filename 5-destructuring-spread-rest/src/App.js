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

// const Search = props => (
//   <div>
//     <div>
//     <label htmlFor="search">Search: </label>
//     <input id="search" type="text" 
//       value={props.search}
//       onChange={props.onSearch} />
//   </div>
//   </div>
// )

const Search = ({ search, onSearch }) => {
  // const { search, onSearch } = props;

  return(
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" 
      value={search}
      onChange={onSearch} />
  </div>
  )
};

// List Component
// const List = ({ list }) =>
//   list.map( item => (
//   <Item 
//       key = {item.objectID} 
//       item={item}
//   />
//   ));

// const Item = ({ item }) => (
//   <div>
//     <span>
//       <a href={item.url}>{item.title}</a>
//     </span>
//     <span>{item.author}</span>
//     <span>{item.num_comments}</span>
//     <span>{item.points}</span>
//   </div>
// )
// destrucring, spread and rest operators
const List = ({ list }) =>
// rest
// after taking objectID
// remaning will be stored in item.
//                         rest
  list.map( ({ objectID, ...item}) => (
  <Item 
      key = {objectID} 
      // spread
      // spread the object before passing it to another component
      // you don't name spead 
      {...item}
  />
  ));

//              destructing
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
