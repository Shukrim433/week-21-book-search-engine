import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client'; // Importing useQuery and useMutation hooks
import Auth from '../utils/auth'; // Adjust the import path as needed
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries'; // Importing GET_ME query
import { REMOVE_BOOK } from '../utils/mutations'; // Importing REMOVE_BOOK mutation


const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME)
  const [removeBook] = useMutation(REMOVE_BOOK)
  const [userData, setUserData] = useState({})

  // this useEffect: whenever new user data (data.me) is fetched from the server, it updates the userData state to reflect this new data.
  useEffect(() => {  
    if (data && data.me) {
      setUserData(data.me)
    }
  }, [data])

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: bookId ,
      });

      if (!data) {
        throw new Error('Failed to delete book.');
      }

      const updatedUser = data.removeBook;
      setUserData(updatedUser); // resets userData state with updated user, minus deleted books
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>Loading...</h2>; // if the GET_ME query is still loading
  if (error) return <p>Error: {error.message}</p>; // if the GET_ME query errors
  if (!userData) return <h2>No user data found.</h2>; // if the userData state is empty (ie, user is not logged in)

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
