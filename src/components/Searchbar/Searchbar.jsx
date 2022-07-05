import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import { Container, Form, Button, Label, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit, isLoading }) => {
  const [filter, setFilter] = useState('');
  const inputId = nanoid(5);
  const toastId = useRef(null);

  function handleChange({ target }) {
    toast.dismiss(toastId.current);
    setFilter(target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!isLoading) {
      const normalizedFilter = filter.trim().toLowerCase();

      if (normalizedFilter === '') {
        toastId.current = toast.error('Request cannot be empty');
        setFilter('');
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
        <Label htmlFor={inputId + "-search"}>Search</Label>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          required
          placeholder="Search images and photos"
          id={inputId + "-search"}
          value={filter}
          onChange={handleChange}
          onClick={() => toast.dismiss(toastId.current)}
        />
      </Form>
    </Container>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Searchbar;
