
export interface ISchemeItemProps {
  itemScope?: boolean
  itemType?: ISchemeItemType
}

const SchemeItem: React.FC<ISchemeItemProps> = ({ 
  itemScope,
  itemType,
  children,
}) => {
  return (
    <div
      itemScope={itemScope}
      itemType={itemType}
    >
      { children }
    </div>
  )
}

export default SchemeItem
