export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold">IQ test</h1>
      <p>Made by <a href="https://jaarabytes.vercel.app" className="text-red-400">Jaarabytes</a></p>
      <hr />
      <p>This test just tries to boost your confidence levels by guessing your IQ levels. It provides an estimate between the values 80-130,
        where 100 is the population average. This is not real, please for real IQ tests 
        <a href="/real"> click here</a>
      </p>
    </>
  )
}