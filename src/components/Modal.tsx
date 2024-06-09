import { Button } from "./ui/button";

export default function Modal({
  children,
  isvisable,
  setIsvisbale,
  body,
}: any) {
  if (!isvisable) return null;
  return (
    <div
      onClick={() => setIsvisbale(!isvisable)}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md flex justify-center items-center"
    >
      <div className="w-[80%]  flex flex-col gap-2  ">
        <Button onClick={() => setIsvisbale(!isvisable)} className=" self-end">
          close
        </Button>
        <div className="p-3 rounded-md bg-slate-200 h-[50rem] overflow-scroll ">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </div>
  );
}
