import React, { Component } from 'react';

export class WordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {txtEn: '', txtVn: ''}
        this.addWord = this.addWord.bind(this);
    }

    addWord(){
        const { onAddWord } = this.props;
        const {txtEn, txtVn} = this.state;
        onAddWord(txtEn, txtVn);
        this.setState({txtEn: '', txtVn: ''})
    }
    render() {
        const { shouldShowForm, onToggleShouldShowForm,} = this.props;
        if(!shouldShowForm) return (
            <button className="btn btn-success" 
                onClick={onToggleShouldShowForm}
            >
                Create New Word
            </button>
        );
        return (
            <div className="form-group" style={{ width: '200px' }}>
                <input 
                    className="form-control" 
                    placeholder="English"
                    value={ this.state.txtEn }
                    onChange={evt => this.setState({ txtEn: evt.target.value })}
                />
                <input 
                    className="form-control" 
                    placeholder="Vietnamese"
                    value={ this.state.txtVn }
                    onChange={evt => this.setState({ txtVn: evt.target.value })}
                />
                <br/>
                <button className="btn btn-success"
                    onClick={this.addWord}
                > Add Word </button>
                <button className="btn btn-danger"
                    onClick={onToggleShouldShowForm}
                > Cancel </button>
            </div>
        )
    };
}