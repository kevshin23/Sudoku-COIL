import { useState, useEffect } from 'react';

export const MessageSection = (props: { valid: Record<string, boolean>, win: boolean }) => {
    const [validBoard, setValidBoard] = useState<Record<string, boolean>>({row: true, col: true, block: true});
    const [isWin, setIsWin] = useState(false);

    const renderMessage = () => {
        const messages = [];

        if (!validBoard.row) {
            messages.push('There are duplicate numbers in a row!');
        }

        if (!validBoard.col) {
            messages.push('There are duplicate numbers in a column!');
        }

        if (!validBoard.block) {
            messages.push('There are duplicate numbers in a block!');
        }
        
        if (isWin) {
            messages.push('Completed!');
        }

        return (
            messages.map((msg, i) => <p key={i}>{msg}</p>)
        );
    };

    useEffect(() => {
        setValidBoard(props.valid);
        setIsWin(props.win);
    }, [props.valid, props.win]);

    return (
        <div className='message-section'>
            {renderMessage()}
        </div>
    );
};