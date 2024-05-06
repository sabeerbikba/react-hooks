import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook to manage state with local storage persistence using reducers.
 * @param {string} key The key under which to store the state in local storage.
 * @param {function} reducer A function that takes the current state and an action, and returns the new state.
 * @param {*} initialState The initial state value.
 * @returns {[*, function]} A tuple containing the current state and a dispatch function to update the state.
 */

export default function useLocalStorageReducer(key, reducer, initialState) {
    // Retrieve the initial state from local storage or use the provided initial state.
    const [state, setState] = useState(() => {
        try {
            const localStorageState = localStorage.getItem(key);
            return localStorageState ? JSON.parse(localStorageState) : initialState;
        } catch (error) {
            console.error('Error retrieving state from localStorage:', error);
            return initialState;
        }
    });

    // Update local storage whenever the state changes.
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error('Error setting state in localStorage:', error);
        }
    }, [key, state]);

    // Memoize the dispatch function to prevent unnecessary re-renders.
    const dispatch = useCallback((action) => {
        setState((currentState) => reducer(currentState, action));
    }, [reducer]);

    // Listen for changes in other tabs and update state accordingly.
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === key) {
                try {
                    const newValue = JSON.parse(event.newValue);
                    setState(newValue);
                } catch (error) {
                    console.error('Error parsing state from localStorage:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup function to remove the event listener when the component unmounts.
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return [state, dispatch];
}


/* Usage example: *
import useLocalStorageReducer from '../hooks.js/useLocalStorageReducer'; // Import the custom hook
import './App.css';

function App() {
    // Define your reducer function
    const reducer = (state, action) => {
        switch (action) {
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
            case 'RESET':
                return 0;
            default:
                return state;
        }
    };

    // Initialize the state using the custom hook
    const [count, dispatch] = useLocalStorageReducer('count2', reducer, 25);

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => dispatch('INCREMENT')}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <button onClick={() => dispatch('RESET')}>reset</button>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
*/