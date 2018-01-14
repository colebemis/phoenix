import React, { Component } from 'react'
import styled from 'styled-components'
import { Provider } from 'rebass'
import Item from './Item'
import shortid from 'shortid'
import 'tachyons'
import Voice from './Voice'

class App extends Component {
  state = { inputValue: '', items: [] }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    const item = {
      id: shortid.generate(),
      name: this.state.inputValue,
    }

    console.log(item)

    this.setState(prevState => ({
      items: [item, ...prevState.items],
      inputValue: '',
    }))
  }

  handleItemChange = ({ id, value }) => {
    const { items } = this.state

    const index = items.findIndex(item => item.id === id)

    items[index].name = value

    this.setState({ items })
  }

  handleVoice = items => {
    // console.log(items)
    const itemsWithId = items.map(name => ({
      id: shortid.generate(),
      name,
    }))

    // console.log(Array.from(items))

    this.setState(prevState => ({
      items: [...itemsWithId, ...prevState.items],
    }))
  }

  handleItemRemove = id => {
    const { items } = this.state

    this.setState({ items: items.filter(item => item.id !== id) })
  }

  render() {
    return (
      <Provider>
        <div
          className="bg-near-white w-100  flex items-center flex-column"
          style={{ minHeight: '100vh' }}
        >
          <div
            style={{
              width: '80%',
              maxWidth: 480,
              paddingTop: 100,
              paddingBottom: 100,
            }}
          >
            <div style={{ position: 'relative' }}>
              <form onSubmit={this.handleSubmit}>
                <input
                  className="shadow input-reset f5 pa3 bn br2 w-100 mb4"
                  style={{ fontFamily: 'inherit', boxSizing: 'border-box' }}
                  value={this.state.inputValue}
                  placeholder="What's in your house?"
                  onChange={this.handleInputChange}
                />

                {/* <button type="submit">Add</button> */}
              </form>
              <Voice onResult={this.handleVoice} />
            </div>
            {this.state.items.map(item => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                onChange={this.handleItemChange}
                onRemove={this.handleItemRemove}
              />
            ))}
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
