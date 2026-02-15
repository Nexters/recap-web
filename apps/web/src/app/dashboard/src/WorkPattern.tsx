import AfterNoonIcon from "@/assets/icons/afternoon.svg";
import EveningIcon from "@/assets/icons/evening.svg";
import MorningIcon from "@/assets/icons/morning.svg";
import NightIcon from "@/assets/icons/night.svg";

type WorkPatternItem = {
  key: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
};

const DEFAULT_ITEMS: WorkPatternItem[] = [
  { key: "morning", Icon: MorningIcon, value: 0.52 },
  { key: "afternoon", Icon: AfterNoonIcon, value: 0.3 },
  { key: "evening", Icon: EveningIcon, value: 0.15 },
  { key: "night", Icon: NightIcon, value: 0.03 },
];

const WorkPattern = () => {
  return (
    <div className="rounded-[1.25rem] bg-white p-10">
      <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
        내 작업 패턴
      </h2>
      <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
        얼리버드 작업자
      </h3>

      <div className="mt-8 flex flex-col gap-5">
        {DEFAULT_ITEMS.map((it) => (
          <PatternRow key={it.key} Icon={it.Icon} value={it.value} />
        ))}
      </div>
    </div>
  );
};

export default WorkPattern;

function PatternRow({
  Icon,
  value,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
}) {
  const pct = Math.round(value * 100);

  return (
    <div className="flex items-center gap-5">
      <div className="flex size-7 items-center justify-center">
        <Icon className="h-7 w-7" />
      </div>

      <div className="relative h-7 w-full overflow-hidden rounded-lg">
        <div
          className="bg-gradient-02 absolute inset-y-0 left-0"
          style={{
            width: `${pct}%`,
          }}
        />

        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: `${100 - pct}%`,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 8px)",
            backgroundColor: "rgba(234, 246, 251, 0.6)",
          }}
        />
      </div>
    </div>
  );
}
