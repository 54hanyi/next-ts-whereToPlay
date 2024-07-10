'use client'

import React, { useState } from 'react';
import DateInput from '../components/DateInput';
import FavSelect from '../components/FavSelect';
import CitySelect from '../components/CitySelect';
import FreeSelect from '../components/FreeSelect';
import SubmitButton from '../components/SubmitButton';
import { favOptions, citiesOptions, freeOptions } from '../options';
import Results from '../components/Results';

export default function Page() {
  const [selectedFav, setSelectedFav] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedFree, setSelectedFree] = useState<string>('都可以');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any>(null);

  const handleFavSelected = (selectedFav: string) => {
    setSelectedFav(selectedFav);
  };

  const handleDateSelected = (selectedDate: Date) => {
    const date = selectedDate ? selectedDate : null;
    setSelectedDate(date);
  };

  const handleCitySelected = (selectedCity: string) => {
    setSelectedCity(selectedCity);
  };

  const handleFreeSelected = (selectedFree: string) => {
    setSelectedFree(selectedFree);
  };

  const handleFetchSuccess = (success: boolean, data: any) => {
    setDataFetched(success);
    setFilteredData(data);
  };

  const handleBack = () => {
    setDataFetched(false);
  };

  return (
    <div className='min-h-screen py-10 px-4 sm:px-20 md:px-60 md:py-20'>
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        {!dataFetched ? (
          <>
            <div className='mb-4 w-full'>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center">放假好去處</h1> 
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
              freeOptions={freeOptions}
              required
            />
            <SubmitButton
              selectedFav={selectedFav}
              selectedDate={selectedDate ? selectedDate : new Date()}
              selectedCity={selectedCity}
              selectedFree={selectedFree}
              onFetchSuccess={handleFetchSuccess} 
              setSelectedFav={setSelectedFav}
            />
          </>
        ) : (
          <>
            <div className='w-full'>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center">好多地方可以去</h1> 
            </div>
            <Results data={filteredData} onBack={handleBack} /> 
          </>
        )}
      </div>
    </div>
  );
}