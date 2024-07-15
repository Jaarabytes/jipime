export default function InternalServerError() {
	return (
		<>
			<div>
				<h1 className="my-5 text-2xl font-bold">Internal server error</h1>
				<p className="my-5">Sorry, our server encountered some errors while processing your request</p>
				<hr />
				<button className="px-3 py-2 my-5 bg-green-500 hover:bg-green-400">Start over ? </button>
			</div>
		</>
	)
}
