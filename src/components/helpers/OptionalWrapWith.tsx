import React, {PropsWithChildren, ReactElement} from 'react';

type Props = {
  wrap?: boolean;
  component: ReactElement;
} & PropsWithChildren;

const OptionalWrapWith = ({wrap, component, children}: Props) => {
  if (!wrap) return children as ReactElement;

  const componentChildren = component.props.children as ReactElement;

  if (!componentChildren)
    return React.cloneElement(component, component.props, children);

  // works until 2 levels of nesting of component.
  return React.cloneElement(
    component,
    component.props,
    React.cloneElement(
      componentChildren,
      componentChildren.props ?? {},
      children
    )
  );
};

export default OptionalWrapWith;
