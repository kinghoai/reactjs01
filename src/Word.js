import React, { Component } from 'react';
import { connect } from 'react-redux';

class WordComponent extends Component {
    render() {
        const { wordInfo, dispatch } = this.props;
        return (
            <div className="word">
                <div className="word-container">
                    <h3 className="text-success">{wordInfo.en}</h3>
                    <h3 className="text-danger">
                        { wordInfo.isMemorized ? '-----' : wordInfo.vn }
                    </h3>
                </div>
                    <div className="btn-container">
                    <button
                        className="btn btn-success"
                        onClick={() => dispatch({ type: 'TOGGLE_WORD', id: wordInfo.id })}
                    >
                        { wordInfo.isMemorized ? 'Forgot' : 'Memorized' }
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={()=> dispatch({ type: 'REMOVE', id: wordInfo.id })}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    }
}


export const Word = connect()(WordComponent);