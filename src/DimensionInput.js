import React from 'react';

export default function dimensionInput({projn, onChangeprojn}) {
    var dimensions = [1,2,3,4,5,6,7,8,9];
    return (
        <>
            <select value={projn} onChange={onChangeprojn}>
                {dimensions.map(dim => (
                    <option key={dim} value={dim}>{dim}</option>
                ))}
            </select>
        </>
    )
}
