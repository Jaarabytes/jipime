import Age from "@/app/ui/home/Age"
import Upvote from "@/app/ui/home/Donate"
export default function HomePage() {
  return (
    <>
      <div className="px-5 text-center">
        <h1 className="text-[60px] font-bold">IQ test</h1>
        <p className="text-2xl py-5">Made by <a href="https://jaarabytes.vercel.app" className="text-red-400">Jaarabytes</a></p>
        <hr />
        <div className="sm:px-60 my-5">
          <p className="text-lg my-5">This test just tries to boost your confidence levels by guessing your IQ levels. It provides an estimate between the values 80-130,
            where 100 is the population average. This is not real, please for real IQ tests <a href="/real" 
            className="text-red-400 underline">click here</a>
          </p>
          <p className="text-lg">
            Try to complete me before 20 minutes for extra points.<br /> 
            You <b>do</b> get points for finishing the test earlier. <br />
            You are also not penalised when you answer wrongly, so Harvey Dent your way through it.<br />
          </p>
          <p className="text-lg my-5 text-lg">Create a conducive environment around you by getting rid of all the noise surrounding you.</p>
        </div>
        <Age />
        <Upvote />
      </div>
    </>
  )
}