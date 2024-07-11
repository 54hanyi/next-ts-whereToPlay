import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

interface FavSelectProps {
  onSelectChange: (value: string) => void;
  favOptions: { label: string; value: string; disabled?: boolean; selected?: boolean }[];
  selectedFav: string;
  required?: boolean;
}

const FavSelect: React.FC<FavSelectProps> = ({ favOptions, selectedFav, onSelectChange }) => {
  const [localSelectedFav, setLocalSelectedFav] = useState<Option | null>(null);

  useEffect(() => {
    const selectedOption = favOptions.find(option => option.value === selectedFav) || null;
    setLocalSelectedFav(selectedOption);
  }, [selectedFav, favOptions]);

  const handleFavChange = (
    event: React.SyntheticEvent,
    newValue: Option | null
  ) => {
    setLocalSelectedFav(newValue);
    onSelectChange(newValue ? newValue.value : '');
  };

  return (
    <div className='w-[40%] my-1'>
      <Autocomplete
        value={localSelectedFav}
        onChange={handleFavChange}
        options={favOptions}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="您的喜好" 
            variant="outlined" 
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black', // 默認邊框顏色
                },
                '&:hover fieldset': {
                  borderColor: 'primary', // hover時的邊框顏色
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary', // focus時的邊框顏色
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black', // 標籤顏色
              },
              '& .MuiInputBase-input': {
                color: 'black', // 輸入文字顏色
              },
            }} 
          />
        )}
      />
    </div>
  );
};

export default FavSelect;
