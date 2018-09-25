# react-collapse-animated

React component which can be used for any kind of collapsible content. It can be used for an accordion or a 'show more' section or a dropdown menu.

The height changes from zero to content height and vice versa are animated. The animation duration and type are customizable.

Example usage to build and individual Collapsible with a header -

```
// the open/close state of Collapse is controlled from the consumer
render() {
    const { heading } = this.props;
    const { isOpen } = this.state;

    return (
      <div role="button" className='collapsible-section'>
        <button
          className='collapsible-label'
          onClick={this.handleClick}
          aria-expanded={isOpen}
          aria-controls={this.getCollapsibleId()}
        >
          <span className=label-text'>{heading}</span>
        </button>
        <Collapse
          open={isOpen}
          id={this.getCollapsibleId()}
          style={{ marginBottom: isOpen ? 10 : 0 }}
        >
          {this.props.children}
        </Collapse>
      </div>
    );
  }
```

How to install `react-collapse-animated`?

On your command line, type

```
npm install react-collapse-animated --save
```

or, if you use yarn for installing dependencies, type

```
yarn add react-collapse-animated
```

And in your react component -

```
import Collapse from 'react-collapse-animated'

// then somewhere in your jsx
<Collapse
  open={isOpen}
  id={this.getCollapsibleId()}
  style={{ maxHeight: 300 }}
>
  {this.props.children}
</Collapse>
```
