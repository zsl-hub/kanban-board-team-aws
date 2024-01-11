import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useState} from "react";


function App() {
    const [data, setData] = useState<string|undefined>(undefined)

    const fetchDataFromApi = async () => {
        setData(undefined)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/task/add`)
        const data = await response.text()
        setData(data)
    }

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <button onClick={fetchDataFromApi}>Fetch Data From Lambda Api</button>
            {data && <p color="blue">Lambda Response: {data}</p>}
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
