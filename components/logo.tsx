import { MessageSquare, Volume2, Mic } from "lucide-react";
            

export default function Logo() {
              
    return (
        <> 
        {/* Comic speech bubble logo isotipo */}
        <div className="relative flex items-center justify-center p-1.5 bg-teal-600 rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0">
            <MessageSquare className="w-10 h-10 text-white rounded-xl -p-3" strokeWidth={2} />
            <div className="absolute flex items-center justify-center gap-0.5 -mt-0.75">
                <Volume2 className="w-3.5 h-3.5 pl-0.5 animate-pulse text-amber-300" />
                <Mic className="w-3.5 h-3.5 pr-0.5 animate-bounce text-slate-950"/>
            </div>
        </div>
        </> 
    )
}