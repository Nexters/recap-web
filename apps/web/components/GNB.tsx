import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "components/GNBTabs";

const GNB = () => {
  return (
    <GnbTabs defaultValue="a">
      <GnbTabsList>
        <GnbTabsTrigger value="a">분석</GnbTabsTrigger>
        <GnbTabsTrigger value="b">AI 리캡</GnbTabsTrigger>
        <GnbTabsTrigger value="c">설정</GnbTabsTrigger>
      </GnbTabsList>
    </GnbTabs>
  );
};

export default GNB;
