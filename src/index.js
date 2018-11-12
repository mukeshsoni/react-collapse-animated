import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Collapse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
    this.containerRef = null;
  }

  componentDidMount() {
    const { transitionDuration } = this.props;

    if (this.props.open && this.containerRef) {
      this.setState(
        {
          height: this.containerRef.clientHeight
        },
        () => {
          // Once the animation is complete, set the height to auto
          // This ensures that if the content height changes, the parent height
          // adjust automatically
          setTimeout(() => {
            this.setState({ height: "auto" });
          }, parseInt(transitionDuration, 10) * 1000);
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open && this.containerRef) {
      if (nextProps.open) {
        this.setState(
          {
            height: this.containerRef.scrollHeight
          },
          () => {
            setTimeout(() => {
              this.setState({ height: "auto" });
            }, 200);
          }
        );
      } else {
        // this is a case where the component is going from open to close state
        // When it's open, we set the height of container to 'auto'
        // But browers don't know how to transition from 'auto' to zero value
        // So we first set the height to the current height of content
        // And then set it to zero
        this.setState({ height: this.containerRef.clientHeight }, () => {
          // Directly calling setState with height 0 does not work
          // Even though the render method is called with the changed height and
          // height 0 twice. --\O/--
          // weirdly, i couldn't get it to work consistently with a setTimeout of 0 or even
          // 1. It would work sometimes and not at other times. So i said, ok, i will
          // wait for 20ms before it animates
          setTimeout(() => {
            this.setState({ height: 0 });
          }, 20);
        });
      }
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
    } = this.props;
    const { height } = this.state;

    return (
      <div
        style={{
          overflow: "hidden",
          transition: `height ${transitionDuration} ${transitionType}`,
          height,
          ...style
        }}
        ref={node => (this.containerRef = node)}
        id={id}
        aria-hidden={!open}
      >
        {children}
      </div>
    );
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
};

Collapse.defaultProps = {
  transitionDuration: "0.3s",
  transitionType: "ease-in"
};
