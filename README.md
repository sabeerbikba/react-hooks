# React Hooks

This repository contains custom React hooks for various purposes.

## Hooks

- **`useLocalStorageState`**

    A custom hook that manages state with local storage persistence. It works similarly to React's `useState`, with the key difference being that the first parameter is the local storage key. The second parameter is the initial state.

Example usage:
  ```javascript
  const [stateCount, setStateCount] = useLocalStorageState('uniqueKeyCount:1', 25);
  ```

- **`useLocalStorageReducer`**

    A custom hook for managing state with local storage persistence using reducers. It functions like React's `useReducer`, but the first parameter is the local storage key. The second parameter is the reducer function, and the third is the initial state.

Example usage:
  ```javascript
  const [reducerCount, reducerDispatch] = useLocalStorageReducer('uniqueKeyCount:2', reducerFunction, 25);
  ```
  


## Folder Structure

In the root folder, there are two subfolders:

- `hooks.js`: Contains the implementation of hooks in JavaScript.
- `hooks.ts`: Contains the implementation of hooks in TypeScript.

Both folders contain the same set of hooks, with the only difference being the programming language used.
