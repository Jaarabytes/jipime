export default function RealPage() {
    const list = [{name: "IQTest.com", link: "https://iqtest.com"}, {name: "Mensa Norway", link:"https://test.mensa.no"},
        {name: "Free IQ test", link:"https://freeiqtest.info"}, {name:"Bright org", link: "brght.org"}, 
        {name: "My IQ tested", link:"https://myiqtested.com"}, {name: "Mensa Finland", link:"https://mensa.fi/test"},
        {name: "international Iq test", link: "https://international-iq-test.com"}, {name: "Free IQ test (better)", link: "https://free-iqtest.net"}
    ]

    return (
        <>
            <div>
                <p>Here is a list of some good IQ tests (They are not better than <a href="/" 
                className="text-red-400 underline">jipime</a>, however they inspired me)</p>
                <div className="px-5">
                    {list.map((element, index) => (
                        <dl key={index}>
                            <li className="underline hover:text-red-400"><a target="_blank" href={element.link}>{element.name}</a></li>
                        </dl>
                    ))}
                </div>
            </div>
        </>
    )
}