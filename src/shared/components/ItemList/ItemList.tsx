import * as React from 'react'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'

const s = require('./ItemList.less')

interface IItemListProps extends React.Props<any> {

}

class ItemList extends React.Component<any, any> {
  render() {
    return (
      <div className={ s.container} >
        <Icon icon='glyphicon-repeat' />
        <Button txt='More Info' />
      </div>
    )
  }
}

export default ItemList
