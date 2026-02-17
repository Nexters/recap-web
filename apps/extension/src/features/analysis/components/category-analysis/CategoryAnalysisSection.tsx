import Divider from "@/components/Divider";
import CategoryAnalysisItem from "@/features/analysis/components/category-analysis/CategoryAnalysisItem";
import CategoryTitle from "@/features/analysis/components/category-analysis/CategoryTitle";

const CategoryAnalysisSection = () => {
  const items = [...Array(6)];
  return (
    <div className="bg-white pt-8 px-5 pb-11">
      <CategoryTitle />

      <div className="mt-6 bg-blue-50 rounded-xl p-5">bouble chart</div>

      <div className="mt-4">
        {items.map((_, idx) => (
          <>
            <CategoryAnalysisItem key={idx} />
            <Divider className="h-0.5" />
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoryAnalysisSection;
