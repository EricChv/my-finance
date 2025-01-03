import React from 'react';

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      {/* Title */}
      <h1 className="header-box-title">{title}</h1>

      {/* Subtext with Username */}
      <p className="header-box-subtext">
        {subtext}
        {type === "greeting" && (
          <span className="text-[#475467] font-medium">&nbsp;{user}!</span>
        )}
      </p>
    </div>
  );
};

export default HeaderBox;