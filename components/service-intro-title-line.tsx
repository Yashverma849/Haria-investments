type ServiceIntroTitleLineProps = {
  text: string;
};

export default function ServiceIntroTitleLine({
  text,
}: ServiceIntroTitleLineProps) {
  return (
    <span className="block">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-title-letter
          className="text-white"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
