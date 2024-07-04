
interface CopyItemProps {
  text: string
  onClick: () => void
}

function CopyItem({ text, onClick }: CopyItemProps) {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

export default CopyItem
