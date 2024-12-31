import React from 'react'

const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title">
            {title}
            {type === "greeting" && (
                // render username ('&nbsp' adds empty space character)
                <span className='text-[#546E7A]'>
                    &nbsp;{user}
                </span>
            )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
    </div>
  )
}

export default HeaderBox
