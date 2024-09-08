import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Image} from "@nextui-org/react";

export default function App({location, price, name, img, date, setOpen, open, setSPrice}: {location: string, price: number, name: string, img: string, date: string, setOpen: any, open: boolean, setSPrice: any}) {

  function handeClick() {
    setOpen(!open);
    setSPrice(price);
  }

  return (
    <Card className="max-w-[340px] p-1 shadow-lg border">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Image radius="full" height={40} width={40} src={img} className="opacity-100" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{name}</h4>
            <h5 className="text-small tracking-tight text-default-400">Price: {price}</h5>
          </div>
        </div>
        <Button
          color="primary"
          radius="full"
          size="sm"
          onClick={handeClick}
        >
          Join
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <div className="py-2">
          <p className="text-gray-700 font-bold">Location</p>
          <p>{location}</p>
        </div>
        <div className="py-2">
          <p className="text-gray-700 font-bold">Date</p>
          <p>{date}</p>
        </div>
      </CardBody>
    </Card>
  );
}
