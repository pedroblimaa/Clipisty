
import './CopyItem.css'

interface CopyItemProps {
  text: string
  onClick: () => void
}

function CopyItem({ text, onClick }: CopyItemProps) {
  return (
    <div>
      <button className="text-buton" onClick={onClick}>{text}</button>
    </div>
  )
}

export default CopyItem
