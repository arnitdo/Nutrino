import { TbAlertOctagonFilled } from 'react-icons/tb'
import store from '../lib/zustand';
import { useEffect } from 'react';

export default function Alert() {
    const { toast, setToast, message } = store()
    useEffect(() => {
        let timer;
        if (toast) {
          // If flag becomes true, set a timer to reset it to false after 5 seconds
          timer = setTimeout(() => {
            setToast(false);
          }, 5000);
        }
        // Cleanup function to clear the timer if the component unmounts or if flag changes before the timer completes
        return () => {
          if(timer)
          clearTimeout(timer);
        };
      }, [toast]);
  return (
    <div
      role="alert"
      className={`${
        toast ? "translate-y-0 opacity-100" : "-translate-y-[20vh] opacity-0"
      } transition-all fixed top-[10vh] right-0 left-0 flex justify-center items-center`}>
    <div
      role="alert"
      className="flex w-fit items-center justify-center rounded-md border-2 border-black bg-dorange p-5 px-8 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <TbAlertOctagonFilled className="mr-3 h-6 min-h-[24px] w-6 min-w-[24px]" />
      {message}
    </div>
    </div>
  )
}