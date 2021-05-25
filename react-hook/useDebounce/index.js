import { useRef, useState } from "react";

export default function useDebounce(initialValue, timeWait=300) {
    const [value, setValue] = useState(initialValue);
    const instance = useRef();

    const changeValue = (newValue) => {
        if (instance.current) {
            clearTimeout(instance.current);
        }
        instance.current = setTimeout(() => {
            setValue(newValue);
        }, timeWait);
    }

    return [ value, changeValue ];
}

/**
 * const [value, setValue] = useDebounce();
 * <Input onChange={e=>setValue(e.target.value)}/>
 */