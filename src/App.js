import React, { useState } from 'react';
import './App.css';
import DimensionInput from './DimensionInput';
import DispMatrix from './DispMatrix';

function App() {
    const [n, setn] = useState(0);
    const [projn, setprojn] = useState(1);
    const [matrix, setMatrix] = useState([]);
    const [show, setShow] = useState(false);
    const [inShow, setInShow] = useState(true);
    const [singular, setSingular] = useState();
    const [time, setTime] = useState(0);

    // initially set up matrix
    function setupMatrix() {
        setn(projn);
        setShow(true);
        setInShow(true);
        var zeroMat = [];
        for (let i = 0; i < projn; i++) {
            var zeroRow = [];
            for (let j = 0; j < projn; j++) {
                zeroRow.push('0'); 
            }
            zeroMat.push(zeroRow);  
        }
        setMatrix(zeroMat);
    }

    // set value for the given row and col
    function setValues(row, col, value) {
        var newMatrix = [...matrix];
        newMatrix[row][col] = value;
        setMatrix(newMatrix);
    }

    // get inverse matrix
    function inverse() {
        var startTime = performance.now();
        setInShow(false);
        // augment matrix
        var augmat = [];
        for (let i = 0; i < n; i++) {
            let augRow = [];
            for (let j = 0; j < 2 * n; j++) {
                if (j < n) {
                    augRow.push(parseFloat(matrix[i][j]));
                } else {
                    augRow.push(0);
                }
            }
            var newIndex = Number(n) + i;
            augRow[newIndex] = 1;
            augmat.push(augRow);
        }
        
        // Gauss Jordan Elimination
        for (let i = 0; i < n; i++) {
            if (augmat[i][i] === 0) {
                var skip = 1;
                while ((i + skip) < n && augmat[i + skip][i] === 0) {
                    skip++;
                }
                if ((i + skip === Number(n))) {
                    break;
                }
                for (let k = 0; k < 2 * n; k++) {
                    var tempVal = augmat[i][k];
                    augmat[i][k] = augmat[i + skip][k];
                    augmat[i + skip][k] = tempVal;
                }
            }

            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    var rate = augmat[j][i] / augmat[i][i];
                    for (let a = 0; a < 2 * n; a++) {
                        augmat[j][a] = augmat[j][a] - augmat[i][a] * rate;
                    }
                }
            }
        }
        for (let i = 0; i < n; i++) {
            var factor = augmat[i][i];
            for (let j = 0; j < 2 * n; j++) {
                augmat[i][j] = augmat[i][j] / factor;
            }
        }

        // Check if the matrix is singular
        if (augmat[n-1][n-1] === 1) {
            setSingular(false);
            var newMatrix = [];
            for (let i = 0; i < n; i++) {
                newMatrix.push(augmat[i].slice(n));
            }
            setMatrix(newMatrix);
        } else {
            setSingular(true);
        }
        var endTime = performance.now();
        setTime(endTime - startTime);
    }

    return (
        <>
            <h1>Matrix Inverse Calculator</h1>
            <div className="dimensions">
                <label>Matrix Dimension: </label>
                <DimensionInput projn={projn} onChangeprojn={e => setprojn(e.target.value)}/>
                <button onClick={setupMatrix}>GO</button>
            </div>
            <DispMatrix matrix = {matrix} onChangeMatrix = {setValues} show = {show} inShow = {inShow} onInverse = {inverse} singular = {singular} time = {time}/>
        </>
    )
}

export default App;
