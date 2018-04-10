import React, { Component } from 'react';
import { Word } from './Word';
export class WordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [
                {id: '123', en: 'One', vn: 'Mot', isMemorized: true},
                {id: '124', en: 'Two', vn: 'Hai', isMemorized: false},
                {id: '125', en: 'Three', vn: 'Ba', isMemorized: true},
                {id: '126', en: 'Four', vn: 'Bon', isMemorized: false},
            ],
            shouldShowForm : false,
            txtVn : '',
            txtEn : '',
            filterMode: 'SHOW_ALL',
        };
        this.addWord = this.addWord.bind(this);
        this.shouldShowForm = this.shouldShowForm.bind(this);
    }
    removeWord(id) {
        const newWord = this.state.words.filter(w => w.id !==id);
        this.setState({words: newWord});
    }
    toggleWord(id){
        const newWord = this.state.words.map(w=>{ 
            if(w.id !== id) return w;
            return {...w, isMemorized: !w.isMemorized};
         });
        this.setState({words: newWord});
    }

    genListWord(){
        const { filterMode, words } = this.state;
        const filterWord = words.filter(w=>{
            if (filterMode === 'SHOW_ALL') return true;
            if (filterMode === 'SHOW_FORGOT') return !w.isMemorized;
            return w.isMemorized;
        })
        return filterWord.map(word=><Word wordInfo={word} key={word.id}/>);
    }

    shouldShowForm(){
        this.setState({shouldShowForm: !this.state.shouldShowForm});
    }
    addWord(){
        const id = Math.random();
                    const word = {id, en: this.state.txtEn, vn: this.state.txtVn, isMemorized: false};
                    this.setState({
                        words: [word,...this.state.words],
                        shouldShowForm: false,
                        txtVn : '',
                        txtEn : '',
                    })
    }
    getForm(){
        if(!this.state.shouldShowForm){
            return (<button className="btn btn-success" onClick={()=>{ this.shouldShowForm() }}>Create New Word</button>);
        }
        return (<div className="form-group" style={{ width: '200px' }}>
                <input 
                    className="form-control" 
                    placeholder="English"
                    value={ this.state.txtEn }
                    onChange={ evt=>this.setState({txtEn: evt.target.value}) }
                />
                <input 
                    className="form-control" 
                    placeholder="Vietnamese"
                    value={ this.state.txtVn }
                    onChange={ evt=> this.setState({ txtVn: evt.target.value }) }
                />
                <br/>
                <button className="btn btn-success" onClick={this.addWord}> Add Word </button>
                <button className="btn btn-danger" onClick={this.shouldShowForm}> Cancel </button>
            </div>);
    }
    render() {
        return (
            <div>
                {this.getForm()}
                <select 
                    className="form-control" 
                    style={{ width: '200px' }}
                    value={this.state.filterMode}
                    onChange={ evt=> this.setState({filterMode: evt.target.value})}
                >
                    <option value="SHOW_ALL">SHOW ALL</option>
                    <option value="SHOW_FORGOT">SHOW FORGOT</option>
                    <option value="SHOW_MEMORIZED">SHOW MEMORIZED</option>
                    
                </select>
                {this.genListWord()}
            </div>
        )
    }
}