import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import { format } from 'date-fns';
import NoteUser from './NoteUser';

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// Style the noteMetaData
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// align 'UserActions' to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`;

const Note = ({ note }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />{' '}
        </MetaInfo>
        <MetaInfo>
          <em>by {note.author.username}</em> <br />
          {format(note.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        <UserActions>
          {data.isLoggedIn ? (
            <NoteUser note={note} />
          ) : (
            <em>Favorites: {note.favoriteCount}</em>
          )}
        </UserActions>
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;
