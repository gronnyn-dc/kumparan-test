import './Detail.css';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { BsTrash, BsPencil } from "react-icons/bs";

function Detail() {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [albums, setAlbums] = useState([])
  const [activeSession, setActiveSession] = useState('posts')

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}`).then((res) => {
      if (res.status === 200) {
        setUser(res.data)
      }
    })
    axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`).then((res) => {
      if (res.status === 200) {
        setPosts(res.data)
      }
    });
    axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}/albums`).then((res) => {
      if (res.status === 200) {
        console.log(res.data, 'album');
        setAlbums(res.data)
      }
    });
    axios.get(`https://jsonplaceholder.typicode.com/albums/${params.id}/photos`).then((res) => {
      if (res.status === 200) {
        console.log(res.data, 'photo dari album');
      }
    });
  }, []);

  const handleClickSection = (value) => {
    setActiveSession(value)
  }

  const handleClickPost = (post) => {
    console.log(post, user, 'ekqwopdkqwpodkqwop')
    history.push(`/post/${post.id}`, { post_id: post.id, user_id: post.userId })
  }

  const handleClickDelete = (post) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then((res) => {
        if (res.status === 200) {
          axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`).then((res) => {
            if (res.status === 200) {
              setPosts(res.data)
            }
          });
        }
      })
  }
  return (
    <div className="kumparan__detailWrapper">
      <div className="kumparan__detailContainer">
        <div className="kumparan__flex kumparan__flexColumn kumparan__alignCenter">
          <span className="kumparan__detailName kumparan__mt30">{user.name}</span>
          <span className="kumparan__detailUsername kumparan__mt10">@{user.username}</span>
        </div>
        <div className="kumparan__flex kumparan__alignCenter kumparan__justifyCenter kumparan__mt50">
          <div onClick={() => handleClickSection('posts')} className="kumparan__pointer">
            <span className={`kumparan__detailText ${activeSession === 'posts' && 'kumparan__detailTextActive'}`}>Posts</span>
          </div>
          <div onClick={() => handleClickSection('albums')} className="kumparan__pointer">
            <span className={`kumparan__detailText ${activeSession === 'albums' && 'kumparan__detailTextActive'}`}>Albums</span>
          </div>
        </div>
        {activeSession === 'posts' && (
          <div className="kumparan__flex kumparan__flexColumn kumparan__mt30">
            {posts.length > 0 ? (
              posts.map((post, index) => {
                return (
                  <div className="kumparan__flex kumparan__width80Percent" key={index}>
                    <div className="kumparan__flex kumparan__flexColumn kumparan__mb20 kumparan__content kumparan__width80Percent kumparan__mlAuto kumparan__pointer kumparan__titleText" onClick={() => handleClickPost(post)}>
                      <span className="kumparan__titleText">{post.title}</span>
                      <span className="kumparan__bodyText">{post.body}</span>
                    </div>
                    <div className="kumparan__icon kumparan__flex kumparan__flexColumn kumparan__pointer">
                      <div className="kumparan__pencilIcon" onClick={() => history.push(`/detail/${user.id}/edit`)}>
                        <BsPencil />
                      </div>
                      <div className="kumparan__trashIcon kumparan__mt30" onClick={() => handleClickDelete(post)}>
                        <BsTrash />
                      </div>
                    </div>
                  </div>
                )
              })
            ) : <span>Theres no Posts</span>}
          </div>
        )}
        {activeSession === 'albums' && (
          <div className="kumparan__flex kumparan__flexColumn kumparan__mt30">
            {albums.length > 0 ? (
              albums.map((album, index) => {
                return (
                  <div key={index} className="kumparan__flex kumparan__flexColumn kumparan__mb20 kumparan__content kumparan__width80Percent kumparan__marginHorizontalAuto kumparan__pointer kumparan__titleText">
                    <span className="kumparan__titleText">{album.title}</span>
                  </div>
                )
              })
            ) : <span>Theres no Posts</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;