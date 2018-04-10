import React, { Component } from 'react';

export class WordFilter extends Component {
    render() {
        const { filterMode, onSetFilterMode } = this.props;
        return (
            <select 
                    className="form-control" 
                    style={{ width: '200px' }}
                    value={filterMode}
                    onChange={ evt=> onSetFilterMode(evt.target.value)}
                >
                    <option value="SHOW_ALL">SHOW ALL</option>
                    <option value="SHOW_FORGOT">SHOW FORGOT</option>
                    <option value="SHOW_MEMORIZED">SHOW MEMORIZED</option>
                    
                </select>
        )
    }
}