import { useState, useEffect } from 'react';

interface DateInputProps {
  onDateChange: (date: Date) => void;
  selectedDate: Date | null;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange, selectedDate}) => {
  const [localSelectedDate, setLocalSelectedDate] = useState<Date | null>(selectedDate);

  useEffect(() => {
    setLocalSelectedDate(selectedDate); // 使用 useEffect 監聽 selectedDate 的變化並更新 localSelectedDate
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setLocalSelectedDate(selectedDate);
    onDateChange(selectedDate);
    console.log(`Date組件${selectedDate}`);
    console.log(`Date組件類型：${typeof selectedDate}`);
    console.log(`Date組件類型：${selectedDate instanceof Date ? 'Date' : typeof selectedDate}`);

  };

  return (
    <>
      <input
        type="date"
        className="text-center h-[48px] w-[40%] rounded-md border-2 border-gray-200 cursor-pointer focus:bg-gray-100"
        value={localSelectedDate?.toISOString().substring(0, 10) || ''} // 將日期轉換為 ISO 字符串並截取前 10 個字符，以符合 input 的格式
        onChange={handleDateChange}
      />
    </>
  );
}

export default DateInput;
