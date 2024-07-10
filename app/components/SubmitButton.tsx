import React from 'react';
import Button from '@mui/material/Button';
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        sx={{
          marginTop: '24px',
          height: '48px',
          width: '30%',
          '&:hover': {
            backgroundColor: '#029ae8', 
          },
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center text-black">
            努力尋找中...
          </div>
        ) : (
          <h3 className="text-black">出發！</h3>
        )}
      </Button>
      {validationError && (
        <p className="mt-2 text-red-600">{validationError}</p>
      )}
      {error && <p className="mt-2 text-red-600">發生錯誤: {error}</p>}
    </>
  );
};

export default SubmitButton;
