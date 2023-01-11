import React from 'react'

export default function OutRow({rowIndex, matrix}) {
  return (
    <div className ="rows">
        {Object.keys(matrix[rowIndex]).map(elementIndex => (
            <p key={rowIndex * 10 + elementIndex}>{Math.round(matrix[rowIndex][elementIndex] * 1000) / 1000}</p> 
        ))}
    </div>
  )
}
