import useLocalStorage from '../hooks.ts/useLocalStorage'
import './App.css'

function App() {
    const [count, setCount] = useLocalStorage<number>('count', 25);

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

export default App
