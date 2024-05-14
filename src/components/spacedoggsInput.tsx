import { useMemo, useState } from "react";

type SpacedoggsInputProps = {
    value : number;
    minValue?: number;
}


export const SpacedoggsInput = ({value, minValue = 0} : SpacedoggsInputProps) => {
    const inputVal = useMemo(() => {
        console.log("Used memo");
        if (isNaN(+value) || +value <= minValue) {
            return 0;
        }
        else {
            return Math.round(value*10000000);
        }
    }, [value]);

    return (
        <input value={inputVal} type="text" className="form-control bg-dark border-secondary text-white" aria-label="Username" aria-describedby="addon-wrapping"/>
    )
}