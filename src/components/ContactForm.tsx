import { useQuery } from '@apollo/client';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext';
import { ADD_CONTACT, GET_CONTACT_DETAIL } from '../graphql/queries';
import { Form } from '../styled/FormStyle';
import { redirect } from 'react-router-dom';

const ContactForm: React.FC = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [notValid1, setNotValid1] = useState(false);
  const [notValid2, setNotValid2] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { contact, addContact, editContact } = useContext(ContactContext);
  const { id } = useParams();
  
  const {data, loading, error} = useQuery(GET_CONTACT_DETAIL, {
    variables: { id: Number(id) }
  })
  
  
  console.log('data', data)
  useEffect(() => {
    if (id && data) {
      const item = data?.contact_by_pk;
      setFormData({
        firstName: item?.first_name,
        lastName: item?.last_name,
        phone: item?.phones[0]?.number
      })
      setIsEdit(true);
    }
  }, [data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phones = [];
    phones.push({
        number: formData.phone
    })

    if (isEdit) {
      editContact(data?.contact_by_pk?.id, formData.firstName, formData.lastName, phones)
    } else  {
      addContact(formData.firstName, formData.lastName, phones);
    }

    return nav("");
  };

  const handleInputChange = (event: any) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    const regex = /^[a-zA-Z0-9]+$/;
    if (event.target.name === 'firstName') {
      setNotValid1(!regex.test(event.target.value) ? true : false);
    }

    if (event.target.name === 'lastName') {
      setNotValid2(!regex.test(event.target.value) ? true : false);
    }
  };

  return (
    <Form>
        <header>
            <Link className='text-link' to="/"><FontAwesomeIcon icon={faChevronLeft} /> Back</Link>
            <h1>Contact Form</h1>
            <div></div>
        </header>
        <main>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name <span className='required'>*</span></label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    {notValid1 && <div className='warning'>First Name must be unique and not contains special character</div>}
                </div>
                <div>
                    <label htmlFor="lastName">Last Name <span className='required'>*</span></label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    {notValid2 && <div className='warning'>Last Name must be unique and not contains special character</div>}
                </div>
                <div>
                    <div className='number-label'>
                      <label htmlFor="phone">Phone Number <span className='required'>*</span></label>
                      <div className='icon' onClick={() => formData.phone.push({})}><FontAwesomeIcon icon={faPlus} /> Add Number </div>
                    </div>
                    {/* {formData.phone.map((item: any) => (
                      <input type="number" name="phone" id="phone" value={item.number} onChange={handleInputChange} required />
                    ))} */}
                    <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <button type="submit" disabled={!formData.firstName || !formData.lastName || !formData.phone || notValid1 || notValid2}>Add Contact</button>
            </form>
        </main>
    </Form>
  );
};

export default ContactForm;
