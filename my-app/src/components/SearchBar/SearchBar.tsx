import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(inputValue);
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="search-container">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        placeholder="חפש כתבה לפי כותרת..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
