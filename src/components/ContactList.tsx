import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight, faPencil, faPlus, faStar as faStarSolid, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Contact, ContactContext } from '../context/ContactContext';
import { Actions, AddSearch, List, SearchBar } from '../styled/ContactListStyle';

const ContactList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  let { contact, deleteContact } = useContext(ContactContext);
//   const [contact, setContact] = useState<Contact[]>([]);

  
//   useEffect(() => {
//     const data: any = getContact(10, 0);
//     console.log('from get con', data)
//     setContact(data);
//   }, [contact])

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const setFav = (el: any) => {
    console.log(el);
    el.fav = true;
    const storedList: any = localStorage.getItem('favList');
    const existingList = JSON.parse(storedList) || [];
    const arr = [];
    arr.push(el);
    const combinedList = [...existingList, ...arr]
    localStorage.setItem('favList', JSON.stringify(combinedList));
  }

  const unFav = (el: any) => {
    console.log(el);
    el.fav = false;
    const storedList: any = localStorage.getItem('favList');
    const existingList = JSON.parse(storedList) || [];
    const id = existingList.findIndex((item: any) => item.id === el.id)
    const arr = existingList.length > 1 ? existingList.splice(id, 1) : [];
    localStorage.setItem('favList', JSON.stringify(arr));
  }

  return (
    <List>
        <header>
            <h1>Contact List</h1>
            <AddSearch>
                <Link className='text-link' to="/form"><FontAwesomeIcon icon={faPlus} /> Add New Contact</Link>
                <SearchBar>
                    <input type="text" value={search} onChange={handleSearchChange} placeholder="Search" />
                </SearchBar>
            </AddSearch>
        </header>
        <main>
            <ul>
                {contact.map((el) => (
                    <li key={el.id}>
                        <div className='name'>
                            <h2>{el?.firstName} {el?.lastName}</h2>
                        </div>
                        <div className='phone-number'>
                            {el?.phone?.map((item: any, i: number) => (
                                <p key={i}>{i+1}. {item.number}</p>
                            ))}
                        </div>
                        <Actions>
                            <Link className='text-link' to={`/form/${el.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                            <FontAwesomeIcon onClick={() => deleteContact(el?.id)} icon={faTrashCan} />
                            {el.fav ? <FontAwesomeIcon onClick={() => unFav(el)} icon={faStarSolid} /> : <FontAwesomeIcon onClick={() => setFav(el)}  icon={faStarRegular} />}
                        </Actions>
                    </li>
                ))}
            </ul>
            <div></div>
        </main>
        <footer>
            <div>
                { page > 1 ? <><FontAwesomeIcon icon={faChevronLeft} /> Previous</> : ''}
            </div>
            <div>
                {page}
            </div>
            <div>
                Next <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </footer>
    </List>
  );
};

export default ContactList;
