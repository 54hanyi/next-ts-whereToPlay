import React from 'react';
import Image from 'next/image';
import { FilteredEventData } from '../interface/dataType';
import arrowLeft from '../../public/images/arrow_left.png'; // 更正导入语法

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
              <p className='text-sm sm:text-base break-words'>活動地點: {data.location} - {data.locationName}</p> 
              <p className='text-sm sm:text-base break-words'>活動收費: {data.price ? data.price : '免費'}</p>
              <p className='text-sm sm:text-base break-words'>活動介紹：<span dangerouslySetInnerHTML={{ __html: data.descriptionFilterHtml }} /></p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center'>沒地方去，待在家吧</p>
      )}
    </div>
  );
};

export default Results;
