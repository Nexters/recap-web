import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/components/GNBTabs";
import { GNB_TABS } from "@/const/navigation.const";

type NavigationTabsProps = {
  value: string;
  onValueChange: (value: string) => void;
};

function NavigationTabs({ value, onValueChange }: NavigationTabsProps) {
  return (
    <GnbTabs value={value} onValueChange={onValueChange}>
      <GnbTabsList>
        {GNB_TABS.map(({ label, value }) => (
          <GnbTabsTrigger key={value} value={value}>
            {label}
          </GnbTabsTrigger>
        ))}
      </GnbTabsList>
    </GnbTabs>
  );
}

export default NavigationTabs;
