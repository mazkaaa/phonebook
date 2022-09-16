import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/layouts/navbar'
import AddContactButton from '../components/reusables/addContactButton'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Navbar>
        <h3>PhoneBook</h3>
      </Navbar>
      <AddContactButton />
    </div>
  )
}

export default Home
