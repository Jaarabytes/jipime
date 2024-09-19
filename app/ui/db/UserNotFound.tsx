export default function UserNotFound () {
    return (
        <>
            <div className="text-center" style={{minHeight: "100vh"}}>
                <h1 className="font-bold text-2xl">User not found</h1>
                <p className="">Sorry, it seems that your results were not found in our database</p>
                <a href="https://jipime.netlify.app">
                  <button className="px-3 py-5 rounded-lg bg-green-500 hover:bg-green-400">Re-do the test ?</button>
                </a>
            </div>
        </>
    )
}
