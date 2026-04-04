import { useState, useEffect, useCallback, useRef } from 'react';

type StoredValue<T> = T & { isDefault: boolean };
type SetValue<T> = React.Dispatch<React.SetStateAction<StoredValue<T>>>;

function areStoredValuesEqual<T>(a: StoredValue<T>, b: StoredValue<T>) {
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * A custom hook for persisting state in localStorage
 * @param key The key to store the value under in localStorage
 * @param initialValue The initial value to use if no value exists in localStorage
 * @returns A tuple containing the current value and a function to update it
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: StoredValue<T>
): [StoredValue<T>, SetValue<T>, () => void] {
    const initialValueRef = useRef<StoredValue<T>>({
        ...initialValue,
        isDefault: true
    });

    const readValue = useCallback((): StoredValue<T> => {
        if (typeof window === 'undefined') {
            return initialValueRef.current;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T & { isDefault: boolean }) : initialValueRef.current;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValueRef.current;
        }
    }, [key]);

    const [storedValue, setStoredValue] = useState<StoredValue<T>>(initialValueRef.current);
    const setValue: SetValue<T> = (value) => {
        setStoredValue((currentValue) => {
            try {
                const resolvedValue = value instanceof Function ? value(currentValue) : value;
                const nextValue = {
                    ...resolvedValue,
                    isDefault: false
                };

                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(nextValue));
                }

                return areStoredValuesEqual(currentValue, nextValue) ? currentValue : nextValue;
            } catch (error) {
                console.warn(`Error reading localStorage key "${key}":`, error);
                return currentValue;
            }
        });
    };

    const deleteValue = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
        }
        setStoredValue(initialValueRef.current);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const nextValue = readValue();

        setStoredValue((currentValue) =>
            areStoredValuesEqual(currentValue, nextValue) ? currentValue : nextValue
        );
    }, [readValue]);

    return [storedValue, setValue, deleteValue];
}
