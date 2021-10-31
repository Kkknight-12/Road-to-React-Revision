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

  const handleSearch = event => {
    console.log("Output Event", event.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} />
      <hr />
      <List list={stories} />
    </div>
  );
};

// Search Component
const Search = props => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);

    /* 
    when you write 
    - the value will be passed to handleChange which will pass it to.
    - onSearch(event) which will call for function
    - handleSearch and then handleSearch will run
    - console.log(value)
    */
    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

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
React props are always passed down as information the component tree, and callback handlers passed as functions in props can be used to communicate up the component hierarchy.

Wieruch, Robin. The Road to React: Your journey to master plain yet pragmatic React.js (2020 Edition) (p. 45). leanpub.com. Kindle Edition.  
*/