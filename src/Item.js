import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const API_KEY = 'kvd7fdxsx2rcpa3xu9ha3wgz'

const Editable = styled.input`
  font-size: 24px;
  font-family: inherit;
  font-weight: 500;
  background-color: transparent;
  width: 100%;
  border: none;
  /* &:focus {
    background-color: salmon;
  } */
`

class Item extends Component {
  state = { product: { name: '', url: '', price: 0 } }

  async componentDidMount() {
    // this.getPrice(this.props.name).then(console.log)
    this.setState({ product: await this.getProduct(this.props.name) })
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({ product: await this.getProduct(this.props.name) })
    }
  }

  getProduct = query => {
    return axios
      .get(
        `http://api.walmartlabs.com/v1/search?query=${query}&format=json&apiKey=${API_KEY}`,
      )
      .then(response => response.data)
      .then(data => (data.items ? data.items[0] : {}))
      .then(product => ({
        name: product.name || '',
        url: product.productUrl || '',
        price: product.salePrice || 0,
      }))
    // .then(prices => Math.min(...prices))
  }

  // getAverage = items => {
  //   const sum = items.reduce((a, b) => a + b, 0)
  //   return sum / items.length
  // }

  handleChange = event => {
    this.props.onChange({
      id: this.props.id,
      value: event.target.value,
    })
  }

  render() {
    return (
      <div className="bg-white w-100 mb3 br2 pa3 shadow">
        <div className="flex items-center">
          <Editable
            className="hover-bg-washed-yellow mr2"
            value={this.props.name}
            onChange={this.handleChange}
          />
          {/* <button onClick={() => this.props.onRemove(this.props.id)}>
          Remove
        </button> */}
          <a
            className="dim silver"
            style={{ lineHeight: 0, cursor: 'pointer' }}
            onClick={() => this.props.onRemove(this.props.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-between pt3 mt3 bt b--black-10">
          <p className="black-60 mv0">
            {this.state.product.price
              ? `$${Math.floor(this.state.product.price)}`
              : '$--'}
          </p>
          <a
            className="f6 no-underline black-50 dim"
            href={this.state.product.url}
            target="_blank"
          >
            Source
          </a>
        </div>
      </div>
    )
  }
}

export default Item
