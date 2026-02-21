import Icon from "@/components/Icon";

const ProfileCard = () => {
  return (
    <div className="py-8 px-5">
      <p className="text-subtitle-2-rg text-gray-800">내 계정</p>
      <div className="flex items-center gap-3 mt-4">
        <div className="size-16 rounded-full bg-gray-100" />
        <div className="flex flex-col">
          <p className="text-headline-sb text-gray-800">이름</p>
          <div className="flex items-center gap-1.5">
            <Icon name="email" />
            <p className="text-body-1 text-gray-800">이메일</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
