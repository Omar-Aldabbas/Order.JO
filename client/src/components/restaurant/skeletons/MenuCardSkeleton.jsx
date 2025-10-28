export const MenuCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-mute rounded-xl overflow-hidden w-full h-[320px] skeleton gap-2">
      <div className="skeleton w-full h-44 bg-mute" />
      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <div className="flex flex-col gap-2">
          <div className="skeleton w-[70%] h-6 rounded-full" />
          <div className="skeleton w-[50%] h-4 rounded-full" />
          <div className="skeleton w-[90%] h-3 rounded-full" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="skeleton w-[30%] h-5 rounded-full" />
          <div className="flex gap-1">
            <div className="skeleton w-10 h-6 rounded-full" />
            <div className="skeleton w-10 h-6 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
