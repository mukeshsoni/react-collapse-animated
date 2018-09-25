import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Collapse extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      height: 0
    }
    this.containerRef = null
  }

  componentDidMount() {
    if (this.props.open) {
      this.setState({
        height: this.containerRef ? this.containerRef.scrollHeight : 0
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({
        height: this.containerRef ? this.containerRef.scrollHeight : 0
      })
    }
  }

  render() {
    const {
      id,
      open,
      children,
      style,
      transitionDuration,
      transitionType
    } = this.props
    const { height } = this.state

    return (
      <div
        style={{
          overflow: 'hidden',
          transition: `height ${transitionDuration} ${transitionType}`,
          height: open ? height : 0,
          ...style
        }}
        ref={node => (this.containerRef = node)}
        id={id}
        aria-hidden={!open}
      >
        {children}
      </div>
    )
  }
}

Collapse.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string,
  style: PropTypes.object,
  transitionDuration: PropTypes.string,
  transitionType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Collapse.defaultProps = {
  transitionDuration: '0.3s',
  transitionType: 'ease-in',
  maxHeight: 10000
}
