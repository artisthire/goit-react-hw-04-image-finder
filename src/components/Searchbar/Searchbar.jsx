import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import { Container, Form, Button, Label, Input } from './Searchbar.styled';

function Searchbar({ onSubmit, isLoading }) {
  const [filter, setFilter] = useState('');
  const inputId = nanoid(5);

  function handleChange({ target }) {
    setFilter(target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!isLoading) {
      const normalizedFilter = filter.trim().toLowerCase();
      setFilter('');

      if (normalizedFilter === '') {
        toast.error('Request cannot be empty');
        return;
      }

      onSubmit(normalizedFilter);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" aria-label="Search" disabled={isLoading}>
          <IoIosSearch />
        </Button>
        <Label htmlFor={inputId}>Search images and photos</Label>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          required
          placeholder="Search images and photos"
          id={inputId}
          value={filter}
          onChange={handleChange}
        />
      </Form>
    </Container>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Searchbar;
