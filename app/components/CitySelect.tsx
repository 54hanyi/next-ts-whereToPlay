import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface CitySelectProps {
  selectedCity: string;
  onSelectChange: (value: string) => void;
  citiesOptions: { label: string; value: string; disabled?: boolean; selected?: boolean }[];
}

const CitySelect: React.FC<CitySelectProps> = ({ selectedCity, onSelectChange, citiesOptions }) => {
  const [localSelectedCity, setLocalSelectedCity] = useState<string>('');

  useEffect(() => {
    setLocalSelectedCity(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (event: any, newValue: string | null) => {
    if (newValue === "全台跑透透" || newValue === null) {
      setLocalSelectedCity('');
      onSelectChange('');
    } else {
      setLocalSelectedCity(newValue);
      onSelectChange(newValue);
    }
  };

  return (
    <div className='w-[40%]'>
      <Autocomplete
        value={localSelectedCity}
        onChange={handleCityChange}
        options={citiesOptions.map(option => option.label)}
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
                  borderColor: 'blue', // hover時的邊框顏色
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue', // focus時的邊框顏色
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
        sx={{ width: '100%' }}
      />
    </div>
  );
};

export default CitySelect;
