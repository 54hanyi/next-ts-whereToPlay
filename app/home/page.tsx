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
  const [selectedFree, setSelectedFree] = useState<string>('都可以');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any>(null);

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

  const handleFetchSuccess = (success: boolean, data: any) => {
    setDataFetched(success);
    setFilteredData(data);
  };

  return (
    <div className='min-h-screen py-20 md:py-32 lg:py-20 lg:px-60'>
      <div className="flex justify-center items-center flex-col gap-6">
        {!dataFetched ? (
          <>
            <div className='mb-4'>
              <h1 className="text-4xl sm:text-6xl font-bold text-center">放假好去處</h1>
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
            <div>
              <h1 className="text-4xl  font-bold text-center">好多地方可以去</h1>
            </div>
            <Results data={filteredData} />
          </>
        )}
      </div>
    </div>
  );
}
