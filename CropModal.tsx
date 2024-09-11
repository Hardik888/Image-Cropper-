import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'


interface CropModalProps {
  children: ReactNode
}
const CropModal: React.FC<CropModalProps> = ({ children }) => {
  {
    return (
      <Card className="inset-0 fixed bg-black rounded-none bg-opacity-70  z-50">
        <div className="flex items-center justify-center mt-[15%] w-full ">
          {children}
        </div>
      </Card>
    )
  }
}
export default CropModal
