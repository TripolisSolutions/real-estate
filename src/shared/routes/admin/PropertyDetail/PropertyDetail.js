import React from 'react'

import { observer } from '../../../context'

@observer
class PropertyDetail extends React.Component {

  static fetchData(store, params) {
    if (params.id === 'new') {
      return store.propertiesStore.prepareNewProperty()
    }
    return store.propertiesStore.get(params.id)
  }

  render() {
    const property = this.context.store.propertiesStore.propertyDetail

    return (
      <div>
        <div>
          <div>Vietnamese</div>
          <div>English</div>
        </div>
        <div>
          { JSON.stringify(property) }
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

export default PropertyDetail
