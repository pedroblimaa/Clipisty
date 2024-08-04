import './CopyItem.css'

interface CopyItemProps {
  text: string
  onClick: () => void
}

function CopyItem({ text, onClick }: CopyItemProps) {
  return (
    <>
      <div className='text-buton' onClick={onClick}>
        <p>{text}</p>
      </div>
    </>
  )
}

export default CopyItem
