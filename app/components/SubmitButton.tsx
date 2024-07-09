import React from 'react';
import useFetchData from '../hooks/useFetchData';

interface SubmitButtonProps {
  selectedFav: string;
  selectedDate: Date;
  selectedCity: string;
  selectedFree: string;
  onFetchSuccess: (success: boolean, data: any) => void;
  setSelectedFav: (value: string) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  selectedFav,
  selectedDate,
  selectedCity,
  selectedFree,
  onFetchSuccess,
  setSelectedFav
}) => {
  const {
    isLoading,
    error,
    validationError,
    handleSubmit,
  } = useFetchData(selectedFav, selectedDate, selectedCity, selectedFree, onFetchSuccess);

  return (
    <>
      <button 
        className='mt-6 text-center h-[48px] w-[30%] rounded-md cursor-pointer bg-gray-400 hover:bg-gray-500'
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center text-white">
            努力尋找中...
          </div>
        ) : (
          <h3 className="text-white">出發！</h3>
        )}
      </button>
      {validationError && (
        <p className="mt-2 text-red-600">{validationError}</p>
      )}
      {error && <p className="mt-2 text-red-600">發生錯誤: {error}</p>}
    </>
  );
};

export default SubmitButton;
