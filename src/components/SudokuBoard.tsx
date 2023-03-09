import { useState, useEffect } from 'react';
import { Cell } from '../types/CellType';

export const SudokuBoard = (props: { board: Cell[][], selected: any }) => {
    const [board, setBoard] = useState(props.board);

    const renderRow = (row: number) => {
        return (
            <tr key={row}>
                {board[row].map((cell, col) => <td key={col} onClick={() => selectCell(row, col)}>{cell.value}</td>)}
            </tr>
        )
    }

    const selectCell = (row: number, col: number) => {
        props.selected(row, col);
    };

    useEffect(() => {
        setBoard(props.board);
    }, [props.board])

    return (
        <table className="board">
            <tbody>
                {board ? board.map((list, currRow) => renderRow(currRow)) : null}
            </tbody>
        </table>
    )
};