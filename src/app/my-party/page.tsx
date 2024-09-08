import React from 'react'


const data = [
    "7845784578",
    "7887678578",
    "7845784785",
    "7844525772",
    "7845784578",
    "7887678572",
    "7845784785",
    "7844525778",
    "7845784572",
    "7887678579",
    "7845784785",
    "7844525778",
]

function page() {


    // Todo: fetch data from database 


  return (
<main className="flex flex-col items-center justify-center border">
        
    <div className="w-[70vw] py-5">
            <h1 className="pb-5 text-5xl font-bold text-center leading-[120%]">Interested <span className="text-blue-800">People</span></h1>
        </div>

    <div className="relative overflow-x-auto">
        <table className="w-[70vw] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Sno
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone Number
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((number, index) => {
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">
                            {index+1}
                        </td>
                        <td className="px-6 py-4">
                            {number}
                        </td>
                    </tr>
                    })
                }
            </tbody>
        </table>
    </div>

</main>
  )
}

export default page