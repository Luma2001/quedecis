import { MessageSquare, Volume2, Mic } from "lucide-react";
            

export default function Logo() {
              
    return (
        <> 
        {/* Comic speech bubble logo isotipo */}
        <div className="relative flex items-center justify-center p-1 bg-blue-600 rounded-xl text-white shadow-sm transition-transform group-hover:scale-105">
            <MessageSquare className="w-10 h-10 text-white rounded-xl -p-3" strokeWidth={2} />
            <div className="absolute flex items-center justify-center  gap-0.5 -mt-0.75">
                <Volume2 className="w-4 h-4 pl-1 animate-pulse text-orange-400" />
                <Mic className="w-4 h-4 pr-1 animate-bounce text-teal-300" />
            </div>
        </div>
        </> 
    )
}