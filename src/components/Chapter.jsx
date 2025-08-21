import React from 'react'

export default function Chapter({title, preview, onClick, active}){
  return (
    <div className={"chapter-item "+(active? 'active':'')} onClick={onClick}>
      <strong>{title}</strong>
      <div style={{fontSize:12, color:'#6b6b6b'}}>{preview}</div>
    </div>
  )
}
