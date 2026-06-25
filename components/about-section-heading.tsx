import SectionHeader from "@/components/section-header";

type AboutSectionHeadingProps = {
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
  scrollReplay?: boolean;
  onSurface?: boolean;
};

export default function AboutSectionHeading({
  title,
  description,
  className,
  descriptionClassName,
  scrollReplay,
  onSurface,
}: AboutSectionHeadingProps) {
  return (
    <SectionHeader
      title={title}
      description={description}
      className={className}
      descriptionClassName={descriptionClassName}
      scrollReplay={scrollReplay}
      onSurface={onSurface}
    />
  );
}
