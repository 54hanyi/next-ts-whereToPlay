import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface DateInputProps {
  onDateChange: (date: Date) => void;
  selectedDate: Date | null;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange, selectedDate }) => {
  const [localSelectedDate, setLocalSelectedDate] = useState<Date | null>(selectedDate);

  useEffect(() => {
    setLocalSelectedDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setLocalSelectedDate(date);
    if (date) {
      onDateChange(date);
    }
  };

  return (
    <div className="w-[40%] my-1">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
          label="出發日期"
          value={localSelectedDate}
          onChange={handleDateChange}
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...params}
              fullWidth
              sx={{
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
      </LocalizationProvider>
    </div>
  );
}

export default DateInput;
