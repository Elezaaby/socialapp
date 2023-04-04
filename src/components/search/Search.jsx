import { useContext } from 'react';
import './search.scss'
import { UsersContext } from '../../context/usersContext';
import { Link } from 'react-router-dom';

const Search = ({ inputSearch, setInputSearch }) => {
  const { users } = useContext(UsersContext);

  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(inputSearch.toLowerCase())
    );
  };


  return (
    <div className='search_container'>
      <input autoFocus onChange={(e) => setInputSearch(e.target.value)} type='text' placeholder='search' />
      {inputSearch ?
        searchFriends(users)?.map((searchItem, ke) =>
          <div className="user" key={ke}>
            <Link to={`/socialapp/profile/${searchItem.uid}`} style={{ textDecoration: 'none' }} className="user_info">
              <img src={searchItem.profileImg} alt="" />
              <span>
                {searchItem.name}
                <span className='userName'>{searchItem.userName}</span>
              </span>
            </Link>
          </div>
        )
        : ""}
    </div>
  )
}

export default Search