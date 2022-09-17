import { gql } from '@apollo/client'
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import client from '../components/graphql/client'
import Navbar from '../components/layouts/navbar'
import AddContactButton from '../components/reusables/addContactButton'

const Home: NextPage = () => {
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
      contacts: data,
    }
  }
}

export default Home
