import Image from "next/image";
import { StaticImageData } from "next/image";
const CardFooter = ({
  image,
  title,
  description,
  btnname,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  btnname: string;
}) => {
  //render
  if (title == "Hotline tư vấn") {
    return (
      <div className="bg-white rounded-lg p-6 flex flex-col  shadow">
        <div className="text-[#4b2995] mb-2 flex flex-row ">
          <Image
            src={image}
            alt="logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <p className="flex flex-col w-full">
            <span className="whitespace-normal text-gray-800 font-semibold text-md mb-1 line-clamp-1 ">
              {title}
            </span>
            <span className="whitespace-normal text-gray-800 font-semibold text-md mb-1 line-clamp-1">
              {description}
            </span>
          </p>
        </div>

        <a
          href="https://anax.vn/"
          className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"
              fill="currentColor"
            />
          </svg>
          {btnname}
        </a>
      </div>
    );
  }
  if (title == "Tư vấn khách") {
    return (
      <div className="bg-white rounded-lg p-6 flex flex-col shadow">
        <div className="text-[#4b2995] mb-2 flex flex-row ">
          {/* Icon chat */}
          <Image
            src={image}
            alt="logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <p className="flex flex-col w-full">
            <span className="text-[#16aaff] font-semibold text-md mb-1 line-clamp-1">
              {title}
            </span>
            <span className="text-[#16aaff] font-semibold text-md mb-1 line-clamp-1">
              {description}
            </span>
          </p>
        </div>
        <a
          href="https://anax.vn/"
          className="w-full bg-[#16aaff] text-white font-bold py-2 rounded flex items-center justify-center gap-2"
        >
          {btnname}
        </a>
      </div>
    );
  }
  if (title == "Để lại thông tin") {
    return (
      <div className="bg-white rounded-lg p-6 flex flex-col shadow">
        <div className="text-[#16aaff] mb-2 flex flex-row">
          {/* Icon form */}
          <Image
            src={image}
            alt="logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <p className="flex flex-col w-full">
            <span className="text-[#16aaff] font-semibold text-md mb-1 line-clamp-1">
              {title}
            </span>
            <span className="text-[#16aaff] font-semibold text-md mb-1 line-clamp-1">
              {description}
            </span>
          </p>
        </div>
        <a
          href="https://anax.vn/"
          className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white font-bold py-2 rounded flex items-center justify-center gap-2"
        >
          {btnname}
        </a>
      </div>
    );
  }
};

export default CardFooter;
