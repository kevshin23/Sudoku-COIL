export const InputNumber = (props: {changeCellValue: any}) => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const onChangeValue = (value: string) => {
        props.changeCellValue(value);
    };

    return (
        <div className="number-selection">
            {numbers.map((value) => 
                <p key={value} className='number-selectors' onClick={() => onChangeValue(value)}>{value}</p>
            )}
        </div>
    )
}