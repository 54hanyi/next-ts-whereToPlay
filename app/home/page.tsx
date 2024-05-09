'use client'

import React, { useEffect, useState } from 'react';
// import useSWR from 'swr';

import DateInput from '../components/DateInput';
import FavSelect from '../components/FavSelect';
import CitySelect from '../components/CitySelect';
import FreeSelect from '../components/FreeSelect';
import SubmitButton from '../components/SubmitButton';


import { favOptions, citiesOptions } from '../options';

export default function Page() {
  const [selectedFav, setSelectedFav] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedFree, setSelectedFree] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-10 px-72 py-20">
        <div className='mb-4'>
          <h1 className="text-6xl font-bold">放假好去處</h1>
        </div>
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
        />
      </div>
    </>
  );
}
