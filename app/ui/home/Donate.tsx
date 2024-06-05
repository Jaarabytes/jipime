import { MdKeyboardArrowUp } from "react-icons/md"
import Link from "next/link"
export default function Upvote() {
// Link to payments pages, learn coinbase (metamask), stripe, daraja
    return (
        <>
        <hr className="my-5"/>
            <div className="my-5">
                <p className="my-3">You are high IQ bro, now fund me</p>
                <Link href={`/lipa`}>
                    <button className="bg-green-900 text-white px-3 py-3 rounded-lg 
                    hover:bg-green-700"><MdKeyboardArrowUp className="inline"/> Money upvote <MdKeyboardArrowUp className="inline"/></button>
                </Link>
            </div>
        </>
    )
}