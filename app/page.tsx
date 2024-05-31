export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold">IQ test</h1>
      <p>Made by <a href="https://jaarabytes.vercel.app" className="text-red-400">Jaarabytes</a></p>
      <hr />
      <p>This test just tries to boost your confidence levels by guessing your IQ levels. It provides an estimate between the values 80-130,
        where 100 is the population average. This is not real, please for real IQ tests <a href="/real" 
        className="text-red-400 underline">click here</a>
      </p>
      <p>
        This test has some simple questions which you can try to complete before 20 minutes are over. You do get points for finishing the test earlier. 
        You are also not penalised when you answer wrongly, so Harvey Dent your way through it.
      </p>
      <p>Get rid of all the noise surrounding you so that you won&apos;t argue that &apos;I'm bright, the noise was distracting me!&apos;</p>
    </>
  )
}