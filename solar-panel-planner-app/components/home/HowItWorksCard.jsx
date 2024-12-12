import Image from "next/image";
const HowItWorksCard = ({ content }) => {
  const { title, description, image } = content;
  return (
    <div className="bg-orange-50 border-orange-400 border-b-4 border-r-4 flex flex-col gap-4 items-center justify-start p-16 h-full text-center rounded-md">
      <div>
        <Image height={100} width={100} src={image} alt="How it works" />
      </div>
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h3>
        <p className="mt-4 text-lg text-gray-700 text-balance">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
