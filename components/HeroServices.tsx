import React from "react";
import ServicesCard from "./ServicesCard";
import finance from "../public/carlos-muza-hpjSkU2UYSU-unsplash.jpg";
import medical from "../public/annie-spratt-O1xUS9p4BBs-unsplash.jpg";
import leads from "../public/campaign-creators-huSZMy_MDkk-unsplash.jpg";
const HeroServices = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 px-10 mt-32">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <h1 className="font-extrabold tracking-tighter text-lg md:text-xl">
          Services
        </h1>
        <h1 className="font-extrabold tracking-tighter text-3xl md:text-5xl border-b-8 border-yellow-500 py-2">
          Services that we provide
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:gap-2 mt-10 ">
        <ServicesCard
          title="Final Expense Leads"
          description="Final expense leads are prospective customers interested in purchasing insurance designed to cover funeral and burial expenses. These leads consist of individuals actively seeking financial protection for end-of-life costs."
          images={finance}
        />
        <ServicesCard
          title="Medicare Leads"
          description="Medicare leads are prospects who have expressed interest in obtaining information or services related to Medicare, a federal health insurance program in the United States primarily for individuals aged 65 and older. These leads often include individuals seeking Medicare Advantage plans, Medicare Supplement Insurance (Medigap), or information about Medicare enrollment."
          images={medical}
        />
        <ServicesCard
          title="ACA Leads​​"
          description="ACA leads denote individuals actively seeking health insurance coverage under the Affordable Care Act, commonly referred to as Obamacare. These leads encompass those exploring information about health insurance marketplaces, subsidies, and available options under the ACA."
          images={leads}
        />
      </div>
    </div>
  );
};

export default HeroServices;
