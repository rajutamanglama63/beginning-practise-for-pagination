import { useState, useEffect } from 'react';
import './App.css';
import Pagination from './components/Pagination';
import Card from './components/Card';

const App = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/posts?page=${page}`);

        const { data, pages : totalPages } = res.json();

        setPosts(data);
        setPages(totalPages);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("something went wrong");
      }
    }

    fetchPosts();
  }, [page]);


  return (
    <div className="app">
      {/* <Pagination /> */}
      <div className="app__posts">
          {posts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
      </div>
      {/* <Pagination /> */}
    </div>
  );
}

export default App;
