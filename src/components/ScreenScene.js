import React from 'react';
import { observer, inject } from 'mobx-react';

class ScreenScene extends React.Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default inject('appState')(observer(ScreenScene))