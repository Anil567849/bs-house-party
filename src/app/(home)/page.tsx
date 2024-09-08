'use client'
import { useState } from "react";
import Card from "./com/card";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'


declare global {
  interface Window {
    Razorpay: any;
  }
}

const data = [
  {
    name: 'Anil Kumar',
    location: 'House NO. 4, Near BSNL Office, Delhi',
    price: 9854,
    theme: 'Creator',
    date: '08-09-2024 To 08-09-2024, 11:00PM',
    img: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: 'Sunita Sharma',
    location: 'Apartment 21B, Green Valley, Mumbai',
    price: 7890,
    theme: 'Innovator',
    date: '12-09-2024 To 12-09-2024, 10:30AM',
    img: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: 'Rahul Verma',
    location: 'Plot No. 45, Sector 15, Gurgaon',
    price: 10234,
    theme: 'Blind Date',
    date: '15-09-2024 To 15-09-2024, 2:00PM',
    img: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: 'Pooja Reddy',
    location: 'Villa No. 18, Royal Enclave, Hyderabad',
    price: 9500,
    theme: 'Poker',
    date: '20-09-2024 To 20-09-2024, 5:00PM',
    img: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: 'Vikram Singh',
    location: 'C-67, Near Market, Jaipur',
    price: 8740,
    theme: 'Creator',
    date: '25-09-2024 To 25-09-2024, 3:30PM',
    img: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: 'Meena Patel',
    location: 'B-102, Silver Heights, Ahmedabad',
    price: 11200,
    theme: 'Entrepreneur',
    date: '28-09-2024 To 28-09-2024, 9:00AM',
    img: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


export default function Home() {
  const [open, setOpen] = useState(false)
  const [sPrice, setSPrice] = useState(0);

  return (
      <main className="flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute top-16 inset-0 bg-[url('https://images.unsplash.com/photo-1511909022865-a30191182d6d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-[100%]"></div>

        <div className="w-[70vw] py-5 relative z-10">
            <h1 className="pb-5 text-5xl font-bold text-center text-white leading-[120%]">Join <span className="text-blue-800">House Party</span></h1>
        </div>
        <div className="w-[90vw] py-5 grid grid-cols-4 gap-4">
          {
            data.map((item, ind) => {
              return <Card key={ind} location={item.location} price={item.price} name={item.name} img={item.img} date={item.date} setOpen={setOpen} open={open} setSPrice={setSPrice}/>
            })
          }
        </div>
        <Modal open={open} setOpen={setOpen} price={sPrice}/>
      </main>
  );
}



export function Modal({open, setOpen, price}: {open: boolean, setOpen: any, price: number}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  function loadScript(src: string) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }
  
  async function handleSubmit(e: any) {
      setOpen(false);

      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!res){
        alert('Razropay failed to load!!')
        return 
      }
      
      const order = await fetch('http://localhost:3000/api/create-order', {
        method: 'POST',
        body: JSON.stringify({'amount': price})
      })

      if(!order.ok){
        console.log('order not created', order);
        return;
      }
      
      const {payment} = await order.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_CLIENT_ID as string, // Enter the Key ID generated from the Dashboard
        amount: payment.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: payment.currency,
        name: "Anil Kumar",
        description: "Test Transaction",
        image: "https://media-exp1.licdn.com/dms/image/C4D03AQHHm0hHj4LGcA/profile-displayphoto-shrink_200_200/0/1651641137868?e=1675900800&v=beta&t=K2UePy6MoX4iyhhYy8vuoWoZbou7okjiI-5jwwvW4jk",
        order_id: payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:3000/api/payment-verified",
        prefill: {
            // logged in user details
            name: name,
            email: email,
            contact: number
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };


    var razor = new window.Razorpay(options);
    razor.open();

  }


  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                  <input 
                  type="text" 
                  id="name" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  value={name} 
                  placeholder="Full Name" 
                  required 
                  onChange={(e: any) => setName(e.target.value)}/>
              </div>
              <div className="mb-5">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input 
                  type="text" 
                  id="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  value={email} 
                  placeholder="Email" 
                  required 
                  onChange={(e: any) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-5">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                  <input 
                  type="text" 
                  id="phone" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  value={number} 
                  placeholder="Phone" 
                  required 
                  onChange={(e: any) => setNumber(e.target.value)}/>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}