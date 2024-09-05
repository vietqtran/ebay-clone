import React from 'react'

type Props = {
   style: React.CSSProperties
}

const Loader = ({ style }: Props) => {
   return <div className="loader" style={style}></div>
}

export default Loader
