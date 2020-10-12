import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME, GET_NOTES } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  const id = props.match.params.id;
  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userData, loading: userLoading } = useQuery(GET_ME);

  useEffect(() => {
    document.title = `Notedly - Edit Note`;
  });

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  if (loading || userLoading) return <p>Loading..</p>;
  if (error) return <p>Error! Note not found.</p>;

  if (userData.me.id !== data.note.author.id) {
    return <p>You do not have permission to edit the note.</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
