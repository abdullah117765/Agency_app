import Card from "./shared/Card";

const Services = () => {
  return (
    <div className="bg-slate-950 px-10 py-1 my-32 ">
      <div className="max-w-7xl mx-auto p-5 px-10 w-full ">
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-white border-b-4 border-yellow-500 py-2">
            Services
          </p>
          <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter text-white max-w-lg">
            Services will grow your business
          </h1>
        </div>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-3 mt-10">
          <Card
            title="Inbound"
            description="Enhance your customer engagement with our specialized inbound services, guaranteeing each call is managed with professionalism and efficiency."
          />
          <Card
            title="Outbound"
            description="Amplify your outreach efforts with our targeted outbound services, connecting with potential clients and prospects effectively and impressively."
          />
          <Card
            title="Customer Support Services"
            description="Boost customer satisfaction with our premium support services, providing outstanding assistance and care to your esteemed clients."
          />
          <Card
            title="Final Expense Leads"
            description="Tap into a rich pool of potential clients with our final expense leads, linking you to individuals in need of thorough end-of-life insurance coverage."
          />
          <Card
            title="Medicare Leads"
            description="Discover a valuable resource of prospects with our Medicare leads, specifically designed for healthcare providers and insurers."
          />
          <Card
            title="ACA Leads"
            description="Easily navigate the healthcare marketplace with our ACA leads, connecting you to individuals seeking Affordable Care Act insurance coverage."
          />
          <Card
            title="Final Expense Live Transfers"
            description="Effortlessly convert interested prospects into real-time conversations with our final expense live transfers, enhancing your conversion rates."
          />
          <Card
            title="Medicare Live Transfers"
            description="Directly connect with individuals seeking Medicare solutions through our Medicare live transfers, simplifying your sales workflow."
          />
          <Card
            title="ACA Live Transfers"
            description="Leverage the demand for ACA coverage with our ACA live transfers, linking you with engaged clients instantly."
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
