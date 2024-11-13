import { format } from "date-fns";
const FeaturedCard = ({ title, description, images, date }: any) => {
  return (
    <div className="bg-white rounded-md shadow-2xl mt-10">
      <img
        src={images}
        alt="image"
        className="rounded-t-md w-full object-cover "
      />
      <div className="flex flex-col gap-5 mt-5 px-10 py-5">
        <h1 className="font-medium tracking-tighter text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="border-b-2 border-slate-300 pb-10">
          {description}
        </p>
        <p className="text-slate-400">  {format(new Date(date), "MMMM d, yyyy")}</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
