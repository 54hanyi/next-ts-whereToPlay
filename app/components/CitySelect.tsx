import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface CityOption {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

interface CitySelectProps {
  selectedCity: string;
  onSelectChange: (value: string) => void;
  citiesOptions: CityOption[];
}

const CitySelect: React.FC<CitySelectProps> = ({ selectedCity, onSelectChange, citiesOptions }) => {
  const [localSelectedCity, setLocalSelectedCity] = useState<CityOption | null>(null);

  useEffect(() => {
    const selectedOption = citiesOptions.find(option => option.value === selectedCity) || null;
    setLocalSelectedCity(selectedOption);
  }, [selectedCity, citiesOptions]);

  const handleCityChange = (
    event: React.SyntheticEvent,
    newValue: CityOption | null
  ) => {
    if (newValue?.value === "全台跑透透" || newValue === null) {
      setLocalSelectedCity(null);
      onSelectChange('');
    } else {
      setLocalSelectedCity(newValue);
      onSelectChange(newValue.value);
    }
  };

  return (
    <div className='w-[40%] my-1'>
      <Autocomplete
        value={localSelectedCity}
        onChange={handleCityChange}
        options={citiesOptions}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="想去哪裡" 
            variant="outlined" 
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black', // 默認邊框顏色
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main', // hover時的邊框顏色
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main', // focus時的邊框顏色
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

export default CitySelect;
