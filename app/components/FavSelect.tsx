import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface FavSelectProps {
  onSelectChange: (value: string) => void;
  favOptions: { label: string; value: string; disabled?: boolean; selected?: boolean }[];
  selected: string;
  required?: boolean;
}

const FavSelect: React.FC<FavSelectProps> = ({ onSelectChange, favOptions, selected }) => {
  const [localSelectedFav, setLocalSelectedFav] = useState<string>('');

  useEffect(() => {
    setLocalSelectedFav(selected);
  }, [selected]);

  const handleFavChange = (event: any, newValue: string | null) => {
    if (newValue === null) {
      setLocalSelectedFav('');
      onSelectChange('');
    } else {
      const selectedOption = favOptions.find(option => option.label === newValue);
      const selectedValue = selectedOption ? selectedOption.value : '';
      setLocalSelectedFav(selectedValue);
      onSelectChange(selectedValue);
    }
  };

  return (
    <div className='w-[40%] my-1'>
      <Autocomplete
        value={favOptions.find(option => option.value === localSelectedFav)?.label || ''}
        onChange={handleFavChange}
        options={favOptions.map(option => option.label)}
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
