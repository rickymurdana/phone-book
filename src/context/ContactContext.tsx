import React, { createContext, useState, useEffect } from 'react';
import { useQuery, useMutation, gql, useLazyQuery } from '@apollo/client';
import { 
    GET_CONTACT_LIST, 
    GET_CONTACT_DETAIL,
    GET_PHONE_LIST,
    ADD_CONTACT,
    ADD_NUMBER_CONTACT,
    EDIT_CONTACT,
    EDIT_PHONE,
    DELETE_CONTACT
} from '../graphql/queries';

export type Contact = {
  id: number;
  firstName?: string;
  lastName?: string;
  phone?: any;
  fav?: boolean;
};

type ContactContextType = {
  contact: Contact[];
  getContact: (limit: number, offset: number, search?: string) => void;
  addContact: (firstName: string, lastName: string, phones: any) => void;
  addNumberToContact: (id: number, phone: any) => void;
  editContact: (id: number, firstName: string, lastName: string, phones: any) => void;
  editPhoneNumber: (id: number, phones: any, newPhone: string) => void;
  deleteContact: (id: number) => void;
};

export const ContactContext = createContext<ContactContextType>({
  contact: [],
  getContact: () => {},
  addContact: () => {},
  addNumberToContact: () => {},
  editContact: () => {},
  editPhoneNumber: () => {},
  deleteContact: () => {}
});

type ContextProviderProps = {
  children: React.ReactNode
}

const ContactProvider = ({ children }: ContextProviderProps) => {
  const [contact, setContact] = useState<Contact[]>([]);
  const { data, loading, error } = useQuery(GET_CONTACT_LIST, {
    variables: { limit: 10, offset: 0 }
  });

  useEffect(() => {
    if (data) {
      const obj: Contact[] = [];
      const getList: any = localStorage.getItem('favList');
      const localList = JSON.parse(getList) || [];
      if (localList?.length) {
        for (const item of localList) {
          obj.push(item)
        }
      }
      for (const item of data.contact) {
        const check = localList.find((el: any) => el.id === item.id);

        if (!check) {
          obj.push({
            id: item.id,
            firstName: item.first_name,
            lastName: item.last_name,
            phone: item.phones,
            fav: false
          })
        }
      }
      setContact(obj);
    }

    if (loading) {
      <div>Loading...</div>
    }
  
    if (error) {
      <div>error: {error.message}</div>

    }
  }, [data, loading, error]);

  const [addContactMutation] = useMutation(ADD_CONTACT);

  const [addNumberMutation] = useMutation(ADD_NUMBER_CONTACT);

  const [deleteContactMutation] = useMutation(DELETE_CONTACT);

  const [editContactMutation] = useMutation(EDIT_CONTACT);
  const [editPhoneMutation] = useMutation(EDIT_PHONE);

  const addContact = (firstName: string, lastName: string, phones: any) => {
    addContactMutation({ variables: { first_name: firstName, last_name: lastName, phones } });
  };

  const addNumberToContact = (id: number, phones: any) => {
    addNumberMutation({ variables: { id, phones } });
  };

  const deleteContact = (id: number) => {
    deleteContactMutation({ variables: { id } });
  };

  const editContact = (id: number, firstName: string, lastName: string, phones: any) => {
    editContactMutation({ variables: { id, _set: { first_name: firstName, last_name: lastName } } });
  };

  const editPhoneNumber = (id: number, phones: any, newPhone: string) => {
    editPhoneMutation({ variables: { id, phones, newPhone } });
  };

  const getContact = (limit: number, offset: number, search?: string) => {
    if (search) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data, loading, error } = useQuery(GET_CONTACT_LIST, {
        variables: { limit, offset, where: { first_name: { _like: search } } }
      });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      if (data) {
        const obj: Contact[] = [];
        const getList: any = localStorage.getItem('favList');
        const localList = JSON.parse(getList) || [];
        if (localList?.length) {
          for (const item of localList) {
            obj.push(item)
          }
        }
        for (const item of data.contact) {
          const check = localList.find((el: any) => el.id === item.id);
  
          if (!check) {
            obj.push({
              id: item.id,
              firstName: item.first_name,
              lastName: item.last_name,
              phone: item.phones,
              fav: false
            })
          }
        }
        setContact(obj);
      }
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data, loading, error } = useQuery(GET_CONTACT_LIST, {
        variables: { limit, offset, }
      });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      if (data) {
        const obj: Contact[] = [];
        const getList: any = localStorage.getItem('favList');
        const localList = JSON.parse(getList) || [];
        if (localList?.length) {
          for (const item of localList) {
            obj.push(item)
          }
        }
        for (const item of data.contact) {
          const check = localList.find((el: any) => el.id === item.id);
  
          if (!check) {
            obj.push({
              id: item.id,
              firstName: item.first_name,
              lastName: item.last_name,
              phone: item.phones,
              fav: false
            })
          }
        }
        setContact(obj);
      }
    }
  }

  return (
    <ContactContext.Provider value={{ 
      contact, 
      getContact, 
      addContact, 
      addNumberToContact, 
      deleteContact, 
      editContact, 
      editPhoneNumber 
    }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
