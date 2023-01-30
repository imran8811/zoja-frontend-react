import React, { FC, ReactNode } from "react";

export type BaseLayoutProps =  {
  children? : ReactNode,
} 

const BaseLayout: FC = ({children}) => {
  return (
    <div className="wrapper">{children}</div>
  )
}

export default BaseLayout;