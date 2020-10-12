import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        id
        username
      }
    }
  }
`;

const NewNote = props => {
  useEffect(() => {
    document.title = 'Notedly - New Note';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  return (
    <React.Fragment>
      {loading && <p>Loading.. </p>}
      {error && <p>Error creating note.</p>}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
