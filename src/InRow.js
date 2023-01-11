import React from 'react';

export default function InRow({rowIndex, matrix, onChangeMatrix}) {
    function handleValueChange(r, c, e) {
        onChangeMatrix(r, c, e.target.value);
    }
    return (
        <div className ="rows">
            {Object.keys(matrix[rowIndex]).map(elementIndex => (
                <input key={rowIndex * 10 + elementIndex} type="number" value={matrix[rowIndex][elementIndex]} onChange={e => handleValueChange(rowIndex,elementIndex,e)}></input> 
            ))}
        </div>
    )
}
