import { LucideProps } from "lucide-react"


export interface toolProps{
  onClick : () => void,
  toolName : string,
  selectedTool : string
  Icon : React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export const DisplayTool = ({
  onClick,
  toolName,
  selectedTool,
  Icon 
} : toolProps)=>{

  return (
    <div onClick={onClick} className={` rounded-md p-3 ${selectedTool  === toolName ? "bg-blue-100 text-blue-700 border border-blue-300 "  : "text-gray-700 hover:bg-gray-300"}`
}>
      <Icon className="size-5" />

    </div>
  )

}