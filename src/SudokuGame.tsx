import React, { useState, useEffect, useCallback } from 'react';
import { SudokuBoard } from './components/SudokuBoard';
import { Cell } from './types/CellType';
import { InputNumber } from './components/InputNumber';
import { MessageSection } from './components/MessageSection';
import { ValidityCheck } from './components/ValidityCheck';

export const SudokuGame: React.FC<{}> = () => {
	let [selectedCell, setSelectedCell] = useState([0, 0]);
	let [validity, setValidity] = useState<Record<string, boolean>>({
		row: true, col: true, block: true
	})
	let [isWin, setIsWin] = useState(false);
	let [board, setBoard] = useState<Cell[][]>([[]]);

	const getCellBlock = (row: number, col: number) => {
		return Math.ceil(col / 3) + ((Math.ceil(row / 3) - 1) * 3)
	}

	const initBoard = useCallback(() => {
		const givenBoard = [
			['0', '0', '0', '2', '6', '0', '7', '0', '1'],
			['6', '8', '0', '0', '7', '0', '0', '9', '0'],
			['1', '9', '0', '0', '0', '4', '5', '0', '0'],
			['8', '2', '0', '1', '0', '0', '0', '4', '0'],
			['0', '0', '4', '6', '0', '2', '9', '0', '0'],
			['0', '5', '0', '0', '0', '3', '0', '2', '8'],
			['0', '0', '9', '3', '0', '0', '0', '7', '4'],
			['0', '4', '0', '0', '5', '0', '0', '3', '6'],
			['7', '0', '3', '0', '1', '8', '0', '0', '0'],
		]

		const freshBoard: Cell[][] = Array(9).fill([]);
		for (let i = 0; i < 9; i++) {
			const newRow: Cell[] = givenBoard[i].map((currCell, c) => {
				const newCell: Cell = {
					row: i,
					col: c,
					block: getCellBlock(i, c),
					value: givenBoard[i][c] !== '0' ? givenBoard[i][c] : '',
				};
				return newCell;
			})

			freshBoard[i] = newRow;
		}

		setBoard(freshBoard);
	}, []);

	
	const changeSelectedCell = (row: number, col: number) => {
		setSelectedCell([row, col]);
	};

	const changeSelectedCellValue = (value: string) => {
		board[selectedCell[0]][selectedCell[1]].value = value;
		setBoard([...board]);
	};

	const checkBoardValidity = (valid: Record<string, boolean>, win: boolean) => {
		setValidity(valid);
		setIsWin(win);
	};

	useEffect(() => {
		initBoard();
	}, [initBoard]);

	return (
		<>
			<div className="app-container">
				<div className="sudoku-wrapper">
					<MessageSection valid={validity} win={isWin} />
					<SudokuBoard board={board} selected={(row: number, col: number) => changeSelectedCell(row, col)}/>
					<InputNumber changeCellValue={(value: string) => changeSelectedCellValue(value)} />
					<ValidityCheck board={board} checkBoardValidity={(valid: Record<string, boolean>, win: boolean) => checkBoardValidity(valid, win)}/>
				</div>
			</div>
		</>
	);
}
