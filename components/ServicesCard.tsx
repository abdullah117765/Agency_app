import { Button } from "./ui/button";

import Link from "next/link";

const ServicesCard = ({ title, description, images }: any) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-center md:justify-between md:px-20 md:gap-10">
      <div>
        <img src={images} alt="imageServices" width={500} height={500} />
      </div>
      <div className="flex flex-col items-start justify-center gap-10 max-w-md md:px-10 md:py-20">
        <h1 className="font-extrabold text-2xl md:text-4xl tracking-tighter">
          {title}
        </h1>
        <h1 className="tracking-tighter text-slate-500">{description}</h1>
        <div className="flex items-center justify-between gap-44">
          <Button>
            <Link href="/quotation">Avail Service</Link>
          </Button>
          <h1 className="font-extrabold text-xl">$299</h1>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
