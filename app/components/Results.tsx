'use client'

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
    <div>
      <button 
        className='flex px-12 text-center rounded-md cursor-pointer hover:text-sky-600'
        onClick={onBack}
      >
        <Image src={arrowLeft} alt="Back arrow" width={24} height={24} /> 重新搜尋{/* 使用 <Image /> 组件 */}
      </button>
      {data && data.length > 0 ? (
        <ul className='list-decimal p-12 space-y-4'>
          {data.map((data, index) => (
            <li key={index} className='space-y-2'>
              <h2 className='text-2xl text-sky-600'>{data.title}</h2>
              <p>開始時間: {data.time}</p>
              <p>結束時間: {data.endTime}</p>
              <p>活動地點: {data.location} - {data.locationName}</p>
              <p>活動收費: {data.price ? data.price : '免費'}</p>
              <p>活動介紹：{data.descriptionFilterHtml}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>沒地方去，待在家吧</p>
      )}
    </div>
  );
};

export default Results;
