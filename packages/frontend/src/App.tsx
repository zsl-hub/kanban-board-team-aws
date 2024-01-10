import './App.css'
import {useState} from "react";


function App() {
    const [data, setData] = useState<string|undefined>(undefined)

    const fetchDataFromApi = async () => {
        setData(undefined)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/hello-world`)
        const data = await response.text()
        setData(data)
    }

    const fetchedColums = [
        {
            id: 1,
            columnName: "TODO"
        },
        {
            id: 2,
            columnName: "IN PROGRESS"
        },
        {
            id: 3,
            columnName: "DONE"
        }
    ]

    return (
        <main>
            {fetchedColums.map(col => (
                <section>
                    <h1>{col.columnName}</h1>

                    <div className="task">
                        <h3>Task name</h3>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto et sapiente, maiores cum ea nostrum amet unde quo. Dolorum sapiente consectetur explicabo iure. Consequuntur eveniet odit sit unde corrupti enim?
                            Porro iste corrupti molestiae. Vero voluptatum quos optio numquam dignissimos. Dolore asperiores facilis iure nemo architecto omnis repudiandae assumenda doloribus ex. Quae est voluptas sint eveniet, ipsam tenetur dolorem culpa.
                        </p>
                    </div>
                </section>
            ))}
        </main>
    )
}

export default App
