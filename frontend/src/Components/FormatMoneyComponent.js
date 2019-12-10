import React, {Component} from 'react'
import {formatMoney} from '../requesters/formatMoney'
class FormatMoneyComponent extends Component {

    state = {
        value: undefined,
        received: undefined
    }

    async handleSubmit(event) {
        event.preventDefault()
        try {
            const res = await this.handleFormatMoney({value: this.state.value})
            this.setState({received: res.data.value})
        } catch {
            this.setState({received: "Error"})
        }
    }

    async handleFormatMoney(value) {
        return await formatMoney({value})
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }

    render(){
        return (
            <form onSubmit = {this.handleSubmit.bind(this)}>
                <div>
                    <h1>Format money</h1>
                </div>
                <div>
                    <label htmlFor="numberInput">Input</label>
                    <input id="numberInput" type="number" onChange={this.handleChange.bind(this)}/>
                    <button type="submit">Send</button>
                </div>
                {
                    this.state.received === ("Error" || undefined)
                        ? <h2 test-id={"Error"} style={{'color': '#b22222'}}>{this.state.received}</h2>
                        : this.state.received && <h2 test-id={"ok"}>{this.state.received}</h2>
                }
            </form>
        )}
}

export default FormatMoneyComponent