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

  const [searchTeam, setSearchTerm] = React.useState('');

  const handleChange = (event) => { 
    setSearchTerm(event.target.value)
  }

  return (
    <div className="App">
      <h1>Hi</h1>
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" onChange = {handleChange}/>
      <p>Searching for<strong>{searchTeam}</strong></p>
      <hr />
      <ListCompoenent listOfStories={stories}/>
    </div>
  );
}

const ListCompoenent = (props) => (
  <ul>
    {/* checking the props */}
    {console.log(props)}
    {props.listOfStories.map((item) => (
      <li key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li>
    ))}
  </ul>
);

export default App;
