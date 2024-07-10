import React from 'react';
import Image from 'next/image';
import { FilteredEventData } from '../interface/dataType';
import arrowLeft from '../../public/images/arrow_left.png';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface ResultsProps {
  data: FilteredEventData[];
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ data, onBack }) => {
  return (
    <div className='container mx-auto p-4 max-w-full sm:max-w-3xl'> 
      <button 
        className='flex items-center mb-4 text-center rounded-md cursor-pointer hover:text-sky-600'
        onClick={onBack}
      >
        <Image src={arrowLeft} alt="Back arrow" width={24} height={24} /> 
        <span className='ml-2'>重新搜尋</span>
      </button>
      {data && data.length > 0 ? (
        <ul className='list-decimal w-full p-4 space-y-4'>
          {data.map((data, index) => (
            <li key={index} className='space-y-2 w-full border-b pb-4'>
              <h2 className='text-xl sm:text-2xl text-sky-600'>{data.title}</h2> 
              <p className='text-sm sm:text-base break-words'>開始時間: {data.time}</p> 
              <p className='text-sm sm:text-base break-words'>結束時間: {data.endTime}</p> 
              <p className='text-sm sm:text-base break-words'>活動地點: {data.locationName} - {data.location}</p> 
              <p className='text-sm sm:text-base break-words'>活動收費: {data.price ? data.price : '免費'}</p>
              <Typography variant="body2" className='text-sm sm:text-base break-words'>
                活動網頁連結：
                <Link href={data.sourceWebPromote} target="_blank" rel="noopener">
                  點擊查看
                </Link>
              </Typography>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className='text-3xl p-3'>沒地方去，待在家吧</p>
          <Image
            src="/images/404.png"
            alt="Stay at home"
            width={200}
            height={200} 
            layout="fixed" 
            priority 
          />
        </div>
      )}
    </div>
  );
};

export default Results;