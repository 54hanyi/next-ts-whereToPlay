import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface FreeOption {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

interface FreeSelectProps {
  selectedFree: string;
  onSelectChange: (value: string) => void;
  freeOptions: FreeOption[];
  required?: boolean;
}

const FreeSelect: React.FC<FreeSelectProps> = ({ selectedFree, onSelectChange, freeOptions }) => {
  const [localSelectedFree, setLocalSelectedFree] = useState<FreeOption | null>(null);

  useEffect(() => {
    const selectedOption = freeOptions.find(option => option.value === selectedFree) || null;
    setLocalSelectedFree(selectedOption);
  }, [selectedFree, freeOptions]);

  const handleFreeChange = (
    event: React.SyntheticEvent,
    newValue: FreeOption | null
  ) => {
    if (newValue === null) {
      setLocalSelectedFree(null);
      onSelectChange('都可以');
    } else {
      setLocalSelectedFree(newValue);
      onSelectChange(newValue.value);
    }
  };

  return (
    <div className='w-[40%] my-1'>
      <Autocomplete
        value={localSelectedFree}
        onChange={handleFreeChange}
        options={freeOptions}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="要不要錢" 
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

export default FreeSelect;
