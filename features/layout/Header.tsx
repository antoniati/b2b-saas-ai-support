import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full flex gap-4 p-4 border-b border-gray-200 bg-white">
      <Image
        src="/assets/images/logo.png"
        alt="Logo B2B SaaS AI Support"
        width={150}
        height={40}
      />
    </header>
  );
};
