const CategoryLink = () => {
  return (
    <div className="bg-gray-75 flex items-center justify-between rounded-full pl-2 pr-4 py-2">
      <div className="flex items-center gap-3">
        <div className="size-6 rounded-full bg-gray-300" />
        <p className="text-body-1 text-gray-500">https://www.figma.com</p>
      </div>

      <p className="text-body-1 text-gray-900">20분</p>
    </div>
  );
};

export default CategoryLink;
