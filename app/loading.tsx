import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <Image
        alt="Synth knob cargando"
        className="h-20 w-20 animate-[spin_2.5s_linear_infinite]"
        height={80}
        priority
        src="/logo.svg"
        width={80}
      />
    </div>
  );
};

export default Loading;
