import { gql } from '@apollo/client'
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { PhonebookContext, PhonebookProvider } from '../components/context/PhonebookProvider'
import client from '../components/graphql/client'
import Navbar from '../components/layouts/navbar'
import AddContactButton from '../components/reusables/addContactButton'

const Home: NextPage = (props: any) => {
  const phonebookContext = useContext(PhonebookContext);
  useEffect(() => {
    console.log(props.contacts);
    if (localStorage.getItem("contacts") === null) {
      console.log("localStorage empty");
      const tempArray = props.contacts as [];
      const contactDetail: { created_at: string; first_name: string; last_name: string; id: number; phones: any[] }[] = [];
      const phoneNumber: any[] = [];
      tempArray.forEach((item: {
        created_at: string,
        first_name: string,
        last_name: string,
        id: number,
        phones: any[],
      }) => {
        phoneNumber.splice(0, phoneNumber.length);
        item.phones.forEach((number) => {
          phoneNumber.push(number.number);
        });
        contactDetail.push({
          created_at: item.created_at,
          first_name: item.first_name,
          last_name: item.last_name,
          id: item.id,
          phones: phoneNumber,
        });
      })
      localStorage.setItem("contacts", JSON.stringify(contactDetail));
    }
  }, []);
  return (
    <div>
      <Head>
        <title>PhoneBook</title>
      </Head>
      <Navbar>
        <h3>PhoneBook</h3>
      </Navbar>
      <AddContactButton />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const getContactList = gql`
    query GetContactList (
      $distinct_on: [contact_select_column!], 
      $limit: Int, 
      $offset: Int, 
      $order_by: [contact_order_by!], 
      $where: contact_bool_exp
  ) {
    contact(
        distinct_on: $distinct_on, 
        limit: $limit, 
        offset: $offset, 
        order_by: $order_by, 
        where: $where
    ){
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
  `
  const { data } = await client.query({
    query: getContactList,
  });
  return {
    props: {
      contacts: data.contact,
    }
  }
}

export default Home
