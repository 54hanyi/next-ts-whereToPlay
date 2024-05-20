'use client'

import React, { useState } from 'react';
import DateInput from '../components/DateInput';
import FavSelect from '../components/FavSelect';
import CitySelect from '../components/CitySelect';
import FreeSelect from '../components/FreeSelect';
import SubmitButton from '../components/SubmitButton';
import { favOptions, citiesOptions } from '../options';
import Results from '../components/Results';

export default function Page() {
  const [selectedFav, setSelectedFav] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedFree, setSelectedFree] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dataFetched, setDataFetched] = useState<boolean>(false);  // 新增這行
  const [filteredData, setFilteredData] = useState<any>(null);  // 新增這行

  const handleFavSelected = (selectedFav: string) => {
    setSelectedFav(selectedFav);
    console.log("Selected fav value:", selectedFav);
  };

  const handleDateSelected = (selectedDate: Date) => {
    const date = selectedDate ? selectedDate : null;
    setSelectedDate(date);
    console.log("父組件所選日期:", date);
  };

  const handleCitySelected = (selectedCity: string) => {
    setSelectedCity(selectedCity);
    console.log("所選縣市:", selectedCity);
  };

  const handleFreeSelected = (selectedFree: string) => {
    setSelectedFree(selectedFree);
    console.log("要不要錢?", selectedFree);
  };

  const handleFetchSuccess = (success: boolean, data: any) => {  // 新增這個函數
    setDataFetched(success);
    setFilteredData(data);
  };

  return (
    <div className='px-72 py-20'>
      <div className="flex justify-center items-center flex-col gap-10">
        <div className='mb-4'>
          <h1 className="text-6xl font-bold">放假好去處</h1>
        </div>
        {!dataFetched ? (
          <>
            <FavSelect
              onSelectChange={handleFavSelected}
              favOptions={favOptions}
              selected={selectedFav}
              required
            />
            <DateInput onDateChange={handleDateSelected} selectedDate={selectedDate} required/>
            <CitySelect
              selectedCity={selectedCity}
              onSelectChange={handleCitySelected}
              citiesOptions={citiesOptions}
            />
            <FreeSelect
              selectedFree={selectedFree}
              onSelectChange={handleFreeSelected}
              required
            />
            <SubmitButton
              category={selectedFav}
              selectedFav={selectedFav}
              selectedDate={selectedDate ? selectedDate : new Date()}
              selectedCity={selectedCity}
              selectedFree={selectedFree}
              onFetchSuccess={handleFetchSuccess} 
            />
          </>
        ) : (
          <Results data={filteredData} />
        )}
      </div>
    </div>
  );
}

