import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface FreeSelectProps {
  selectedFree: string;
  onSelectChange: (value: string) => void;
  freeOptions: { label: string; value: string; disabled?: boolean; selected?: boolean }[];
  required?: boolean;
}

const FreeSelect: React.FC<FreeSelectProps> = ({ selectedFree, onSelectChange, freeOptions }) => {
  const [localSelectedFree, setLocalSelectedFree] = useState<string>('都可以');

  useEffect(() => {
    setLocalSelectedFree(selectedFree);
  }, [selectedFree]);

  const handleFreeChange = (event: any, newValue: string | null) => {
    if (newValue === null) {
      setLocalSelectedFree('都可以');
      onSelectChange('都可以');
    } else {
      setLocalSelectedFree(newValue);
      onSelectChange(newValue);
    }
  };

  return (
    <div className='w-[40%] my-1'>
      <Autocomplete
        value={freeOptions.find(option => option.value === localSelectedFree)?.label || '都可以'}
        onChange={handleFreeChange}
        options={freeOptions.map(option => option.label)}
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

export default FreeSelect;
