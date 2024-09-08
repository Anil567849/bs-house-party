'use client';
import React, { useState } from "react";
import DateTimePicker from "./com/DateTimePicker";
import {parseAbsoluteToLocal} from "@internationalized/date";


export default function App() {

    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [theme, setTheme] = useState("");
    let [date, setDate] = React.useState({
        start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
        end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
      });

    async function handleSubmit(e: any){
        e.preventDefault();

        if(location == "" || price == "" || name == ""){
            alert("please fill all details");
        }

        const res = await fetch('http://localhost:3000/api/create-party', {
            method: "POST",
            body: JSON.stringify({name, location, price, theme, date})
        })

        const {message} = await res.json();

        alert(message);

        setLocation("");
        setPrice("");
        setName("");
        setTheme("");
        

    }
    
  return (
    <main className="flex flex-col items-center justify-center py-5">
         {/* Background Image */}
        <div className="absolute top-16 inset-0 bg-[url('https://images.unsplash.com/photo-1511909022865-a30191182d6d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-[100%]"></div>

        <div className="w-[70vw] relative z-10">
            <h1 className="pb-5 text-5xl font-bold text-center leading-[120%] text-white">Create a <span className="text-blue-800">Party</span></h1>
        </div>
        <form className="w-[40vw] mx-auto relative z-10" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label 
                htmlFor="owner-name" 
                className="block mb-2 text-sm font-medium text-white dark:text-white">Owner Name</label>
                <input 
                type="text" 
                id="owner-name" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={name} 
                placeholder="Owner Name" 
                required 
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label 
                htmlFor="location" 
                className="block mb-2 text-sm font-medium text-white dark:text-white">Location</label>
                <input 
                type="text" 
                id="location" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={location} 
                placeholder="Enter Full Address" 
                required 
                onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <div className="mb-5">
                <label 
                htmlFor="price" 
                className="block mb-2 text-sm font-medium text-white dark:text-white">Price</label>
                <input 
                type="number" 
                id="price" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={price} 
                placeholder="Price" 
                required 
                onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="mb-5">
                <div>
                    <label 
                    htmlFor="countries" 
                    className="block mb-2 text-sm font-medium text-white dark:text-white">Date and Time Range</label>
                    <DateTimePicker date={date} setDate={setDate}/>
                </div>
            </div>
            <div className="mb-5">
                <label 
                htmlFor="countries" 
                className="block mb-2 text-sm font-medium text-white dark:text-white">Theme</label>
                <select 
                id="countries" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={theme}
                onChange={(e) => setTheme(e.target.value)}>
                    <option value="" selected>Choose a theme</option>
                    <option value="creator">Creator</option>
                    <option value="poker">Poker</option>
                    <option value="blind-date">Blind Date</option>
                </select>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
        </form>
    </main>
  );
}
