import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { PhonebookContext } from '../components/context/PhonebookProvider';
import client from '../components/graphql/client';
import getContactList from '../components/graphql/queries/getContactList';
import AddContactButton from '../components/reusables/addContactButton';
import Alert from '../components/reusables/alert';
import { BaseContactInterface } from '../components/reusables/baseContactInterface';
import Container from '../components/reusables/container';
import { DivFlexCol } from '../components/reusables/divFlexCol/index.style';
import { LoadmoreButtonStyled } from '../components/reusables/loadMoreButton/index.style';
import PersonCard from '../components/reusables/personCard';
import { BackButton, SearchBarStyled } from '../components/reusables/searchBar/index.style';
import { SearchBarViewStyled, SearchViewStyled } from '../components/reusables/searchBar/index.style';

const Home: NextPage = (props: any) => {
  const phonebookContext = useContext(PhonebookContext);
  const [visible, setVisible] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BaseContactInterface[]>([]);
  const [totalData, setTotalData] = useState<BaseContactInterface[]>([]);
  const [searchView, setSearchView] = useState(false);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const isContainFav = () => {
    let result = false;
    phonebookContext.contacts.forEach((item) => {
      if (item.favorite) {
        result = true;
      }
    })
    return result;
  };

  useEffect(() => {
    if (localStorage.getItem('contacts') === null) {
      const tempArray = props.contacts as [];
      const contactDetail: BaseContactInterface[] = [];
      tempArray.forEach((item: BaseContactInterface) => {
        contactDetail.push({
          created_at: item.created_at,
          first_name: item.first_name,
          last_name: item.last_name,
          id: item.id,
          phones: item.phones.map((phone) => {
            const phoneParsed = {
              number: phone.number.replace(/[a-z]+/i, ''),
            };
            return phoneParsed;
          }),
          favorite: false,
        });
      });
      localStorage.setItem('contacts', JSON.stringify(contactDetail));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchView) {
      setTotalData([...phonebookContext.contacts]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchView]);

  useEffect(() => {
    const results = totalData.filter((item) => (item.first_name + " " + item.last_name).toLowerCase().includes(searchTerm));
    setSearchResults(results);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div>
      <Alert title="Success!" message="Successfully added new contact!" condition={phonebookContext.alert} />
      {!searchView && (
        <>
          {!phonebookContext.alert && (
            <Link href="/form">
              <a><AddContactButton /></a>
            </Link>
          )}
        </>
      )}
      <Container>
        <SearchBarViewStyled>
          {searchView && (<BackButton onClick={() => setSearchView(false)}><FaArrowLeft /></BackButton>)}
          <SearchBarStyled type={"text"} placeholder="Search..." onChange={handleChange} onClick={() => setSearchView(true)} value={searchTerm}/>
        </SearchBarViewStyled>
        {!searchView ? (
          <>
            {isContainFav() && (<h2>Favorites</h2>)}
            {phonebookContext.contacts.map((item) => (
              item.favorite && (
                <PersonCard first_name={item.first_name} last_name={item.last_name} phones={item.phones} key={item.created_at} id={item.id} created_at={item.created_at} favorite={item.favorite}/>
              )
            ))}
            <h2>Contacts</h2>
            <DivFlexCol>
              {phonebookContext.contacts.slice(0, visible).map((item) => (
                !item.favorite && (
                  <PersonCard first_name={item.first_name} last_name={item.last_name} phones={item.phones} key={item.created_at} id={item.id} created_at={item.created_at} favorite={item.favorite}/>
                )
              ))}
              {phonebookContext.contacts.length > visible && (
                <LoadmoreButtonStyled onClick={() => setVisible((old) => old + 10)}>Load More</LoadmoreButtonStyled>
              )}
            </DivFlexCol>
          </>
        ) : (
          <>
            {searchTerm === "" ? (
              <SearchViewStyled>
                <h3>Type your friend information!</h3>
              </SearchViewStyled>
            ) : (
              <>
                {searchResults.map((item) => (
                  <PersonCard first_name={item.first_name} last_name={item.last_name} phones={item.phones} key={item.created_at} id={item.id} created_at={item.created_at} favorite={item.favorite}/>
                ))}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { data, error } = await client.query({
    query: getContactList,
  });
  return {
    props: {
      contacts: data.contact,
      error: error || null,
    },
  };
};

export default Home;
