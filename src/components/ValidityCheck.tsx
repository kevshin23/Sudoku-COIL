import { useState, useEffect } from "react";
import { Cell } from "../types/CellType";

export const ValidityCheck = (props: { board: Cell[][], checkBoardValidity: any }) => {
    const [board, setBoard] = useState(props.board);

    const checkRows = () => {
        let visited: string[] = [];

        for (let row = 0; row < 9; row++) {
            visited = [];
            for (let col = 0; col < 9; col++) {
                if (board[row][col].value !== '') {
                    if (visited.includes(board[row][col].value)) {
                        return false;
                    }
                    visited.push(board[row][col].value)
                }
            }
        }

        return true;
    }

    const checkColumns = () => {
        let visited: string[] = [];

        for (let c = 0; c < 9; c++) {
            for (let r = 0; r < 9; r++) {
                if (board[r][c].value !== '' && visited.includes(board[r][c].value)) {
                    return false;
                }
                visited.push(board[r][c].value)
            }

            visited = [];
        }

        return true;
    }

    const checkBlocks = () => {
        for (let row = 0; row < 9; row += 3) {
            for (let col = 0; col < 9; col += 3) {
                let visited: string[] = [];
                for (let r = row; r < row + 3; r++) {
                    for (let c = col; c < col + 3; c++) {
                        if (board[r][c].value && visited.includes(board[r][c].value)) {
                            return false;
                        }
                        visited.push(board[r][c].value);
                    }
                }
            }
        }

        return true;
    }

    const checkAllFilled = () => {
        for (let c = 0; c < 9; c++) {
            for (let r = 0; r < 9; r++) {
                if (board[r][c].value === '') {
                    return false;
                }    
            }
        }

        return true;
    }

    useEffect(() => {
        setBoard(props.board);
    }, [props.board])

    const check = () => {
        const isValid = {
            row: checkRows(),
            col: checkColumns(),
            block: checkBlocks()
        }

        const isWin = isValid.row && isValid.col && isValid.block && checkAllFilled() ? true : false;
        props.checkBoardValidity(isValid, isWin);
    };

    return (
        <div>
            <button onClick={() => check()}>Check Answers</button>
        </div>
    )
};