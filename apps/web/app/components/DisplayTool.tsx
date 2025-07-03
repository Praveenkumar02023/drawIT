import { LucideProps } from "lucide-react"
import { toolType } from "../room/[slug]/page"

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
    <div onClick={onClick} className={`rounded-md p-1.5 ${selectedTool  === toolName ? "bg-blue-100 text-blue-500" : "text-gray-700"}`
}>
      <Icon/>

    </div>
  )

}