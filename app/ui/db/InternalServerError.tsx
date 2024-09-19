export default function InternalServerError() {
	return (
		<main style={{ minHeight: '100vh' }}>
			<div className="text-center">
				<h1 className="my-5 text-2xl font-bold">Internal server error</h1>
				<p className="my-5">Sorry, our server encountered some errors while processing your request</p>
				<hr />
				<a href=""/"><button className="px-3 py-2 my-5 bg-green-700 rounded-lg text-white hover:bg-green-600">Start over ? </button></a>
			</div>
		</main>
	)
}
