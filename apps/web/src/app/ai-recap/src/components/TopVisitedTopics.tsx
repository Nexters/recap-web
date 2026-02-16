type TopicCard = {
  title: string;
  description: string;
};

const DEFAULT_CARDS: TopicCard[] = [
  {
    title: "손흥민 & 주식시장",
    description:
      "오늘은 스포츠 뉴스와 주식\n정보를 자주 확인하셨네요.\n“시장 동향에 관심이 많으신\n것 같습니다.",
  },
  {
    title: "개발 스택",
    description:
      "React와 TypeScript 관련\n자료를 집중적으로 탐색했습\n니다. 새로운 프로젝트를 시\n작하셨나요?",
  },
  {
    title: "손흥민 & 주식시장",
    description:
      "오늘은 스포츠 뉴스와 주식\n정보를 자주 확인하셨네요.\n“시장 동향에 관심이 많으신\n것 같습니다.",
  },
];

const TopVisitedTopics = () => {
  return (
    <div className="rounded-[1.25rem] bg-white px-9 py-8">
      <p className="text-heading-rg text-gray-800">많이 둘러본 주제</p>

      <div className="mt-6 grid h-74 grid-cols-4 gap-4">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-blue-50 px-6.5 py-6">
          <div className="bg-gradient-04 text-heading-sb mt-5 ml-10 w-fit -rotate-[9.41deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white">
            #손흥민
          </div>

          <div className="bg-gradient-05 text-heading-sb w-fit rotate-[11.17deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white">
            #주식시장
          </div>

          <div className="bg-gradient-06 text-heading-sb w-fit -rotate-[10.56deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white">
            #TypeScript
          </div>
        </div>

        {DEFAULT_CARDS.map((card, index) => (
          <div key={index} className="bg-gray-75 rounded-xl px-6.5 py-6">
            <h3 className="text-heading-md text-gray-900">{card.title}</h3>
            <p className="text-body-1 mt-4 whitespace-pre-line text-gray-900">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopVisitedTopics;
