import { useState } from 'react';

/**
 * A custom hook for storing and retrieving data in local storage.
 * @param key - The key under which to store the data in local storage.
 * @param initialValue - The initial value to use if no value is found in local storage.
 * @param maxLength - Optional. The maximum length of the array to be stored in local storage.
 * If not provided, the array length is not limited.
 * @returns A tuple containing the current value and a function to update the value.
 */

export default function useLocalStorageState<T>(
    key: string,
    initialValue: T,
    maxLength: number = Infinity
): [T, (newValue: T) => void] {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
    const [value, setValue] = useState<T>(initial);

    /**
     * Update localStorage whenever the value changes.
     * @param newValue - The new value to set and store in local storage.
     */
    const setStoredValue = (newValue: T) => {
        const updatedValue = maxLength < Infinity ? (newValue as unknown as any[]).slice(0, maxLength) : newValue;
        setValue(updatedValue as T); // Explicitly cast updatedValue to type T
        localStorage.setItem(key, JSON.stringify(updatedValue));
    };

    return [value, setStoredValue];
}

/* Usage example: *
import useLocalStorageState from '@/hooks/useLocalStorageState';

function App() {
    const [count, setCount] = useLocalStorageState<number>('count', 25);

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount(count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <button onClick={() => setCount(0)}>reset</button>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App;
*/
