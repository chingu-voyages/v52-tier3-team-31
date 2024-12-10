import Image from "next/image";
const HowItWorksCard = ({ content }) => {
  const { title, description, image } = content;
  return (
    <div className="bg-gray-50 border-r-2 border-b-2 border-gray-200 flex flex-col gap-4 items-center justify-start p-16 h-full shadow-sm text-center rounded-md">
      <div>
        <Image height={100} width={100} src={image} />
      </div>
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h3>
        <p className="mt-4 text-lg text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
