import { useEffect } from "react"

export const UserRockList = ({ rocks, fetchUserRocks, deleteRock }) => {
    
    useEffect(() => {
        fetchUserRocks()
    }, [])



    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                <div>{rock.name} ({rock.type.label})</div>
                <div> In the collection of {rock.user?.first_name ?? 'Unknown'} {rock.user?.last_name ?? 'Unknown'}</div>
                <button onClick={() => deleteRock(rock.id)}>Delete</button>
            </div>)
        }

        return <h3>Loading Rocks...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    )
}