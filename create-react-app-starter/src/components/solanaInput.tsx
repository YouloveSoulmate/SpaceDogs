import { useState } from "react";

type SolanaInputProps = {
    value : number;
    minValue?: number;
    callback: (a: any, b: boolean) => void;
}


export const SolanaInput = ({value, minValue = 0, callback} : SolanaInputProps) => {
    let defaultClass : string = "form-control bg-dark border-secondary text-white";
    let isInvalid : string = "is-invalid";
    const [className, setClass] = useState(defaultClass);

    function onChange(event : React.ChangeEvent<HTMLInputElement>) {
        let inputVal = event.target.value;
        let isNumberAndInRange = !isNaN(+inputVal) && +inputVal > minValue;
        if (isNumberAndInRange) {
            setClass(defaultClass);
        }
        else {
            setClass(defaultClass + " " + isInvalid);
        }
        callback(event.target.value, isNumberAndInRange);
    }

    return (
        <input type="text" className={className} aria-label="Solana" aria-describedby="addon-wrapping"
               value={value} onChange = {onChange} 
        />
    )
}