import React from 'react';
import InRow from './InRow';
import OutRow from './OutRow';

export default function DispMatrix({matrix, onChangeMatrix, show, inShow, onInverse, singular, time}) {
    if (show) {
        if (inShow) {
            return (
                <>
                    <div className="matrix">
                        <label>Input the Matrix: </label>
                        <div className="mainMatrix">
                            {Object.keys(matrix).map(rowIndex => (
                                <InRow key = {rowIndex} rowIndex = {rowIndex} matrix = {matrix} onChangeMatrix = {onChangeMatrix} />
                            ))}
                        </div>
                        <button onClick={onInverse}>GO</button>
                    </div>
                </>
            )
        } else {
            if (singular) {
                return (
                    <>
                        <div className="matrix">
                            <label className="errormsg">Error: matrix is singular. </label>
                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        <div className="matrix">
                            <label>Inverse Matrix: </label>
                            <div className="mainMatrix">
                                {Object.keys(matrix).map(rowIndex => (
                                    <OutRow key = {rowIndex} rowIndex = {rowIndex} matrix = {matrix} />
                                ))}
                            </div>
                            <label>Execution time: {Math.round(time * 1000) / 1000} ms.</label>
                        </div>
                    </>
                )
            }
        }
    } else {
        return (
            <>
            </>
        )
    }
}