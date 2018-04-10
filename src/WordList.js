import React, { Component } from 'react';
import { Word } from './Word';
import { WordFilter } from './WordFilter';
import { WordForm } from './WordForm';
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
            filterMode: 'SHOW_ALL',
        };
        this.onToggleShouldShowForm = this.onToggleShouldShowForm.bind(this);
        this.onRemoveWord = this.onRemoveWord.bind(this);
        this.onToggleWord = this.onToggleWord.bind(this);
        this.onSetFilterMode = this.onSetFilterMode.bind(this);
        this.onAddWord = this.onAddWord.bind(this);
    }
    onRemoveWord(id) {
        const newWord = this.state.words.filter(w => w.id !==id);
        this.setState({words: newWord});
    }
    onToggleWord(id){
        const newWord = this.state.words.map(w=>{ 
            if(w.id !== id) return w;
            return {...w, isMemorized: !w.isMemorized};
         });
        this.setState({words: newWord});
    }
    onSetFilterMode(filterMode){
        this.setState({filterMode});
    }
    genListWord(){
        const { filterMode, words } = this.state;
        const filterWord = words.filter(w=>{
            if (filterMode === 'SHOW_ALL') return true;
            if (filterMode === 'SHOW_FORGOT') return !w.isMemorized;
            return w.isMemorized;
        })
        return filterWord.map(word=><Word 
            wordInfo={word} 
            key={word.id}
            onRemoveWord={this.onRemoveWord}
            onToggleWord={this.onToggleWord}
        />);
    }

    onToggleShouldShowForm(){
        this.setState({shouldShowForm: !this.state.shouldShowForm});
    }
    onAddWord(txtEn, txtVn){
        const {words} = this.state;
        const id = Math.random();
                    const word = {id, en: txtEn, vn: txtVn, isMemorized: false};
                    this.setState({
                        words: [word,...words],
                        shouldShowForm: false,
                        txtVn : '',
                        txtEn : '',
                    })
    }
    
    render() {
        return (
            <div>
                <WordForm shouldShowForm={this.state.shouldShowForm} 
                        onToggleShouldShowForm={this.onToggleShouldShowForm}
                        onAddWord={this.onAddWord}
                        />
                <WordFilter filterMode={this.state.filterMode} onSetFilterMode={this.onSetFilterMode}/>
                {this.genListWord()}
            </div>
        )
    }
}