import Link from "next/link"
import { MdKeyboardArrowUp } from "react-icons/md"
import Image from "next/image"
export default function Lipa () {
    return (
        <>
            <div className="px-5 text-center" style={{minHeight: "100vh"}}>
                <h1 className="font-bold text-3xl my-10">which way?</h1>
                {methods.map((element, index) => (
                    <div key={index} className="flex justify-center sm:inline">
                        <Link href={`/lipa${element.link}`}>
                            <button className={`rounded-lg px-5 py-3 bg-green-900 
                            px-5 text-white m-5 ${element.name == "M-pesa" ? 
                            "bg-green-900 hover:bg-green-700" : "bg-violet-900 hover:bg-violet-700"}`}><MdKeyboardArrowUp 
                            className="inline"/> {element.name} <MdKeyboardArrowUp className="inline"/></button>
                        </Link>
                    </div>
                ))}
                <div className="flex justify-center">
                    <Image className="my-5" src="/for_loyal_customer.png" height={200} width={200} alt="Please make a choice" />
                </div>
            </div>
        </>
    )
}
// add donorbox to donate
const methods = [{name: "Donate", link: ""}, {name: "M-pesa", link: '/mpesa'}]