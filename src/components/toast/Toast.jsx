import React from 'react'

export default function Toast( props ) {
  const { type, text } = props;
  return (
    <div 
    className={`absolute ${classNames(type)}`} 
    >
      { text }
    </div>
  )
}

const classNames = type =>{
  switch( type ){
    case "success":
      return "text-green-800 bg-green-600 border-green-800";
    case "danger":
      return "text-red-900 bg-red-500 border-red-900";
    default: 
      return "text-gray-800 bg-gray-100 border-gray-800"

  }
}